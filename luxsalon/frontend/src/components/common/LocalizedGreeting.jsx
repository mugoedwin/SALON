import InfoCard from "../ui/InfoCard";
import { useAuth } from "../../auth/AuthProvider";
import { buildLocalizedGreeting } from "../../utils/greeting";
import { getBrowserLocale, getBrowserTimezone } from "../../utils/locale";

function getDisplayName(user, profile) {
  return (
    profile?.name ||
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "there"
  );
}

function LocalizedGreeting({ role }) {
  const { user, profile, isAdmin } = useAuth();
  const resolvedRole =
    role || (isAdmin ? "admin" : profile?.role === "admin" ? "admin" : "user");

  const greeting = buildLocalizedGreeting({
    name: getDisplayName(user, profile),
    role: resolvedRole,
    locale: profile?.locale || getBrowserLocale(),
    timezone: profile?.timezone || getBrowserTimezone(),
    previousLoginDay: profile?.previousLoginDay,
    lastLoginDay: profile?.lastLoginDay,
    loginCount: profile?.loginCount,
  });

  return (
    <InfoCard tone="muted" className="border border-rose-100">
      <div dir={greeting.dir} className={greeting.dir === "rtl" ? "text-right" : ""}>
        <p className="eyebrow-label">{greeting.localeName}</p>
        <h2 className="mt-3 text-3xl font-semibold text-salon-strong">
          {greeting.message}
        </h2>
        <p className="mt-2 text-sm leading-7 text-salon-copy">{greeting.label}</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
          {greeting.locale} | {greeting.timezone}
        </p>
      </div>
    </InfoCard>
  );
}

export default LocalizedGreeting;
