import { useMemo, useState } from "react";
import PageShell from "../components/common/PageShell";
import ActionLink from "../components/ui/ActionLink";
import {
  bookingFlowSteps,
  bookingSteps,
  bookingTimeSlots,
  salonInfo,
} from "../data/siteData";
import { useServiceCatalog } from "../services/serviceCatalog";
import { submitBookingRequest } from "../services/bookingService";
import {
  formInputClassName,
  primaryButtonClassName,
  secondaryButtonClassName,
} from "../utils/uiClasses";

const paymentOptions = [
  {
    id: "card",
    name: "Card Payment",
    status: "pending_card_payment",
    bookingStatus: "Pending Payment",
    detail:
      "Pay by debit or credit card. The salon will share the secure card payment details after reviewing your booking.",
  },
  {
    id: "mpesa",
    name: "M-Pesa Send Money",
    status: "pending_verification",
    bookingStatus: "Pending Payment",
    detail:
      "Choose M-Pesa and the salon will share the payment details during confirmation.",
  },
  {
    id: "bank",
    name: "Bank Payment",
    status: "pending_bank_payment",
    bookingStatus: "Pending Payment",
    detail:
      "Use bank transfer or cash deposit. The salon will send the correct bank details for confirmation.",
  },
];

function formatBookingDate(value) {
  if (!value) {
    return "Not selected";
  }

  const parsedDate = new Date(`${value}T00:00:00`);

  return Number.isNaN(parsedDate.getTime())
    ? value
    : new Intl.DateTimeFormat("en-KE", { dateStyle: "medium" }).format(
        parsedDate,
      );
}

