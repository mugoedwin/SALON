import { useMemo } from "react";
import PageShell from "../components/common/PageShell";
import ActionLink from "../components/ui/ActionLink";
import { servicesData } from "../data/servicesData";
import { servicePromises } from "../data/siteData";

const categoryDescriptions = {
  "Hair Styling":
    "Polished finishes for everyday confidence, events, and fresh salon resets.",
  "Protective Styling":
    "Installs, braids, and loc care designed to feel neat, light, and intentional.",
  Nails:
    "Clean shape, strong detail, and self-care services that still feel elevated.",
  Treatments:
    "Care-led services focused on scalp health, moisture, and better long-term styling results.",
  "Makeup & Bridal":
    "Soft glam, bridal beauty, and occasion-ready looks with stronger finish and longevity.",
};

function Services() {
  const servicesByCategory = useMemo(
    () =>
      servicesData.reduce((groups, service) => {
        if (!groups[service.category]) {
          groups[service.category] = [];
        }

        groups[service.category].push(service);
        return groups;
      }, {}),
    [],
  );

  return (
    <PageShell
      eyebrow="Services"
      title="Take a glimpse of our services"
      description="Browse hair, treatments, nails, glam, and bridal services in a layout built for comparison, scanning, and confident booking."
      actions={
        <>
          <ActionLink to="/booking">Book a Service</ActionLink>
          <ActionLink to="/contact" variant="secondary">
            Ask a Question
          </ActionLink>
        </>
      }
    >
      <div className="grid gap-8 border-y border-rose-100 py-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow-label">What Stays True</p>
          <h2 className="mt-4 text-3xl font-semibold text-salon-strong sm:text-4xl">
            Clear pricing, cleaner structure, and better service detail.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {servicePromises.map((promise) => (
            <div key={promise} className="border-l-2 border-rose-200 pl-4">
              <p className="text-sm leading-7 text-salon-copy">{promise}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-12">
        {Object.entries(servicesByCategory).map(([category, items]) => (
          <section
            key={category}
            className="grid gap-8 border-t border-rose-100 pt-8 lg:grid-cols-[240px_1fr]"
          >
            <div>
              <p className="eyebrow-label">{category}</p>
              <h2 className="mt-4 text-4xl font-semibold text-salon-strong">
                {category}
              </h2>
              <p className="mt-4 text-sm leading-7 text-salon-copy">
                {categoryDescriptions[category] ??
                  "Salon services presented in a clearer, easier-to-book format."}
              </p>
            </div>

            <div className="space-y-0">
              {items.map((service) => (
                <article
                  key={service.name}
                  className="grid gap-5 border-b border-rose-100 py-6 sm:grid-cols-[150px_1fr_auto] sm:items-start"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-rose-50">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-start justify-between gap-4 sm:hidden">
                      <h3 className="text-2xl font-semibold text-salon-strong">
                        {service.name}
                      </h3>
                      <span className="text-sm font-semibold text-rose-700">
                        {service.price}
                      </span>
                    </div>

                    <p className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-rose-700 sm:block">
                      {service.category}
                    </p>
                    <h3 className="mt-2 hidden text-2xl font-semibold text-salon-strong sm:block">
                      {service.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-salon-copy">
                      {service.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="border border-rose-100 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-rose-700"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-4 sm:items-end">
                    <div className="hidden text-right sm:block">
                      <p className="text-lg font-semibold text-rose-700">
                        {service.price}
                      </p>
                      <p className="mt-1 text-sm text-salon-muted">{service.duration}</p>
                    </div>

                    <p className="sm:hidden text-sm text-salon-muted">{service.duration}</p>

                    <div className="border-l-2 border-rose-200 pl-3 sm:border-l-0 sm:pl-0">
                      <p className="text-sm font-semibold text-salon-strong">
                        {service.benefit}
                      </p>
                    </div>

                    <ActionLink to="/booking">Book Now</ActionLink>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

export default Services;
