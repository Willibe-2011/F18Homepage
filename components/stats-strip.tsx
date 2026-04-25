import type { F18Stats } from "@/lib/notion"

interface StatItem {
  value: string
  label: string
  suffix?: string
}

function fmt(n: number, decimals = 0): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

function buildStats(s: F18Stats): StatItem[] {
  return [
    { value: fmt(s.totalCandidates), label: "Candidates" },
    { value: fmt(s.countriesCount), label: "Countries" },
    { value: fmt(s.industriesCount), label: "Industries" },
    { value: fmt(s.avgAge, 1), label: "Avg Age" },
  ]
}

export function StatsStrip({ stats }: { stats: F18Stats | null }) {
  if (!stats) return null
  const items = buildStats(stats)

  return (
    <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
      {items.map(({ value, label }) => (
        <div
          key={label}
          className="group flex flex-col bg-background px-8 py-10 transition-colors duration-200 hover:bg-accent/5"
        >
          <span
            className="font-serif text-6xl font-bold leading-none tracking-tight text-foreground
                       transition-colors duration-200 group-hover:text-accent md:text-7xl lg:text-8xl"
          >
            {value}
          </span>
          <span className="mt-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
