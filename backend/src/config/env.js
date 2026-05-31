import dotenv from "dotenv";

dotenv.config();

const required = ["MONGODB_URI", "SALON_NAME"];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 4000),
  MONGODB_URI: process.env.MONGODB_URI,
  SALON_NAME: process.env.SALON_NAME,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_FROM: process.env.TWILIO_WHATSAPP_FROM,
  TWILIO_STATUS_CALLBACK_URL: process.env.TWILIO_STATUS_CALLBACK_URL,
  TWILIO_VALIDATE_WEBHOOK_SIGNATURES:
    process.env.TWILIO_VALIDATE_WEBHOOK_SIGNATURES === "true",
  MPESA_ENVIRONMENT: process.env.MPESA_ENVIRONMENT ?? "sandbox",
  MPESA_CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET,
  MPESA_SHORTCODE: process.env.MPESA_SHORTCODE,
  MPESA_PASSKEY: process.env.MPESA_PASSKEY,
  MPESA_CALLBACK_URL: process.env.MPESA_CALLBACK_URL,
  MPESA_TRANSACTION_TYPE:
    process.env.MPESA_TRANSACTION_TYPE ?? "CustomerPayBillOnline",
  MPESA_ACCOUNT_REFERENCE:
    process.env.MPESA_ACCOUNT_REFERENCE ?? "IvonneOrchard",
  SKIP_MONGO_CONNECT: process.env.SKIP_MONGO_CONNECT === "true",
};
