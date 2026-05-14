import ActionLink from "../components/ui/ActionLink";
import PageShell from "../components/common/PageShell";
import InfoCard from "../components/ui/InfoCard";
import SectionGrid from "../components/common/SectionGrid";
import { servicesData } from "../data/servicesData";

function ManageServices() {
  return (
    <PageShell
      eyebrow="Admin"
      title="Manage Services"
      description="Review the services currently visible to clients and keep pricing aligned across the frontend."
    >
      <div className="mb-8">
        <ActionLink to="/admin" variant="secondary">
          Back to Dashboard
        </ActionLink>
      </div>

      <SectionGrid columns="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {servicesData.map((service) => (
          <InfoCard
            key={service.name}
            title={service.name}
            description={service.description}
            badge={service.price}
            className="h-full"
          >
            <div className="space-y-2 text-gray-600">
              <p>Availability: Visible on website</p>
              <p>Booking Source: Website + WhatsApp</p>
              <p>Duration: {service.duration}</p>
            </div>
          </InfoCard>
        ))}
      </SectionGrid>
    </PageShell>
  );
}

export default ManageServices;
