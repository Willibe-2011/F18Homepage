import { Fragment } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Globe,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StickyIntroBar } from "@/components/sticky-intro-bar"
import { getProfileBySlug, getAllPublishedSlugs } from "@/lib/notion"
import { fetchOgImage } from "@/lib/og"

export const revalidate = 3600 // revalidate every hour
export const dynamicParams = true // render on demand if not in static params

export async function generateStaticParams() {
  try {
    const slugs = await getAllPublishedSlugs()
    return slugs.map((slug) => ({ id: slug }))
  } catch {
    // If Notion is unreachable at build time, pages will be generated on demand
    return []
  }
}

// Eyebrow / section number component for editorial feel
function SectionEyebrow({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-sm font-medium tracking-widest text-accent lg:text-base">
        {number}
      </span>
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground lg:text-base">
        {label}
      </span>
    </div>
  )
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const profile = await getProfileBySlug(id)

  if (!profile) {
    notFound()
  }

  // Pre-fetch OG images for all evidence URLs in parallel (server-side, cached 24 h)
  const evidenceUrls = profile.evidence.map((item) => {
    const m = item.match(/(https?:\/\/[^\s]+)/)
    return m ? m[1] : null
  })
  const ogImages = await Promise.all(
    evidenceUrls.map((url) => (url ? fetchOgImage(url) : Promise.resolve(null))),
  )

  const showVCCard = profile.lookingFor === "vc" || profile.lookingFor === "both"
  const showUniversityCard =
    profile.lookingFor === "university" || profile.lookingFor === "both"

  // TL;DR – first sentence of "what they're building", capped to feel snappy
  const tldr = profile.whatTheyreBuilding.split(". ")[0].replace(/\.$/, "") + "."

  const heroAvatarSrc =
    profile.pictureUrl ||
    `/placeholder.svg?height=720&width=720&query=editorial%20portrait%20photo%20of%20a%20${profile.age}%20year%20old%20${profile.gender.toLowerCase()}%20founder%20from%20${encodeURIComponent(
      profile.location,
    )}%2C%20natural%20light%2C%20warm%20tones%2C%20muted%20background`

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20 lg:pt-24">
        {/* ============================================
            HERO — Single screen, VC-first CTA in view
            ============================================ */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1400px] px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 xl:gap-20">
              {/* LEFT — Avatar (square, anchor of the page) */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-secondary shadow-xl">
                  <Image
                    src={heroAvatarSrc}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Quick facts under the avatar */}
                <dl className="mt-8 grid grid-cols-2 divide-x divide-border border-y border-border py-4 text-center">
                  <div className="px-2">
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                      Age
                    </dt>
                    <dd className="mt-1 font-serif text-3xl font-bold text-accent lg:text-4xl">
                      {profile.age}
                    </dd>
                  </div>
                  <div className="px-2">
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                      Industry
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-foreground lg:text-base">
                      {profile.industry}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* RIGHT — Identity, TL;DR, CTA */}
              <div className="flex flex-col">
                {/* Eyebrow */}
                <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground lg:text-base">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  Founder · F18
                </div>

                {/* Name */}
                <h1 className="mt-6 font-serif text-5xl font-bold leading-[1.02] text-foreground md:text-6xl lg:text-7xl xl:text-[88px] text-balance">
                  {profile.name}
                </h1>

                {/* TL;DR — one-line elevator pitch */}
                <p className="mt-10 text-2xl leading-snug text-foreground lg:text-3xl xl:text-[34px] text-balance">
                  Building{" "}
                  <span className="font-serif italic text-accent">
                    {profile.project}
                  </span>
                  .
                </p>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
                  {tldr}
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                  <button className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-5 text-lg font-semibold text-accent-foreground shadow-lg transition-all hover:bg-accent/90 hover:shadow-xl lg:text-xl">
                    Request an Intro
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  {profile.profileUrl && (
                    <a
                      href={profile.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground px-8 py-5 text-lg font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Visit Profile
                    </a>
                  )}
                </div>

                {/* Tertiary links */}
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground lg:text-base">
                  <span>Updated {profile.lastEditTime}</span>
                  {profile.location && (
                    <span>{profile.location}</span>
                  )}
                  {profile.socialMedia && (
                    <a
                      href={profile.socialMedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      Social
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            01 — THE RECORD (editorial pull-quote)
            ============================================ */}
        {profile.breakTheRecord && (
          <section className="border-b border-border bg-accent/[0.04]">
            <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
              <SectionEyebrow number="01" label="The Record" />
              <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
                {/* Left: the record statement */}
                <div className="lg:col-span-7 lg:pr-4">
                  <p className="font-serif text-4xl font-bold leading-[1.1] text-foreground md:text-5xl lg:text-6xl xl:text-7xl text-balance">
                    {profile.breakTheRecord}
                  </p>
                  {profile.evidence[0] && (
                    <a
                      href={profile.evidence[0].match(/(https?:\/\/[^\s]+)/)?.[0] || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-10 inline-flex items-center gap-3 text-lg text-accent transition-colors hover:underline lg:text-xl"
                    >
                      See the proof
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  )}
                </div>
                {/* Right: visual proof */}
                <figure className="lg:col-span-5">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-secondary shadow-lg">
                    <Image
                      src="/placeholder.svg?height=900&width=720"
                      alt={`${profile.name} achieving the record`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </figure>
              </div>
            </div>
          </section>
        )}

        {/* ============================================
            02 — WHAT THEY'RE BUILDING
            ============================================ */}
        {profile.whatTheyreBuilding && (
          <section className="border-b border-border">
            <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
              <SectionEyebrow number="02" label="What they're building" />
              <h2 className="mt-8 font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
                {profile.project}
              </h2>
              <p className="mt-10 text-xl leading-relaxed text-muted-foreground lg:text-2xl">
                {profile.whatTheyreBuilding}
              </p>

              {/* Product screenshot placeholder */}
              <figure className="mt-16 lg:mt-20">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-secondary shadow-xl">
                  <Image
                    src="/placeholder.svg?height=900&width=1600"
                    alt={`${profile.project} product screenshot`}
                    fill
                    className="object-cover"
                  />
                </div>
              </figure>
            </div>
          </section>
        )}

        {/* ============================================
            03 — WHY IT MATTERS
            ============================================ */}
        {profile.whyItMatters.length > 0 && (
          <section className="border-b border-border bg-accent/[0.04]">
            <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
              <SectionEyebrow number="03" label="Why it matters" />
              <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
                {profile.whyItMatters.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-col gap-5 border-t-2 border-foreground pt-6"
                  >
                    <span className="font-mono text-sm font-medium text-accent lg:text-base">
                      0{index + 1}
                    </span>
                    <p className="text-lg leading-relaxed text-foreground lg:text-xl">
                      {item}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* ============================================
            04 — PROOF & PRESS
            ============================================ */}
        {(profile.proofTraction.length > 0 || profile.evidence.length > 0) && (
          <section className="border-b border-border bg-secondary/30">
            <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
              <SectionEyebrow number="04" label="Proof & Press" />

              {/* Traction highlights */}
              {profile.proofTraction.length > 0 && (
                <ul className="mt-10 flex flex-col gap-3 border-l-2 border-accent pl-6 lg:gap-4">
                  {profile.proofTraction.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-base leading-relaxed text-foreground lg:text-lg"
                    >
                      <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Press cards */}
              {profile.evidence.length > 0 && (
                <div className="mt-16 lg:mt-20">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground lg:text-sm">
                    As featured in
                  </p>
                  <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:gap-6">
                    {profile.evidence.map((item, index) => {
                      const urlMatch = item.match(/(https?:\/\/[^\s]+)/)
                      const url = urlMatch ? urlMatch[1] : null
                      const text = url
                        ? item
                            .replace(url, "")
                            .replace(/[—:\-]\s*$/, "")
                            .trim()
                        : item
                      const host = url
                        ? new URL(url).hostname.replace(/^www\./, "")
                        : ""
                      const ogImage = ogImages[index]

                      return (
                        <li key={index}>
                          <a
                            href={url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
                          >
                            {/* ── Image area ── unified 16/9 skeleton ── */}
                            <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
                              {ogImage ? (
                                /* Real OG / Twitter card image */
                                <Image
                                  src={ogImage}
                                  alt={`${host} article preview`}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  unoptimized
                                />
                              ) : (
                                /* Branded placeholder — same height, never a broken tile */
                                <div className="flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-secondary via-secondary/70 to-accent/10 px-8">
                                  {/* Favicon ring */}
                                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                                    {host ? (
                                      /* eslint-disable-next-line @next/next/no-img-element */
                                      <img
                                        src={`https://www.google.com/s2/favicons?domain=${host}&sz=64`}
                                        alt={host}
                                        width={32}
                                        height={32}
                                        className="h-8 w-8 rounded-sm"
                                      />
                                    ) : (
                                      <Globe className="h-8 w-8 text-muted-foreground" />
                                    )}
                                  </div>
                                  {/* Domain label */}
                                  {host && (
                                    <span className="font-mono text-sm font-medium tracking-wide text-muted-foreground">
                                      {host}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* ── Text area ── */}
                            <div className="flex flex-1 flex-col justify-between gap-6 p-6 lg:p-8">
                              <p className="text-lg font-medium leading-snug text-foreground lg:text-xl">
                                {text || host}
                              </p>
                              {url && (
                                <span className="inline-flex items-center justify-between gap-3">
                                  <span className="font-mono text-sm text-muted-foreground lg:text-base">
                                    {host}
                                  </span>
                                  <ExternalLink className="h-5 w-5 text-accent transition-transform group-hover:translate-x-0.5" />
                                </span>
                              )}
                            </div>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ============================================
            05 — THEIR STORY (long-form)
            ============================================ */}
        {profile.personalArticle && (
          <section className="border-b border-border bg-accent/[0.04]">
            <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
              <div className="flex flex-wrap items-center gap-6">
                <SectionEyebrow number="05" label="Their Story" />
                {profile.readPublish && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-800">
                    <CheckCircle className="h-4 w-4" />
                    Published
                  </span>
                )}
              </div>

              <article className="mt-12">
                {profile.personalArticle.split("\n\n").map((paragraph, i, arr) => (
                  <Fragment key={i}>
                    <p
                      className={`mb-8 leading-[1.7] text-foreground last:mb-0 ${
                        i === 0
                          ? "font-serif text-2xl lg:text-3xl"
                          : "text-lg lg:text-xl"
                      }`}
                    >
                      {paragraph}
                    </p>
                    {/* Editorial b-roll image — visual breathing point mid-article */}
                    {i === 0 && arr.length > 1 && (
                      <figure className="my-12 lg:my-16">
                        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-border bg-secondary shadow-md">
                          <Image
                            src="/placeholder.svg?height=800&width=1900"
                            alt={`${profile.name} at work`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {profile.location && (
                          <figcaption className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground lg:text-sm">
                            At work · {profile.location}
                          </figcaption>
                        )}
                      </figure>
                    )}
                  </Fragment>
                ))}
              </article>
            </div>
          </section>
        )}

        {/* ============================================
            06 — OFFICIAL LETTERS
            ============================================ */}
        {(profile.letterToVC || profile.letterToUniversity) && (
          <section className="border-b border-border bg-secondary/30">
            <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
              <SectionEyebrow number="06" label="Official Letters" />
              <div className="mt-12 grid gap-10 xl:grid-cols-2">
                {profile.letterToVC && (
                  <div className="rounded-3xl border border-border bg-card p-8 lg:p-12">
                    <div className="mb-6 flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 font-mono text-sm font-bold text-accent">
                        VC
                      </span>
                      <h3 className="font-serif text-xl font-bold text-foreground lg:text-2xl">
                        Letter to Investors
                      </h3>
                    </div>
                    <div className="max-h-[480px] overflow-y-auto pr-2">
                      <p className="whitespace-pre-wrap text-base leading-relaxed text-muted-foreground lg:text-lg">
                        {profile.letterToVC}
                      </p>
                    </div>
                  </div>
                )}
                {profile.letterToUniversity && (
                  <div className="rounded-3xl border border-border bg-card p-8 lg:p-12">
                    <div className="mb-6 flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 font-mono text-sm font-bold text-accent">
                        EDU
                      </span>
                      <h3 className="font-serif text-xl font-bold text-foreground lg:text-2xl">
                        Letter to Admissions
                      </h3>
                    </div>
                    <div className="max-h-[480px] overflow-y-auto pr-2">
                      <p className="whitespace-pre-wrap text-base leading-relaxed text-muted-foreground lg:text-lg">
                        {profile.letterToUniversity}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ============================================
            07 — CONNECT (closing CTA)
            ============================================ */}
        {(showVCCard || showUniversityCard) && (
          <section className="border-b border-border bg-accent/[0.04]">
            <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
              <SectionEyebrow number="07" label="Connect" />
              <h2 className="mt-8 max-w-4xl font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl text-balance">
                Want to back, recruit, or partner with{" "}
                {profile.name.split(" ")[0]}?
              </h2>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground lg:text-xl">
                All introductions are facilitated through F18 to protect the
                founder&apos;s time and privacy.
              </p>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                {showVCCard && (
                  <button className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-10 py-6 text-lg font-semibold text-accent-foreground shadow-lg transition-all hover:bg-accent/90 hover:shadow-xl lg:text-xl">
                    Request an Investor Intro
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
                {showUniversityCard && (
                  <button className="group inline-flex items-center justify-center gap-3 rounded-full border-2 border-foreground px-10 py-6 text-lg font-semibold text-foreground transition-all hover:bg-foreground hover:text-background lg:text-xl">
                    Request a University Intro
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-3 text-base text-muted-foreground transition-colors hover:text-foreground lg:text-lg"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Explore
              </Link>
              <span className="text-sm text-muted-foreground lg:text-base">
                Last updated {profile.lastEditTime}
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Sticky CTA bar — appears after Hero scrolls out */}
      <StickyIntroBar
        name={profile.name}
        age={profile.age}
        location={profile.location}
        pictureUrl={profile.pictureUrl}
        record={profile.breakTheRecord}
      />
    </>
  )
}
