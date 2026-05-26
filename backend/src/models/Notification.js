import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      index: true,
    },
    channel: {
      type: String,
      enum: ["whatsapp", "sms", "email", "push"],
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["appointment_confirmation", "appointment_reminder_24h", "appointment_cancelled"],
      required: true,
      index: true,
    },
    recipient: { type: String, required: true },
    messageBody: { type: String, required: true },
    dedupeKey: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["pending", "scheduled", "sending", "sent", "delivered", "read", "failed", "skipped"],
      default: "pending",
      index: true,
    },
    attempts: { type: Number, default: 0 },
    provider: { type: String, default: "twilio" },
    providerMessageId: { type: String, index: true },
    providerStatus: { type: String },
    providerErrorCode: { type: String },
    providerErrorMessage: { type: String },
    lastAttemptAt: { type: Date },
    sentAt: { type: Date },
    deliveredAt: { type: Date },
    readAt: { type: Date },
    failedAt: { type: Date },
    sendAt: { type: Date },
    nextRetryAt: { type: Date },
  },
  { timestamps: true },
);

notificationSchema.index({ appointmentId: 1, channel: 1, type: 1 }, { unique: true });
notificationSchema.index({ status: 1, nextRetryAt: 1 });
notificationSchema.index({ status: 1, sendAt: 1 });

export const Notification = mongoose.model("Notification", notificationSchema);
