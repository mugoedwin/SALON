const RTL_LANGUAGES = new Set(["ar", "he", "fa", "ur"]);

export function normalizeLocale(locale) {
  if (!locale || typeof locale !== "string") {
    return "en";
  }

  return locale.trim().replace("_", "-").toLowerCase();
}

export function getBrowserLocale() {
  if (typeof navigator === "undefined") {
    return "en";
  }

  return normalizeLocale(navigator.language || navigator.languages?.[0] || "en");
}

export function getBrowserTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

export function getLocaleLanguage(locale) {
  return normalizeLocale(locale).split("-")[0] || "en";
}

export function getLocaleRegion(locale) {
  const parts = normalizeLocale(locale).split("-");
  return parts[1] || "";
}

export function isRtlLocale(locale) {
  return RTL_LANGUAGES.has(getLocaleLanguage(locale));
}

export function getLocaleDirection(locale) {
  return isRtlLocale(locale) ? "rtl" : "ltr";
}

export function getDayKey(date = new Date(), timeZone = getBrowserTimezone()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function getTimeOfDay(date = new Date(), timeZone = getBrowserTimezone()) {
  const hourParts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    hour12: false,
  }).formatToParts(date);

  const hour = Number(hourParts.find((part) => part.type === "hour")?.value ?? 0);

  if (hour < 12) {
    return "morning";
  }

  if (hour < 17) {
    return "afternoon";
  }

  if (hour < 21) {
    return "evening";
  }

  return "night";
}
