import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfileCard } from "@/components/profile-card"
import { HomeStatsStrip } from "@/components/home-latest-entry"
import { StandardPreview } from "@/components/standard-preview"
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

  // "This week's eighteen" – top 10 by created time, filtering out specific profiles
  const featuredProfiles = allProfiles.filter(p => p.name !== "Kavin Ramadoss" && p.name !== "Bhuvika Tripuraneni" && p.name !== "Omuwa Izah" && p.name !== "Mohammad Parsa Parhizkar").slice(0, 10)

  return (
    <>
      <Navbar />
      <main>
        {/* Section A: Hero & Featured Profiles */}
        <section className="relative flex min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)] flex-col justify-center overflow-hidden px-5 sm:px-8 lg:px-12 mt-20 lg:mt-24">
          <div className="mx-auto w-full max-w-[1400px] relative z-10 pb-12 lg:pb-16 flex flex-col items-center text-center">
            <div className="pointer-events-none flex flex-col items-center">
              <h1 className="max-w-5xl font-serif text-[2.5rem] font-medium leading-[1.1] text-foreground text-balance pointer-events-auto sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
                Next Gen Founders. F18 found them.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-[1.8] text-muted-foreground sm:mt-8 md:text-xl lg:text-2xl">
                Verified builders under 18. Real products. Real impact. Before the world catches up.
              </p>
              <div className="mt-10 flex flex-col gap-4 pointer-events-auto sm:mt-12 sm:flex-row sm:items-center sm:justify-center">
                <Link
                  href="/explore"
                  className="inline-flex w-full items-center justify-center rounded-none bg-accent px-8 py-3.5 text-base font-medium text-accent-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-md sm:w-auto"
                >
                  Browse the F18
                </Link>
                <Link
                  target="_blank"
                  href="https://forms.gle/evkDGtdsratB7kWZ9"
                  className="inline-flex w-full items-center justify-center rounded-none border border-border bg-card px-8 py-3.5 text-base font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-secondary hover:shadow-md sm:w-auto"
                >
                  Nominate Someone
                </Link>
              </div>
            </div>

            {/* Stats Strip — Notion data */}
            <div className="pointer-events-auto w-full mt-16">
              <HomeStatsStrip />
            </div>
          </div>
        </section>

        {/* Section B: This week's eighteen — Notion data */}
        <section className="pb-20 lg:pb-32 pt-10">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                This week&apos;s eighteen.
              </h2>
              <Link
                href="/explore"
                className="group relative inline-flex w-fit shrink-0 items-center gap-2.5 overflow-hidden rounded-none border border-border bg-transparent px-4 py-2 text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase transition-all duration-300 hover:border-border/80 hover:bg-secondary hover:text-foreground md:px-5 md:py-2.5 md:text-sm"
              >
                <span className="relative">Explore More</span>
                <span
                  className="relative inline-flex h-7 w-7 items-center justify-center rounded-none border border-border bg-transparent text-sm text-foreground/90 transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-border/80"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
            
            {/* Featured Profiles Grid */}
            <div className="pointer-events-auto mt-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {featuredProfiles.slice(0, 4).map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} variant="simple" size="large" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section D: Standard Preview */}
        <StandardPreview />

      </main>
      <Footer />
    </>
  )
}
