import { Link } from "react-router-dom";
import ActionLink from "../ui/ActionLink";
import { heroImage, salonInfo } from "../../data/siteData";

function Hero() {
  return (
    <div className="w-full min-h-screen bg-[#ecdcd3]/40 p-4 md:p-8 flex items-center justify-center font-sans antialiased">
      <section className="luxury-line-bg relative w-full max-w-[1440px] overflow-hidden rounded-[2.5rem] p-8 text-white shadow-[0_30px_70px_rgba(0,0,0,0.4)] md:p-12 lg:p-16">
        <div className="absolute left-[-5%] top-[-10%] h-80 w-80 pointer-events-none opacity-[0.04]">
          <img
            src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&q=80&w=600"
            className="h-full w-full object-contain grayscale invert"
            alt=""
            aria-hidden="true"
          />
        </div>

        <div className="absolute left-[26%] top-[8%] z-20 h-24 w-24 pointer-events-none mix-blend-screen opacity-75 md:h-28 md:w-28">
          <img
            src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&q=80&w=400"
            alt="Orchid Visual"
            className="h-full w-full object-contain brightness-125 contrast-125"
          />
        </div>

        <div className="absolute bottom-[28%] left-[40%] z-20 h-24 w-24 pointer-events-none mix-blend-screen opacity-80">
          <img
            src="https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=300"
            alt="Quartz Crystal"
            className="h-full w-full object-contain"
          />
        </div>

        <div className="absolute bottom-[30%] left-[2%] z-20 hidden h-24 w-24 -rotate-45 pointer-events-none mix-blend-screen opacity-60 xl:block">
          <img
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=200"
            alt="Luxury gold tool accent"
            className="h-full w-full object-contain brightness-110"
          />
        </div>

        <div className="absolute bottom-[-2%] right-[2%] z-30 h-48 w-48 pointer-events-none translate-x-4 translate-y-6 mix-blend-screen md:h-56 md:w-56">
          <img
            src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400"
            alt="Floating Pearl Necklace"
            className="h-full w-full object-contain"
          />
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none mix-blend-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-[0.03]" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-6">
            <div>
              <span className="rounded-full border border-[#d6b580]/30 bg-[#d6b580]/5 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d6b580] md:text-xs">
                Dubai Beauty Atelier
              </span>
            </div>

            <h1 className="max-w-2xl font-serif text-4xl leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl">
              Beauty care with <br />
              a <span className="pr-2 font-normal italic font-serif text-[#d6b580]">
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

            <div className="flex flex-wrap gap-4 pt-2 text-[0.68rem] uppercase tracking-[0.24em] text-[#d6b580]/80">
              <Link to="/" className="border-b border-[#d6b580]/40 pb-1 text-[#d6b580]">
                Home
              </Link>
              <Link to="/services" className="transition hover:text-white">
                Services
              </Link>
              <Link to="/booking" className="transition hover:text-white">
                Booking
              </Link>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 lg:col-span-6">
            <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#2d1115]/80 p-4 shadow-2xl backdrop-blur-sm">
              <div className="aspect-[16/11] w-full overflow-hidden rounded-[1.5rem]">
                <img
                  src={heroImage.src}
                  alt={heroImage.alt}
                  className="h-full w-full object-cover"
                  fetchPriority="high"
                />
              </div>

              <div className="absolute right-[-15px] top-12 hidden h-20 w-8 rotate-[15deg] pointer-events-none opacity-90 md:block">
                <img
                  src="https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&q=80&w=150"
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain mix-blend-screen"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2 rounded-2xl border border-white/5 bg-[#240a0e] p-5">
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-[#d6b580]">
                  Concierge
                </span>
                <h4 className="text-base font-semibold text-white">Easy WhatsApp</h4>
                <p className="text-xs leading-relaxed text-white/50">
                  {salonInfo.name} brings premium hair, nails, makeup, and bridal
                  care in one polished salon experience.
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-white/5 bg-[#240a0e] p-5">
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-[#d6b580]">
                  Today&apos;s Edit
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-white/5 pb-1">
                    <span className="text-white/80">Braids</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-1">
                    <span className="text-white/80">Manicures</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Chignons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-8 hidden text-xl text-white/20 lg:block">
          ✦
        </div>
      </section>
    </div>
  );
}

export default Hero;
