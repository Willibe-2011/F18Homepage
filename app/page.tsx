import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfileCard } from "@/components/profile-card"
import { Hero3D } from "@/components/hero-3d"
import { HomeStatsStrip } from "@/components/home-latest-entry"
import { getPublishedProfiles } from "@/lib/notion"
import type { F18Profile } from "@/lib/data"

export const revalidate = 3600 // revalidate every hour

export default async function HomePage() {
  // Fetch published profiles from Notion, sorted by created_time desc
  let allProfiles: F18Profile[] = []
  try {
    allProfiles = await getPublishedProfiles()
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
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg md:text-2xl md:leading-normal lg:text-3xl">
              Verified builders under 18. Real products. Real impact. Before the world catches up.
            </p>
            <div className="mt-10 flex flex-col gap-3 pointer-events-auto sm:mt-14 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <Link
                href="/explore"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/30 bg-white/8 px-6 py-2.5 text-sm font-semibold text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/16 hover:shadow-[0_14px_40px_rgba(0,0,0,0.32)] sm:w-auto sm:border-2 sm:px-10 sm:py-4 sm:text-base md:py-5 md:text-lg"
              >
                <span className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,255,255,0.32),rgba(255,255,255,0)_45%),radial-gradient(120%_120%_at_100%_100%,rgba(255,255,255,0.18),rgba(255,255,255,0)_55%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="font-serif tracking-tight">Explore the F18</span>
              </Link>
              <Link
                target="_blank"
                href="https://forms.gle/evkDGtdsratB7kWZ9"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/30 bg-white/8 px-6 py-2.5 text-sm font-semibold text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/16 hover:shadow-[0_14px_40px_rgba(0,0,0,0.32)] sm:w-auto sm:border-2 sm:px-10 sm:py-4 sm:text-base md:py-5 md:text-lg"
              >
                <span className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,255,255,0.32),rgba(255,255,255,0)_45%),radial-gradient(120%_120%_at_100%_100%,rgba(255,255,255,0.18),rgba(255,255,255,0)_55%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="font-serif tracking-tight">Get Featured</span>
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
                className="group relative inline-flex w-fit shrink-0 items-center gap-2.5 overflow-hidden rounded-full border border-white/20 bg-white/6 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_6px_18px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/12 hover:text-foreground hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_26px_rgba(0,0,0,0.24)] md:px-5 md:py-2.5 md:text-sm"
              >
                <span className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,255,255,0.22),rgba(255,255,255,0)_48%),radial-gradient(120%_120%_at_100%_100%,rgba(255,255,255,0.12),rgba(255,255,255,0)_55%)] opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative">Explore More</span>
                <span
                  className="relative inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-white/10 text-sm text-foreground/90 transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-white/40 group-hover:bg-white/18"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
          {/* Mobile: vertical stack */}
          <div className="mt-10 flex flex-col gap-6 px-5 sm:px-8 md:hidden">
            {featuredProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} variant="simple" />
            ))}
          </div>
          {/* md+: horizontal rail (unchanged) */}
          <div className="mt-14 hidden overflow-x-auto pb-6 md:block">
            <div className="flex gap-8 px-8 md:px-[calc((100vw-1400px)/2+48px)]">
              {featuredProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} variant="simple" />
              ))}
            </div>
          </div>
        </section>

        {/* Section C: How It Works */}
        <section className="py-32">
          <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
            <div className="grid gap-16 md:grid-cols-3">
              <div>
                <h3 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
                  Discover
                </h3>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground lg:text-xl">
                  Browse young builders by industry, age, or accomplishment.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
                  Verify
                </h3>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground lg:text-xl">
                  Every entry is backed by evidence — no inflated claims.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
                  Connect
                </h3>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground lg:text-xl">
                  VCs and schools can request introductions through F18.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
