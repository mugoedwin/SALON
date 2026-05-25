import { useCallback, useEffect, useMemo, useState } from "react";
import ActionLink from "../components/ui/ActionLink";
import PageShell from "../components/common/PageShell";
import InfoCard from "../components/ui/InfoCard";
import SectionGrid from "../components/common/SectionGrid";
import ServiceFormModal from "./ServiceFormModal";
import {
  deleteSalonService,
  fetchSalonServices,
  normalizeSalonService,
  restoreDefaultSalonServices,
} from "../services/salonServicesApi";
import { primaryButtonClassName, secondaryButtonClassName } from "../utils/uiClasses";

function parseTags(service) {
  return Array.isArray(service?.tagsList)
    ? service.tagsList
    : typeof service?.tags === "string"
      ? service.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];
}

function ManageServices() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [isRestoring, setIsRestoring] = useState(false);

  const loadServices = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await fetchSalonServices();
      setServices(
        Array.isArray(data)
          ? data.map((service) => normalizeSalonService(service))
          : [],
      );
    } catch (error) {
      console.error("Error fetching services", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Could not load services.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const visibleCount = useMemo(
    () => services.filter((service) => service.is_visible).length,
    [services],
  );

  async function handleDelete(id) {
    const service = services.find((item) => item.id === id);
    const serviceName = service?.title ?? "this service";

    if (
      !window.confirm(
        `Are you sure you want to remove ${serviceName}? This cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      await deleteSalonService(id);
      setServices((current) => current.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting service", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Could not delete service.",
      );
    }
  }

  async function handleRestoreDefaults() {
    if (
      !window.confirm(
        "Restore the default service catalog? Existing services with matching titles will be refreshed.",
      )
    ) {
      return;
    }

    setIsRestoring(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await restoreDefaultSalonServices();
      await loadServices();
      setSuccessMessage("Default service catalog restored.");
    } catch (error) {
      console.error("Error restoring default services", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Could not restore catalog.",
      );
    } finally {
      setIsRestoring(false);
    }
  }

  function openModal(service = null) {
    setSuccessMessage("");
    setCurrentService(service);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setCurrentService(null);
  }

  function handleSaveSuccess({ title, mode, isVisible }) {
    setSuccessMessage(
      `Service ${mode === "updated" ? "updated" : "created"}: ${title}. ${
        isVisible
          ? "It is now live on the user dashboard."
          : "It is hidden from the user dashboard."
      }`,
    );
  }

  return (
    <PageShell
      eyebrow="Admin"
      title="Manage Services"
      description="Review the live services exposed by the salon API and keep pricing, visibility, and booking details aligned."
      actions={
        <>
          <ActionLink to="/admin/dashboard" variant="secondary">
            Admin Overview
          </ActionLink>
          <button
            type="button"
            onClick={handleRestoreDefaults}
            className={secondaryButtonClassName}
            disabled={isRestoring || isLoading}
          >
            {isRestoring ? "Restoring..." : "Restore Catalog"}
          </button>
          <button
            type="button"
            onClick={() => openModal()}
            className={primaryButtonClassName}
          >
            Add New Service
          </button>
        </>
      }
    >
      <SectionGrid columns="three">
        <InfoCard>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-600">
            Total Services
          </p>
          <p className="mt-3 text-3xl font-bold text-salon-strong">
            {services.length}
          </p>
        </InfoCard>
        <InfoCard>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-600">
            Visible On Site
          </p>
          <p className="mt-3 text-3xl font-bold text-salon-strong">
            {visibleCount}
          </p>
        </InfoCard>
        <InfoCard>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-600">
            API Status
          </p>
          <p className="mt-3 text-3xl font-bold text-salon-strong">
            {isLoading ? "Loading" : "Live"}
          </p>
        </InfoCard>
      </SectionGrid>

      {errorMessage ? (
        <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
          {successMessage}
        </div>
      ) : null}

      <div className="mt-8">
        {isLoading ? (
          <div className="rounded-[1.5rem] border border-rose-100 bg-white p-6 text-salon-copy">
            Loading services...
          </div>
        ) : null}

        {!isLoading && services.length === 0 ? (
          <div className="rounded-[1.5rem] border border-rose-100 bg-white p-6">
            <p className="text-lg font-semibold text-salon-strong">
              No services yet
            </p>
            <p className="mt-2 text-sm leading-7 text-salon-copy">
              Add the first service to start managing the salon menu from this panel.
            </p>
          </div>
        ) : null}

        {!isLoading && services.length > 0 ? (
          <SectionGrid columns="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <InfoCard key={service.id} className="h-full" padding="none">
                <div className="flex items-start justify-between gap-4 p-5 pb-0 sm:p-7 sm:pb-0">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
                      {service.is_visible ? "Visible" : "Hidden"}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-salon-muted">
                      {service.category || "Uncategorized"}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-salon-strong">
                      {service.title}
                    </h3>
                  </div>

                  <span className="rounded-full bg-rose-50 px-3 py-1 text-sm font-bold text-rose-700">
                    {service.currency} {service.price}
                  </span>
                </div>

                <div className="aspect-[4/3] overflow-hidden bg-rose-50">
                  {service.imageUrl || service.image_url ? (
                    <img
                      src={service.imageUrl || service.image_url}
                      alt={service.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold uppercase tracking-[0.18em] text-rose-300">
                      No photo
                    </div>
                  )}
                </div>

                <div className="p-5 sm:p-7">
                  <div className="space-y-2 text-sm text-salon-copy">
                    <p>
                      Availability:{" "}
                      {service.is_visible ? "Visible on website" : "Hidden"}
                    </p>
                    <p>Category: {service.category || "Protective Styling"}</p>
                    <p>Booking Source: {service.booking_source}</p>
                    <p>Duration: {service.duration}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(service.tagsList?.length ? service.tagsList : String(service.tags ?? "").split(",").map((tag) => tag.trim()).filter(Boolean)).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-rose-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => openModal(service)}
                      className={secondaryButtonClassName}
                    >
                      Edit Details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(service.id)}
                      className="inline-flex items-center justify-center rounded-full bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-700 transition-colors duration-300 hover:bg-rose-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </InfoCard>
            ))}
          </SectionGrid>
        ) : null}
      </div>

      {isModalOpen ? (
        <ServiceFormModal
          currentService={currentService}
          onClose={closeModal}
          refreshData={loadServices}
          onSuccess={handleSaveSuccess}
        />
      ) : null}
    </PageShell>
  );
}

export default ManageServices;
