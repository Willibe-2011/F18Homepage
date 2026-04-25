import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfileCard } from "@/components/profile-card"
import { mockProfiles } from "@/lib/data"
import { Hero3D } from "@/components/hero-3d"

export default function HomePage() {
  const featuredProfiles = mockProfiles.slice(0, 6)

  const stats = [
    {
      label: "Avg Age",
      value: Math.round(
        mockProfiles.reduce((sum, p) => sum + p.age, 0) / mockProfiles.length
      ),
    },
    {
      label: "Countries",
      value: new Set(mockProfiles.map((p) => p.location.split(", ").pop()))
        .size,
    },
    {
      label: "Total Candidates",
      value: mockProfiles.length,
    },
    {
      label: "Industries",
      value: new Set(mockProfiles.map((p) => p.industry)).size,
    },
  ]

  return (
    <>
      <Navbar />
      <main>
        {/* Section A: Hero */}
        <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-8 pt-24 lg:px-12 lg:pt-28">
          <Hero3D />
          <div className="mx-auto w-full max-w-[1400px] relative z-10 pointer-events-none">
            {/* Pointer events none on container, auto on children so 3D background can be dragged/interacted if we want, but actually it's fine */}
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
                href="/get-featured"
                className="inline-flex items-center gap-3 rounded-full border-2 border-foreground px-10 py-5 text-lg font-semibold text-foreground transition-colors hover:bg-foreground/10"
              >
                Get Featured
              </Link>
            </div>
            <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6 lg:gap-8 pointer-events-auto">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border border-white/20 bg-background/40 p-8 lg:min-h-[340px] lg:p-12 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-2 hover:border-white/40 hover:bg-muted/50 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  {/* Top: Massive Number */}
                  <span className="relative z-10 font-serif text-7xl font-bold tracking-tight text-foreground md:text-8xl lg:text-9xl">
                    {stat.value}
                  </span>

                  {/* Bottom: Label */}
                  <span className="relative z-10 text-sm font-semibold tracking-widest text-muted-foreground uppercase md:text-base">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section B: Featured Strip */}
        <section className="py-32">
          <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
            <div className="flex items-end justify-between border-b border-white/10 pb-6">
              <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                Newest Founders
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
          <div className="mt-14 mx-auto max-w-[1400px] px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
