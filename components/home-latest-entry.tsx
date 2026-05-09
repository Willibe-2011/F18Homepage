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
    <div className="mt-16 w-full text-left">
      <StatsStrip stats={stats} />
    </div>
  )
}
