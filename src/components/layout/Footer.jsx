import { NavLink } from "react-router-dom";
import {
  footerImage,
  navigationLinks,
  salonInfo,
  salonPhoneNumbers,
} from "../../data/siteData";
import ActionLink from "../ui/ActionLink";

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-rose-100 px-4 pb-6 pt-12">
      <img
        src={footerImage.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-bottom"
      />
      <div className="absolute inset-0 bg-white/58" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/74 to-rose-50/32" />

      <div className="relative mx-auto max-w-6xl rounded-lg border border-rose-100/80 bg-[#FFF9F8]/88 p-6 shadow-[0_18px_46px_rgba(74,14,23,0.1)] sm:p-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr_0.7fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-rose-500" />
              <p className="eyebrow-label">Book your glow</p>
            </div>
            <h2 className="mt-5 text-4xl font-semibold text-salon-strong">
              {salonInfo.name}
            </h2>
            <p className="mt-4 max-w-md text-sm font-medium leading-7 text-[#4f2f38]">
              {salonInfo.footerDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ActionLink to="/booking">Reserve a Session</ActionLink>
              <ActionLink href={salonInfo.whatsappHref} variant="secondary">
                WhatsApp Us
              </ActionLink>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold uppercase tracking-[0.2em] text-salon-strong">
              Explore
            </h3>
            <div className="mt-5 flex flex-col gap-3.5">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="text-base font-semibold text-[#4f2f38] hover:text-rose-700"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold uppercase tracking-[0.2em] text-salon-strong">
              Reach Us
            </h3>
            <div className="mt-5 space-y-3.5 text-base font-semibold text-[#4f2f38]">
              {salonPhoneNumbers.map((number) => (
                <a
                  key={number.href}
                  href={number.href}
                  className="block hover:text-rose-700"
                >
                  {number.value}
                </a>
              ))}
              <a href={salonInfo.emailHref} className="block hover:text-rose-700">
                {salonInfo.email}
              </a>
            </div>
          </div>

          <div className="border-l border-rose-100 pl-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-700">
              Visit
            </p>
            <p className="mt-4 text-2xl font-semibold text-salon-strong">
              {salonInfo.location}
            </p>
            <p className="mt-3 text-sm font-medium leading-7 text-[#4f2f38]">
              Walk-ins welcome where availability allows. Appointments get
              priority seating and stylist prep.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
