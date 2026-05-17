import { Link } from "react-router-dom";
import ActionLink from "../ui/ActionLink";
import { heroImage, salonInfo } from "../../data/siteData";

const mainHeroImageSrc =
  "https://res.cloudinary.com/dp7w9g89g/image/upload/v1715946800/salon_interior.jpg";

function OrganicLuxuryHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#160205] px-6 py-20 text-white antialiased font-sans md:px-16 lg:px-28 xl:px-36">
      <div className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="diamondGrid"
              width="140"
              height="140"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M70 0 L140 70 L70 140 L0 70 Z"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamondGrid)" />
        </svg>
      </div>

      <div
        className="pointer-events-none absolute right-[5%] top-[-10%] z-0 h-[500px] w-[500px] rounded-full bg-[#E6C387] opacity-10"
        style={{ filter: "blur(120px)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[-10%] left-[-5%] z-0 h-[400px] w-[400px] rounded-full bg-[#5C1329] opacity-30"
        style={{ filter: "blur(100px)" }}
      />

      <div className="pointer-events-none absolute left-[28%] top-[15%] z-0 animate-pulse text-2xl font-serif text-[#E6C387]/40">
        ✦
      </div>
      <div
        className="pointer-events-none absolute left-[45%] bottom-[35%] z-0 animate-pulse text-lg font-serif text-[#E6C387]/20"
        style={{ animationDelay: "1s" }}
      >
        ✦
      </div>
      <div
        className="pointer-events-none absolute left-[10%] top-[70%] z-0 animate-pulse text-xl font-serif text-[#E6C387]/30"
        style={{ animationDelay: "2s" }}
      >
        ✦
      </div>
      <div className="pointer-events-none absolute bottom-[8%] right-[4%] z-0 animate-pulse text-xl font-serif text-[#E6C387]/30">
        ✦
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-20 flex items-center justify-between border-b border-white/5 pb-8">
          <span className="font-serif text-xl font-bold uppercase tracking-[0.3em] text-[#E6C387]">
            Ivonne Orchard
          </span>
          <nav className="hidden gap-10 text-xs uppercase tracking-[0.25em] text-white/40 md:flex">
            <Link to="/" className="text-[#E6C387] transition hover:text-white">
              Home
            </Link>
            <Link to="/services" className="transition hover:text-white">
              Services
            </Link>
            <Link to="/booking" className="transition hover:text-white">
              Booking
            </Link>
          </nav>
          <ActionLink
            to="/booking"
            className="rounded-full bg-[#E6C387] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-[#160205] transition-all duration-300 hover:bg-white"
          >
            Book Space
          </ActionLink>
        </header>

        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="z-10 space-y-8 lg:col-span-7">
            <div className="inline-block">
              <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-medium uppercase tracking-[0.35em] text-[#E6C387] backdrop-blur-md md:text-xs">
                Dubai Beauty Atelier
              </span>
            </div>

            <h1 className="max-w-4xl font-serif text-4xl leading-[1.12] tracking-tight text-white sm:text-6xl xl:text-7xl">
              Beauty care with <br />
              a{" "}
              <span className="font-normal italic tracking-wide text-[#E6C387]">
                sharper finish
              </span>{" "}
              <br />
              and a calmer experience.
            </h1>

            <p className="max-w-xl text-base font-light leading-relaxed tracking-wide text-white/60 md:text-lg">
              {salonInfo.name} brings premium hair, nails, makeup, and bridal
              care together in one polished salon experience built around clear
              booking and intentional service choices.
            </p>

            <div className="flex flex-wrap gap-5 pt-4">
              <ActionLink
                to="/booking"
                className="rounded-full bg-[#e62a52] px-9 py-4 text-xs font-semibold uppercase tracking-wider text-white shadow-xl transition duration-300 hover:bg-[#c21f42]"
              >
                Book Appointment
              </ActionLink>
              <ActionLink
                to="/services"
                variant="subtle"
                className="rounded-full border border-white/10 bg-white/5 px-9 py-4 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition duration-300 hover:border-white/30 hover:bg-white/10"
              >
                Explore Catalogue
              </ActionLink>
            </div>
          </div>

          <div className="relative z-0 flex w-full justify-center lg:col-span-5 lg:justify-end">
            <div className="relative w-full max-w-[460px] rounded-[2.5rem] border border-white/10 bg-[#240a0e]/90 p-4 shadow-[0_40px_90px_-15px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-transform duration-500 hover:scale-[1.02]">
              <div className="aspect-[16/11] w-full overflow-hidden rounded-[1.8rem]">
                <img
                  src={mainHeroImageSrc}
                  alt="Ivonne Orchard Luxury Interior Atelier"
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = heroImage.src;
                  }}
                />
              </div>
            </div>

            <div className="absolute bottom-[-40px] left-[-30px] z-20 hidden w-56 rounded-2xl border border-white/5 bg-[#22070c]/90 p-6 shadow-2xl backdrop-blur-xl xl:block">
              <span className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-[#E6C387]">
                Live From The Salon
              </span>
              <h4 className="text-xs font-semibold text-white/90">
                Today&apos;s Active Edits
              </h4>
              <div className="mt-3 space-y-1.5 text-[11px] text-white/50">
                <div>• Silk Press & Braids</div>
                <div>• Parisian Chignons</div>
                <div>• Luxury Moroccan Bath</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrganicLuxuryHero;
