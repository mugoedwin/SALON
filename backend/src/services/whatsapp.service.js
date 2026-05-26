import twilio from "twilio";

import { env } from "../config/env.js";

const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

export async function sendWhatsAppMessage({ to, body }) {
  return client.messages.create({
    from: env.TWILIO_WHATSAPP_FROM,
    to,
    body,
    statusCallback: env.TWILIO_STATUS_CALLBACK_URL,
  });
}
