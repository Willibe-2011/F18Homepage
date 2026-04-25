import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfileCard } from "@/components/profile-card"

import type { F18Profile } from "@/lib/data"
import { HomeStatsStrip } from "@/components/home-latest-entry"
import { getPublishedProfiles } from "@/lib/notion"

export const revalidate = 3600 // revalidate every hour

export default async function HomePage() {
  // Fetch published profiles from Notion, sorted by created_time desc
  let allProfiles: F18Profile[] = []
  try {
    allProfiles = await getPublishedProfiles()
  } catch {
    // Fallback to empty list if Notion is unreachable
    allProfiles = []
  }

  // "This week's eighteen" – top 10 by created time
  const featuredProfiles = allProfiles.slice(0, 10)

  return (
    <>
      <Navbar />
      <main>
        {/* Section A: Hero */}
        <section className="flex min-h-screen flex-col justify-center px-8 pt-24 lg:px-12 lg:pt-28">
          <div className="mx-auto w-full max-w-[1400px]">
            <h1 className="max-w-4xl font-serif text-6xl font-bold leading-tight text-foreground md:text-7xl lg:text-8xl xl:text-9xl text-balance">
              Eighteen and already changing things.
            </h1>
            <p className="mt-8 max-w-2xl text-xl text-muted-foreground md:text-2xl lg:text-3xl">
              F18 is a registry of people under 18 who built something that
              matters.
            </p>
            <HomeStatsStrip />
            <div className="mt-14 flex flex-wrap items-center gap-6">
              <Link
                href="/explore"
                className="inline-flex items-center gap-3 rounded-full bg-accent px-10 py-5 text-lg font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Explore the F18
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/get-featured"
                className="inline-flex items-center gap-3 rounded-full border-2 border-foreground px-10 py-5 text-lg font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Get Featured
              </Link>
            </div>
            <p className="mt-20 text-lg text-muted-foreground">
              <span className="mr-3">▸</span>
              {allProfiles.length} featured · updated this week
            </p>
          </div>
        </section>

        {/* Section C: Featured Strip */}
        <section className="py-32">
          <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
            <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              This week&apos;s eighteen.
            </h2>
          </div>
          <div className="mt-14 overflow-x-auto pb-6">
            <div className="flex gap-8 px-8 md:px-[calc((100vw-1400px)/2+48px)]">
              {featuredProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
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
