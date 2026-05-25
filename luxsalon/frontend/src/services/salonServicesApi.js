const API_URL = import.meta.env.VITE_API_URL || "/api/services/";

function buildServicesUrl({ visibleOnly = false } = {}) {
  if (!visibleOnly) {
    return API_URL;
  }

  const separator = API_URL.includes("?") ? "&" : "?";
  return `${API_URL}${separator}visible=true`;
}

async function readJsonResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "string"
        ? payload
        : payload?.detail || payload?.message || "Request failed.";
    throw new Error(message);
  }

  return payload;
}

async function request(path = "", options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  return readJsonResponse(response);
}

export async function fetchSalonServices({ visibleOnly = false } = {}) {
  const url = buildServicesUrl({ visibleOnly });
  const path = url.startsWith(API_URL) ? url.slice(API_URL.length) : "";
  return request(path);
}

export async function createSalonService(payload) {
  return request("", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateSalonService(id, payload) {
  return request(`${id}/`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteSalonService(id) {
  return request(`${id}/`, {
    method: "DELETE",
  });
}

export async function restoreDefaultSalonServices() {
  return request("restore-defaults/", {
    method: "POST",
  });
}

export function normalizeSalonService(service, fallbackImage = "") {
  const title = service?.title ?? service?.name ?? "";
  const currency = service?.currency ?? "";
  const price = service?.price ?? "";
  const priceLabel =
    service?.priceLabel ??
    (currency ? `${currency} ${price}` : String(price ?? ""));

  return {
    ...service,
    title,
    priceLabel,
    imageSrc: service?.imageUrl ?? service?.image ?? fallbackImage ?? "",
    imageAlt: service?.imageAlt ?? title ?? "Salon service",
    bookingSource: service?.booking_source ?? service?.bookingSource ?? "",
    isVisible: service?.is_visible ?? service?.isVisible ?? true,
    duration: service?.duration ?? "",
    description: service?.description ?? "",
    category: service?.category ?? "Protective Styling",
    tags: service?.tags ?? "",
    tagsList: String(service?.tags ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    image_url: service?.image_url ?? service?.imageUrl ?? service?.image ?? "",
  };
}
