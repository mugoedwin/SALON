import ActionLink from "../ui/ActionLink";
import { servicesData } from "../../data/servicesData";
import { heroImage, homeStats, salonInfo } from "../../data/siteData";

const featuredServices = servicesData.filter((service) => service.popular).slice(0, 2);

function Hero() {
  return (
    <section className="px-4 pb-14 pt-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-maroon-deep text-white shadow-[0_30px_80px_rgba(48,7,12,0.38)]">
        <div className="relative px-6 py-8 md:px-12 lg:px-16 lg:py-12">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="eyebrow-label w-fit">Dubai Beauty Atelier</p>
              <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-[4.5rem]">
                Beauty care with a{" "}
                <span className="italic text-gold-light">sharper finish</span>{" "}
                and a calmer experience.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                {salonInfo.name} brings premium hair, nails, makeup, and bridal
                care together in one polished salon experience built around
                clear booking, intentional service choices, and a refined
                finish.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ActionLink
                  to="/booking"
                  className="!bg-gold-light !text-maroon-deep hover:!bg-white focus-visible:!outline-gold-light"
                >
                  Book Appointment
                </ActionLink>
                <ActionLink
                  to="/services"
                  variant="subtle"
                  className="!border-white/20 !bg-white/10 !text-white hover:!bg-white/15"
                >
                  Explore Catalogue
                </ActionLink>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {homeStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <p className="font-serif text-3xl font-semibold text-white">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[0.72rem] uppercase tracking-[0.2em] text-white/68">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
                <img
                  src={heroImage.src}
                  alt={heroImage.alt}
                  className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                  fetchPriority="high"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-light">
                    Concierge
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    Easy WhatsApp confirmations
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    Share inspiration, ask prep questions, and confirm your time
                    without friction.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-light">
                    Today&apos;s edit
                  </p>
                  <div className="mt-3 space-y-3">
                    {featuredServices.map((service) => (
                      <div
                        key={service.name}
                        className="flex items-center justify-between gap-3 border-l-2 border-gold-light/70 pl-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">
                            {service.name}
                          </p>
                          <p className="truncate text-[0.72rem] uppercase tracking-[0.16em] text-white/68">
                            {service.category}
                          </p>
                        </div>
                        <span className="text-[0.72rem] font-semibold text-gold-light">
                          {service.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
