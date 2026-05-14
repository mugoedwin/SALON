import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navigationLinks, salonInfo } from "../../data/siteData";

const baseLinkClass =
  "relative px-1 py-2 text-sm font-semibold tracking-[0.08em] text-salon-copy transition-colors duration-200 hover:text-rose-700";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-5">
            <NavLink to="/" className="group flex min-w-0 items-center gap-3">
              <img
                src="/images/ivonne-logo.jpg"
                alt="Ivonne Orchard Beauty Salon Logo"
                style={{ height: "50px", width: "auto" }}
              />
              <div className="min-w-0 leading-none">
                <p className="truncate text-[1rem] font-semibold tracking-tight text-salon-strong sm:text-[1.35rem]">
                  {salonInfo.name}
                </p>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-salon-muted sm:text-[0.7rem]">
                  Beauty Salon
                </p>
              </div>
            </NavLink>

            <nav
              className="hidden items-center gap-6 md:flex"
              aria-label="Main"
            >
              {navigationLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `${baseLinkClass} ${
                      isActive
                        ? "text-rose-700 after:absolute after:-bottom-3 after:left-0 after:h-0.5 after:w-full after:bg-rose-600"
                        : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <a
                href={salonInfo.phoneHref}
                className="rounded-full border border-rose-200 bg-white px-3.5 py-2 text-sm font-semibold text-salon-copy transition-colors duration-200 hover:border-rose-300 hover:text-rose-700"
              >
                Call
              </a>
              <NavLink
                to="/booking"
                className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-rose-500"
              >
                Book Now
              </NavLink>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-rose-100 bg-white p-2.5 text-salon-copy md:hidden"
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
        <nav
          className="mx-auto max-w-6xl px-4 pb-4 md:hidden"
          aria-label="Mobile"
        >
          <div className="border-t border-rose-100 bg-white pt-3">
            {navigationLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `block border-b border-rose-100 px-2 py-3 text-sm font-semibold ${
                    isActive
                      ? "text-rose-700"
                      : "text-salon-copy hover:text-rose-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                href={salonInfo.phoneHref}
                className="rounded-[1.25rem] border border-rose-100 bg-rose-50/70 px-4 py-3 text-sm font-semibold text-salon-copy"
              >
                Call the salon
              </a>
              <a
                href={salonInfo.whatsappHref}
                className="rounded-[1.25rem] border border-rose-100 bg-white px-4 py-3 text-sm font-semibold text-rose-700"
              >
                WhatsApp us
              </a>
            </div>

            <div className="mt-3 rounded-[1.5rem] border border-rose-100 bg-white px-4 py-4">
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
