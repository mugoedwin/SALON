import ActionLink from "../../components/ui/ActionLink";
import PageShell from "../../components/common/PageShell";
import InfoCard from "../../components/ui/InfoCard";
import SectionGrid from "../../components/common/SectionGrid";
import { servicesData } from "../../data/servicesData";
import { upcomingBooking } from "../../data/mockData";
import { salonInfo } from "../../data/siteData";
import { useSalonServices } from "../../hooks/useSalonServices";

const fallbackServices = servicesData;

function UserDashboard() {
  const { services } = useSalonServices({
    visibleOnly: true,
    fallbackServices,
    fallbackImage: servicesData[0]?.image ?? "",
  });

  return (
    <PageShell
      eyebrow="Dashboard"
      title="User Dashboard"
      description="View your next appointment, jump back into booking, and stay connected with the salon team."
    >
      <SectionGrid columns="three">
        <InfoCard title="Next Appointment" badge={upcomingBooking.status}>
          <div className="space-y-2 text-gray-600">
            <p className="font-semibold text-gray-900">{upcomingBooking.service}</p>
            <p>{upcomingBooking.price}</p>
            <p>{upcomingBooking.duration}</p>
            <p>{upcomingBooking.date}</p>
            <p>{upcomingBooking.time}</p>
          </div>
        </InfoCard>

        <InfoCard title="Quick Actions">
          <div className="flex flex-col gap-3">
            <ActionLink to="/booking">Book Another Visit</ActionLink>
            <ActionLink to="/dashboard/history" variant="secondary">
              View History
            </ActionLink>
          </div>
        </InfoCard>

        <InfoCard
          title="Need Assistance?"
          description="Contact the salon quickly if you need to adjust your plans or ask about service preparation."
          footer={
            <div className="flex flex-col gap-3">
              <ActionLink href={salonInfo.whatsappHref}>Chat on WhatsApp</ActionLink>
              <ActionLink href={salonInfo.phoneHref} variant="secondary">
                Call Salon
              </ActionLink>
            </div>
          }
        />
      </SectionGrid>

      <section className="mt-12 border-t border-rose-100 pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow-label">Live Services</p>
            <h2 className="mt-4 text-3xl font-semibold text-salon-strong sm:text-4xl">
              Browse the current salon menu.
            </h2>
          </div>

          <ActionLink to="/services" variant="secondary">
            View All Services
          </ActionLink>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <article
              key={service.id ?? service.title}
              className="overflow-hidden border border-rose-100 bg-white"
            >
              <div className="aspect-[4/3] bg-rose-50">
                {service.imageSrc ? (
                  <img
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
                  {service.bookingSource || "Available now"}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-salon-strong">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-salon-copy">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-rose-100 pt-4">
                  <span className="text-sm font-semibold text-rose-700">
                    {service.priceLabel}
                  </span>
                  <span className="text-sm text-salon-muted">{service.duration}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

export default UserDashboard;
