import { AppError } from "./AppError.js";

export function normalizeMpesaPhone(phone) {
  const digits = String(phone ?? "").replace(/[^\d+]/g, "");

  if (/^\+2547\d{8}$/.test(digits)) {
    return digits.slice(1);
  }

  if (/^2547\d{8}$/.test(digits)) {
    return digits;
  }

  if (/^07\d{8}$/.test(digits)) {
    return `254${digits.slice(1)}`;
  }

  if (/^7\d{8}$/.test(digits)) {
    return `254${digits}`;
  }

  throw new AppError(
    "M-Pesa phone must be a Kenyan Safaricom number, for example +254712345678",
    422,
  );
}
