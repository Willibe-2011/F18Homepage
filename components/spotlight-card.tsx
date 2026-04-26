import Link from "next/link"
import type { F18Profile } from "@/lib/data"
import { ProfileImageFill } from "@/components/profile-image-fill"

interface SpotlightCardProps {
  profile: F18Profile
}

export function SpotlightCard({ profile }: SpotlightCardProps) {
  const traction = profile.proofTraction.slice(0, 3)
  const why = profile.whyItMatters.slice(0, 3)

  return (
    <section className="relative overflow-hidden bg-foreground py-24 lg:py-32">
      {/* Subtle background grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-8 lg:px-12">
        {/* Label row */}
        <div className="mb-12 flex items-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Founder Spotlight
          </span>
          <span className="text-sm text-white/40">
            {profile.location}
          </span>
          <span className="text-white/20">·</span>
          <span className="text-sm text-white/40">{profile.industry}</span>
        </div>

        {/* Main grid */}
        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-20">
          {/* Left: content */}
          <div className="flex flex-col justify-between">
            {/* Age + Name */}
            <div>
              {profile.age > 0 && (
              <div className="flex items-baseline gap-5">
                <span className="font-serif text-[7rem] font-bold leading-none text-accent lg:text-[10rem]">
                  {profile.age}
                </span>
                <span className="text-sm font-semibold uppercase tracking-widest text-white/40">
                  years old
                </span>
              </div>
            )}
              <h2 className="mt-2 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                {profile.name}
              </h2>

              {/* Project name */}
              <div className="mt-6 inline-block rounded-lg bg-white/10 px-5 py-3">
                <p className="text-sm font-semibold uppercase tracking-widest text-white/60">
                  Project
                </p>
                <p className="mt-1 text-xl font-bold text-white lg:text-2xl">
                  {profile.project}
                </p>
              </div>
            </div>

            {/* Break-the-record achievement */}
            {profile.breakTheRecord && (
              <div className="mt-10 border-l-2 border-accent pl-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Break the Record
                </p>
                <p className="mt-2 text-lg font-medium leading-relaxed text-white/90 lg:text-xl">
                  {profile.breakTheRecord}
                </p>
              </div>
            )}

            {/* Why It Matters */}
            {why.length > 0 && (
              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                  Why It Matters
                </p>
                <ul className="mt-4 space-y-3">
                  {why.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <span className="text-base leading-relaxed text-white/70 lg:text-lg">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Proof traction */}
            {traction.length > 0 && (
              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                  Proof of Traction
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {traction.map((item, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-12">
              <Link
                href={`/profile/${profile.slug}`}
                className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                Read her story
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Right: photo */}
          <div className="relative order-first flex items-start lg:order-last">
            {profile.pictureUrl ? (
              <div className="relative w-full overflow-hidden rounded-2xl">
                <div className="relative aspect-[3/4] w-full">
                  <ProfileImageFill
                    primarySrc={profile.pictureUrl}
                    alt={profile.name}
                    className="object-cover object-top"
                    initialsClassName="flex h-full w-full items-center justify-center bg-white/10 font-serif text-6xl font-bold tracking-tight text-white/50 lg:text-8xl"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-foreground/80 to-transparent" />
              </div>
            ) : (
              <div className="flex aspect-[3/4] w-full items-center justify-center rounded-2xl bg-white/5">
                <span className="font-serif text-8xl font-bold text-white/20">
                  {profile.age}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
