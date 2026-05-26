const dateFormatter = new Intl.DateTimeFormat("en-KE", {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-KE", {
  hour: "2-digit",
  minute: "2-digit",
});

export function formatAppointmentDate(date) {
  return dateFormatter.format(date);
}

export function formatAppointmentTime(date) {
  return timeFormatter.format(date);
}
