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
        <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-8 pt-24 lg:px-12 lg:pt-28">
          <Hero3D />
          <div className="mx-auto w-full max-w-[1400px] relative z-10 pointer-events-none">
            <h1 className="max-w-4xl font-serif text-5xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl xl:text-8xl text-balance pointer-events-auto">
              Next Gen Founders. F18 found them.
            </h1>
            <p className="mt-8 max-w-2xl text-xl text-muted-foreground md:text-2xl lg:text-3xl">
              Verified builders under 18. Real products. Real impact. Before the world catches up.
            </p>
            <div className="mt-14 flex flex-wrap items-center gap-6 pointer-events-auto">
              <Link
                href="/explore"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-10 py-5 text-lg font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Explore the F18
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
              <Link
                target="_blank"
                href="https://forms.gle/evkDGtdsratB7kWZ9"
                className="inline-flex items-center gap-3 rounded-full border-2 border-foreground px-10 py-5 text-lg font-semibold text-foreground transition-colors hover:bg-foreground/10"
              >
                Get Featured
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
          <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
            <div className="flex items-end justify-between border-b border-white/10 pb-6">
              <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                This week&apos;s eighteen.
              </h2>
              <Link
                href="/explore"
                className="group flex items-center gap-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground md:text-base"
              >
                Explore More
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-14 overflow-x-auto pb-6">
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
