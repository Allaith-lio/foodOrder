import { Download, Play, QrCode } from "lucide-react";

export default function AppBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-8 rounded-3xl bg-secondary/20 p-8 md:p-10">
        <div className="max-w-lg">
          <p className="text-xs font-semibold text-primary">Get the CraveDash App</p>
          <h2 className="mt-1 !text-2xl md:!text-3xl">Never wait on an empty stomach.</h2>
          <p className="mt-2 text-sm text-muted">
            Unlock live courier map tracking, exclusive member drops, and $0 delivery fees on your first 3 orders
            directly through iOS and Android.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button className="btn !bg-stone-900 !text-white hover:!bg-stone-700">
              <Download className="size-4" /> Download on App Store
            </button>
            <button className="btn btn-outline">
              <Play className="size-4" /> Get on Google Play
            </button>
          </div>
        </div>

        <div className="flex size-36 flex-col items-center justify-center gap-2 rounded-card bg-surface shadow-card">
          <QrCode className="size-12 text-primary" />
          <span className="text-[11px] font-medium text-muted">Scan to install</span>
        </div>
      </div>
    </section>
  );
}
