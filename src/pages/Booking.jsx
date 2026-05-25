import { useMemo, useState } from "react";
import PageShell from "../components/common/PageShell";
import ActionLink from "../components/ui/ActionLink";
import {
  bookingFlowSteps,
  bookingSteps,
  bookingTimeSlots,
  salonInfo,
} from "../data/siteData";
import { servicesData } from "../data/servicesData";
import { submitBookingRequest } from "../services/bookingService";
import {
  formInputClassName,
  primaryButtonClassName,
  secondaryButtonClassName,
} from "../utils/uiClasses";

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

function Booking() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServiceName, setSelectedServiceName] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [serviceCategory, setServiceCategory] = useState("Most Popular");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const serviceCategories = useMemo(
    () => ["Most Popular", ...new Set(servicesData.map((service) => service.category))],
    [],
  );
  const selectedService = useMemo(
    () =>
      servicesData.find((service) => service.name === selectedServiceName) ??
      null,
    [selectedServiceName],
  );
  const filteredServices = useMemo(() => {
    const normalizedSearch = serviceSearch.trim().toLowerCase();

    const matches = servicesData.filter((service) => {
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
  }, [serviceCategory, serviceSearch]);

  const canContinue =
    (currentStep === 0 && Boolean(selectedServiceName)) ||
    (currentStep === 1 && Boolean(bookingDate) && Boolean(bookingTime)) ||
    (currentStep === 2 &&
      Boolean(customerName.trim()) &&
      Boolean(customerPhone.trim()));

  function handleNextStep() {
    if (canContinue && currentStep < 2) {
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
    };

    try {
      const response = await submitBookingRequest(bookingPayload);
      setConfirmedBooking(response.booking);
      setIsSubmitting(false);
      setCurrentStep(3);
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
              placeholder="e.g. 0712 345 678"
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

  if (currentStep === 3 && confirmedBooking) {
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
      title="Book your appointment in three clear, elegant steps."
      description="The booking flow is more guided now: choose the service, lock the timing, then add your contact details for a quick salon confirmation."
      actions={
        <ActionLink href={salonInfo.whatsappHref} variant="secondary">
          WhatsApp Support
        </ActionLink>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
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
              {String(currentStep + 1).padStart(2, "0")} / 03
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

              {currentStep < 2 ? (
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
