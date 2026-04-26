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
    <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:mt-14 sm:rounded-2xl md:mt-16 md:grid-cols-4">
      {items.map(({ value, label }) => (
        <div
          key={label}
          className="group flex flex-col bg-background px-4 py-6 transition-colors duration-200 hover:bg-accent/5 sm:px-6 sm:py-8 md:px-8 md:py-10"
        >
          <span
            className="font-serif text-4xl font-bold leading-none tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent sm:text-5xl md:text-7xl lg:text-8xl"
          >
            {value}
          </span>
          <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:mt-4 sm:text-sm">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
