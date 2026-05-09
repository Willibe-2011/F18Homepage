import { unstable_noStore } from "next/cache"
import { StatsStrip } from "@/components/stats-strip"
import { getF18Stats } from "@/lib/notion"

/** Isolated component so `unstable_noStore` forces a fresh Notion read on every request. */
export async function HomeStatsStrip() {
  unstable_noStore()
  let stats = null
  try {
    stats = await getF18Stats()
  } catch {
    stats = null
  }
  if (!stats) return null
  return (
    <div className="mt-12">
      <p className="font-mono text-sm font-medium tracking-widest text-muted-foreground uppercase">
        {stats.totalCandidates} verified builders. 0 applications accepted.
      </p>
    </div>
  )
}
