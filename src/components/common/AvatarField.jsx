import { useRef, useState } from "react";
import { Camera, UserRound, ImagePlus } from "lucide-react";

// Trendy avatar uploader used by dynamic forms for `type: "file"` fields.
// Keeps a local preview and reports the chosen file name through onChange.
export default function AvatarField({ name, label, error, required, onChange }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [localError, setLocalError] = useState("");

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    setLocalError("");
    if (!file) {
      setPreview("");
      onChange({ target: { value: "" } });
      return;
    }
    if (!file.type.startsWith("image/")) {
      setLocalError("Please choose an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setLocalError("Image must be 2MB or smaller.");
      return;
    }
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(file);
    });
    onChange({ target: { value: file.name } });
  };

  const message = error || localError;

  return (
    <div className="grid gap-2 text-sm font-semibold text-ink">
      <span>
        {label}
        {!required && (
          <span className="ml-1 font-normal text-muted">(optional)</span>
        )}
      </span>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="group flex w-fit items-center gap-4 rounded-2xl border border-dashed border-line bg-page/50 p-3 transition hover:border-primary/50 hover:bg-surface"
      >
        <span className="relative grid size-16 shrink-0 place-items-center">
          <span className="grid size-full place-items-center overflow-hidden rounded-full bg-gradient-to-br from-primary/15 via-secondary/20 to-tertiary/15 ring-2 ring-primary/20 transition group-hover:ring-primary/40">
            {preview ? (
              <img
                src={preview}
                alt="Profile preview"
                className="size-full object-cover"
              />
            ) : (
              <UserRound className="size-7 text-muted" aria-hidden="true" />
            )}
          </span>
          <span className="absolute -bottom-1.5 -right-1.5 grid size-7 place-items-center rounded-full border-2 border-surface bg-primary text-white shadow-md transition duration-200 group-hover:scale-110 group-hover:rotate-6">
            {preview ? (
              <ImagePlus className="size-4" aria-hidden="true" />
            ) : (
              <Camera className="size-4" aria-hidden="true" />
            )}
          </span>
        </span>

        <span className="text-left">
          <span className="flex items-center gap-1.5 text-sm font-bold text-ink">
            <Camera className="size-4 text-primary" aria-hidden="true" />
            {preview ? "Change photo" : "Add profile photo"}
          </span>
          <span className="mt-0.5 block text-xs font-normal text-muted">
            JPG or PNG, up to 2MB
          </span>
        </span>
      </button>

      <input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFile}
        aria-invalid={!!message}
        aria-describedby={message ? `${name}-error` : undefined}
      />

      {message && (
        <span id={`${name}-error`} role="alert" className="text-xs font-medium text-red-500">
          {message}
        </span>
      )}
    </div>
  );
}
