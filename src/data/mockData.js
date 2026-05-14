import { servicesData } from "./servicesData";

export const upcomingBooking = {
  service: servicesData[0].name,
  price: servicesData[0].price,
  duration: servicesData[0].duration,
  date: "18 Apr 2026",
  time: "10:30 AM",
  status: "Confirmed",
};

export const bookingHistoryItems = [
  {
    service: servicesData[1].name,
    price: servicesData[1].price,
    duration: servicesData[1].duration,
    date: "12 Apr 2026",
    time: "2:00 PM",
    status: "Completed",
  },
  {
    service: servicesData[2].name,
    price: servicesData[2].price,
    duration: servicesData[2].duration,
    date: "28 Mar 2026",
    time: "11:00 AM",
    status: "Completed",
  },
  {
    service: servicesData[3].name,
    price: servicesData[3].price,
    duration: servicesData[3].duration,
    date: "05 Mar 2026",
    time: "9:30 AM",
    status: "Completed",
  },
];

export const adminDashboardStats = [
  { label: "Live Services", value: servicesData.length.toString() },
  { label: "Pending Bookings", value: "8" },
  { label: "WhatsApp Leads", value: "12" },
];

export const adminTodayAppointments = [
  { client: "Faith Otieno", service: servicesData[0].name, time: "10:00 AM" },
  { client: "Lynne Wambui", service: servicesData[1].name, time: "12:30 PM" },
  { client: "Maureen Njeri", service: servicesData[2].name, time: "3:00 PM" },
];

export const adminBookingQueue = [
  {
    client: "Janet Achieng",
    phone: "0718 200 111",
    service: servicesData[0].name,
    date: "16 Apr 2026",
    time: "9:00 AM",
    status: "Pending",
  },
  {
    client: "Purity Wanjiru",
    phone: "0701 900 220",
    service: servicesData[1].name,
    date: "16 Apr 2026",
    time: "1:00 PM",
    status: "Confirmed",
  },
  {
    client: "Diana Chebet",
    phone: "0722 410 670",
    service: servicesData[3].name,
    date: "17 Apr 2026",
    time: "11:30 AM",
    status: "Pending",
  },
];
