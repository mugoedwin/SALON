import { useMemo, useState } from "react";
import ActionLink from "../components/ui/ActionLink";
import PageShell from "../components/common/PageShell";
import {
  serviceCategoryDescriptions,
  serviceCategoryOptions,
} from "../data/servicesData";
import {
  createService,
  publishStarterCatalog,
  removeService,
  saveService,
  uploadServiceImage,
  useServiceCatalog,
} from "../services/serviceCatalog";
import { formInputClassName, primaryButtonClassName } from "../utils/uiClasses";

const emptyService = {
  name: "",
  price: "",
  duration: "",
  category: serviceCategoryOptions[0],
  description: "",
  benefit: "",
  features: "",
  popular: false,
  image: "",
  imageAlt: "",
  sortOrder: 999,
};

function resizeServiceImage(file) {
  const maxWidth = 1400;
  const quality = 0.82;

  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const scale = Math.min(1, maxWidth / image.width);
      const width = Math.round(image.width * scale);
      const height = Math.round(image.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Could not prepare image for upload."));
            return;
          }

          const resizedFile = new File(
            [blob],
            file.name.replace(/\.[^.]+$/, ".jpg"),
            { type: "image/jpeg" },
          );
          resolve(resizedFile);
        },
        "image/jpeg",
        quality,
      );
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not read the selected image."));
    };

    image.src = objectUrl;
  });
}

function toFormState(service) {
  return {
    ...emptyService,
    ...service,
    features: Array.isArray(service.features)
      ? service.features.join(", ")
      : service.features ?? "",
  };
}

