import ActionLink from "../../components/ui/ActionLink";
import PageShell from "../../components/common/PageShell";
import InfoCard from "../../components/ui/InfoCard";
import SectionGrid from "../../components/common/SectionGrid";
import { bookingHistoryItems } from "../../data/mockData";

function BookingHistory() {
  return (
    <PageShell
      eyebrow="Dashboard"
      title="Booking History"
      description="Review the appointments you have already completed and use them to rebook quickly."
    >
      <div className="mb-8">
        <ActionLink to="/booking">Book New Appointment</ActionLink>
      </div>

      <SectionGrid columns="two">
        {bookingHistoryItems.map((booking) => (
          <InfoCard key={`${booking.service}-${booking.date}`} badge={booking.status}>
            <div className="space-y-2 text-gray-600">
              <p className="text-xl font-bold text-gray-900">{booking.service}</p>
              <p>{booking.price}</p>
              <p>{booking.duration}</p>
              <p>{booking.date}</p>
              <p>{booking.time}</p>
            </div>
          </InfoCard>
        ))}
      </SectionGrid>
    </PageShell>
  );
}

export default BookingHistory;
