# Salon WhatsApp Notification Backend

Production-oriented Express/Mongoose scaffold for sending WhatsApp booking confirmations through Twilio.

## Flow

1. `POST /api/bookings` receives the booking.
2. The appointment is saved in MongoDB first.
3. A notification document is created with a unique `dedupeKey`.
4. Twilio WhatsApp send is attempted.
5. Success/failure is logged and persisted.
6. Twilio delivery callbacks update notification state.

This means a WhatsApp failure never deletes or rolls back a valid booking.

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## M-Pesa STK Push

`POST /api/payments/mpesa/stk-push` sends a Daraja STK Push prompt to the
client's phone. Keep all Daraja credentials on the backend:

```env
MPESA_ENVIRONMENT=sandbox
MPESA_CONSUMER_KEY=your_daraja_consumer_key
MPESA_CONSUMER_SECRET=your_daraja_consumer_secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your_daraja_passkey
MPESA_CALLBACK_URL=https://your-public-api.example.com/api/payments/mpesa/callback
MPESA_TRANSACTION_TYPE=CustomerPayBillOnline
MPESA_ACCOUNT_REFERENCE=IvonneOrchard
```

Example request:

```bash
curl -X POST http://localhost:4000/api/payments/mpesa/stk-push \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+254705985701",
    "amount": 1,
    "accountReference": "IvonneOrch",
    "transactionDesc": "Booking deposit"
  }'
```

Safaricom posts the payment result to `MPESA_CALLBACK_URL`. During local
development, expose the backend with a public HTTPS tunnel such as ngrok and
use that callback URL.

Twilio Sandbox setup:

1. Open Twilio Console.
2. Go to Messaging > Try it out > Send a WhatsApp message.
3. Join the sandbox from your phone using the shown WhatsApp join code.
4. Put the sandbox sender in `.env`:

```env
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

5. For delivery status webhooks during local development, expose the API:

```bash
ngrok http 4000
```

Then set:

```env
TWILIO_STATUS_CALLBACK_URL=https://your-ngrok-url.ngrok-free.app/api/webhooks/twilio/whatsapp-status
```

Twilio documents its appointment reminder use case and WhatsApp messaging APIs here:

- https://www.twilio.com/en-us/use-cases/appointment-reminders
- https://www.twilio.com/docs/whatsapp

## Example Request

```bash
curl -X POST http://localhost:4000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: booking-2026-05-26-0001" \
  -d '{
    "customerName": "Sarah",
    "customerPhone": "+254796088951",
    "service": "Hair styling",
    "staffName": "Jane",
    "startsAt": "2026-05-28T14:00:00.000Z"
  }'
```

## Example Response

```json
{
  "status": "success",
  "booking": {
    "_id": "6654f70f1f7f4f1f5b7b9d10",
    "customerName": "Sarah",
    "customerPhone": "+254796088951",
    "service": "Hair styling",
    "staffName": "Jane",
    "startsAt": "2026-05-28T14:00:00.000Z",
    "status": "confirmed"
  },
  "notification": {
    "id": "6654f7111f7f4f1f5b7b9d12",
    "channel": "whatsapp",
    "type": "appointment_confirmation",
    "status": "sent",
    "attempts": 1,
    "providerMessageId": "SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

If Twilio fails, the API still returns the saved booking and a notification status of `failed`; retry metadata is stored on the notification.

## Duplicate Send Protection

Two layers are included:

- `Idempotency-Key` prevents accidental duplicate appointments from client retries.
- `Notification.dedupeKey` prevents duplicate WhatsApp confirmations for the same appointment/type/channel.

For production, require an idempotency key from the frontend checkout/booking flow.

## Notification State Fields

Recommended fields are already in `Notification`:

- `channel`
- `type`
- `recipient`
- `messageBody`
- `dedupeKey`
- `status`
- `attempts`
- `provider`
- `providerMessageId`
- `providerStatus`
- `providerErrorCode`
- `providerErrorMessage`
- `lastAttemptAt`
- `sentAt`
- `deliveredAt`
- `readAt`
- `failedAt`
- `nextRetryAt`

These fields support auditability, retries, dashboards, and future customer support tooling.

## BullMQ Scaling Design

For thousands of bookings per day, move actual sending out of the request path:

1. Booking API saves appointment.
2. Booking API inserts notification record.
3. Booking API enqueues job:

```js
await notificationQueue.add(
  "send-notification",
  { notificationId: notification._id.toString() },
  {
    jobId: notification.dedupeKey,
    attempts: 5,
    backoff: { type: "exponential", delay: 120000 },
    removeOnComplete: 10000,
    removeOnFail: false
  }
);
```

4. Worker loads the notification from MongoDB.
5. Worker sends via the channel provider.
6. Worker updates notification state.

Keep the controller unchanged by replacing `sendAppointmentConfirmation` internals with `enqueueAppointmentConfirmation`.

## 24-Hour Reminder Design

When an appointment is confirmed, create a second notification:

```text
type: appointment_reminder_24h
sendAt: appointment.startsAt - 24 hours
status: scheduled
dedupeKey: whatsapp:appointment_reminder_24h:<appointmentId>
```

With BullMQ:

```js
const delay = reminderSendAt.getTime() - Date.now();
await notificationQueue.add(
  "send-notification",
  { notificationId },
  { delay, jobId: dedupeKey, attempts: 5 }
);
```

If the appointment is cancelled or rescheduled, cancel/recreate the reminder job and mark the old notification as `skipped`.

## Production Notes

- Use Twilio approved templates when moving outside sandbox and for business-initiated WhatsApp messages.
- `TWILIO_WHATSAPP_FROM` must be the Twilio Sandbox sender or an approved WhatsApp Business sender. Use `+254796088951` as the test recipient/customer phone unless Twilio approves it as your sender.
- Validate booking input with a schema library such as Zod or Joi before saving.
- Add request tracing IDs to logs.
- Verify Twilio webhook signatures before trusting callbacks.
- Add rate limits to public booking endpoints.
- Store all times in UTC and render customer-facing times in the salon/customer timezone.
- Put notification workers on separate processes so traffic spikes do not slow bookings.
