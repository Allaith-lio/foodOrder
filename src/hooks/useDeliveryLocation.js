import { useState } from "react";

const STORAGE_KEY = "deliveryLocation";

export const defaultLocation = {
  city: "",
  area: "",
  street: "",
  details: "",
  latitude: null,
  longitude: null,
  gps: false,
};

// Saved delivery address + the short label shown in the header
export function useDeliveryLocation() {
  const [location, setLocation] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultLocation, ...JSON.parse(saved) } : defaultLocation;
    } catch {
      return defaultLocation;
    }
  });

  const saveLocation = (next) => {
    setLocation(next);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // not persisted, but still used for this session
    }
  };

  const locationLabel = location.area
    ? `${location.area}, ${location.city}`
    : location.city
      ? location.city
      : location.gps
        ? "Current Location"
        : "Choose your address";

  return { location, locationLabel, saveLocation };
}
