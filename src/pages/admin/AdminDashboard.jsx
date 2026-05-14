// import { useState, useEffect } from "react";
// import { db } from "../../firebase/config"; // Path to your firebase config
// import { collection, query, onSnapshot, orderBy, limit } from "firebase/firestore";
//
// import PageShell from "../../components/common/PageShell";
// import InfoCard from "../../components/ui/InfoCard";
// import SectionGrid from "../../components/common/SectionGrid";
// import ActionLink from "../../components/ui/ActionLink";
//
// function AdminDashboard() {
//   const [bookings, setBookings] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     // Listen for Bookings
//     const qBookings = query(collection(db, "bookings"), orderBy("createdAt", "desc"), limit(5));
//     const unsubBookings = onSnapshot(qBookings, (snapshot) => {
//       setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//       setLoading(false);
//     });
//
//     // Listen for Contact Messages
//     const qMessages = query(collection(db, "contacts"), orderBy("createdAt", "desc"), limit(3));
//     const unsubMessages = onSnapshot(qMessages, (snapshot) => {
//       setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     });
//
//     return () => {
//       unsubBookings();
//       unsubMessages();
//     };
//   }, []);
//
//   return (
//     <PageShell
//       eyebrow="Admin"
//       title="Salon Management"
//       description="Overview of recent activity, incoming bookings, and client inquiries."
//     >
//       <SectionGrid columns="three">
//
//         {/* Bookings Overview */}
//         <InfoCard title="Recent Bookings" badge={`${bookings.length} New`}>
//           <div className="space-y-4">
//             {bookings.length > 0 ? (
//               bookings.map((booking) => (
//                 <div key={booking.id} className="border-b border-gray-100 pb-2 last:border-0">
//                   <p className="font-semibold text-gray-900">{booking.customerName}</p>
//                   <p className="text-sm text-gray-600">{booking.service} — {booking.time}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No recent bookings found.</p>
//             )}
//           </div>
//         </InfoCard>
//
//         {/* Contact Messages */}
//         <InfoCard title="Inquiries" badge={messages.length > 0 ? "Action Required" : "Clear"}>
//           <div className="space-y-4">
//             {messages.map((msg) => (
//               <div key={msg.id} className="text-sm">
//                 <p className="font-medium text-gray-900">{msg.name}</p>
//                 <p className="text-gray-600 line-clamp-1 italic">"{msg.message}"</p>
//               </div>
//             ))}
//             <ActionLink to="/admin/messages" variant="secondary">View All Messages</ActionLink>
//           </div>
//         </InfoCard>
//
//         {/* Admin Quick Actions */}
//         <InfoCard title="Management Tools">
//           <div className="flex flex-col gap-3">
//             <ActionLink to="/admin/calendar">View Full Calendar</ActionLink>
//             <ActionLink to="/admin/services" variant="secondary">
//               Update Services
//             </ActionLink>
//             <ActionLink to="/admin/settings" variant="secondary">
//               Salon Settings
//             </ActionLink>
//           </div>
//         </InfoCard>
//
//       </SectionGrid>
//     </PageShell>
//   );
// }
//
// export default AdminDashboard;