import { env } from "../config/env.js";
import { Appointment } from "../models/Appointment.js";
import { sendAppointmentConfirmation } from "./notification.service.js";
import { AppError } from "../utils/AppError.js";

export async function createBooking({ payload, idempotencyKey }) {
  validateBookingPayload(payload);

  const appointmentInput = {
    customerName: payload.customerName,
    customerPhone: payload.customerPhone,
    service: payload.service,
    staffName: payload.staffName,
    startsAt: new Date(payload.startsAt),
    clientRequestId: idempotencyKey,
  };

  const { appointment, created } = await persistAppointment(appointmentInput);

  // The appointment is already durable at this point. Notification failures are
  // captured in the notification document instead of rolling back the booking.
  const notification = await sendAppointmentConfirmation({
    appointment,
    salonName: env.SALON_NAME,
  });

  return { appointment, created, notification };
}

function validateBookingPayload(payload) {
  const requiredFields = ["customerName", "customerPhone", "service", "staffName", "startsAt"];

  for (const field of requiredFields) {
    if (!payload?.[field]) {
      throw new AppError(`${field} is required`, 422);
    }
  }

  const startsAt = new Date(payload.startsAt);
  if (Number.isNaN(startsAt.getTime())) {
    throw new AppError("startsAt must be a valid ISO date string", 422);
  }

  if (startsAt.getTime() <= Date.now()) {
    throw new AppError("startsAt must be in the future", 422);
  }
}

async function persistAppointment(appointmentInput) {
  if (!appointmentInput.clientRequestId) {
    const appointment = await Appointment.create(appointmentInput);
    return { appointment, created: true };
  }

  try {
    const appointment = await Appointment.create(appointmentInput);
    return { appointment, created: true };
  } catch (error) {
    if (error.code !== 11000) throw error;

    const appointment = await Appointment.findOne({
      clientRequestId: appointmentInput.clientRequestId,
    });

    return { appointment, created: false };
  }
}
