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
      <main className="min-h-screen bg-background pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          
          {/* Dossier Card */}
          <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
            
            {/* Header: Photo + Identity + Record Claim */}
            <div className="flex flex-col md:flex-row">
              <div className="relative aspect-square w-full md:w-[320px] shrink-0 bg-secondary">
                <Image
                  src={heroAvatarSrc}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  <span className="text-accent">{profile.age} Y/O</span>
                  <span>•</span>
                  <span>{profile.location || "Global"}</span>
                  <span>•</span>
                  <span>{profile.industry}</span>
                </div>
                <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
                  {profile.name}
                </h1>
                {profile.breakTheRecord && (
                  <div className="mt-6 border-l-2 border-accent pl-4">
                    <p className="text-lg font-medium leading-snug text-foreground md:text-xl">
                      {profile.breakTheRecord}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 md:p-10 space-y-12 border-t border-border">
              
              {/* What they built */}
              {profile.whatTheyreBuilding && (
                <section>
                  <h2 className="font-mono text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                    What they built
                  </h2>
                  <p className="text-lg leading-relaxed text-foreground md:text-xl">
                    {profile.whatTheyreBuilding}
                  </p>
                  {profile.profileUrl && (
                    <a
                      href={profile.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Project
                    </a>
                  )}
                </section>
              )}

              {/* Verified track record */}
              {(profile.proofTraction.length > 0 || profile.evidence.length > 0) && (
                <section>
                  <h2 className="font-mono text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                    Verified track record
                  </h2>
                  <ul className="space-y-3">
                    {profile.proofTraction.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base text-foreground md:text-lg">
                        <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                    {profile.evidence.map((item, idx) => {
                      const urlMatch = item.match(/(https?:\/\/[^\s]+)/)
                      const url = urlMatch ? urlMatch[1] : null
                      const text = url ? item.replace(url, "").replace(/[—:-]\s*$/, "").trim() : item
                      return (
                        <li key={`ev-${idx}`} className="flex items-start gap-3 text-base text-foreground md:text-lg">
                          <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-green-500" />
                          <span>
                            {text}{" "}
                            {url && (
                              <a href={url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline ml-1">
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
                  <div className="grid gap-8 md:grid-cols-2">
                    {profile.letterToVC && (
                      <div className="rounded-2xl border border-border bg-secondary/20 p-6">
                        <h3 className="font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                          For VCs
                        </h3>
                        <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground">
                          {profile.letterToVC}
                        </p>
                        <CopyLetterButtons text={profile.letterToVC} type="VC" />
                      </div>
                    )}
                    {profile.letterToUniversity && (
                      <div className="rounded-2xl border border-border bg-secondary/20 p-6">
                        <h3 className="font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                          For Universities
                        </h3>
                        <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground">
                          {profile.letterToUniversity}
                        </p>
                        <CopyLetterButtons text={profile.letterToUniversity} type="University" />
                      </div>
                    )}
                  </div>
                </section>
              )}

            </div>
            
            {/* Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-secondary/30 p-6 md:px-10">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  Request Intro
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {profile.lastEditTime && <span>Updated {profile.lastEditTime}</span>}
              </div>
            </div>

          </article>
          
          <div className="mt-12 text-center">
            <Link href="/explore" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              ← Back to Explore
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
