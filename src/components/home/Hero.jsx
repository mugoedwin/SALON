import ActionLink from "../ui/ActionLink";
import { heroImage, salonInfo } from "../../data/siteData";

const mainHeroImageSrc =
  "https://res.cloudinary.com/dp7w9g89g/image/upload/v1715946800/salon_interior.jpg";

function Sparkle({ className = "", style }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={`pointer-events-none absolute ${className}`}
      style={style}
    >
      <path
        d="M12 1.5 14.9 9.1 22.5 12 14.9 14.9 12 22.5 9.1 14.9 1.5 12 9.1 9.1 12 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function OrganicLuxuryHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#160205] px-6 py-12 text-white antialiased font-sans md:px-12 lg:px-20 xl:px-24">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay">
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
        className="pointer-events-none absolute right-[8%] top-[-12%] z-0 h-[560px] w-[560px] rounded-full bg-[#E6C387] opacity-10"
        style={{ filter: "blur(120px)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[-12%] left-[-8%] z-0 h-[420px] w-[420px] rounded-full bg-[#5C1329] opacity-30"
        style={{ filter: "blur(100px)" }}
      />

      <Sparkle className="left-[18%] top-[12%] z-0 h-6 w-6 animate-pulse text-[#E6C387]/25" />
      <Sparkle
        className="left-[42%] bottom-[20%] z-0 h-5 w-5 animate-pulse text-[#E6C387]/20"
        style={{ animationDelay: "1s" }}
      />
      <Sparkle
        className="right-[10%] top-[24%] z-0 h-4 w-4 animate-pulse text-[#E6C387]/20"
        style={{ animationDelay: "1.8s" }}
      />
      <Sparkle
        className="bottom-[8%] right-[4%] z-0 h-4 w-4 animate-pulse text-[#E6C387]/20"
        style={{ animationDelay: "2.6s" }}
      />

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl items-center">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-8 lg:col-span-5">
            <div className="inline-block">
              <span className="rounded-full border border-[#E6C387]/20 bg-[#E6C387]/5 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E6C387] md:text-xs">
                Dubai Beauty Atelier
              </span>
            </div>

            <h1 className="max-w-2xl font-serif text-4xl font-light leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
              Beauty care with <br />
              a{" "}
              <span className="font-normal italic tracking-wide text-[#E6C387]">
                sharper finish
              </span>{" "}
              <br />
              and a calmer experience.
            </h1>

            <p className="max-w-xl text-sm font-light leading-relaxed tracking-wide text-white/60 md:text-base">
              {salonInfo.name} brings premium hair, nails, makeup, and bridal
              care together in one polished salon experience built around clear
              booking and intentional service choices.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <ActionLink
                to="/booking"
                className="rounded-full bg-[#E6C387] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#160205] shadow-xl transition-all duration-300 hover:bg-white"
              >
                Book Appointment
              </ActionLink>
              <ActionLink
                to="/services"
                variant="subtle"
                className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition duration-300 hover:border-white/25 hover:bg-white/10"
              >
                Explore Catalogue
              </ActionLink>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div className="relative mx-auto w-full max-w-[760px] rounded-[2.5rem] border border-white/10 bg-[#240a0e]/60 p-4 shadow-[0_40px_90px_-15px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-transform duration-500 hover:scale-[1.01]">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[1.8rem]">
                <img
                  src={mainHeroImageSrc}
                  alt="Ivonne Orchard Luxury Interior Atelier"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.src = heroImage.src;
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#160205]/45 via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-6 left-6 hidden w-64 rounded-2xl border border-white/10 bg-[#160205]/88 p-5 shadow-2xl backdrop-blur-md xl:block">
                <span className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-[#E6C387]">
                  Live From The Salon
                </span>
                <h4 className="text-xs font-semibold text-white/90">
                  Today&apos;s Active Edits
                </h4>
                <ul className="mt-2 space-y-1.5 text-[11px] text-white/60">
                  <li className="flex gap-2">
                    <span className="text-[#E6C387]">-</span>
                    <span>Silk Press &amp; Braids</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#E6C387]">-</span>
                    <span>Parisian Chignons</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#E6C387]">-</span>
                    <span>Luxury Moroccan Bath</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrganicLuxuryHero;
