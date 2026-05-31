import { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { servicesData } from "../data/servicesData";
import {
  cloudinaryCloudName,
  cloudinaryUploadPreset,
} from "./cloudinaryMedia";

const servicesCollection = collection(db, "services");

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeFeatures(features) {
  if (Array.isArray(features)) {
    return features.map((feature) => String(feature).trim()).filter(Boolean);
  }

  return String(features ?? "")
    .split(",")
    .map((feature) => feature.trim())
    .filter(Boolean);
}

export function normalizeService(raw, fallbackId = "") {
  return {
    id: raw.id ?? fallbackId,
    name: raw.name ?? "",
    price: raw.price ?? "",
    duration: raw.duration ?? "",
    category: raw.category ?? "",
    description: raw.description ?? "",
    benefit: raw.benefit ?? "",
    features: normalizeFeatures(raw.features),
    popular: Boolean(raw.popular),
    image: raw.image ?? "",
    imageAlt: raw.imageAlt ?? raw.name ?? "Salon service image",
    sortOrder: Number.isFinite(raw.sortOrder) ? raw.sortOrder : 999,
  };
}

export function getFallbackServices() {
  return servicesData.map((service, index) =>
    normalizeService({ ...service, sortOrder: index }, slugify(service.name)),
  );
}

function serializeService(service) {
  return {
    name: service.name.trim(),
    price: service.price.trim(),
    duration: service.duration.trim(),
    category: service.category.trim(),
    description: service.description.trim(),
    benefit: service.benefit.trim(),
    features: normalizeFeatures(service.features),
    popular: Boolean(service.popular),
    image: service.image.trim(),
    imageAlt: service.imageAlt.trim() || `${service.name.trim()} salon service`,
    sortOrder: Number(service.sortOrder) || 999,
    updatedAt: serverTimestamp(),
  };
}

export function useServiceCatalog() {
  const [firestoreServices, setFirestoreServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const servicesQuery = query(servicesCollection, orderBy("sortOrder", "asc"));

    const unsubscribe = onSnapshot(
      servicesQuery,
      (snapshot) => {
        setFirestoreServices(
          snapshot.docs.map((docSnap) =>
            normalizeService({ id: docSnap.id, ...docSnap.data() }, docSnap.id),
          ),
        );
        setLoadError("");
        setIsLoading(false);
      },
      (error) => {
        console.error("Failed to load services", error);
        setLoadError("Could not load editable services. Showing the starter catalog.");
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const fallbackServices = useMemo(() => getFallbackServices(), []);
  const services = firestoreServices.length > 0 ? firestoreServices : fallbackServices;

  return {
    services,
    firestoreServices,
    isUsingFallback: firestoreServices.length === 0,
    isLoading,
    loadError,
  };
}

export async function createService(service) {
  await addDoc(servicesCollection, {
    ...serializeService(service),
    createdAt: serverTimestamp(),
  });
}

export async function saveService(serviceId, service) {
  await updateDoc(doc(db, "services", serviceId), serializeService(service));
}

export async function removeService(serviceId) {
  await deleteDoc(doc(db, "services", serviceId));
}

export async function publishStarterCatalog() {
  const fallbackServices = getFallbackServices();

  await Promise.all(
    fallbackServices.map((service, index) =>
      setDoc(doc(db, "services", service.id), {
        ...serializeService({ ...service, sortOrder: index }),
        createdAt: serverTimestamp(),
      }),
    ),
  );
}

export function uploadServiceImage(file, serviceName, onProgress) {
  const serviceSlug = slugify(serviceName) || "service";
  const endpoint = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`;

  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryUploadPreset);
    formData.append("folder", `ivonne-orchard/services/${serviceSlug}`);

    const request = new XMLHttpRequest();
    request.open("POST", endpoint);

    request.upload.onprogress = (event) => {
      if (event.lengthComputable && typeof onProgress === "function") {
        onProgress(Math.max(8, Math.round((event.loaded / event.total) * 100)));
      }
    };

    request.onload = () => {
      let response;
      try {
        response = JSON.parse(request.responseText);
      } catch (error) {
        reject(new Error("Cloudinary returned an unreadable response."));
        return;
      }

      if (request.status >= 200 && request.status < 300 && response.secure_url) {
        resolve(response.secure_url);
        return;
      }

      reject(
        new Error(
          response?.error?.message ||
            "Cloudinary upload failed. Check the upload preset.",
        ),
      );
    };

    request.onerror = () => {
      reject(new Error("Cloudinary upload failed. Check your connection."));
    };

    request.send(formData);
  });
}
