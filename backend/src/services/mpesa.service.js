import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import { normalizeMpesaPhone } from "../utils/mpesaPhone.js";

const MPESA_BASE_URLS = {
  sandbox: "https://sandbox.safaricom.co.ke",
  production: "https://api.safaricom.co.ke",
};

function getMpesaBaseUrl() {
  return MPESA_BASE_URLS[env.MPESA_ENVIRONMENT] ?? MPESA_BASE_URLS.sandbox;
}

function assertMpesaConfig() {
  function isConfigured(value) {
    return Boolean(value) && !String(value).startsWith("your_");
  }

  const missing = [
    ["MPESA_CONSUMER_KEY", env.MPESA_CONSUMER_KEY],
    ["MPESA_CONSUMER_SECRET", env.MPESA_CONSUMER_SECRET],
    ["MPESA_SHORTCODE", env.MPESA_SHORTCODE],
    ["MPESA_PASSKEY", env.MPESA_PASSKEY],
    ["MPESA_CALLBACK_URL", env.MPESA_CALLBACK_URL],
  ]
    .filter(([, value]) => !isConfigured(value))
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new AppError(
      `M-Pesa is not configured. Missing: ${missing.join(", ")}`,
      503,
    );
  }
}

function getTimestamp() {
  const now = new Date();
  const parts = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ];

  return `${parts[0]}${parts[1]}${parts[2]}${parts[3]}${parts[4]}${parts[5]}`;
}

async function getAccessToken() {
  const credentials = Buffer.from(
    `${env.MPESA_CONSUMER_KEY}:${env.MPESA_CONSUMER_SECRET}`,
  ).toString("base64");

  const response = await fetch(
    `${getMpesaBaseUrl()}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    },
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.access_token) {
    throw new AppError(
      data.errorMessage || data.error_description || "Could not get M-Pesa access token",
      502,
    );
  }

  return data.access_token;
}

function normalizeAmount(amount) {
  const parsedAmount = Math.round(Number(amount));

  if (!Number.isFinite(parsedAmount) || parsedAmount < 1) {
    throw new AppError("M-Pesa amount must be at least KES 1", 422);
  }

  return parsedAmount;
}

export async function initiateStkPush({
  phone,
  amount,
  accountReference,
  transactionDesc,
}) {
  assertMpesaConfig();

  const accessToken = await getAccessToken();
  const timestamp = getTimestamp();
  const password = Buffer.from(
    `${env.MPESA_SHORTCODE}${env.MPESA_PASSKEY}${timestamp}`,
  ).toString("base64");
  const normalizedPhone = normalizeMpesaPhone(phone);
  const normalizedAmount = normalizeAmount(amount);

  const payload = {
    BusinessShortCode: env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: env.MPESA_TRANSACTION_TYPE,
    Amount: normalizedAmount,
    PartyA: normalizedPhone,
    PartyB: env.MPESA_SHORTCODE,
    PhoneNumber: normalizedPhone,
    CallBackURL: env.MPESA_CALLBACK_URL,
    AccountReference:
      String(accountReference ?? env.MPESA_ACCOUNT_REFERENCE).slice(0, 12) ||
      env.MPESA_ACCOUNT_REFERENCE,
    TransactionDesc:
      String(transactionDesc ?? "Salon booking deposit").slice(0, 32) ||
      "Salon booking deposit",
  };

  const response = await fetch(
    `${getMpesaBaseUrl()}/mpesa/stkpush/v1/processrequest`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.ResponseCode !== "0") {
    throw new AppError(
      data.errorMessage ||
        data.ResponseDescription ||
        "M-Pesa STK Push could not be sent",
      502,
    );
  }

  return {
    merchantRequestId: data.MerchantRequestID,
    checkoutRequestId: data.CheckoutRequestID,
    responseCode: data.ResponseCode,
    responseDescription: data.ResponseDescription,
    customerMessage: data.CustomerMessage,
    phone: normalizedPhone,
    amount: normalizedAmount,
  };
}
