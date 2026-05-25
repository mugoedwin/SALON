import { NavLink } from "react-router-dom";
import { navigationLinks, salonInfo } from "../../data/siteData";
import ActionLink from "../ui/ActionLink";

function Footer() {
  return (
    <footer className="border-t border-rose-100 px-4 pb-6 pt-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.75fr_0.75fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-rose-300" />
              <p className="eyebrow-label">Book your glow</p>
            </div>
            <h2 className="mt-5 text-4xl font-semibold text-salon-strong">
              {salonInfo.name}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-salon-copy">
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
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-salon-strong">
              Explore
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-salon-copy hover:text-rose-700"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-salon-strong">
              Reach Us
            </h3>
            <div className="mt-4 space-y-3 text-sm text-salon-copy">
              <a href={salonInfo.phoneHref} className="block hover:text-rose-700">
                {salonInfo.phone}
              </a>
              <a href={salonInfo.whatsappHref} className="block hover:text-rose-700">
                {salonInfo.whatsapp}
              </a>
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
            <p className="mt-3 text-sm leading-7 text-salon-copy">
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
