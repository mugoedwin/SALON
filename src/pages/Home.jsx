import ActionLink from "../components/ui/ActionLink";
import TestimonialCarousel from "../components/ui/TestimonialCarousel";
import Hero from "../components/home/Hero";
import { useServiceCatalog } from "../services/serviceCatalog";
import {
  bookingSteps,
  galleryImages,
  homeTestimonials,
  homeValueHighlights,
  salonInfo,
  salonPhoneNumbers,
  salonInteriorImages,
} from "../data/siteData";

const galleryPreview = galleryImages.slice(0, 3);
const interiorPreview = [
  salonInteriorImages[7],
  salonInteriorImages[1],
  salonInteriorImages[2],
];

function Home() {
  const { services } = useServiceCatalog();
  const featuredServices = services.filter((service) => service.popular).slice(0, 4);

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
          <div className="grid gap-8 border-y border-rose-100 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="eyebrow-label">Easy Booking</p>
              <h2 className="mt-4 text-4xl font-semibold text-salon-strong sm:text-5xl">
                From idea to appointment in three calm steps.
              </h2>
              <p className="mt-4 max-w-xl text-base font-medium leading-8 text-[#6f4b55]">
                First-time clients can choose a service, share inspiration, and
                arrive with the team already clear on the finish.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {bookingSteps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-lg border border-rose-100 bg-white p-5 shadow-[0_14px_34px_rgba(74,14,23,0.07)]"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-rose-700">
                    0{index + 1}
                  </p>
                  <p className="mt-4 text-base font-semibold leading-7 text-[#4f2f38]">
                    {step}
                  </p>
                </div>
              ))}
            </div>
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
                  <div className="absolute inset-x-0 bottom-0 bg-[#fff9f8]/95 px-4 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-700">
                      {item.category}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-salon-strong">
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
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow-label">Salon Space</p>
              <h2 className="mt-4 text-4xl font-semibold text-salon-strong sm:text-5xl">
                A look inside before you arrive.
              </h2>
              <p className="mt-4 max-w-xl text-base font-medium leading-8 text-[#6f4b55]">
                Mirrors, treatment corners, and appointment spaces built for
                calm salon visits.
              </p>
            </div>

            <ActionLink to="/gallery" variant="secondary">
              View Interior Gallery
            </ActionLink>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-lg border border-rose-100 bg-white shadow-[0_18px_48px_rgba(74,14,23,0.1)]">
              <img
                src={interiorPreview[0].image}
                alt={interiorPreview[0].alt}
                loading="lazy"
                className="h-[24rem] w-full object-cover"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {interiorPreview.slice(1).map((image) => (
                <div
                  key={image.title}
                  className="overflow-hidden rounded-lg border border-rose-100 bg-white shadow-[0_14px_34px_rgba(74,14,23,0.08)]"
                >
                  <img
                    src={image.image}
                    alt={image.alt}
                    loading="lazy"
                    className="h-44 w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>
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

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-lg border border-rose-100 bg-white shadow-[0_22px_64px_rgba(74,14,23,0.1)]">
            <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
              <div className="contact-petals group relative min-h-[24rem] overflow-hidden bg-rose-950 p-6 text-white sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,182,193,0.28),transparent_30%),radial-gradient(circle_at_78%_70%,rgba(244,114,182,0.18),transparent_34%),linear-gradient(135deg,#4A0E17_0%,#881337_54%,#BE123C_100%)]" />
                <span className="contact-petal contact-petal--one" aria-hidden="true" />
                <span className="contact-petal contact-petal--two" aria-hidden="true" />
                <span className="contact-petal contact-petal--three" aria-hidden="true" />
                <span className="contact-petal contact-petal--four" aria-hidden="true" />
                <span className="contact-petal contact-petal--five" aria-hidden="true" />
                <span className="contact-petal contact-petal--six" aria-hidden="true" />
                <span className="contact-petal contact-petal--seven" aria-hidden="true" />
                <span className="contact-petal contact-petal--eight" aria-hidden="true" />
                <span className="contact-petal contact-petal--nine" aria-hidden="true" />
                <div className="pointer-events-none absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-gold-light/70 to-transparent" />
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-light">
                      Visit & Contact
                    </p>
                    <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
                      Ready to plan your visit?
                    </h2>
                    <p className="mt-5 max-w-md text-base font-medium leading-8 text-white/82">
                      Send a reference photo, ask about timing, or reserve a
                      session with direct salon support.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <ActionLink to="/booking">Book Appointment</ActionLink>
                    <ActionLink href={salonInfo.whatsappHref} variant="subtle">
                      WhatsApp Us
                    </ActionLink>
                  </div>
                </div>
              </div>

              <div className="bg-[#fff9f8] p-6 sm:p-8">
                <div className="grid gap-4">
                  <div className="rounded-lg border border-rose-100 bg-white p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-700">
                      Phone
                    </p>
                    <div className="mt-2 flex flex-col gap-1">
                      {salonPhoneNumbers.map((number) => (
                        <a
                          key={number.href}
                          href={number.href}
                          className="text-xl font-semibold text-salon-strong transition hover:text-rose-700"
                        >
                          {number.value}
                        </a>
                      ))}
                    </div>
                  </div>
                  <a
                    href={salonInfo.whatsappHref}
                    className="group rounded-lg border border-rose-100 bg-white p-5 transition hover:border-rose-300 hover:shadow-[0_14px_34px_rgba(74,14,23,0.08)]"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-700">
                      WhatsApp
                    </p>
                    <p className="mt-2 text-xl font-semibold text-salon-strong group-hover:text-rose-700">
                      {salonInfo.whatsapp}
                    </p>
                  </a>
                  <a
                    href={salonInfo.emailHref}
                    className="group rounded-lg border border-rose-100 bg-white p-5 transition hover:border-rose-300 hover:shadow-[0_14px_34px_rgba(74,14,23,0.08)]"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-700">
                      Email
                    </p>
                    <p className="mt-2 break-words text-xl font-semibold text-salon-strong group-hover:text-rose-700">
                      {salonInfo.email}
                    </p>
                  </a>
                  <div className="rounded-lg border border-rose-100 bg-white p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-700">
                      Location
                    </p>
                    <p className="mt-2 text-xl font-semibold text-salon-strong">
                      {salonInfo.address}
                    </p>
                    <p className="mt-1 text-base font-medium text-[#6f4b55]">
                      {salonInfo.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
