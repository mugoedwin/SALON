import { Router } from "express";

import { twilioWhatsAppStatusController } from "../controllers/twilioWebhook.controller.js";
import { verifyTwilioWebhookSignature } from "../middlewares/verifyTwilioWebhookSignature.js";

const router = Router();

router.post(
  "/twilio/whatsapp-status",
  verifyTwilioWebhookSignature,
  twilioWhatsAppStatusController,
);

export default router;
