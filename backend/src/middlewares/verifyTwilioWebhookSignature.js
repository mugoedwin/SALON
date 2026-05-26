import twilio from "twilio";

import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

export function verifyTwilioWebhookSignature(req, _res, next) {
  if (!env.TWILIO_VALIDATE_WEBHOOK_SIGNATURES) {
    next();
    return;
  }

  const signature = req.get("X-Twilio-Signature");
  const publicUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const isValid = twilio.validateRequest(
    env.TWILIO_AUTH_TOKEN,
    signature,
    publicUrl,
    req.body,
  );

  if (!isValid) {
    throw new AppError("Invalid Twilio webhook signature", 403);
  }

  next();
}
