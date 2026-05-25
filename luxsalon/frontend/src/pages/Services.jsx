import { useNavigate } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import ActionLink from "../components/ui/ActionLink";
import ClientServiceList from "../components/services/ClientServiceList";
import { servicesData } from "../data/servicesData";
import { useSalonServices } from "../hooks/useSalonServices";
import { salonInfo, servicePromises } from "../data/siteData";

function Services() {
  const navigate = useNavigate();
  const { services: liveServices } = useSalonServices({
    visibleOnly: true,
    fallbackServices: servicesData,
    fallbackImage: servicesData[0]?.image ?? "",
  });

  function handleBookNow(service) {
    navigate(`/booking?service=${encodeURIComponent(service.title)}`);
  }

  return (
    <PageShell
      eyebrow="Services"
      title="Take a glimpse of our services"
      description="Browse the live salon menu, check the details, and jump straight into booking with the service already selected."
      actions={
        <>
          <ActionLink to="/booking">Book a Service</ActionLink>
          <ActionLink to="/contact" variant="secondary">
            Ask a Question
          </ActionLink>
        </>
      }
    >
      <div className="grid gap-8 border-y border-rose-100 py-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow-label">What Stays True</p>
          <h2 className="mt-4 text-3xl font-semibold text-salon-strong sm:text-4xl">
            Clear pricing, cleaner structure, and better service detail.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {servicePromises.map((promise) => (
            <div key={promise} className="border-l-2 border-rose-200 pl-4">
              <p className="text-sm leading-7 text-salon-copy">{promise}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow-label">Live Menu</p>
            <h2 className="mt-4 text-4xl font-semibold text-salon-strong">
              Services clients can book right now.
            </h2>
          </div>

          <ActionLink href={salonInfo.whatsappHref} variant="secondary">
            WhatsApp Booking
          </ActionLink>
        </div>

        <div className="mt-8">
          <ClientServiceList services={liveServices} onBookNow={handleBookNow} />
        </div>
      </section>
    </PageShell>
  );
}

export default Services;
