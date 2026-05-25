import { useEffect, useState } from "react";
import { fetchSalonServices, normalizeSalonService } from "../services/salonServicesApi";

export function useSalonServices({
  visibleOnly = false,
  fallbackServices = [],
  fallbackImage = "",
} = {}) {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadServices() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const data = await fetchSalonServices({ visibleOnly });
        const source = Array.isArray(data) && data.length > 0 ? data : fallbackServices;

        if (isMounted) {
          setServices(
            source.map((service) => normalizeSalonService(service, fallbackImage)),
          );
        }
      } catch (error) {
        console.error("Failed to load salon services", error);
        if (isMounted) {
          setErrorMessage(
            error instanceof Error ? error.message : "Could not load services.",
          );
          setServices(
            fallbackServices.map((service) =>
              normalizeSalonService(service, fallbackImage),
            ),
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadServices();

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        loadServices();
      }
    }

    window.addEventListener("focus", loadServices);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const intervalId = window.setInterval(loadServices, 15000);

    return () => {
      isMounted = false;
      window.removeEventListener("focus", loadServices);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.clearInterval(intervalId);
    };
  }, [visibleOnly, fallbackServices, fallbackImage]);

  return { services, isLoading, errorMessage };
}
