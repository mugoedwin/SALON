import { useEffect, useMemo, useState } from "react";
import { collection, limit, onSnapshot, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import ActionLink from "../components/ui/ActionLink";
import PageShell from "../components/common/PageShell";
import InfoCard from "../components/ui/InfoCard";
import SectionGrid from "../components/common/SectionGrid";
import { servicesData } from "../data/servicesData";
import { auth, db } from "../firebase";

function AdminDashboard() {
  const [pendingCount, setPendingCount] = useState(0);
  const [todayBookings, setTodayBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    const pendingQuery = query(
      collection(db, "bookings"),
      where("status", "==", "Pending"),
    );

    const todayQuery = query(
      collection(db, "bookings"),
      where("date", "==", today),
      limit(12),
    );

    const unsubscribePending = onSnapshot(
      pendingQuery,
      (snapshot) => {
        setPendingCount(snapshot.size);
        setIsLoading(false);
      },
      (error) => {
        console.error("Failed to load pending bookings", error);
        setLoadError("Could not load bookings. Check Firestore rules.");
        setIsLoading(false);
      },
    );

    const unsubscribeToday = onSnapshot(
      todayQuery,
      (snapshot) => {
        setTodayBookings(
          snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })),
        );
      },
      (error) => {
        console.error("Failed to load today's bookings", error);
        setLoadError("Could not load bookings. Check Firestore rules.");
      },
    );

    return () => {
      unsubscribePending();
      unsubscribeToday();
    };
  }, [today]);

  const dashboardStats = useMemo(
    () => [
      { label: "Live Services", value: servicesData.length.toString() },
      { label: "Pending Bookings", value: pendingCount.toString() },
      { label: "WhatsApp Leads", value: "—" },
    ],
    [pendingCount],
  );

  return (
    <PageShell
      eyebrow="Admin"
      title="Admin Dashboard"
      description="Monitor services, bookings, and lead activity from a single frontend-ready control panel."
    >
      {loadError ? (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {loadError}
        </div>
      ) : null}

      <SectionGrid columns="three">
        {dashboardStats.map((stat) => (
          <InfoCard key={stat.label}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-600">
              {stat.label}
            </p>
            <p className="mt-3 text-3xl font-bold text-gray-900">{stat.value}</p>
          </InfoCard>
        ))}
      </SectionGrid>

      <div className="mt-8">
        <SectionGrid columns="split">
          <InfoCard title="Quick Actions">
            <div className="flex flex-col gap-3">
              <ActionLink to="/admin/bookings">Manage Bookings</ActionLink>
              <ActionLink to="/admin/services" variant="secondary">
                Manage Services
              </ActionLink>
              <button
                type="button"
                onClick={() => signOut(auth)}
                className="rounded-full border border-rose-200 bg-white px-4 py-3 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-50"
              >
                Sign Out
              </button>
            </div>
          </InfoCard>

          <InfoCard title="Today at a Glance">
            <div className="space-y-3">
              {isLoading ? (
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="font-semibold text-gray-900">Loading...</p>
                  <p className="mt-1 text-gray-600">Syncing Firestore bookings.</p>
                </div>
              ) : null}

              {!isLoading && todayBookings.length === 0 ? (
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="font-semibold text-gray-900">No bookings today</p>
                  <p className="mt-1 text-gray-600">Date: {today}</p>
                </div>
              ) : null}

              {todayBookings.map((item) => (
                <div key={item.id} className="rounded-xl bg-gray-50 p-4">
                  <p className="font-semibold text-gray-900">{item.name ?? "Client"}</p>
                  <p className="mt-1 text-gray-600">{item.service ?? "Service"}</p>
                  <p className="mt-1 text-sm text-rose-600">{item.time ?? ""}</p>
                </div>
              ))}
            </div>
          </InfoCard>
        </SectionGrid>
      </div>
    </PageShell>
  );
}

export default AdminDashboard;
