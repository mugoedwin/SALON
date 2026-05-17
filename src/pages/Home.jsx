import SectionGrid from "../components/common/SectionGrid";
import ActionLink from "../components/ui/ActionLink";
import TestimonialCarousel from "../components/ui/TestimonialCarousel";
import { servicesData } from "../data/servicesData";
import {
  contactSupportChannels,
  galleryImages,
  heroImage,
  homeStats,
  homeTestimonials,
  homeValueHighlights,
  salonInfo,
} from "../data/siteData";

const featuredServices = servicesData.filter((service) => service.popular).slice(0, 4);
const galleryPreview = galleryImages.slice(0, 3);

function Home() {
  return (
    <div className="pb-16 sm:pb-20">
      <section className="px-4 pb-14 pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 border-b border-rose-100 pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-rose-300" />
                <p className="eyebrow-label">Dubai Beauty Atelier</p>
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-none text-salon-strong sm:text-5xl lg:text-[4.4rem]">
                Beauty care with a sharper finish and a calmer experience.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-salon-copy sm:text-lg">
                {salonInfo.name} brings premium hair, nails, makeup, and bridal
                care together in one polished salon experience built around clear
                booking, intentional service choices, and a refined finish.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ActionLink to="/booking">Book Appointment</ActionLink>
                <ActionLink to="/services" variant="secondary">
                  Explore Catalogue
                </ActionLink>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 border-t border-rose-100 pt-6">
                {homeStats.map((item) => (
                  <div key={item.label} className="min-w-[120px]">
                    <p className="text-3xl font-semibold text-salon-strong">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-salon-muted">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="relative">
                <div className="absolute bottom-0 left-0 top-6 w-[78%] rounded-[1.75rem] bg-rose-100" />
                <img
                  src={heroImage.src}
                  alt={heroImage.alt}
                  className="relative ml-auto aspect-[4/5] w-full max-w-[23rem] rounded-[1.75rem] object-cover"
                  fetchPriority="high"
                />
              </div>

              <div className="grid gap-0 overflow-hidden rounded-[1.5rem] border border-rose-100 bg-white sm:grid-cols-[1fr_1fr]">
                <div className="border-b border-rose-100 px-5 py-5 sm:border-b-0 sm:border-r">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
                    Concierge
                  </p>
                  <p className="mt-2 text-xl font-semibold text-salon-strong">
                    Easy WhatsApp confirmations
                  </p>
                  <p className="mt-2 text-sm leading-6 text-salon-copy">
                    Share inspiration, ask prep questions, and confirm your time
                    without friction.
                  </p>
                </div>

                <div className="px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
                    Today&apos;s edit
                  </p>
                  <div className="mt-3 space-y-3">
                    {featuredServices.slice(0, 2).map((service) => (
                      <div
                        key={service.name}
                        className="flex items-center justify-between gap-3 border-l-2 border-rose-200 pl-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-salon-strong">
                            {service.name}
                          </p>
                          <p className="truncate text-[0.72rem] uppercase tracking-[0.16em] text-salon-muted">
                            {service.category}
                          </p>
                        </div>
                        <span className="text-[0.72rem] font-semibold text-rose-700">
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
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow-label">Signature Services</p>
              <h2 className="mt-4 text-4xl font-semibold text-salon-strong sm:text-5xl">
                High-demand salon favorites with stronger presentation.
              </h2>
            </div>

            <ActionLink to="/services">Explore All Services</ActionLink>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {featuredServices.map((service, index) => (
              <article
                key={service.name}
                className={`grid gap-5 border-t-2 bg-white p-6 ${
                  index % 2 === 0 ? "border-rose-600" : "border-rose-300"
                } sm:grid-cols-[150px_1fr]`}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-[1.3rem] bg-rose-50">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
                        {service.category}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-salon-strong">
                        {service.name}
                      </h3>
                    </div>
                    <span className="text-sm font-semibold text-rose-700">
                      {service.price}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-salon-copy">
                    {service.benefit}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-rose-100 pt-4">
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

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow-label">Gallery Preview</p>
              <h2 className="mt-4 text-4xl font-semibold text-salon-strong sm:text-5xl">
                The work should feel curated before you even open the gallery.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-salon-copy">
                A tighter preview with one lead image and two supporting looks
                feels more editorial than a repeated set of safe cards.
              </p>
              <div className="mt-6">
                <ActionLink to="/gallery" variant="secondary">
                  View Full Gallery
                </ActionLink>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative overflow-hidden rounded-[1.75rem]">
                <img
                  src={galleryPreview[0].image}
                  alt={galleryPreview[0].alt}
                  loading="lazy"
                  className="aspect-[4/5] h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-white/92 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
                    {galleryPreview[0].category}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-salon-strong">
                    {galleryPreview[0].title}
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {galleryPreview.slice(1).map((item) => (
                  <div
                    key={item.title}
                    className="overflow-hidden rounded-[1.5rem] border border-rose-100 bg-white"
                  >
                    <div className="aspect-[5/4] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
                        {item.category}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-salon-strong">
                        {item.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 border-y border-rose-100 py-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow-label">Before You Visit</p>
              <h2 className="mt-4 text-3xl font-semibold text-salon-strong sm:text-4xl">
                Need a quick answer before you book?
              </h2>
              <p className="mt-4 max-w-md text-base leading-8 text-salon-copy">
                You can reach us on {salonInfo.phone}.
              </p>
            </div>

            <div className="divide-y divide-rose-100">
              {contactSupportChannels.map((channel) => (
                <a
                  key={channel.title}
                  href={channel.href}
                  className="grid gap-3 py-5 sm:grid-cols-[0.8fr_1.2fr] sm:items-start"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
                      {channel.title}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-salon-strong">
                      {channel.detail}
                    </p>
                  </div>
                  <p className="text-sm leading-7 text-salon-copy">
                    {channel.description}
                  </p>
                </a>
              ))}
            </div>
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
