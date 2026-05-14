import ActionLink from "../../components/ui/ActionLink";
import PageShell from "../../components/common/PageShell";
import InfoCard from "../../components/ui/InfoCard";
import SectionGrid from "../../components/common/SectionGrid";
import { upcomingBooking } from "../../data/mockData";
import { salonInfo } from "../../data/siteData";

function UserDashboard() {
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
    </PageShell>
  );
}

export default UserDashboard;
