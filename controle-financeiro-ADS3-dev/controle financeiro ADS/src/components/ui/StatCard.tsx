interface StatCardProps {
  label: string;
  value: string;
  tone?: "default" | "success" | "danger";
  helper: string;
}

export function StatCard({ label, value, tone = "default", helper }: StatCardProps) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{helper}</span>
    </article>
  );
}
