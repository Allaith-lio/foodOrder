const riskStyles = {
  low: { label: "Low risk", classes: "bg-tertiary/10 text-tertiary" },
  medium: { label: "Medium risk", classes: "bg-secondary/15 text-secondary" },
  high: { label: "High risk", classes: "bg-red-500/10 text-red-500" },
};

const statusStyles = {
  active: { label: "Active", classes: "bg-tertiary/10 text-tertiary", dot: "bg-tertiary" },
  blocked: { label: "Blocked", classes: "bg-red-500/10 text-red-500", dot: "bg-red-500" },
};

// Small colored pill: how risky the account looks.
export function RiskBadge({ level }) {
  const { label, classes } = riskStyles[level];
  return <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold ${classes}`}>{label}</span>;
}

// Small colored pill: is the account active or blocked.
export function StatusBadge({ status }) {
  const { label, classes, dot } = statusStyles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${classes}`}>
      <span className={`size-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
