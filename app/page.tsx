import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfileCard } from "@/components/profile-card"
import { Hero3D } from "@/components/hero-3d"
import { HomeStatsStrip } from "@/components/home-latest-entry"
import { getAllProfiles } from "@/lib/notion"
import type { F18Profile } from "@/lib/data"

export const revalidate = 3600 // revalidate every hour

export default async function HomePage() {
  // Fetch published profiles from Notion, sorted by created_time desc
  let allProfiles: F18Profile[] = []
  try {
    allProfiles = await getAllProfiles()
  } catch {
    allProfiles = []
  }

  // "This week's eighteen" – top 10 by created time
  const featuredProfiles = allProfiles.slice(0, 10)

  return (
    <>
      <Navbar />
      <main>
        {/* Section A: Hero */}
        <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-5 pt-20 sm:px-8 sm:pt-24 lg:px-12 lg:pt-28">
          <Hero3D />
          <div className="mx-auto w-full max-w-[1400px] relative z-10 pointer-events-none">
            <h1 className="max-w-4xl font-serif text-[2.25rem] font-bold leading-[1.12] text-foreground text-balance pointer-events-auto sm:text-5xl md:text-6xl md:leading-tight lg:text-7xl xl:text-8xl">
              Next Gen Founders. F18 found them.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-[1.8] text-muted-foreground sm:mt-8 md:text-xl lg:text-2xl">
              Verified builders under 18. Real products. Real impact. Before the world catches up.
            </p>
            <div className="mt-10 flex flex-col gap-3 pointer-events-auto sm:mt-14 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <Link
                href="/explore"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 bg-transparent px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-white/40 hover:bg-white/5 sm:w-auto sm:px-10 sm:py-4 sm:text-base md:py-5 md:text-lg"
              >
                <span className="font-serif tracking-tight">Browse the F18</span>
              </Link>
            </div>

            {/* Stats Strip — Notion data (CANDIDATES, COUNTRIES, INDUSTRIES, AVG AGE) */}
            <div className="pointer-events-auto">
              <HomeStatsStrip />
            </div>
          </div>
        </section>

        {/* Section B: This week's eighteen — Notion data */}
        <section className="py-32">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                This week&apos;s eighteen.
              </h2>
              <Link
                href="/explore"
                className="group relative inline-flex w-fit shrink-0 items-center gap-2.5 overflow-hidden rounded-full border border-white/20 bg-transparent px-4 py-2 text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase transition-all duration-300 hover:border-white/40 hover:bg-white/5 hover:text-foreground md:px-5 md:py-2.5 md:text-sm"
              >
                <span className="relative">Explore More</span>
                <span
                  className="relative inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-transparent text-sm text-foreground/90 transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-white/40"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 mt-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProfiles.slice(0, 4).map((profile) => (
                <ProfileCard key={profile.id} profile={profile} variant="simple" size="large" />
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
