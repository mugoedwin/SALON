import { useEffect, useMemo, useState } from "react";
import {
  formInputClassName,
  primaryButtonClassName,
  secondaryButtonClassName,
} from "../utils/uiClasses";

function getInitialFormState(service) {
  return {
    title: service?.title ?? "",
    category: service?.category ?? "Protective Styling",
    price: service?.price ?? "",
    currency: service?.currency ?? "AED",
    description: service?.description ?? "",
    tags: service?.tags ?? "",
    duration: service?.duration ?? "",
    is_visible: service?.is_visible ?? true,
    booking_source: service?.booking_source ?? "Website + WhatsApp",
  };
}

function ServiceFormModal({ currentService, onClose, refreshData, onSuccess }) {
  const isEditing = Boolean(currentService);
  const [formState, setFormState] = useState(() =>
    getInitialFormState(currentService),
  );
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setFormState(getInitialFormState(currentService));
    setImageFile(null);
    setImagePreview("");
    setErrorMessage("");
  }, [currentService]);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const modalTitle = useMemo(
    () => (isEditing ? "Edit Service" : "New Service"),
    [isEditing],
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const url = isEditing
        ? `/api/services/${currentService.id}/`
        : "/api/services/";
      const method = isEditing ? "PATCH" : "POST";
      const payload = new FormData();

      payload.append("title", formState.title);
      payload.append("category", formState.category);
      payload.append("price", formState.price);
      payload.append("currency", formState.currency);
      payload.append("description", formState.description);
      payload.append("tags", formState.tags);
      payload.append("duration", formState.duration);
      payload.append("is_visible", formState.is_visible ? "true" : "false");
      payload.append("booking_source", formState.booking_source);

      if (imageFile) {
        payload.append("image", imageFile);
      }

      const response = await fetch(url, {
        method,
        body: payload,
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Could not save service.");
      }

      await refreshData();
      if (typeof onSuccess === "function") {
        onSuccess({
          title: formState.title,
          mode: isEditing ? "updated" : "created",
          isVisible: formState.is_visible,
        });
      }
      onClose();
    } catch (error) {
      console.error("Failed to save service", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Could not save service.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2a1218]/65 px-4 py-8 backdrop-blur-sm"
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <div
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[1.5rem] border border-rose-100 bg-white shadow-[0_30px_80px_rgba(58,13,24,0.18)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
      >
        <div className="flex items-start justify-between gap-4 border-b border-rose-100 px-5 py-5 sm:px-7">
          <div>
            <p className="eyebrow-label">Admin</p>
            <h2
              id="service-modal-title"
              className="mt-2 text-2xl font-semibold text-salon-strong"
            >
              {modalTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-salon-copy">
              Keep the service record aligned with what clients see on the website.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-rose-200 px-3 py-2 text-sm font-semibold text-salon-copy transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="service-title"
                  className="mb-2 block text-sm font-semibold text-salon-strong"
                >
                  Title
                </label>
                <input
                  id="service-title"
                  type="text"
                  className={formInputClassName}
                  value={formState.title}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="service-category"
                  className="mb-2 block text-sm font-semibold text-salon-strong"
                >
                  Category
                </label>
                <input
                  id="service-category"
                  type="text"
                  className={formInputClassName}
                  value={formState.category}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  placeholder="Protective Styling"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="service-price"
                  className="mb-2 block text-sm font-semibold text-salon-strong"
                >
                  Price
                </label>
                <input
                  id="service-price"
                  type="number"
                  min="0"
                  step="0.01"
                  className={formInputClassName}
                  value={formState.price}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      price: event.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="service-tags"
                  className="mb-2 block text-sm font-semibold text-salon-strong"
                >
                  Tags
                </label>
                <input
                  id="service-tags"
                  type="text"
                  className={formInputClassName}
                  value={formState.tags}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      tags: event.target.value,
                    }))
                  }
                  placeholder="Edge Touch-Up, Neat Finish"
                />
                <p className="mt-2 text-xs leading-6 text-salon-muted">
                  Use comma-separated tags to render the client badges.
                </p>
              </div>

              <div>
                <label
                  htmlFor="service-currency"
                  className="mb-2 block text-sm font-semibold text-salon-strong"
                >
                  Currency
                </label>
                <input
                  id="service-currency"
                  type="text"
                  className={formInputClassName}
                  value={formState.currency}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      currency: event.target.value.toUpperCase(),
                    }))
                  }
                  maxLength={10}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="service-duration"
                  className="mb-2 block text-sm font-semibold text-salon-strong"
                >
                  Duration
                </label>
                <input
                  id="service-duration"
                  type="text"
                  className={formInputClassName}
                  value={formState.duration}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      duration: event.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
              <div>
                <label
                  htmlFor="service-image"
                  className="mb-2 block text-sm font-semibold text-salon-strong"
                >
                  Service Photo
                </label>
                <input
                  id="service-image"
                  type="file"
                  accept="image/*"
                  className="block w-full rounded-[1rem] border border-rose-200 bg-white px-4 py-3 text-sm text-salon-copy file:mr-4 file:rounded-full file:border-0 file:bg-[#E11D48] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#F43F5E]"
                  onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
                />
                <p className="mt-2 text-xs leading-6 text-salon-muted">
                  Upload a clear service image. Leave this blank to keep the current photo.
                </p>
              </div>

              <div className="flex items-end">
                <div className="w-full overflow-hidden rounded-[1rem] border border-rose-100 bg-rose-50">
                  <div className="aspect-[4/3] w-full">
                    {imagePreview || currentService?.imageUrl ? (
                      <img
                        src={imagePreview || currentService?.imageUrl || ""}
                        alt={formState.title || "Service preview"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.18em] text-rose-300">
                        Preview
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="service-description"
                className="mb-2 block text-sm font-semibold text-salon-strong"
              >
                Description
              </label>
              <textarea
                id="service-description"
                rows="5"
                className={`${formInputClassName} min-h-[9rem]`}
                value={formState.description}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <div>
                <label
                  htmlFor="service-booking-source"
                  className="mb-2 block text-sm font-semibold text-salon-strong"
                >
                  Booking Source
                </label>
                <input
                  id="service-booking-source"
                  type="text"
                  className={formInputClassName}
                  value={formState.booking_source}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      booking_source: event.target.value,
                    }))
                  }
                  required
                />
              </div>

              <label className="flex min-h-[3.75rem] items-center gap-3 rounded-[1rem] border border-rose-200 bg-rose-50/60 px-4 py-3 text-sm font-semibold text-salon-strong">
                <input
                  type="checkbox"
                  checked={formState.is_visible}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      is_visible: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-rose-300 text-rose-600 focus:ring-rose-500"
                />
                Visible on website
              </label>
            </div>

            {errorMessage ? (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {errorMessage}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-rose-100 bg-white px-5 py-5 sm:px-7">
            <button
              type="button"
              onClick={onClose}
              className={secondaryButtonClassName}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={primaryButtonClassName}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Update Service"
                  : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ServiceFormModal;
