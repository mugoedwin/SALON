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

function ServiceOption({ service, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`group w-full border-t-2 pt-4 text-left transition-colors duration-300 ${
        isSelected
          ? "border-rose-500"
          : "border-rose-100 hover:border-rose-300"
      }`}
    >
      <div className="grid gap-4 sm:grid-cols-[160px_minmax(0,1fr)_auto] sm:items-start">
        <div className="overflow-hidden rounded-[1.35rem] bg-rose-50">
          <img
            src={service.image}
            alt={service.imageAlt}
            loading="lazy"
            className={`aspect-[4/3] h-full w-full object-cover transition duration-700 ${
              isSelected ? "scale-[1.03]" : "group-hover:scale-[1.03]"
            }`}
          />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
            {service.category}
          </p>
          <div className="mt-2 flex flex-wrap items-baseline gap-3">
            <h3 className="text-2xl font-semibold text-salon-strong">{service.name}</h3>
            <span className="text-sm font-semibold text-salon-muted">
              {service.duration}
            </span>
          </div>
          <p className="mt-3 text-sm leading-7 text-salon-copy">
            {service.description}
          </p>
          <p className="mt-3 text-sm leading-7 text-salon-muted">{service.benefit}</p>
        </div>

        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
          <span
            className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
              isSelected
                ? "bg-rose-600 text-white"
                : "border border-rose-200 bg-white text-rose-700"
            }`}
          >
            {service.price}
          </span>
          <span
            className={`text-sm font-semibold ${
              isSelected
                ? "text-rose-700"
                : "text-salon-muted group-hover:text-rose-700"
            }`}
          >
            {isSelected ? "Selected" : "Select service"}
          </span>
        </div>
      </div>
    </button>
  );
}

function Booking() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServiceName, setSelectedServiceName] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const selectedService = useMemo(
    () =>
      servicesData.find((service) => service.name === selectedServiceName) ??
      null,
    [selectedServiceName],
  );

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

  function renderStepContent() {
    if (currentStep === 0) {
      return (
        <div className="space-y-5">
          {servicesData.map((service) => (
            <ServiceOption
              key={service.name}
              service={service}
              isSelected={service.name === selectedServiceName}
              onSelect={() => setSelectedServiceName(service.name)}
            />
          ))}
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
                          ? "bg-rose-600 text-white"
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

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_310px]">
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
      </div>
    </PageShell>
  );
}

export default Booking;
