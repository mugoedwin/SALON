import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { logoImage, navigationLinks, salonInfo } from "../../data/siteData";

const baseLinkClass =
  "relative px-1 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-salon-copy transition-colors duration-200 hover:text-rose-700 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-rose-500 after:transition-all after:duration-300 hover:after:w-full";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isElevated, setIsElevated] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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
        isHome ? "fixed inset-x-0 top-0" : "fixed inset-x-0 top-0 bg-white"
      }`}
    >
      <div className="w-full">
        <div
          className="border-b border-rose-100 bg-white px-4 py-3 shadow-[0_10px_28px_rgba(126,91,100,0.08)] transition-all duration-300 sm:px-8"
        >
          <div className="mx-auto flex w-full max-w-[92rem] items-center justify-between gap-4">
            <NavLink to="/" className="group flex min-w-0 items-center gap-3">
              <img
                src={logoImage}
                alt="Ivonne Orchard Beauty Salon Logo"
                className="h-11 w-11 rounded-full border border-rose-200 object-cover shadow-[0_0_0_4px_rgba(74,14,23,0.08)] sm:h-12 sm:w-12"
              />
              <div className="min-w-0 leading-none">
                <p className="truncate text-[0.95rem] font-semibold tracking-tight text-salon-strong sm:text-[1.25rem]">
                  {salonInfo.name}
                </p>
                <p className="mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.3em] text-rose-700 sm:text-[0.65rem]">
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
                      isActive ? "text-rose-700 after:w-full" : ""
                    }`
                  }
                >
                  {item.label === "Booking" ? "Book" : item.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <NavLink
                to="/contact"
                className="rounded-full border border-rose-200 bg-rose-50/60 px-4 py-2.5 text-sm font-semibold text-salon-copy transition-colors duration-200 hover:border-rose-400 hover:bg-white hover:text-rose-700"
              >
                Call
              </NavLink>
              <NavLink
                to="/booking"
                className="rounded-full bg-[#E11D48] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(225,29,72,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F43F5E] focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-white"
              >
                Book Appointment
              </NavLink>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-rose-50/60 p-2.5 text-salon-copy transition-colors duration-200 hover:border-rose-400 hover:text-rose-700 md:hidden"
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
          <div className="overflow-hidden rounded-[1.75rem] border border-rose-100 bg-white p-3 shadow-[0_24px_60px_rgba(74,14,23,0.16)]">
            {navigationLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "bg-rose-50 text-rose-700"
                      : "text-salon-copy hover:bg-rose-50 hover:text-rose-700"
                  }`
                }
              >
                {item.label === "Booking" ? "Book Appointment" : item.label}
              </NavLink>
            ))}

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <NavLink
                to="/booking"
                className="rounded-[1.25rem] bg-[#E11D48] px-4 py-3 text-center text-sm font-bold text-white shadow-[0_12px_28px_rgba(225,29,72,0.22)]"
              >
                Book Appointment
              </NavLink>
              <NavLink
                to="/contact"
                className="rounded-[1.25rem] border border-rose-100 bg-rose-50/70 px-4 py-3 text-center text-sm font-semibold text-salon-copy"
              >
                Call the salon
              </NavLink>
              <a
                href={salonInfo.whatsappHref}
                className="rounded-[1.25rem] border border-rose-100 bg-white px-4 py-3 text-center text-sm font-semibold text-rose-700"
              >
                WhatsApp us
              </a>
            </div>

            <div className="mt-3 rounded-[1.5rem] border border-rose-100 bg-rose-50/60 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-700">
                Visit
              </p>
              <div className="mt-2 space-y-1 text-sm text-salon-copy">
                <p>{salonInfo.address}</p>
                <p>{salonInfo.location}</p>
              </div>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export default Navbar;
