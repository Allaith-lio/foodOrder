// Small orange label + big title, with optional content on the right
export default function SectionHeading({ label, title, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3 ">
      <div>
        <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-primary">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          {label}
        </p>
        <h2 className="text-2xl! md:text-3xl!">{title}</h2>
      </div>
      {children}
    </div>
  );
}
