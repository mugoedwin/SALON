import { useMemo, useState } from "react";
import PageShell from "../components/common/PageShell";
import ActionLink from "../components/ui/ActionLink";
import { servicesData } from "../data/servicesData";
import { servicePromises } from "../data/siteData";

const categoryDescriptions = {
  "Most Popular":
    "A quick look at the salon favorites clients book most often.",
  "Hair Styling":
    "Smooth blowouts, silk presses, and polished finishes for everyday confidence or special plans.",
  "Protective Styling":
    "Braids, installs, cornrows, and loc care designed to feel neat, light, and intentional.",
  Nails:
    "Clean shaping, glossy finishes, and hand-and-foot care with a refined salon feel.",
  Treatments:
    "Care-led hair rituals focused on scalp comfort, moisture, shine, and healthier styling results.",
  "Spa Treatments":
    "Relaxing body rituals that leave skin feeling smooth, refreshed, and renewed.",
  "Skin Care":
    "Gentle facial care for a brighter, hydrated, and healthy-looking complexion.",
  Waxing:
    "Clean, careful hair removal with simple prep and a smooth finish.",
  Lashes:
    "Soft lash definition for everyday polish, events, and beauty touch-ups.",
  "Makeup & Bridal":
    "Soft glam, bridal beauty, and occasion-ready looks with a radiant long-wear finish.",
};

function Services() {
  const [selectedCategory, setSelectedCategory] = useState("Most Popular");

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
  const serviceCategories = useMemo(
    () => ["Most Popular", ...Object.keys(servicesByCategory)],
    [servicesByCategory],
  );
  const visibleServiceGroups = useMemo(
    () => {
      if (selectedCategory === "Most Popular") {
        return [["Most Popular", servicesData.filter((service) => service.popular).slice(0, 6)]];
      }

      return [[selectedCategory, servicesByCategory[selectedCategory] ?? []]];
    },
    [selectedCategory, servicesByCategory],
  );

  return (
    <PageShell
      eyebrow="Services"
      title="Choose the service that fits your next look"
      description="Browse hair, nails, skin care, spa rituals, lashes, makeup, and bridal beauty with clear pricing and easy booking."
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
            Beauty appointments should feel easy from the first click.
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

      <div className="mt-10 space-y-8">
        <div className="rounded-[1.5rem] border border-rose-100 bg-[#F7ECE8] p-2.5 shadow-[0_14px_34px_rgba(126,91,100,0.08)]">
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5" role="tablist" aria-label="Service categories">
            {serviceCategories.map((category) => {
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`rounded-full px-4 py-2.5 text-sm font-semibold transition duration-300 ${
                    isSelected
                      ? "bg-rose-600 text-white shadow-[0_12px_28px_rgba(74,14,23,0.24)]"
                      : "bg-white/76 text-salon-copy hover:bg-white hover:text-rose-700"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {visibleServiceGroups.map(([category, items]) => (
          <section
            key={category}
            className="border-t border-rose-100 pt-7"
          >
            <div className="max-w-3xl">
              <p className="eyebrow-label">{category}</p>
              <h2 className="mt-4 text-3xl font-semibold text-salon-strong">
                {category}
              </h2>
              <p className="mt-4 text-sm leading-7 text-salon-copy">
                {categoryDescriptions[category] ??
                  "Salon services presented in a clearer, easier-to-book format."}
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {items.map((service) => (
                <article
                  key={service.name}
                  className="group flex h-full flex-col rounded-[1.25rem] border border-rose-100 bg-white p-2 shadow-[0_10px_24px_rgba(126,91,100,0.08)] transition duration-500 hover:-translate-y-1.5 hover:border-rose-200 hover:shadow-[0_0_0_2px_rgba(74,14,23,0.12),0_0_28px_rgba(74,14,23,0.18),0_18px_42px_rgba(126,91,100,0.12)]"
                >
                  <div className="aspect-[5/3] overflow-hidden rounded-[1rem] bg-rose-50">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-110"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-rose-700">
                          {service.category}
                        </p>
                        <h3 className="mt-1.5 text-xl font-semibold text-salon-strong">
                          {service.name}
                        </h3>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="rounded-full bg-[#F7ECE8] px-2.5 py-1 text-xs font-semibold text-rose-700">
                          {service.price}
                        </p>
                        <p className="mt-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-salon-muted">
                          {service.duration}
                        </p>
                      </div>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-salon-copy">
                      {service.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {service.features.slice(0, 2).map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-rose-100 bg-rose-50/70 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-rose-700"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-4">
                      <div className="border-t border-rose-100 pt-3">
                        <p className="text-sm font-semibold leading-6 text-salon-strong">
                          {service.benefit}
                        </p>
                      </div>

                      <div className="mt-3">
                        <ActionLink to="/booking">Book Now</ActionLink>
                      </div>
                    </div>
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
