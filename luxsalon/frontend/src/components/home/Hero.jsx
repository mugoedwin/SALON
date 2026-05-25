import ActionLink from "../ui/ActionLink";
import { heroImage, salonInfo } from "../../data/siteData";

const mainHeroImageSrc =
  "https://res.cloudinary.com/dp7w9g89g/image/upload/v1715946800/salon_interior.jpg";

function FloatingMark({ className = "", children }) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>{children}</div>
  );
}

function ToolIcon({ className = "", children }) {
  return (
    <div
      className={`pointer-events-none absolute flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}

function LuxuryRadiantHero() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-[#F7F4F0] p-4 text-white antialiased selection:bg-[#E6C387]/30 font-sans sm:p-6 md:p-8 lg:p-12">
      <div
        className="relative w-full max-w-[1400px] overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#1a0508] p-8 shadow-[0_35px_80px_rgba(26,5,8,0.25)] md:p-12 lg:p-16"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 30%, #4c121c 0%, #22060a 50%, #160204 100%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 mix-blend-color-dodge opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="luxuryMatrix"
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
            <rect width="100%" height="100%" fill="url(#luxuryMatrix)" />
          </svg>
        </div>

        <div
          className="pointer-events-none absolute left-[15%] top-[-10%] z-0 h-[500px] w-[500px] rounded-full bg-[#E6C387] opacity-[0.12]"
          style={{ filter: "blur(120px)" }}
        />

        <ToolIcon className="left-[6%] top-[12%] z-0 h-12 w-12 -rotate-12 text-[#E6C387]/15 transition duration-500 hover:scale-110">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <line x1="9.8" y1="8.2" x2="21" y2="19" />
            <line x1="9.8" y1="15.8" x2="21" y2="5" />
          </svg>
        </ToolIcon>
        <ToolIcon className="bottom-[20%] left-[3%] z-0 h-14 w-14 rotate-[45deg] text-[#E6C387]/10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            aria-hidden="true"
          >
            <path d="M2 4h20v4H2zM5 8v8M9 8v8M13 8v8M17 8v8M21 8v8" />
          </svg>
        </ToolIcon>
        <ToolIcon className="bottom-[35%] left-[45%] z-0 h-10 w-10 -rotate-12 text-[#E6C387]/15">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M8 9h8v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9zM10 9V3h4v6" />
          </svg>
        </ToolIcon>

        <FloatingMark className="left-[28%] top-[22%] z-0 text-xl text-[#E6C387]/40">
          ✦
        </FloatingMark>
        <FloatingMark className="bottom-[12%] left-[35%] z-0 text-sm text-[#E6C387]/20">
          ✦
        </FloatingMark>
        <FloatingMark className="right-[48%] top-[8%] z-0 text-base text-[#E6C387]/30">
          ✦
        </FloatingMark>
        <FloatingMark className="bottom-[8%] right-[4%] z-0 text-lg text-[#E6C387]/20">
          ✦
        </FloatingMark>

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
                className="rounded-full bg-[#e62a52] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c21f42]"
              >
                Book Appointment
              </ActionLink>
              <ActionLink
                to="/services"
                variant="subtle"
                className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Explore Catalogue
              </ActionLink>
            </div>
          </div>

          <div className="w-full lg:col-span-6">
            <div className="relative w-full rounded-[2rem] border border-white/10 bg-[#240a0e]/60 p-3.5 shadow-2xl backdrop-blur-sm">
              <div className="w-full aspect-[16/10] rounded-[1.5rem] overflow-hidden">
                <img
                  src={mainHeroImageSrc}
                  alt="Ivonne Orchard Salon Luxury View"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  onError={(event) => {
                    event.currentTarget.src = heroImage.src;
                  }}
                />
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
                  <div className="border-b border-white/5 pb-1">| Manicures</div>
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
