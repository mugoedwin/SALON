import { AppError } from "./AppError.js";

export function normalizeWhatsAppNumber(phone) {
  const trimmed = String(phone ?? "").trim();

  if (trimmed.startsWith("whatsapp:+")) return trimmed;
  if (trimmed.startsWith("+")) return `whatsapp:${trimmed}`;

  throw new AppError("customerPhone must be in international format, for example +254712345678", 422);
}