function StepMarker({ step, index, isActive, isComplete }) {
  return (
    <article
      className={`border-t-2 pt-4 ${
        isActive
          ? "border-rose-500"
          : isComplete
            ? "border-rose-300"
            : "border-rose-100"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
        Step {index + 1}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-salon-strong">{step}</h2>
      <p className="mt-3 text-sm leading-7 text-salon-copy">{bookingSteps[index]}</p>
    </article>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="grid gap-2 border-t border-rose-100 py-4 sm:grid-cols-[120px_1fr] sm:items-start">
      <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-salon-muted">
        {label}
      </dt>
      <dd className="text-sm leading-7 text-salon-copy">{value}</dd>
    </div>
  );
}

function ServiceOption({ service, isSelected, onSelect, onRemove }) {
  return (
    <article
      className={`group flex h-full flex-col rounded-[1.25rem] border p-2 shadow-[0_10px_24px_rgba(126,91,100,0.08)] transition duration-300 hover:-translate-y-1 hover:border-rose-300 hover:shadow-[0_18px_42px_rgba(74,14,23,0.16)] ${
        isSelected ? "border-rose-500 bg-[#F7ECE8]" : "border-rose-100 bg-white"
      }`}
    >
      <div className="aspect-[5/3] overflow-hidden rounded-[1rem] bg-rose-50">
        <img
          src={service.image}
          alt={service.imageAlt}
          loading="lazy"
          className={`h-full w-full object-cover transition duration-700 ${
            isSelected ? "scale-105 brightness-110" : "group-hover:scale-105"
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col p-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-rose-700">
              {service.category}
            </p>
            <h3 className="mt-1.5 text-xl font-semibold text-salon-strong">
              {service.name}
            </h3>
          </div>
          <div className="shrink-0 text-right">
            <p className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-rose-700">
              {service.price}
            </p>
            <p className="mt-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-salon-muted">
              {service.duration}
            </p>
          </div>
        </div>

        <p className="mt-2 max-h-12 overflow-hidden text-sm leading-6 text-salon-copy">
          {service.description}
        </p>

        <div className="mt-auto pt-4">
          {isSelected ? (
            <button
              type="button"
              onClick={onRemove}
              className="w-full rounded-full border border-rose-300 bg-white px-4 py-2.5 text-sm font-semibold text-rose-700 transition-colors duration-200 hover:bg-rose-50"
            >
              Remove service
            </button>
          ) : (
            <button
              type="button"
              onClick={onSelect}
              className="w-full rounded-full bg-[#E11D48] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#F43F5E]"
            >
              Select service
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function PaymentLogo({ method }) {
  if (method === "mpesa") {
    return (
      <span className="inline-flex h-11 min-w-[6.8rem] items-center justify-center rounded-md bg-[#20A852] px-3 text-sm font-black tracking-[0.08em] text-white shadow-[0_10px_22px_rgba(32,168,82,0.22)]">
        M-PESA
      </span>
    );
  }

  if (method === "card") {
    return (
      <span className="inline-flex h-11 min-w-[6.8rem] items-center justify-center gap-1 rounded-md bg-[#111827] px-3 text-xs font-black uppercase tracking-[0.1em] text-white shadow-[0_10px_22px_rgba(17,24,39,0.18)]">
        <span>Card</span>
        <span className="rounded bg-white px-1.5 py-0.5 text-[0.6rem] text-[#111827]">
          Pay
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex h-11 min-w-[6.8rem] items-center justify-center rounded-md border border-[#B8860B]/25 bg-[#FFF7D6] px-3 text-xs font-black uppercase tracking-[0.14em] text-[#6F4B00]">
      Bank
    </span>
  );
}

function PaymentOption({ option, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex h-full flex-col rounded-[1.25rem] border p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-rose-300 hover:shadow-[0_18px_42px_rgba(74,14,23,0.12)] ${
        isSelected
          ? "border-rose-500 bg-[#F7ECE8] shadow-[0_16px_38px_rgba(74,14,23,0.12)]"
          : "border-rose-100 bg-white"
      }`}
      aria-pressed={isSelected}
    >
      <div className="flex items-center justify-between gap-3">
        <PaymentLogo method={option.id} />
        <span
          className={`h-4 w-4 rounded-full border ${
            isSelected ? "border-rose-600 bg-rose-600" : "border-rose-200 bg-white"
          }`}
          aria-hidden="true"
        />
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-salon-strong">
        {option.name}
      </h3>
      <p className="mt-3 text-sm leading-7 text-salon-copy">{option.detail}</p>
    </button>
  );
}

function Booking() {
  const { services, isLoading: isServiceCatalogLoading, loadError: serviceLoadError } =
    useServiceCatalog();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServiceName, setSelectedServiceName] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [serviceCategory, setServiceCategory] = useState("Most Popular");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentReference, setPaymentReference] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const serviceCategories = useMemo(
    () => ["Most Popular", ...new Set(services.map((service) => service.category))],
    [services],
  );
  const selectedService = useMemo(
    () =>
      services.find((service) => service.name === selectedServiceName) ??
      null,
    [services, selectedServiceName],
  );
  const filteredServices = useMemo(() => {
    const normalizedSearch = serviceSearch.trim().toLowerCase();

    const matches = services.filter((service) => {
      const matchesCategory =
        serviceCategory === "Most Popular"
          ? service.popular
          : service.category === serviceCategory;
      const matchesSearch =
        !normalizedSearch ||
        [service.name, service.category, service.description, service.benefit]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });

    return serviceCategory === "Most Popular" && !normalizedSearch
      ? matches.slice(0, 6)
      : matches;
  }, [services, serviceCategory, serviceSearch]);

  const canContinue =
    (currentStep === 0 && Boolean(selectedServiceName)) ||
    (currentStep === 1 && Boolean(bookingDate) && Boolean(bookingTime)) ||
    (currentStep === 2 &&
      Boolean(customerName.trim()) &&
      Boolean(customerPhone.trim())) ||
    (currentStep === 3 && Boolean(paymentMethod));

  const selectedPaymentOption =
    paymentOptions.find((option) => option.id === paymentMethod) ?? paymentOptions[0];

  function handleNextStep() {
    if (canContinue && currentStep < bookingFlowSteps.length - 1) {
      setCurrentStep((value) => value + 1);
    }
  }

  function handlePreviousStep() {
    setCurrentStep((value) => Math.max(value - 1, 0));
  }

  async function handleSubmitBooking() {
    if (!canContinue || !selectedService) {
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    const bookingPayload = {
      service: selectedService.name,
      price: selectedService.price,
      duration: selectedService.duration,
      date: bookingDate,
      time: bookingTime,
      name: customerName.trim(),
      phone: customerPhone.trim(),
      notes: notes.trim(),
      paymentMethod: selectedPaymentOption.id,
      paymentMethodLabel: selectedPaymentOption.name,
      paymentStatus: selectedPaymentOption.status,
      paymentReference: paymentReference.trim(),
      status: selectedPaymentOption.bookingStatus,
    };

    try {
      const response = await submitBookingRequest(bookingPayload);
      setConfirmedBooking(response.booking);
      setIsSubmitting(false);
      setCurrentStep(bookingFlowSteps.length);
    } catch (error) {
      setIsSubmitting(false);
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Could not submit your booking.";
      setSubmitError(
        `${message} Check your internet connection and ensure Firestore is enabled and allows writes.`,
      );
      console.error("Booking submission failed", error);
    }
  }

  function resetBookingFlow() {
    setCurrentStep(0);
    setSelectedServiceName("");
    setBookingDate("");
    setBookingTime("");
    setCustomerName("");
    setCustomerPhone("");
    setNotes("");
    setPaymentMethod("card");
    setPaymentReference("");
    setConfirmedBooking(null);
    setIsSubmitting(false);
  }

  function clearSelectedService() {
    setSelectedServiceName("");
  }

  function renderStepContent() {
    if (currentStep === 0) {
      return (
        <div className="space-y-5">
          <div className="rounded-[1.5rem] border border-rose-100 bg-[#F7ECE8] p-3">
            {serviceLoadError ? (
              <p className="mb-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {serviceLoadError}
              </p>
            ) : null}

            {isServiceCatalogLoading ? (
              <p className="mb-3 rounded-2xl border border-rose-100 bg-white px-4 py-3 text-sm font-semibold text-salon-copy">
                Loading services...
              </p>
            ) : null}

            <label htmlFor="service-search" className="sr-only">
              Search services
            </label>
            <input
              id="service-search"
              type="search"
              value={serviceSearch}
              onChange={(event) => setServiceSearch(event.target.value)}
              placeholder="Search braids, nails, facial..."
              className="w-full rounded-full border border-rose-100 bg-white px-4 py-3 text-sm font-semibold text-salon-strong outline-none transition duration-300 placeholder:text-salon-muted focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />

            <div
              className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-4"
              role="tablist"
              aria-label="Booking service categories"
            >
              {serviceCategories.map((category) => {
                const isSelected = category === serviceCategory;

                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setServiceCategory(category)}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition duration-300 ${
                      isSelected
                        ? "bg-[#E11D48] text-white shadow-[0_12px_28px_rgba(225,29,72,0.22)]"
                        : "bg-white/78 text-salon-copy hover:bg-white hover:text-rose-700"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedService ? (
            <div className="flex flex-col gap-3 rounded-[1.25rem] border border-rose-200 bg-rose-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-salon-strong">
                Selected: <span className="text-rose-700">{selectedService.name}</span>
              </p>
              <button
                type="button"
                onClick={() => setSelectedServiceName("")}
                className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition-colors duration-200 hover:bg-rose-50"
              >
                Remove
              </button>
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceOption
                key={service.name}
                service={service}
                isSelected={service.name === selectedServiceName}
                onSelect={() => setSelectedServiceName(service.name)}
                onRemove={() => setSelectedServiceName("")}
              />
            ))}
          </div>

          {filteredServices.length === 0 ? (
            <div className="rounded-[1.5rem] border border-rose-100 bg-white px-5 py-8 text-center">
              <p className="text-lg font-semibold text-salon-strong">
                No services found.
              </p>
              <p className="mt-2 text-sm leading-7 text-salon-copy">
                Try another search term or choose a different category.
              </p>
            </div>
          ) : null}
        </div>
      );
    }

    if (currentStep === 1) {
      return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="booking-date"
                className="mb-2 block text-sm font-semibold text-salon-strong"
              >
                Preferred Date
              </label>
              <input
                id="booking-date"
                type="date"
                min={today}
                value={bookingDate}
                onChange={(event) => setBookingDate(event.target.value)}
                className={formInputClassName}
              />
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-salon-strong">
                Available Time Slots
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {bookingTimeSlots.map((slot) => {
                  const isSelected = slot === bookingTime;

                  return (
                    <button
                      key={slot}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setBookingTime(slot)}
                      className={`rounded-full px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                        isSelected
                          ? "bg-[#E11D48] text-white"
                          : "border border-rose-200 bg-white text-salon-copy hover:border-rose-300 hover:bg-rose-50"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-l-2 border-rose-200 pl-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
              Scheduling note
            </p>
            <p className="mt-3 text-sm leading-7 text-salon-copy">
              Need a bridal slot, early prep, or help matching your timing to a
              specific look? The salon team can adjust details on WhatsApp.
            </p>
          </div>
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="customer-name"
                className="mb-2 block text-sm font-semibold text-salon-strong"
              >
                Full Name
              </label>
              <input
                id="customer-name"
                type="text"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Enter your full name"
                className={formInputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="customer-phone"
                className="mb-2 block text-sm font-semibold text-salon-strong"
              >
                Phone Number
              </label>
              <input
                id="customer-phone"
                type="tel"
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
                placeholder="971522202609, 971589178814"
                className={formInputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="customer-notes"
                className="mb-2 block text-sm font-semibold text-salon-strong"
              >
                Notes (Optional)
              </label>
              <textarea
                id="customer-notes"
                rows="4"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Share hairstyle preferences or arrival notes"
                className={formInputClassName}
              />
            </div>
          </div>

          <div className="border-l-2 border-rose-200 pl-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
              Confirmation
            </p>
            <p className="mt-3 text-sm leading-7 text-salon-copy">
              We only need the essentials here so follow-up stays quick and easy.
              The team can confirm the rest directly with you.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {paymentOptions.map((option) => (
              <PaymentOption
                key={option.id}
                option={option}
                isSelected={option.id === paymentMethod}
                onSelect={() => setPaymentMethod(option.id)}
              />
            ))}
          </div>

          {paymentMethod === "mpesa" ? (
            <div className="rounded-[1.25rem] border border-[#20A852]/25 bg-[#F1FFF5] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#13843E]">
                M-Pesa payment
              </p>
              <p className="mt-3 text-sm leading-7 text-salon-copy">
                The salon will share the correct M-Pesa payment details during
                confirmation. If you already have a transaction code, paste it
                below so the team can verify it.
              </p>
            </div>
          ) : null}

          {paymentMethod === "card" ? (
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-700">
                Card payment
              </p>
              <p className="mt-3 text-sm leading-7 text-salon-copy">
                We accept card payment. After the request is received, the team
                can share the secure card payment details for the appointment.
              </p>
            </div>
          ) : null}

          {paymentMethod === "bank" ? (
            <div className="rounded-[1.25rem] border border-[#B8860B]/25 bg-[#FFF9E8] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6F4B00]">
                Bank payment
              </p>
              <p className="mt-3 text-sm leading-7 text-salon-copy">
                We accept bank payment. The salon will send account details and
                confirm once the transfer or deposit reference is received.
              </p>
            </div>
          ) : null}

          {paymentMethod !== "card" ? (
            <div>
            <label
              htmlFor="payment-reference"
              className="mb-2 block text-sm font-semibold text-salon-strong"
            >
              Payment Reference (Optional)
            </label>
            <input
              id="payment-reference"
              type="text"
              value={paymentReference}
              onChange={(event) => setPaymentReference(event.target.value)}
              placeholder={
                paymentMethod === "mpesa"
                  ? "M-Pesa transaction code"
                  : "Bank transfer or deposit reference"
              }
              className={formInputClassName}
            />
            </div>
          ) : null}
        </div>

        <div className="border-l-2 border-rose-200 pl-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
            Payment note
          </p>
          <p className="mt-3 text-sm leading-7 text-salon-copy">
            Payment preference and any reference are saved with the booking for
            admin review. The salon will confirm the final payment details.
          </p>
        </div>
      </div>
    );
  }

  if (currentStep === bookingFlowSteps.length && confirmedBooking) {
    return (
      <PageShell
        eyebrow="Booking Complete"
        title="Your appointment request is in."
        description="The salon now has your service, date, time, and contact details for confirmation and follow-up."
        actions={
          <ActionLink to="/services" variant="secondary">
            View Services
          </ActionLink>
        }
      >
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="border-t-2 border-rose-500 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
              Request received
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-salon-strong sm:text-5xl">
              We&apos;ll confirm through {confirmedBooking.phone}.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-salon-copy">
              A member of the team can follow up by call or WhatsApp using the
              number you shared, especially if prep details or schedule
              adjustments are needed.
            </p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="border-t border-rose-100 pt-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-salon-muted">
                  Client
                </dt>
                <dd className="mt-2 text-lg font-semibold text-salon-strong">
                  {confirmedBooking.name}
                </dd>
              </div>
              <div className="border-t border-rose-100 pt-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-salon-muted">
                  Visit date
                </dt>
                <dd className="mt-2 text-lg font-semibold text-salon-strong">
                  {formatBookingDate(confirmedBooking.date)}
                </dd>
              </div>
              <div className="border-t border-rose-100 pt-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-salon-muted">
                  Time
                </dt>
                <dd className="mt-2 text-lg font-semibold text-salon-strong">
                  {confirmedBooking.time}
                </dd>
              </div>
              <div className="border-t border-rose-100 pt-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-salon-muted">
                  Service
                </dt>
                <dd className="mt-2 text-lg font-semibold text-salon-strong">
                  {confirmedBooking.service}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={resetBookingFlow}
                className={primaryButtonClassName}
              >
                Book Another
              </button>
              <ActionLink href={salonInfo.whatsappHref} variant="secondary">
                Ask on WhatsApp
              </ActionLink>
            </div>
          </section>

          <aside className="self-start border border-rose-100 bg-rose-50/70 px-5 py-5 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
              Appointment Summary
            </p>
            <dl className="mt-4">
              <SummaryRow label="Service" value={confirmedBooking.service} />
              <SummaryRow label="Price" value={confirmedBooking.price} />
              <SummaryRow label="Duration" value={confirmedBooking.duration} />
              <SummaryRow
                label="Payment"
                value={confirmedBooking.paymentMethodLabel || "Not selected"}
              />
              <SummaryRow
                label="Payment Status"
                value={confirmedBooking.paymentStatus || "unpaid"}
              />
              {confirmedBooking.paymentReference ? (
                <SummaryRow
                  label="Reference"
                  value={confirmedBooking.paymentReference}
                />
              ) : null}
              <SummaryRow
                label="Date"
                value={formatBookingDate(confirmedBooking.date)}
              />
              <SummaryRow label="Time" value={confirmedBooking.time} />
              <SummaryRow
                label="Notes"
                value={confirmedBooking.notes || "No additional notes shared."}
              />
            </dl>
          </aside>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Booking"
      title="Book your appointment in four clear, elegant steps."
      description="Choose the service, lock the timing, add your details, then select card, M-Pesa Send Money, or bank payment before confirmation."
      actions={
        <ActionLink href={salonInfo.whatsappHref} variant="secondary">
          WhatsApp Support
        </ActionLink>
      }
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {bookingFlowSteps.map((step, index) => (
          <StepMarker
            key={step}
            step={step}
            index={index}
            isActive={index === currentStep}
            isComplete={index < currentStep}
          />
        ))}
      </div>

      <div
        className={`mt-10 grid gap-10 ${
          currentStep === 0 ? "" : "lg:grid-cols-[minmax(0,1fr)_310px]"
        }`}
      >
        <section className="min-w-0 border-t-2 border-rose-500 pt-6">
          <div className="flex flex-col gap-4 border-b border-rose-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
                Current step
              </p>
              <h2 className="mt-3 text-4xl font-semibold text-salon-strong sm:text-[2.8rem]">
                {bookingFlowSteps[currentStep]}
              </h2>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-salon-muted">
              {String(currentStep + 1).padStart(2, "0")} /{" "}
              {String(bookingFlowSteps.length).padStart(2, "0")}
            </p>
          </div>

          <div className="pt-6">{renderStepContent()}</div>

          <div className="mt-8 flex flex-col gap-3 border-t border-rose-100 pt-6 sm:flex-row sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className={secondaryButtonClassName}
                >
                  Back
                </button>
              ) : null}

              {currentStep < bookingFlowSteps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!canContinue}
                  className={primaryButtonClassName}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitBooking}
                  disabled={!canContinue || isSubmitting}
                  className={primaryButtonClassName}
                >
                  {isSubmitting ? "Submitting..." : "Confirm Booking"}
                </button>
              )}
            </div>

            <ActionLink to="/contact" variant="secondary">
              Need Help?
            </ActionLink>
          </div>

          {submitError ? (
            <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
              {submitError}
            </p>
          ) : null}
        </section>

        {currentStep > 0 ? (
          <aside className="space-y-6 self-start lg:sticky lg:top-28">
            <div className="border border-rose-100 bg-rose-50/70 px-5 py-5 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
                Booking Summary
              </p>
              <dl className="mt-4">
                <SummaryRow
                  label="Service"
                  value={selectedService?.name ?? "Not selected"}
                />
                <SummaryRow
                  label="Price"
                  value={selectedService?.price ?? "AED --"}
                />
                <SummaryRow
                  label="Duration"
                  value={selectedService?.duration ?? "Not selected"}
                />
                <SummaryRow label="Date" value={formatBookingDate(bookingDate)} />
                <SummaryRow label="Time" value={bookingTime || "Not selected"} />
                <SummaryRow
                  label="Client"
                  value={customerName.trim() || "Add your details in step 3"}
                />
                <SummaryRow
                  label="Payment"
                  value={
                    currentStep >= 3
                      ? selectedPaymentOption.name
                      : "Choose in step 4"
                  }
                />
              </dl>

              {selectedService ? (
                <div className="mt-5 border-t border-rose-100 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-salon-muted">
                    Service note
                  </p>
                  <p className="mt-3 text-sm leading-7 text-salon-copy">
                    {selectedService.benefit}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="border-t border-rose-100 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
                Need a faster answer?
              </p>
              <p className="mt-3 text-sm leading-7 text-salon-copy">
                Use WhatsApp for prep questions, bridal timing, or help choosing
                the right service before you confirm.
              </p>
              <div className="mt-4">
                <ActionLink href={salonInfo.whatsappHref} variant="secondary">
                  Chat on WhatsApp
                </ActionLink>
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    </PageShell>
  );
}

export default Booking;
