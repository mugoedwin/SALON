import { useEffect, useState } from "react";
import PageShell from "../components/common/PageShell";
import ActionLink from "../components/ui/ActionLink";
import { galleryImages, salonInteriorImages, staffProfiles } from "../data/siteData";

const salonMediaItems = [
  {
    type: "video",
    title: "Salon Video Tour",
    caption: "A quick motion preview of the salon experience before the photos.",
    src: "/videos/salon-tour.mp4",
  },
  ...salonInteriorImages.map((image) => ({
    type: "image",
    ...image,
  })),
];

function getBookingUrl(item) {
  return `/booking?style=${encodeURIComponent(item.title)}`;
}

function GalleryCard({ item, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group block w-full overflow-hidden rounded-lg border border-rose-100 bg-white text-left shadow-[0_14px_34px_rgba(74,14,23,0.08)] transition duration-500 hover:-translate-y-1 hover:border-rose-200 hover:shadow-[0_24px_58px_rgba(74,14,23,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
    >
      <div className="overflow-hidden bg-rose-50">
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover opacity-95 saturate-[0.92] transition duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:saturate-100"
        />
      </div>
      <div className="border-t border-rose-100 bg-[#fff9f8] p-5">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-rose-700">
          {item.group}
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-salon-strong">
          {item.title}
        </h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-[#6f4b55]">
          {item.category}
        </p>
        <p className="mt-3 text-sm font-medium leading-7 text-[#765762]">
          {item.caption}
        </p>
      </div>
    </button>
  );
}

function RelatedLooks({ item, items, onSelect }) {
  const related = items
    .filter((candidate) => candidate.title !== item.title)
    .sort((a, b) => {
      if (a.group === item.group && b.group !== item.group) return -1;
      if (a.group !== item.group && b.group === item.group) return 1;
      return 0;
    })
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-7 border-t border-rose-100 pt-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
        Related looks
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {related.map((look) => (
          <button
            key={look.title}
            type="button"
            onClick={() => onSelect(look)}
            className="group overflow-hidden rounded-lg border border-rose-100 bg-white text-left transition hover:border-rose-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
          >
            <img
              src={look.image}
              alt={look.alt}
              className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="p-3">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-rose-700">
                {look.group}
              </p>
              <p className="mt-1 text-sm font-semibold text-salon-strong">
                {look.title}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function GalleryPreview({ items, selectedIndex, onClose, onMove, onSelect }) {
  const item = selectedIndex === null ? null : items[selectedIndex];

  useEffect(() => {
    if (!item) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onMove(-1);
      if (event.key === "ArrowRight") onMove(1);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose, onMove]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-maroon-deep/88 px-3 py-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} preview`}
      onClick={onClose}
    >
      <div
        className="relative grid max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-lg bg-white shadow-[0_28px_90px_rgba(0,0,0,0.34)] lg:grid-cols-[1.35fr_0.65fr]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-maroon-deep shadow-[0_10px_28px_rgba(0,0,0,0.18)] transition hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
          aria-label="Close preview"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>

        <div className="relative min-h-[52vh] bg-maroon-deep lg:min-h-[78vh]">
          <img
            src={item.image}
            alt={item.alt}
            className="h-full max-h-[78vh] w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onMove(-1)}
            className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-maroon-deep shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
            aria-label="Previous gallery image"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-maroon-deep shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
            aria-label="Next gallery image"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col justify-between p-5 sm:p-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
              {item.group}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-salon-strong sm:text-4xl">
              {item.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-salon-copy">
              {item.caption}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ActionLink to={getBookingUrl(item)}>Book this Look</ActionLink>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-salon-muted">
              {selectedIndex + 1} / {items.length}
            </p>
          </div>

          <RelatedLooks item={item} items={galleryImages} onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
}

function InteriorCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = salonMediaItems[activeIndex];

  useEffect(() => {
    if (activeMedia.type === "video") {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % salonMediaItems.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [activeMedia.type]);

  function moveSlide(direction) {
    setActiveIndex((current) => {
      const next = current + direction;
      if (next < 0) return salonMediaItems.length - 1;
      if (next >= salonMediaItems.length) return 0;
      return next;
    });
  }

  return (
    <section className="mt-16 border-t border-rose-100 pt-10">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-700">
            Salon Space
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-salon-strong">
            Step inside before you book.
          </h2>
          <p className="mt-4 text-base leading-8 text-salon-copy">
            A quick look at the interior, seating, mirrors, and treatment areas
            clients see when they arrive.
          </p>
        </div>
        <div className="flex gap-3 lg:justify-end">
          <button
            type="button"
            onClick={() => moveSlide(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-rose-100 bg-white text-maroon-deep transition hover:border-rose-300 hover:text-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
            aria-label="Previous salon interior image"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => moveSlide(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-rose-100 bg-white text-maroon-deep transition hover:border-rose-300 hover:text-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
            aria-label="Next salon interior image"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-7 overflow-hidden rounded-lg bg-maroon-deep shadow-[0_24px_64px_rgba(74,14,23,0.18)]">
        <div className="relative">
          {activeMedia.type === "video" ? (
            <video
              key={activeMedia.src}
              src={activeMedia.src}
              className="h-[18rem] w-full bg-black object-cover sm:h-[24rem] lg:h-[28rem]"
              controls
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              key={activeMedia.image}
              src={activeMedia.image}
              alt={activeMedia.alt}
              className="gallery-carousel-image h-[18rem] w-full object-cover sm:h-[24rem] lg:h-[28rem]"
            />
          )}
          {activeMedia.type === "image" ? (
            <div className="pointer-events-none absolute inset-0 gallery-carousel-shine" />
          ) : null}
          {activeMedia.type === "video" ? (
            <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/62 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
              Video 1 / {salonMediaItems.length}
            </div>
          ) : (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-deep via-maroon-deep/68 to-transparent p-5 pt-24 text-white sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-light">
                {activeIndex + 1} / {salonMediaItems.length}
              </p>
              <h3 className="mt-2 text-3xl font-semibold text-white">
                {activeMedia.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/84">
                {activeMedia.caption}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
        {salonMediaItems.map((media, index) => (
          <button
            key={media.src || media.image}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative h-16 overflow-hidden rounded-lg border transition duration-300 sm:h-[4.5rem] ${
              activeIndex === index
                ? "border-rose-600 opacity-100 shadow-[0_10px_24px_rgba(74,14,23,0.14)]"
                : "border-rose-100 opacity-70 hover:opacity-100"
            }`}
            aria-label={`Show ${media.title}`}
          >
            {media.type === "video" ? (
              <>
                <video
                  src={media.src}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full bg-black object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </>
            ) : (
              <img
                src={media.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 h-px overflow-hidden bg-rose-100">
        {activeMedia.type === "image" ? (
          <div key={activeIndex} className="gallery-carousel-progress h-full bg-rose-600" />
        ) : null}
      </div>
    </section>
  );
}

function StaffSection() {
  return (
    <section className="mt-16 border-t border-rose-100 pt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-700">
            The Team
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-salon-strong">
            Four specialists behind the finish.
          </h2>
          <p className="mt-4 text-base font-medium leading-8 text-[#6f4b55]">
            Hair, braids, wigs, nails, and client care handled by a focused
            salon team.
          </p>
        </div>
        <ActionLink to="/booking" variant="secondary">
          Book with Us
        </ActionLink>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {staffProfiles.slice(0, 4).map((member) => (
          <article
            key={member.name}
            className="group overflow-hidden rounded-lg border border-rose-100 bg-white shadow-[0_16px_38px_rgba(74,14,23,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(74,14,23,0.14)]"
          >
            <div className="aspect-[4/5] overflow-hidden bg-rose-50">
              <img
                src={member.image}
                alt={member.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-rose-700">
                {member.role}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-salon-strong">
                {member.name}
              </h3>
              <p className="mt-3 text-sm font-medium leading-7 text-[#6f4b55]">
                {member.bio}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function GalleryClosing() {
  return (
    <section className="mt-20 pb-8">
      <div className="relative overflow-hidden rounded-lg border border-rose-100 bg-[#fff9f8] px-5 py-10 shadow-[0_18px_52px_rgba(74,14,23,0.08)] sm:px-8 sm:py-12">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold-muted/70 to-transparent" />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-700">
            Ready when you are
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-salon-strong sm:text-5xl">
            Bring the reference. We will refine the finish.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-8 text-[#6f4b55]">
            Choose the mood, share your inspiration, and book a session planned
            around your timing, hair, skin, and occasion.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ActionLink to="/booking">Reserve a Session</ActionLink>
            <ActionLink to="/services" variant="secondary">
              Explore Services
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  function handleSelect(item) {
    setSelectedIndex(galleryImages.findIndex((image) => image.title === item.title));
  }

  function movePreview(direction) {
    setSelectedIndex((current) => {
      if (current === null) return current;
      const next = current + direction;
      if (next < 0) return galleryImages.length - 1;
      if (next >= galleryImages.length) return 0;
      return next;
    });
  }

  return (
    <PageShell
      eyebrow="Gallery"
      title="Our Work"
      description="Browse finished looks across hair, braids, wigs, nails, makeup, and bridal styling. Tap any photo to view the look in more detail."
      actions={
        <>
          <ActionLink to="/booking">Book a Look</ActionLink>
          <ActionLink to="/services" variant="secondary">
            See Services
          </ActionLink>
        </>
      }
    >
      <section>
        <div className="grid gap-7 border-b border-rose-100 pb-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-700">
              Portfolio
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-salon-strong">
              Choose by finish, not by noise.
            </h2>
          </div>
          <p className="max-w-3xl text-base font-medium leading-8 text-[#6f4b55]">
            A calmer gallery organized as a complete visual portfolio. Open any
            look to browse related options from the same mood before booking.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((item) => (
            <GalleryCard key={item.title} item={item} onSelect={handleSelect} />
          ))}
        </div>
      </section>

      <InteriorCarousel />

      <StaffSection />

      <GalleryClosing />

      <GalleryPreview
        items={galleryImages}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onMove={movePreview}
        onSelect={handleSelect}
      />
    </PageShell>
  );
}

export default Gallery;
