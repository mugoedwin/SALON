import { useMemo, useState } from "react";
import PageShell from "../components/common/PageShell";
import ActionLink from "../components/ui/ActionLink";
import { galleryImages, staffProfiles } from "../data/siteData";

const filters = ["All", "Hair", "Braids", "Wigs", "Nails", "Makeup", "Bridal"];

function getGalleryGroup(item) {
  const text = `${item.title} ${item.category}`.toLowerCase();

  if (text.includes("braid") || text.includes("loc")) return "Braids";
  if (text.includes("wig")) return "Wigs";
  if (text.includes("nail")) return "Nails";
  if (text.includes("makeup") || text.includes("glam")) return "Makeup";
  if (text.includes("bridal") || text.includes("event")) return "Bridal";
  return "Hair";
}

function GalleryCard({ item, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group block overflow-hidden rounded-lg border border-rose-100 bg-white text-left shadow-[0_18px_44px_rgba(126,91,100,0.08)] transition duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-[0_22px_54px_rgba(126,91,100,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
    >
      <div className="overflow-hidden bg-rose-50">
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
            item.size === "tall" ? "aspect-[4/5]" : "aspect-[4/3]"
          }`}
        />
      </div>
      <div className="p-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-rose-700">
          {getGalleryGroup(item)}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-salon-strong">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-salon-copy">{item.caption}</p>
      </div>
    </button>
  );
}

function GalleryPreview({ item, onClose }) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-maroon-deep/75 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} preview`}
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-[0_28px_80px_rgba(0,0,0,0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <img
            src={item.image}
            alt={item.alt}
            className="max-h-[70vh] w-full bg-rose-50 object-cover lg:h-full"
          />
          <div className="flex flex-col justify-between p-5 sm:p-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
                {getGalleryGroup(item)}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-salon-strong">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-salon-copy">
                {item.caption}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ActionLink to="/booking">Book this Look</ActionLink>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-rose-200 bg-white px-5 py-3 text-sm font-semibold text-salon-copy transition-colors duration-300 hover:border-rose-400 hover:text-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StaffCard({ member }) {
  return (
    <article className="rounded-lg border border-rose-100 bg-white shadow-[0_18px_44px_rgba(126,91,100,0.08)]">
      <div className="aspect-[4/3] overflow-hidden rounded-t-lg bg-rose-50">
        {member.image ? (
          <img
            src={member.image}
            alt={member.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#FBF3F2]">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-rose-200 bg-white text-2xl font-semibold text-rose-700">
              {member.initials}
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-rose-700">
          {member.role}
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-salon-strong">
          {member.name}
        </h3>
        <p className="mt-3 text-sm leading-7 text-salon-copy">{member.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {member.specialties.map((specialty) => (
            <span
              key={specialty}
              className="rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedLook, setSelectedLook] = useState(null);

  const visibleImages = useMemo(() => {
    if (activeFilter === "All") return galleryImages;
    return galleryImages.filter((item) => getGalleryGroup(item) === activeFilter);
  }, [activeFilter]);

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
      <section className="grid gap-8 border-b border-rose-100 pb-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-700">
            Portfolio
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-salon-strong sm:text-5xl">
            Clean looks, real appointment inspiration.
          </h2>
          <p className="mt-5 text-base leading-8 text-salon-copy">
            Use this page to choose the finish you want, compare categories, and
            book with a clearer idea of your preferred style.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-rose-100 bg-white p-5">
            <p className="text-3xl font-semibold text-salon-strong">
              {galleryImages.length}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-salon-muted">
              Looks
            </p>
          </div>
          <div className="rounded-lg border border-rose-100 bg-white p-5">
            <p className="text-3xl font-semibold text-salon-strong">
              {filters.length - 1}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-salon-muted">
              Categories
            </p>
          </div>
          <div className="rounded-lg border border-rose-100 bg-white p-5">
            <p className="text-3xl font-semibold text-salon-strong">
              {staffProfiles.length}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-salon-muted">
              Staff
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 ${
                activeFilter === filter
                  ? "border-rose-600 bg-rose-600 text-white"
                  : "border-rose-100 bg-white text-salon-copy hover:border-rose-300 hover:text-rose-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-6 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {visibleImages.map((item) => (
            <div key={item.title} className="mb-5 break-inside-avoid">
              <GalleryCard item={item} onSelect={setSelectedLook} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-rose-100 pt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-700">
              Meet the Team
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-salon-strong">
              Six specialists behind the chair.
            </h2>
            <p className="mt-4 text-base leading-8 text-salon-copy">
              These profiles are ready for real staff photos and updated bios
              when you share them.
            </p>
          </div>
          <ActionLink to="/booking" variant="secondary">
            Book with Us
          </ActionLink>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {staffProfiles.map((member) => (
            <StaffCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      <GalleryPreview item={selectedLook} onClose={() => setSelectedLook(null)} />
    </PageShell>
  );
}

export default Gallery;
