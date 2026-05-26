import cors from "cors";
import express from "express";
import helmet from "helmet";

import bookingRoutes from "./routes/booking.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: "1mb" }));

  // Twilio status callbacks are form-encoded by default.
  app.use("/api/webhooks", express.urlencoded({ extended: false }), webhookRoutes);
  app.use("/api/bookings", bookingRoutes);

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use(errorHandler);

  return app;
}
