import { updateWhatsAppDeliveryStatus } from "../services/notification.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const twilioWhatsAppStatusController = asyncHandler(async (req, res) => {
  await updateWhatsAppDeliveryStatus({
    messageSid: req.body.MessageSid,
    messageStatus: req.body.MessageStatus,
    errorCode: req.body.ErrorCode,
    errorMessage: req.body.ErrorMessage,
  });

  res.status(204).send();
});
