import { useEffect, useMemo, useState } from "react";
import { doc, limit, onSnapshot, orderBy, query, updateDoc, collection } from "firebase/firestore";
import ActionLink from "../components/ui/ActionLink";
import PageShell from "../components/common/PageShell";
import InfoCard from "../components/ui/InfoCard";
import SectionGrid from "../components/common/SectionGrid";
import { db } from "../firebase";

const statusOptions = ["Pending", "Confirmed", "Completed", "Cancelled"];

function normalizeBooking(raw) {
  if (!raw) {
    return null;
  }

  return {
    id: raw.id,
    name: raw.name ?? "Unknown",
    phone: raw.phone ?? "",
    email: raw.email ?? "",
    userId: raw.userId ?? "",
    service: raw.service ?? "Service",
    date: raw.date ?? "",
    time: raw.time ?? "",
    notes: raw.notes ?? "",
    status: raw.status ?? "Pending",
    price: raw.price ?? "",
    duration: raw.duration ?? "",
  };
}

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateError, setUpdateError] = useState("");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const bookingsQuery = query(
      collection(db, "bookings"),
      orderBy("createdAt", "desc"),
      limit(60),
    );

    const unsubscribe = onSnapshot(
      bookingsQuery,
      (snapshot) => {
        setBookings(
          snapshot.docs
            .map((docSnap) => normalizeBooking({ id: docSnap.id, ...docSnap.data() }))
            .filter(Boolean),
        );
        setIsLoading(false);
      },
      (error) => {
        console.error("Failed to load bookings", error);
        setLoadError("Could not load bookings. Check Firestore rules.");
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const sortedBookings = useMemo(() => {
    // `createdAt` is a Firestore Timestamp and not used in UI yet; keep snapshot order.
    return bookings;
  }, [bookings]);

  async function setBookingStatus(bookingId, nextStatus) {
    setUpdateError("");
    try {
      await updateDoc(doc(db, "bookings", bookingId), { status: nextStatus });
    } catch (error) {
      console.error("Failed to update booking status", error);
      setUpdateError("Could not update booking status. Check Firestore rules.");
    }
  }

  return (
    <PageShell
      eyebrow="Admin"
      title="Manage Bookings"
      description="Review appointment requests, status updates, and the core details needed for salon follow-up."
    >
      <div className="mb-8">
        <ActionLink to="/admin">Back to Dashboard</ActionLink>
      </div>

      {updateError ? (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {updateError}
        </div>
      ) : null}

      {loadError ? (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {loadError}
        </div>
      ) : null}

      <SectionGrid columns="two">
        {isLoading ? (
          <InfoCard title="Loading bookings..." badge="Syncing" />
        ) : null}

        {!isLoading && sortedBookings.length === 0 ? (
          <InfoCard
            title="No bookings yet"
            description="Once a client books from the website, you will see their details here in real time."
            badge="Empty"
          />
        ) : null}

        {sortedBookings.map((booking) => (
          <InfoCard
            key={booking.id}
            title={booking.name}
            badge={booking.status}
            footer={
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setBookingStatus(booking.id, status)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                      booking.status === status
                        ? "bg-rose-600 text-white"
                        : "border border-rose-200 bg-white text-rose-700 hover:bg-rose-50"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            }
          >
            <div className="space-y-2 text-gray-600">
              <p className="font-semibold text-gray-900">{booking.service}</p>
              {booking.price || booking.duration ? (
                <p className="text-sm">
                  {[booking.price, booking.duration].filter(Boolean).join(" • ")}
                </p>
              ) : null}
              <p>{booking.date}</p>
              <p>{booking.time}</p>
              <p>
                <a
                  className="hover:text-rose-700"
                  href={
                    booking.phone
                      ? `tel:${booking.phone.replace(/[^\d+]/g, "")}`
                      : undefined
                  }
                >
                  {booking.phone}
                </a>
              </p>
              {booking.email ? <p className="text-sm">{booking.email}</p> : null}
              {booking.notes ? <p className="text-sm italic">{booking.notes}</p> : null}
            </div>
          </InfoCard>
        ))}
      </SectionGrid>
    </PageShell>
  );
}

export default ManageBookings;
