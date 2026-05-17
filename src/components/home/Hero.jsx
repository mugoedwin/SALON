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

function LuxuryRadiantHero() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-[#110204] p-4 text-white antialiased font-sans md:p-8 lg:p-12">
      <div
        className="relative w-full max-w-[1400px] overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#1a0508] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.6)] md:p-12 lg:p-16"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, #4a1521 0%, #26070e 45%, #1a0508 100%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 mix-blend-color-dodge opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="velocityGrid"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M50 0 L100 50 L50 100 L0 50 Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#velocityGrid)" />
          </svg>
        </div>

        <div
          className="pointer-events-none absolute left-[20%] top-[-10%] z-0 h-[450px] w-[450px] rounded-full bg-[#E6C387] opacity-10"
          style={{ filter: "blur(100px)" }}
        />

        <Sparkle className="left-[28%] top-[22%] z-0 h-5 w-5 animate-pulse text-[#E6C387]/40" />
        <Sparkle
          className="bottom-[30%] left-[45%] z-0 h-3 w-3 animate-pulse text-[#E6C387]/20"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-7 text-left lg:col-span-6">
            <div>
              <span className="rounded-full border border-[#E6C387]/30 bg-[#E6C387]/5 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E6C387] backdrop-blur-sm md:text-xs">
                Dubai Beauty Atelier
              </span>
            </div>

            <h1 className="font-serif text-4xl font-normal leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl">
              Beauty care with <br />
              a{" "}
              <span className="font-normal italic tracking-wide text-[#E6C387]">
                sharper finish
              </span>{" "}
              <br />
              and a calmer experience.
            </h1>

            <p className="max-w-lg text-sm font-light leading-relaxed tracking-wide text-white/60 md:text-base">
              {salonInfo.name} brings premium hair, nails, makeup, and bridal
              care together in one polished salon experience built around clear
              booking, intentional service choices, and a refined finish.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <ActionLink
                to="/booking"
                className="rounded-full bg-[#e62a52] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition duration-300 hover:bg-[#c21f42]"
              >
                Book Appointment
              </ActionLink>
              <ActionLink
                to="/services"
                variant="subtle"
                className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition duration-300 hover:bg-white/10"
              >
                Explore Catalogue
              </ActionLink>
            </div>
          </div>

          <div className="w-full lg:col-span-6">
            <div className="relative w-full rounded-[2rem] border border-white/10 bg-[#240a0e]/60 p-3.5 shadow-2xl backdrop-blur-sm">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem]">
                <img
                  src={mainHeroImageSrc}
                  alt="Ivonne Orchard Salon Luxury View"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  onError={(event) => {
                    event.currentTarget.src = heroImage.src;
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#110204]/35 via-transparent to-transparent" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/5 bg-[#240a0e]/40 p-5 backdrop-blur-sm">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-[#E6C387]">
                  Concierge
                </span>
                <h4 className="text-sm font-semibold text-white">Easy WhatsApp</h4>
                <p className="text-xs leading-relaxed text-white/50">
                  {salonInfo.name} brings premium hair, nails, makeup, and
                  bridal care in one polished salon experience.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-[#240a0e]/40 p-5 backdrop-blur-sm">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-[#E6C387]">
                  Today&apos;s Edit
                </span>
                <div className="space-y-1.5 text-xs text-white/70">
                  <div className="border-b border-white/5 pb-1">| Braids</div>
                  <div className="border-b border-white/5 pb-1">
                    | Manicures
                  </div>
                  <div>| Chignons</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LuxuryRadiantHero;
