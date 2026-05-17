import { Link } from "react-router-dom";
import ActionLink from "../ui/ActionLink";
import { heroImage, salonInfo } from "../../data/siteData";

function Hero() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#ecdcd3]/40 p-4 font-sans antialiased md:p-8">
      <section className="luxury-line-bg relative w-full max-w-[1440px] overflow-hidden rounded-[2.5rem] bg-[#1a0508] p-8 text-white shadow-[0_30px_70px_rgba(0,0,0,0.5)] md:p-12 lg:p-16">
        <div
          className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M50 0 L100 50 L50 100 L0 50 Z\' fill=\'none\' stroke=\'%23ffffff\' stroke-width=\'0.5\'/%3E%3C/svg%3E")',
            backgroundSize: "140px 140px",
          }}
        />

        <div className="pointer-events-none absolute left-[20%] top-[-20%] z-0 h-[400px] w-[400px] rounded-full bg-[#d6b580]/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-[-10%] right-[10%] z-0 h-[350px] w-[350px] rounded-full bg-[#d6b580]/5 blur-[90px]" />

        <div className="pointer-events-none absolute left-[28%] top-[12%] z-0 text-2xl font-serif text-[#d6b580]/30 animate-pulse">
          ✦
        </div>
        <div className="pointer-events-none absolute left-[45%] bottom-[35%] z-0 text-xl font-serif text-[#d6b580]/20 animate-bounce">
          ✦
        </div>

        <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-6 lg:col-span-6">
            <div>
              <span className="rounded-full border border-[#d6b580]/30 bg-[#d6b580]/5 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d6b580] md:text-xs">
                Dubai Beauty Atelier
              </span>
            </div>

            <h1 className="font-serif text-4xl leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl">
              Beauty care with <br />
              a <span className="font-normal italic text-[#d6b580]">
                sharper finish
              </span>{" "}
              <br />
              and a calmer experience.
            </h1>

            <p className="max-w-lg text-sm font-light leading-relaxed text-white/60 md:text-base">
              {salonInfo.name} brings premium hair, nails, makeup, and bridal
              care together in one polished salon experience built around clear
              booking, intentional service choices, and a refined finish.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <ActionLink
                to="/booking"
                className="bg-[#d6b580] px-7 py-3 text-sm font-medium uppercase tracking-wide text-[#1a0508] shadow-lg transition duration-300 hover:bg-white"
              >
                Book Appointment
              </ActionLink>
              <ActionLink
                to="/services"
                variant="subtle"
                className="border-white/10 bg-white/5 px-7 py-3 text-sm font-medium uppercase tracking-wide text-white transition duration-300 hover:bg-white/10"
              >
                Explore Catalogue
              </ActionLink>
            </div>

            <nav className="flex gap-6 border-t border-white/5 pt-6 text-[11px] uppercase tracking-[0.2em] text-white/40">
              <Link to="/" className="pb-1 text-[#d6b580] transition hover:text-white">
                Home
              </Link>
              <Link to="/services" className="transition hover:text-white">
                Services
              </Link>
              <Link to="/booking" className="transition hover:text-white">
                Booking
              </Link>
            </nav>
          </div>

          <div className="flex w-full flex-col gap-6 lg:col-span-6">
            <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#240a0e]/90 p-4 shadow-2xl backdrop-blur-sm">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-[1.5rem]">
                <img
                  src={heroImage.src}
                  alt={heroImage.alt}
                  className="h-full w-full object-cover"
                  fetchPriority="high"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2 rounded-2xl border border-white/5 bg-[#240a0e]/50 p-5">
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-[#d6b580]">
                  Concierge
                </span>
                <h4 className="text-sm font-semibold text-white">
                  Easy WhatsApp
                </h4>
                <p className="text-xs leading-relaxed text-white/50">
                  {salonInfo.name} brings premium hair, nails, makeup, and bridal
                  care in one polished salon experience.
                </p>
              </div>

              <div className="flex flex-col justify-between space-y-2 rounded-2xl border border-white/5 bg-[#240a0e]/50 p-5">
                <div>
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-[#d6b580]">
                    Today&apos;s Edit
                  </span>
                  <div className="space-y-2 text-xs text-white/70">
                    <div className="border-b border-white/5 pb-1">| Braids</div>
                    <div className="border-b border-white/5 pb-1">| Manicures</div>
                    <div>| Chignons</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-8 hidden text-xl text-white/10 lg:block">
          ✦
        </div>
      </section>
    </div>
  );
}

export default Hero;
