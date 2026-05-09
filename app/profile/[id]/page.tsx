import { Fragment } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  ArrowRight,
  ExternalLink,
  CheckCircle,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CopyLetterButtons } from "@/components/copy-letter-buttons"
import { getProfileBySlug, getAllPublishedSlugs } from "@/lib/notion"
import { fetchOgImage } from "@/lib/og"

export const revalidate = 3600 // revalidate every hour
export const dynamicParams = true // render on demand if not in static params

export async function generateStaticParams() {
  try {
    const slugs = await getAllPublishedSlugs()
    return slugs.map((slug) => ({ id: slug }))
  } catch {
    return []
  }
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
        <div className="w-full">
          
          {/* Dossier Full-Screen Split Layout */}
          <article className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-6rem)]">
            
            {/* Left Column: Photo + Identity + Record Claim (Sticky on Desktop) */}
            <div className="flex w-full shrink-0 flex-col bg-card lg:w-[40vw] xl:w-[35vw] lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:border-r lg:border-border">
              <div className="relative aspect-[4/3] w-full bg-secondary shrink-0">
                <Image
                  src={heroAvatarSrc}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col p-8 pb-24 md:p-10 md:pb-32 lg:p-12 lg:pb-32 xl:p-14 xl:pb-40 overflow-y-auto custom-scrollbar">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground md:text-sm">
                  <span className="text-accent">{profile.age} Y/O</span>
                  <span>•</span>
                  <span>{profile.location || "Global"}</span>
                  <span>•</span>
                  <span>{profile.industry}</span>
                </div>
                <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                  {profile.name}
                </h1>
                {profile.breakTheRecord && (
                  <div className="mt-10 border-l-2 border-accent pl-6">
                    <p className="text-lg font-medium leading-relaxed text-foreground/90 md:text-xl xl:text-2xl">
                      {profile.breakTheRecord}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Details & Letters */}
            <div className="flex min-w-0 flex-1 flex-col bg-background">
              <div className="flex-1 space-y-16 p-8 md:p-12 lg:p-16 xl:p-20">
                
                {/* What they built */}
                {profile.whatTheyreBuilding && (
                  <section className="relative rounded-2xl border border-border border-b-[4px] bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:p-8">
                    <h2 className="mb-6 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                      What they built
                    </h2>
                    <p className="text-lg leading-[1.8] text-foreground/90 md:text-xl">
                      {profile.whatTheyreBuilding}
                    </p>
                    {profile.profileUrl && (
                      <a
                        href={profile.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Project
                      </a>
                    )}
                  </section>
                )}

                {/* Verified track record */}
                {(profile.proofTraction.length > 0 || profile.evidence.length > 0) && (
                  <section className="relative rounded-2xl border border-border border-b-[4px] bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:p-8">
                    <h2 className="mb-6 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                      Verified track record
                    </h2>
                    <ul className="space-y-4">
                      {profile.proofTraction.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-lg leading-[1.8] text-foreground/90 md:text-xl">
                          <CheckCircle className="mt-1.5 h-5 w-5 shrink-0 text-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                      {profile.evidence.map((item, idx) => {
                        const urlMatch = item.match(/(https?:\/\/[^\s]+)/)
                        const url = urlMatch ? urlMatch[1] : null
                        const text = url ? item.replace(url, "").replace(/[—:-]\s*$/, "").trim() : item
                        return (
                          <li key={`ev-${idx}`} className="flex items-start gap-4 text-lg leading-[1.8] text-foreground/90 md:text-xl">
                            <CheckCircle className="mt-1.5 h-5 w-5 shrink-0 text-accent" />
                            <span>
                              {text}{" "}
                              {url && (
                                <a href={url} target="_blank" rel="noopener noreferrer" className="ml-1 text-accent hover:underline">
                                  (source)
                                </a>
                              )}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </section>
                )}

                {/* Letters */}
                {(profile.letterToVC || profile.letterToUniversity) && (
                  <section>
                    <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
                      {profile.letterToVC && (
                        <div className="relative rounded-3xl border border-border border-b-[4px] bg-secondary/30 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md md:p-10">
                          <h3 className="mb-6 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                            For VCs
                          </h3>
                          <p className="whitespace-pre-wrap text-lg leading-[1.8] text-foreground/90 md:text-xl">
                            {profile.letterToVC}
                          </p>
                          <div className="mt-8">
                            <CopyLetterButtons text={profile.letterToVC} type="VC" />
                          </div>
                        </div>
                      )}
                      {profile.letterToUniversity && (
                        <div className="relative rounded-3xl border border-border border-b-[4px] bg-secondary/30 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md md:p-10">
                          <h3 className="mb-6 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                            For Universities
                          </h3>
                          <p className="whitespace-pre-wrap text-lg leading-[1.8] text-foreground/90 md:text-xl">
                            {profile.letterToUniversity}
                          </p>
                          <div className="mt-8">
                            <CopyLetterButtons text={profile.letterToUniversity} type="University" />
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                )}

              </div>
              
              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 border-t border-border bg-background p-8 md:p-12 lg:p-16 xl:p-20">
                <div className="flex flex-wrap items-center gap-6">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-10 py-4 text-lg font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                  >
                    Request Intro
                  </button>
                </div>
                <div className="flex items-center text-sm font-medium tracking-wide text-muted-foreground">
                  {profile.lastEditTime && <span>Updated {profile.lastEditTime}</span>}
                </div>
              </div>

            </div>

          </article>

        </div>
      </main>
      <Footer />
    </>
  )
}
