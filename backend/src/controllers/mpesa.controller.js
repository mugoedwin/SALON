import { initiateStkPush } from "../services/mpesa.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { logger } from "../utils/logger.js";

export const createMpesaStkPushController = asyncHandler(async (req, res) => {
  const result = await initiateStkPush({
    phone: req.body.phone,
    amount: req.body.amount,
    accountReference: req.body.accountReference,
    transactionDesc: req.body.transactionDesc,
  });

  res.status(200).json({
    status: "success",
    mpesa: result,
  });
});

export const mpesaCallbackController = asyncHandler(async (req, res) => {
  logger.info("mpesa.stk.callback.received", {
    body: req.body,
  });

  res.status(200).json({
    ResultCode: 0,
    ResultDesc: "Accepted",
  });
});
