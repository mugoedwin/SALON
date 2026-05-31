import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { connectMongo } from "./config/mongo.js";
import { logger } from "./utils/logger.js";

async function startServer() {
  if (env.SKIP_MONGO_CONNECT) {
    logger.info("mongo.connection.skipped");
  } else {
    await connectMongo();
  }

  const app = createApp();
  app.listen(env.PORT, () => {
    logger.info("api.server.started", {
      port: env.PORT,
      environment: env.NODE_ENV,
    });
  });
}

startServer().catch((error) => {
  logger.error("api.server.failed_to_start", {
    message: error.message,
    stack: error.stack,
  });
  process.exit(1);
});
