import PageShell from "../components/common/PageShell";
import ActionLink from "../components/ui/ActionLink";
import { galleryImages } from "../data/siteData";
import image1 from "../../images/image1.jpg";

const featuredLook =
  galleryImages.find((item) => item.title === "Protective Styles") ??
  galleryImages[0];

const collectionDefinitions = [
  {
    title: "Protective Styling",
    description:
      "Neat, wearable styles with cleaner parting, lighter installs, and a finish that still feels polished after the first day.",
    itemTitles: ["Protective Styles", "Wig Installs", "Loc Styling"],
  },
  {
    title: "Healthy Hair & Finish",
    description:
      "Texture-led appointments that focus on softness, shine, scalp care, and movement rather than a busy visual treatment.",
    itemTitles: ["Natural Hair Care", "Soft Blowouts", "Scalp Rituals"],
  },
  {
    title: "Occasion Beauty",
    description:
      "Beauty looks designed for bridal mornings, dinner glam, and elevated finishing details that read beautifully in person.",
    itemTitles: ["Bridal Looks", "Soft Glam Beauty", "Nail Finishes"],
  },
];

const galleryCollections = collectionDefinitions.map((collection) => ({
  ...collection,
  items: collection.itemTitles
    .map((title) => galleryImages.find((item) => item.title === title))
    .filter(Boolean),
}));

const totalLooks = galleryCollections.reduce(
  (total, collection) => total + collection.items.length,
  0,
);

function SupportingLook({ item }) {
  return (
    <article className="border-t border-rose-100 pt-4">
      <div className="grid gap-4 sm:grid-cols-[165px_1fr] sm:items-start">
        <div className="overflow-hidden rounded-[1.35rem] bg-rose-50">
          <img
            src={item.image}
            alt={item.alt}
            loading="lazy"
            className="aspect-[4/4.2] h-full w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
            {item.category}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-salon-strong">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-salon-copy">{item.caption}</p>
        </div>
      </div>
    </article>
  );
}

function GalleryCollection({ collection, index }) {
  const leadItem = collection.items[0];
  const supportingItems = collection.items.slice(1);
  const isReversed = index % 2 === 1;

  return (
    <section className="grid gap-8 border-t border-rose-100 pt-9 lg:grid-cols-[240px_1fr]">
      <div>
        <p className="eyebrow-label">{collection.title}</p>
        <p className="mt-4 text-sm leading-7 text-salon-copy">
          {collection.description}
        </p>
        <div className="mt-6 border-l-2 border-rose-200 pl-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
            {collection.items.length} curated looks
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {leadItem ? (
          <article className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className={isReversed ? "lg:order-2" : ""}>
              <div className="overflow-hidden rounded-[1.85rem] bg-rose-50">
                <img
                  src={leadItem.image}
                  alt={leadItem.alt}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition duration-700 hover:scale-[1.04]"
                />
              </div>
            </div>

            <div className={isReversed ? "lg:order-1" : ""}>
              <div className="border-t-2 border-rose-500 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
                  Lead look
                </p>
                <h2 className="mt-3 text-4xl font-semibold text-salon-strong sm:text-[2.8rem]">
                  {leadItem.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-salon-copy">
                  {leadItem.caption}
                </p>
              </div>

              <div className="mt-6 grid gap-4 border-t border-rose-100 pt-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-salon-muted">
                    Category
                  </p>
                  <p className="mt-2 text-lg font-semibold text-salon-strong">
                    {leadItem.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-salon-muted">
                    Visual direction
                  </p>
                  <p className="mt-2 text-sm leading-7 text-salon-copy">
                    Clean framing, calmer spacing, and a portfolio structure
                    that lets the finished work do most of the talking.
                  </p>
                </div>
              </div>
            </div>
          </article>
        ) : null}

        {supportingItems.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {supportingItems.map((item) => (
              <SupportingLook key={item.title} item={item} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <PageShell
      eyebrow="Gallery"

      actions={
        <>
          <ActionLink to="/booking">Book a Look</ActionLink>
          <ActionLink to="/services" variant="secondary">
            See Services
          </ActionLink>
        </>
      }
    >
     <div className="grid gap-8 border-b border-rose-100 pb-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div>
{/*           <div className="flex items-center gap-4"> */}
{/*             <span className="h-px w-12 bg-rose-300" /> */}
{/*             <p className="eyebrow-label">Portfolio Edit</p> */}
{/*           </div> */}

          <div className="mt-6 overflow-hidden rounded-[1.7rem] bg-rose-50">
            <img
              src={image1}
              alt="Salon gallery preview"
              loading="eager"
              className="aspect-[16/11] w-full object-cover"
            />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="border-t border-rose-100 pt-4">
              <p className="text-3xl font-semibold text-salon-strong">{totalLooks}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-salon-muted">
                Portfolio looks
              </p>
            </div>

            {galleryCollections.slice(0, 2).map((collection) => (
              <div key={collection.title} className="border-t border-rose-100 pt-4">
                <p className="text-3xl font-semibold text-salon-strong">
                  {collection.items.length}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-salon-muted">
                  {collection.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="overflow-hidden rounded-[1.9rem] bg-rose-50">
            <img
              src={featuredLook.image}
              alt={featuredLook.alt}
              loading="eager"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>

          <div className="grid gap-4 border-t border-rose-100 pt-4 sm:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
                Featured Look
              </p>
              <p className="mt-2 text-2xl font-semibold text-salon-strong">
                {featuredLook.title}
              </p>
            </div>
            <p className="text-sm leading-7 text-salon-copy">
              {featuredLook.caption}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-14">
        {galleryCollections.map((collection, index) => (
          <GalleryCollection
            key={collection.title}
            collection={collection}
            index={index}
          />
        ))}
      </div>
    </PageShell>
  );
}

export default Gallery;
