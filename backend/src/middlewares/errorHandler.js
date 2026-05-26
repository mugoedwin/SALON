import { AppError } from "../utils/AppError.js";
import { logger } from "../utils/logger.js";

export function errorHandler(error, _req, res, _next) {
  const statusCode = error instanceof AppError ? error.statusCode : 500;

  logger.error("http.request.failed", {
    statusCode,
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  });

  res.status(statusCode).json({
    status: "error",
    message: statusCode === 500 ? "Internal server error" : error.message,
  });
}
