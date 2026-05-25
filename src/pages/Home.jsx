import ActionLink from "../components/ui/ActionLink";
import TestimonialCarousel from "../components/ui/TestimonialCarousel";
import Hero from "../components/home/Hero";
import { servicesData } from "../data/servicesData";
import {
  galleryImages,
  homeTestimonials,
  homeValueHighlights,
} from "../data/siteData";

const featuredServices = servicesData.filter((service) => service.popular).slice(0, 4);
const galleryPreview = galleryImages.slice(0, 3);

function Home() {
  return (
    <div className="pb-16 sm:pb-20">
      <Hero />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow-label">Signature Services</p>
              <h2 className="mt-4 text-4xl font-semibold text-salon-strong sm:text-5xl">
                Our most-loved beauty services.
              </h2>
            </div>

            <ActionLink to="/services">Explore All Services</ActionLink>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {featuredServices.map((service) => (
              <article
                key={service.name}
                className="group grid gap-5 rounded-[1.5rem] border border-rose-200 bg-[#F7ECE8] p-3 shadow-[0_14px_34px_rgba(126,91,100,0.1)] transition duration-500 hover:-translate-y-2 hover:border-rose-300 hover:shadow-[0_0_0_2px_rgba(74,14,23,0.18),0_0_34px_rgba(74,14,23,0.22),0_24px_62px_rgba(74,14,23,0.16)] sm:grid-cols-[160px_1fr]"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-[1.15rem] bg-rose-100">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-115 group-hover:saturate-110"
                  />
                </div>

                <div className="flex h-full flex-col px-1 pb-1 sm:py-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
                        {service.category}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-salon-strong">
                        {service.name}
                      </h3>
                    </div>
                    <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-rose-700">
                      {service.price}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-salon-copy">
                    {service.benefit}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-rose-200/70 pt-4">
                    <span className="text-sm text-salon-muted">{service.duration}</span>
                    <span className="text-sm font-semibold text-rose-700">
                      Book now
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="eyebrow-label">Why Clients Return</p>
            <h2 className="mt-4 text-4xl font-semibold text-salon-strong sm:text-5xl">
              Stronger structure, clearer service, and better rhythm.
            </h2>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {homeValueHighlights.map((item, index) => (
              <div key={item.title} className="border-t border-rose-100 pt-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-700">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-salon-strong">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-salon-copy">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FBF3F2] px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow-label">Gallery Preview</p>
              <h2 className="mt-4 text-4xl font-semibold text-salon-strong sm:text-5xl">
                A glimpse of the looks we create.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-salon-copy">
                From protective styles to soft glam and polished nail finishes,
                every detail is shaped to feel fresh, personal, and camera-ready.
              </p>
            </div>

            <div className="shrink-0">
              <ActionLink to="/gallery" variant="secondary">
                View Full Gallery
              </ActionLink>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPreview.map((item) => (
              <article
                key={item.title}
                className="group rounded-[1.5rem] border border-rose-200 bg-[#F7ECE8] p-2 shadow-[0_14px_34px_rgba(126,91,100,0.12)] transition duration-500 hover:-translate-y-3 hover:border-rose-300 hover:shadow-[0_0_0_2px_rgba(74,14,23,0.2),0_0_34px_rgba(74,14,23,0.26),0_26px_70px_rgba(74,14,23,0.18)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.15rem] bg-rose-100 after:pointer-events-none after:absolute after:inset-0 after:bg-rose-300/0 after:mix-blend-screen after:transition-colors after:duration-500 group-hover:after:bg-rose-300/36">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-[0.6deg] group-hover:brightness-125 group-hover:saturate-125"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[#30070c]/82 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffe8ed]">
                      {item.category}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {item.title}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="eyebrow-label">Testimonials</p>
            <h2 className="mt-4 text-4xl font-semibold text-salon-strong sm:text-5xl">
              Real reviews, presented with more intention.
            </h2>
          </div>

          <div className="mt-10">
            <TestimonialCarousel testimonials={homeTestimonials} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
