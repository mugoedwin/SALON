import ActionLink from "../ui/ActionLink";
import { heroImage } from "../../data/siteData";

const particles = Array.from({ length: 10 }, (_, index) => index);

function Hero() {
  return (
    <section className="salon-hero relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-black px-4 pt-24 text-center text-white sm:pt-28">
      <img
        src={heroImage.src}
        srcSet={heroImage.srcSet}
        sizes={heroImage.sizes}
        alt={heroImage.alt}
        className="salon-hero__image absolute inset-0 h-full w-full object-cover brightness-140 contrast-105 saturate-120"
        loading="eager"
        fetchPriority="high"
      />

      <div className="salon-hero__shade absolute inset-0" aria-hidden="true" />
      <div className="salon-hero__mist absolute inset-0" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="salon-hero__content relative z-10 mx-auto w-full px-2">
        <h1 className="salon-hero__title font-serif">
          <span className="salon-hero__title-desktop">Ivonne Orchard</span>
          <span className="salon-hero__title-desktop salon-hero__title-accent">
            Beauty Salon
          </span>
          <span className="salon-hero__title-mobile">Ivonne</span>
          <span className="salon-hero__title-mobile">Orchard</span>
          <span className="salon-hero__title-mobile salon-hero__title-accent">
            Beauty
          </span>
          <span className="salon-hero__title-mobile salon-hero__title-accent">
            Salon
          </span>
        </h1>

        <p className="salon-hero__subtitle mx-auto mt-5">
          Where polished beauty meets calm, personal luxury in Dubai.
        </p>

        <div className="salon-hero__buttons mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <ActionLink
            to="/booking"
            className="salon-hero__button w-full max-w-[17rem] sm:w-auto"
          >
            Book an Appointment
          </ActionLink>
          <ActionLink
            to="/services"
            variant="subtle"
            className="salon-hero__button salon-hero__button--secondary w-full max-w-[17rem] sm:w-auto"
          >
            View Services
          </ActionLink>
        </div>
      </div>

      <div className="salon-hero__particles absolute inset-0" aria-hidden="true">
        {particles.map((particle) => (
          <span key={particle} style={{ "--i": particle }} />
        ))}
      </div>
    </section>
  );
}

export default Hero;