function ManageServices() {
  const {
    services,
    firestoreServices,
    isUsingFallback,
    isLoading,
    loadError,
  } = useServiceCatalog();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState("");
  const [formState, setFormState] = useState(emptyService);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedImageTask, setSelectedImageTask] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const categories = useMemo(
    () => ["All", "Most Popular", ...serviceCategoryOptions],
    [],
  );

  const filteredServices = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return services.filter((service) => {
      const matchesCategory =
        selectedCategory === "All" ||
        (selectedCategory === "Most Popular" && service.popular) ||
        service.category === selectedCategory;
      const matchesSearch =
        !normalizedSearch ||
        [service.name, service.category, service.description, service.price]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchTerm]);

  const isEditingExisting = Boolean(editingId);

  function updateField(field, value) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  function startCreate() {
    setEditingId("");
    setFormState({ ...emptyService, sortOrder: services.length + 1 });
    setSelectedImageFile(null);
    setSelectedImageTask(null);
    setSelectedImagePreview("");
    setUploadProgress(0);
    setIsEditorOpen(true);
    setStatusMessage("");
    setErrorMessage("");
  }

  function startEdit(service) {
    setEditingId(service.id);
    setFormState(toFormState(service));
    setSelectedImageFile(null);
    setSelectedImageTask(null);
    setSelectedImagePreview("");
    setUploadProgress(0);
    setIsEditorOpen(true);
    setStatusMessage("");
    setErrorMessage("");
  }

  function closeEditor() {
    setIsEditorOpen(false);
    setEditingId("");
    setFormState({ ...emptyService, sortOrder: services.length + 1 });
    setSelectedImageFile(null);
    setSelectedImageTask(null);
    setSelectedImagePreview("");
    setUploadProgress(0);
  }

  function handleImageFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please choose an image file.");
      return;
    }

    setSelectedImagePreview(URL.createObjectURL(file));
    setUploadProgress(0);

    const imageTask = resizeServiceImage(file)
      .catch((error) => {
        console.error("Failed to resize service image", error);
        return file;
      });

    setSelectedImageTask(imageTask);
    imageTask.then((resizedFile) => {
      setSelectedImageFile(resizedFile);
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatusMessage("");
    setErrorMessage("");
    setIsSaving(true);
    if (selectedImagePreview) {
      setUploadProgress(3);
    }

    try {
      const publishedStarterCatalog = isUsingFallback;

      if (publishedStarterCatalog) {
        await publishStarterCatalog();
      }

      const nextFormState = { ...formState };
      const imageFileForUpload = selectedImageTask
        ? await selectedImageTask
        : selectedImageFile;

      if (imageFileForUpload) {
        setUploadProgress(8);
        nextFormState.image = await uploadServiceImage(
          imageFileForUpload,
          formState.name,
          setUploadProgress,
        );
      }

      if (isEditingExisting) {
        await saveService(editingId, nextFormState);
        setStatusMessage(
          publishedStarterCatalog
            ? "Starter catalog published and service updated."
            : "Service updated.",
        );
      } else {
        await createService(nextFormState);
        setStatusMessage(
          publishedStarterCatalog
            ? "Starter catalog published and service created."
            : "Service created.",
        );
      }

    } catch (error) {
      console.error("Failed to save service", error);
      setErrorMessage("Could not save the service. Check Firestore rules and try again.");
    } finally {
      closeEditor();
      setIsSaving(false);
    }
  }

  async function handleDelete(service) {
    const confirmed = window.confirm(`Delete ${service.name}?`);
    if (!confirmed) {
      return;
    }

    setStatusMessage("");
    setErrorMessage("");

    try {
      await removeService(service.id);
      if (editingId === service.id) {
        closeEditor();
      }
      setStatusMessage("Service deleted.");
    } catch (error) {
      console.error("Failed to delete service", error);
      setErrorMessage("Could not delete the service. Check Firestore rules and try again.");
    }
  }

  async function handlePublishStarterCatalog() {
    setStatusMessage("");
    setErrorMessage("");
    setIsSaving(true);

    try {
      await publishStarterCatalog();
      setStatusMessage("Starter catalog published. You can edit those services now.");
    } catch (error) {
      console.error("Failed to publish starter catalog", error);
      setErrorMessage("Could not publish the starter catalog. Confirm your admin access.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <PageShell
      eyebrow="Admin"
      title="Manage Services"
      description="Create, update, delete, price, categorize, and change images for every service shown to clients."
      actions={
        <ActionLink to="/admin" variant="secondary">
          Back to Dashboard
        </ActionLink>
      }
    >
      {loadError ? (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {loadError}
        </div>
      ) : null}

      {statusMessage ? (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-800">
          {statusMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {errorMessage}
        </div>
      ) : null}

      {isUsingFallback ? (
        <div className="mb-8 grid gap-4 rounded-[1.5rem] border border-gold-muted/45 bg-[#F7ECE8] p-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-700">
              Starter catalog
            </p>
            <p className="mt-2 text-sm leading-7 text-salon-copy">
              These are the current website services. Publish them once to make
              the full list editable in Firestore.
            </p>
          </div>
          <button
            type="button"
            onClick={handlePublishStarterCatalog}
            disabled={isSaving}
            className={primaryButtonClassName}
          >
            {isSaving ? "Publishing..." : "Publish Current Catalog"}
          </button>
        </div>
      ) : null}

      <div className="space-y-8">
        <section className="min-w-0">
          <div className="rounded-[1.5rem] border border-rose-100 bg-[#F7ECE8] p-3">
            <label htmlFor="service-admin-search" className="sr-only">
              Search services
            </label>
            <input
              id="service-admin-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search services by name, category, or price..."
              className={formInputClassName}
            />

            <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {categories.map((category) => {
                const isSelected = category === selectedCategory;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
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

            <div className="mt-4 flex flex-col gap-3 border-t border-rose-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-salon-copy">
                {filteredServices.length} service{filteredServices.length === 1 ? "" : "s"} shown
              </p>
              <button
                type="button"
                onClick={startCreate}
                className={primaryButtonClassName}
              >
                New Service
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {isLoading ? (
              <div className="rounded-[1.5rem] border border-rose-100 bg-white p-5 text-sm font-semibold text-salon-copy">
                Loading services...
              </div>
            ) : null}

            {filteredServices.map((service) => (
              <article
                key={service.id || service.name}
                className="overflow-hidden rounded-[1.25rem] border border-rose-100 bg-white shadow-[0_10px_24px_rgba(126,91,100,0.08)]"
              >
                <div className="aspect-[5/3] bg-rose-50">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-rose-700">
                        {service.category}
                      </p>
                      <h2 className="mt-1 text-xl font-semibold text-salon-strong">
                        {service.name}
                      </h2>
                    </div>
                    <span className="rounded-full bg-[#F7ECE8] px-2.5 py-1 text-xs font-semibold text-rose-700">
                      {service.price}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-salon-copy">
                    {service.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(service)}
                      className="rounded-full bg-[#E11D48] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#F43F5E]"
                    >
                      Edit
                    </button>
                    {!isUsingFallback ? (
                      <button
                        type="button"
                        onClick={() => handleDelete(service)}
                        className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {isEditorOpen ? (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-salon-strong/45 px-4 py-6 backdrop-blur-sm">
        <aside className="mx-auto max-w-2xl rounded-[1.5rem] border border-rose-100 bg-white p-5 shadow-[0_24px_70px_rgba(74,14,23,0.22)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-700">
                {isEditingExisting ? "Edit Service" : "New Service"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-salon-strong">
                {isEditingExisting ? formState.name || "Service details" : "Create service"}
              </h2>
            </div>
            <button
              type="button"
              onClick={closeEditor}
              className="rounded-full border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-salon-strong" htmlFor="service-name">
                  Name
                </label>
                <input
                  id="service-name"
                  required
                  value={formState.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className={formInputClassName}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-salon-strong" htmlFor="service-price">
                  Price
                </label>
                <input
                  id="service-price"
                  required
                  value={formState.price}
                  onChange={(event) => updateField("price", event.target.value)}
                  placeholder="AED 150"
                  className={formInputClassName}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-salon-strong" htmlFor="service-duration">
                  Duration
                </label>
                <input
                  id="service-duration"
                  required
                  value={formState.duration}
                  onChange={(event) => updateField("duration", event.target.value)}
                  placeholder="1 hr"
                  className={formInputClassName}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-salon-strong" htmlFor="service-category">
                  Category
                </label>
                <select
                  id="service-category"
                  value={formState.category}
                  onChange={(event) => updateField("category", event.target.value)}
                  className={formInputClassName}
                >
                  {serviceCategoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="rounded-2xl bg-rose-50 px-4 py-3 text-xs leading-6 text-salon-copy">
              {serviceCategoryDescriptions[formState.category] ??
                "Choose the same category clients use on the Services page."}
            </p>

            <div>
              <label className="mb-2 block text-sm font-semibold text-salon-strong" htmlFor="service-description">
                Description
              </label>
              <textarea
                id="service-description"
                required
                rows="3"
                value={formState.description}
                onChange={(event) => updateField("description", event.target.value)}
                className={formInputClassName}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-salon-strong" htmlFor="service-benefit">
                Client benefit
              </label>
              <textarea
                id="service-benefit"
                required
                rows="2"
                value={formState.benefit}
                onChange={(event) => updateField("benefit", event.target.value)}
                className={formInputClassName}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-salon-strong" htmlFor="service-features">
                Features
              </label>
              <input
                id="service-features"
                value={formState.features}
                onChange={(event) => updateField("features", event.target.value)}
                placeholder="Clean prep, Gloss finish, Aftercare"
                className={formInputClassName}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-salon-strong" htmlFor="service-image-file">
                Service image
              </label>
              <input
                id="service-image-file"
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="block w-full rounded-[1.25rem] border border-rose-100 bg-white px-4 py-3 text-sm font-semibold text-salon-strong outline-none transition duration-300 file:mr-4 file:rounded-full file:border-0 file:bg-[#E11D48] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#F43F5E] focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              />
              <p className="mt-2 text-xs leading-6 text-salon-muted">
                Choose an image from this phone or computer. Large photos are compressed before upload.
              </p>
            </div>

            {selectedImagePreview || formState.image ? (
              <div className="aspect-[5/3] overflow-hidden rounded-[1rem] bg-rose-50">
                <img
                  src={selectedImagePreview || formState.image}
                  alt={formState.imageAlt || formState.name || "Service preview"}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}

            {isSaving && selectedImagePreview ? (
              <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3">
                <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-rose-700">
                  <span>
                    {uploadProgress < 8 ? "Preparing image" : "Uploading image"}
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-[#E11D48] transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : null}

            <div>
              <label className="mb-2 block text-sm font-semibold text-salon-strong" htmlFor="service-image-alt">
                Image alt text
              </label>
              <input
                id="service-image-alt"
                value={formState.imageAlt}
                onChange={(event) => updateField("imageAlt", event.target.value)}
                className={formInputClassName}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <label className="flex items-center gap-3 text-sm font-semibold text-salon-strong">
                <input
                  type="checkbox"
                  checked={formState.popular}
                  onChange={(event) => updateField("popular", event.target.checked)}
                  className="h-4 w-4 rounded border-rose-300 text-rose-600 focus:ring-rose-400"
                />
                Show in Most Popular
              </label>
              <input
                type="number"
                min="0"
                value={formState.sortOrder}
                onChange={(event) => updateField("sortOrder", event.target.value)}
                aria-label="Sort order"
                className="w-full rounded-full border border-rose-100 bg-white px-4 py-3 text-sm font-semibold text-salon-strong outline-none transition duration-300 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 sm:w-28"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className={`${primaryButtonClassName} w-full`}
            >
              {isSaving
                ? uploadProgress > 0
                  ? `Uploading ${uploadProgress}%`
                  : "Saving..."
                : isEditingExisting
                  ? "Save Changes"
                  : "Create Service"}
            </button>
          </form>

          {!isUsingFallback ? (
            <p className="mt-4 text-xs leading-6 text-salon-muted">
              Managing {firestoreServices.length} editable services from Firestore.
            </p>
          ) : null}
        </aside>
        </div>
        ) : null}
      </div>
    </PageShell>
  );
}

export default ManageServices;
