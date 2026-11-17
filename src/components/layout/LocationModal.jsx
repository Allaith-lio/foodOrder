import { useEffect, useState } from "react";
import {
  MapPinned,
  Navigation,
  LocateFixed,
  Check,
  X,
} from "lucide-react";
import { locationFields } from "../../data/formFields";
import { useForm } from "../../hooks/useForm";
import FormFields from "../common/FormFields";

const cities = [
  "Latakia",
  "Damascus",
  "Aleppo",
  "Homs",
  "Hama",
  "Tartous",
  "Idlib",
  "Daraa",
  "Deir ez-Zor",
  "Raqqa",
  "Qamishli",
  "Sweida",
];

const inputClass =
  "w-full rounded-xl border border-line bg-page px-3 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-primary";

const labelClass = "text-xs font-semibold text-ink";

const gpsMessages = {
  1: "Location permission was denied. Please allow location access.",
  2: "Unable to determine your location. Try again.",
  3: "Location request timed out. Please try again.",
};

// Delivery address dialog. Mount it only while it is open:
// the draft starts from the saved location every time.
export default function LocationModal({ location, onSave, onClose }) {
  const [draft, setDraft] = useState({ ...location });
  const addressForm = useForm(locationFields, {
    area: location.area ?? "",
    street: location.street ?? "",
    details: location.details ?? "",
  });
  const [gpsLoading, setGpsLoading] = useState(false);
  const [error, setError] = useState("");

  // Esc to close
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const updateField = (key) => (event) =>
    setDraft((prev) => ({ ...prev, [key]: event.target.value }));

  // Get current GPS coordinates
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Your browser does not support location services.");
      return;
    }

    setGpsLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDraft((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          gps: true,
        }));
        setGpsLoading(false);
      },
      (err) => {
        setError(
          gpsMessages[err.code] || "Something went wrong while getting your location.",
        );
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 },
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasAddress = draft.city && addressForm.values.area;
    const hasGPS = draft.gps && draft.latitude !== null;

    if (!hasAddress && !hasGPS) {
      setError("Please select your city and area, or use your current location.");
      return;
    }

    onSave({
      ...draft,
      area: addressForm.values.area,
      street: addressForm.values.street,
      details: addressForm.values.details,
    });
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-stone-950/50 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-title"
        onClick={(e) => e.stopPropagation()}
        className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface shadow-xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <MapPinned className="size-5 text-primary" />
            </div>

            <div>
              <h3 id="location-title" className="text-lg font-bold text-ink">
                Delivery Location
              </h3>
              <p className="mt-0.5 text-xs text-muted">
                Where should we deliver your food?
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer rounded-lg p-2 text-muted transition-colors hover:bg-page hover:text-ink"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          {/* GPS */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
                <LocateFixed className="size-5 text-primary" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-ink">Use Current Location</p>
                <p className="mt-1 text-xs text-muted">
                  Find your location automatically using GPS.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={gpsLoading}
              className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Navigation className="size-4" />
              {gpsLoading ? "Locating..." : "Detect My Location"}
            </button>

            {draft.gps && draft.latitude !== null && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-green-700">
                <Check className="size-4" />
                GPS location detected successfully
              </p>
            )}
          </div>

          {/* Manual address */}
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-bold text-ink">Or enter your address manually</h4>
              <p className="mt-1 text-xs text-muted">
                Select your city and enter your delivery details.
              </p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="loc-city" className={labelClass}>
                City
              </label>
              <select
                id="loc-city"
                value={draft.city}
                onChange={updateField("city")}
                className={inputClass}
              >
                <option value="">Select your city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <FormFields
              fields={locationFields}
              values={addressForm.values}
              errors={addressForm.errors}
              onChange={addressForm.handleChange}
              onBlur={addressForm.handleBlur}
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-xs text-red-600">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 border-t border-line pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 cursor-pointer rounded-xl border border-line px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-page"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-hover"
            >
              <Check className="size-4" />
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
