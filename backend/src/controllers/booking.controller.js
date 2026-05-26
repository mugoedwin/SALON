import { createBooking } from "../services/booking.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createBookingController = asyncHandler(async (req, res) => {
  const result = await createBooking({
    payload: req.body,
    idempotencyKey: req.get("Idempotency-Key"),
  });

  res.status(result.created ? 201 : 200).json({
    status: "success",
    booking: result.appointment,
    notification: result.notification,
  });
});
