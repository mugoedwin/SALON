import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { navigationLinks, salonInfo } from "../../data/siteData";
import { buildLocalizedGreeting, translate } from "../../utils/greeting";
import { getBrowserLocale } from "../../utils/locale";

const baseLinkClass =
  "relative px-1 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/78 transition-colors duration-200 hover:text-[#E6C387] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#E6C387] after:transition-all after:duration-300 hover:after:w-full";

const localeOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "ar", label: "العربية" },
];

function PublicNavbar({ isMenuOpen, setIsMenuOpen, isElevated = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, logout, updateLocalePreference } = useAuth();
  const locale = profile?.locale || getBrowserLocale();
  const greeting = useMemo(
    () =>
      buildLocalizedGreeting({
        name:
          profile?.name ||
          user?.displayName ||
          user?.email?.split("@")[0] ||
          "there",
        role: profile?.role === "admin" ? "admin" : "user",
        locale,
        timezone: profile?.timezone,
        previousLoginDay: profile?.previousLoginDay,
        lastLoginDay: profile?.lastLoginDay,
        loginCount: profile?.loginCount,
      }),
    [locale, profile, user],
  );

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, setIsMenuOpen]);

  async function handleLogout() {
    await logout();
    navigate("/auth/login", { replace: true });
  }

  async function handleLocaleChange(event) {
    await updateLocalePreference(event.target.value);
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div
          className={`rounded-full border px-4 py-3 shadow-[0_18px_50px_rgba(26,5,8,0.22)] backdrop-blur-xl transition-all duration-300 sm:px-5 ${
            isElevated
              ? "border-[#E6C387]/25 bg-[#21060b]/92"
              : "border-white/12 bg-[#1a0508]/42"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <NavLink to="/" className="group flex min-w-0 items-center gap-3">
              <img
                src="/images/ivonne-logo.jpg"
                alt="Ivonne Orchard Beauty Salon Logo"
                className="h-11 w-11 rounded-full border border-[#E6C387]/40 object-cover shadow-[0_0_0_4px_rgba(230,195,135,0.08)] sm:h-12 sm:w-12"
              />
              <div className="min-w-0 leading-none">
                <p className="truncate text-[0.95rem] font-semibold tracking-tight text-white sm:text-[1.25rem]">
                  {salonInfo.name}
                </p>
                <p className="mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.3em] text-[#E6C387]/82 sm:text-[0.65rem]">
                  Dubai Beauty Salon
                </p>
              </div>
            </NavLink>

            <nav className="hidden items-center gap-5 md:flex" aria-label="Main">
              {navigationLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `${baseLinkClass} ${
                      isActive ? "text-[#E6C387] after:w-full" : ""
                    }`
                  }
                >
                  {item.label === "Booking" ? "Book" : item.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              {user ? (
                <>
                  <div
                    className={`min-w-0 max-w-[17rem] text-end ${
                      greeting.dir === "rtl" ? "text-left" : "text-right"
                    }`}
                    dir={greeting.dir}
                  >
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#E6C387]">
                      {greeting.localeName}
                    </p>
                    <p className="truncate text-sm font-semibold text-white">
                      {greeting.message}
                    </p>
                  </div>

                  <label className="sr-only" htmlFor="navbar-locale">
                    Language
                  </label>
                  <select
                    id="navbar-locale"
                    value={locale}
                    onChange={handleLocaleChange}
                    className="h-10 rounded-full border border-white/12 bg-white/10 px-3 text-sm font-semibold text-white outline-none transition-colors duration-200 hover:border-[#E6C387]/45 focus:border-[#E6C387]"
                  >
                    {localeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-[#E6C387]/45 hover:text-[#E6C387]"
                  >
                    {translate(locale, "logout")}
                  </button>
                </>
              ) : (
                <>
                  <a
                    href={salonInfo.phoneHref}
                    className="rounded-full border border-white/12 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white/86 transition-colors duration-200 hover:border-[#E6C387]/45 hover:text-[#E6C387]"
                  >
                    Call
                  </a>
                  <NavLink
                    to="/booking"
                    className="rounded-full bg-[#E6C387] px-5 py-2.5 text-sm font-bold text-[#26070c] shadow-[0_12px_28px_rgba(230,195,135,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f2d7a6] focus:outline-none focus:ring-2 focus:ring-[#E6C387]/60 focus:ring-offset-2 focus:ring-offset-[#1a0508]"
                  >
                    Book Appointment
                  </NavLink>
                </>
              )}
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/10 p-2.5 text-white transition-colors duration-200 hover:border-[#E6C387]/45 hover:text-[#E6C387] md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen ? (
        <nav className="mx-auto max-w-6xl px-4 pt-3 md:hidden" aria-label="Mobile">
          <div className="overflow-hidden rounded-[1.75rem] border border-[#E6C387]/18 bg-[#1a0508]/95 p-3 shadow-[0_24px_60px_rgba(26,5,8,0.34)] backdrop-blur-xl">
            {navigationLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "bg-[#E6C387]/12 text-[#E6C387]"
                      : "text-white/78 hover:bg-white/7 hover:text-[#E6C387]"
                  }`
                }
              >
                {item.label === "Booking" ? "Book Appointment" : item.label}
              </NavLink>
            ))}

            {user ? (
              <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/7 px-4 py-4">
                <div className="min-w-0" dir={greeting.dir}>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E6C387]">
                    {greeting.localeName}
                  </p>
                  <p className="mt-2 truncate text-base font-semibold text-white">
                    {greeting.message}
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <label className="sr-only" htmlFor="navbar-locale-mobile">
                    Language
                  </label>
                  <select
                    id="navbar-locale-mobile"
                    value={locale}
                    onChange={handleLocaleChange}
                    className="h-11 rounded-full border border-white/12 bg-white/10 px-3 text-sm font-semibold text-white outline-none"
                  >
                    {localeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-[#E6C387]/45 hover:text-[#E6C387]"
                  >
                    {translate(locale, "logout")}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <NavLink
                  to="/booking"
                  className="rounded-[1.25rem] bg-[#E6C387] px-4 py-3 text-center text-sm font-bold text-[#26070c] shadow-[0_12px_28px_rgba(230,195,135,0.18)]"
                >
                  Book Appointment
                </NavLink>
                <a
                  href={salonInfo.phoneHref}
                  className="rounded-[1.25rem] border border-white/10 bg-white/8 px-4 py-3 text-center text-sm font-semibold text-white/86"
                >
                  Call the salon
                </a>
                <a
                  href={salonInfo.whatsappHref}
                  className="rounded-[1.25rem] border border-[#E6C387]/22 bg-[#E6C387]/8 px-4 py-3 text-center text-sm font-semibold text-[#E6C387]"
                >
                  WhatsApp us
                </a>
              </div>
            )}

            <div className="mt-3 rounded-[1.5rem] border border-white/10 bg-white/7 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E6C387]">
                Visit
              </p>
              <div className="mt-2 space-y-1 text-sm text-white/68">
                <p>{salonInfo.address}</p>
                <p>{salonInfo.location}</p>
              </div>
            </div>
          </div>
        </nav>
      ) : null}
    </>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isElevated, setIsElevated] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    function updateElevation() {
      setIsElevated(window.scrollY > 18 || !isHome);
    }

    updateElevation();
    window.addEventListener("scroll", updateElevation, { passive: true });
    return () => window.removeEventListener("scroll", updateElevation);
  }, [isHome]);

  return (
    <header
      className={`z-50 transition-all duration-300 ${
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0 bg-[#1a0508]"
      }`}
    >
      <PublicNavbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isElevated={isElevated}
      />
    </header>
  );
}

export default Navbar;
