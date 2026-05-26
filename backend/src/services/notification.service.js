import { Notification } from "../models/Notification.js";
import { sendWhatsAppMessage } from "./whatsapp.service.js";
import { formatAppointmentDate, formatAppointmentTime } from "../utils/dateFormat.js";
import { logger } from "../utils/logger.js";
import { normalizeWhatsAppNumber } from "../utils/phone.js";

export async function sendAppointmentConfirmation({ appointment, salonName }) {
  const channel = "whatsapp";
  const type = "appointment_confirmation";
  const dedupeKey = `${channel}:${type}:${appointment._id.toString()}`;
  const recipient = normalizeWhatsAppNumber(appointment.customerPhone);
  const messageBody = buildAppointmentConfirmationMessage({ appointment, salonName });

  const existing = await Notification.findOne({ dedupeKey });
  if (existing?.status === "sent" || existing?.status === "delivered" || existing?.status === "read") {
    logger.info("notification.confirmation.skipped_duplicate", {
      appointmentId: appointment._id,
      notificationId: existing._id,
      status: existing.status,
    });
    return publicNotification(existing);
  }

  const notification = await Notification.findOneAndUpdate(
    { dedupeKey, status: { $ne: "sending" } },
    {
      $setOnInsert: {
        appointmentId: appointment._id,
        channel,
        type,
        recipient,
        messageBody,
        dedupeKey,
      },
      $set: {
        status: "sending",
        lastAttemptAt: new Date(),
      },
      $inc: { attempts: 1 },
    },
    { new: true, upsert: true },
  );

  if (!notification) {
    const inFlight = await Notification.findOne({ dedupeKey });
    return publicNotification(inFlight);
  }

  try {
    const message = await sendWhatsAppMessage({
      to: recipient,
      body: messageBody,
    });

    notification.status = "sent";
    notification.providerMessageId = message.sid;
    notification.providerStatus = message.status;
    notification.sentAt = new Date();
    notification.providerErrorCode = undefined;
    notification.providerErrorMessage = undefined;
    await notification.save();

    logger.info("notification.whatsapp.sent", {
      appointmentId: appointment._id,
      notificationId: notification._id,
      providerMessageId: message.sid,
    });

    return publicNotification(notification);
  } catch (error) {
    notification.status = "failed";
    notification.providerErrorCode = error.code?.toString();
    notification.providerErrorMessage = error.message;
    notification.failedAt = new Date();
    notification.nextRetryAt = calculateNextRetryAt(notification.attempts);
    await notification.save();

    logger.error("notification.whatsapp.failed", {
      appointmentId: appointment._id,
      notificationId: notification._id,
      attempts: notification.attempts,
      nextRetryAt: notification.nextRetryAt,
      message: error.message,
      code: error.code,
    });

    return publicNotification(notification);
  }
}

export async function updateWhatsAppDeliveryStatus({
  messageSid,
  messageStatus,
  errorCode,
  errorMessage,
}) {
  if (!messageSid) return;

  const update = {
    providerStatus: messageStatus,
    providerErrorCode: errorCode,
    providerErrorMessage: errorMessage,
  };

  if (messageStatus === "delivered") {
    update.status = "delivered";
    update.deliveredAt = new Date();
  } else if (messageStatus === "read") {
    update.status = "read";
    update.readAt = new Date();
  } else if (messageStatus === "failed" || messageStatus === "undelivered") {
    update.status = "failed";
    update.failedAt = new Date();
  }

  const notification = await Notification.findOneAndUpdate(
    { providerMessageId: messageSid },
    { $set: update },
    { new: true },
  );

  logger.info("notification.whatsapp.status_updated", {
    providerMessageId: messageSid,
    notificationId: notification?._id,
    providerStatus: messageStatus,
  });
}

function buildAppointmentConfirmationMessage({ appointment, salonName }) {
  return `Hello ${appointment.customerName}, your appointment at ${salonName} is confirmed for ${formatAppointmentDate(appointment.startsAt)} at ${formatAppointmentTime(appointment.startsAt)} with ${appointment.staffName}. Service: ${appointment.service}.`;
}

function calculateNextRetryAt(attempts) {
  const delaysInMinutes = [2, 10, 30];
  const delay = delaysInMinutes[Math.min(attempts - 1, delaysInMinutes.length - 1)];
  return new Date(Date.now() + delay * 60 * 1000);
}

function publicNotification(notification) {
  if (!notification) return null;

  return {
    id: notification._id,
    channel: notification.channel,
    type: notification.type,
    status: notification.status,
    attempts: notification.attempts,
    providerMessageId: notification.providerMessageId,
    nextRetryAt: notification.nextRetryAt,
  };
}
