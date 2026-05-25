import ar from "../locales/ar.json";
import en from "../locales/en.json";
import es from "../locales/es.json";
import {
  getBrowserLocale,
  getBrowserTimezone,
  getLocaleDirection,
  getLocaleLanguage,
  getLocaleRegion,
  getTimeOfDay,
  normalizeLocale,
} from "./locale";

const BUNDLES = {
  ar,
  en,
  es,
};

function interpolate(template, values) {
  return String(template).replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = values?.[key];
    return value === undefined || value === null ? "" : String(value);
  });
}

export function translate(locale, key, values = {}) {
  const language = getLocaleLanguage(locale);
  const bundle = BUNDLES[language] || BUNDLES.en;
  const fallback = BUNDLES.en[key] || key;
  return interpolate(bundle[key] || fallback, values);
}

export function buildLocalizedGreeting({
  name,
  role = "user",
  locale = getBrowserLocale(),
  timezone = getBrowserTimezone(),
  previousLoginDay = null,
  lastLoginDay = null,
  loginCount = 0,
} = {}) {
  const resolvedLocale = normalizeLocale(locale);
  const resolvedTimezone = timezone || getBrowserTimezone();
  const language = getLocaleLanguage(resolvedLocale);
  const dir = getLocaleDirection(resolvedLocale);
  const timeOfDay = getTimeOfDay(new Date(), resolvedTimezone);
  const roleKey = role === "admin" ? "admin" : "user";
  const isReturning = Boolean(previousLoginDay) || Number(loginCount) > 1;
  const messageKey = isReturning
    ? `welcome_back_${roleKey}`
    : `${timeOfDay}_${roleKey}`;
  const labelKey = isReturning ? "returning_label" : "first_visit_label";

  return {
    message: translate(language, messageKey, { name }),
    label: translate(language, labelKey),
    localeName: translate(language, "locale_name"),
    locale: resolvedLocale,
    timezone: resolvedTimezone,
    dir,
    timeOfDay,
    isReturning,
    region: getLocaleRegion(resolvedLocale),
  };
}
