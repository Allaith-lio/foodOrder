import { useEffect } from "react";
import { Ban } from "lucide-react";

// A small "Are you sure?" window. Closes with Escape or by clicking outside.
export default function ConfirmDialog({ title, message, confirmLabel, onConfirm, onCancel }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/50" onClick={onCancel} />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        className="relative w-full max-w-sm rounded-card bg-surface p-6 shadow-raised"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <Ban className="size-5" />
        </span>
        <h2 id="confirm-title" className="mt-4 text-lg font-extrabold">
          {title}
        </h2>
        <p id="confirm-message" className="mt-1.5 text-sm text-muted">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" autoFocus onClick={onCancel} className="btn btn-outline">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn bg-red-500 text-white transition-colors hover:bg-red-600"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
