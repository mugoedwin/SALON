import mongoose from "mongoose";

import { env } from "./env.js";
import { logger } from "../utils/logger.js";

export async function connectMongo() {
  mongoose.set("strictQuery", true);

  await mongoose.connect(env.MONGODB_URI);

  logger.info("mongo.connected", {
    database: mongoose.connection.name,
  });
}
