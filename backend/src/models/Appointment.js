import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    customerPhone: { type: String, required: true, trim: true },
    service: { type: String, required: true, trim: true },
    staffName: { type: String, required: true, trim: true },
    startsAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "completed", "no_show"],
      default: "confirmed",
      index: true,
    },
    clientRequestId: {
      type: String,
      trim: true,
      index: true,
      sparse: true,
      unique: true,
    },
  },
  { timestamps: true },
);

appointmentSchema.index({ startsAt: 1, status: 1 });
appointmentSchema.index({ customerPhone: 1, startsAt: -1 });

export const Appointment = mongoose.model("Appointment", appointmentSchema);
