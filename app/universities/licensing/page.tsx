import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

/** Hero metric cards with video slots (yes/no % cards removed). */
const HERO_METRICS = [
  {
    value: "33.3%",
    label: "Said it depends",
    youtubeId: "",
  },
  {
    value: "142",
    label: "Completed interview videos",
    youtubeId: "",
  },
  {
    value: "343",
    label: "Structured rows you can audit",
    youtubeId: "",
  },
  {
    value: "298",
    label: "Cold approaches on campus",
    youtubeId: "",
  },
]

export default function UniversitiesLicensingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Full-viewport project reel */}
        <section className="relative h-svh w-full overflow-hidden bg-foreground text-background">
          {/* Replace with video when the master cut is ready */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-background/40 bg-background/10 backdrop-blur-sm">
              <span className="ml-1 border-y-[10px] border-l-[18px] border-y-transparent border-l-background" />
            </span>
            <p className="max-w-xs text-lg font-semibold leading-snug text-balance">
              Project reel
            </p>
            <p className="text-lg text-background/60">
              Video placeholder
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center sm:bottom-10">
            <a
              href="#licensing-content"
              className="grid h-12 w-12 animate-bounce place-items-center rounded-full border border-background/35 bg-background/15 backdrop-blur-sm transition-colors hover:bg-background/25"
              aria-label="Scroll down"
            >
              <ChevronDown className="h-5 w-5 text-background" strokeWidth={2.5} aria-hidden />
            </a>
          </div>
        </section>

        <div id="licensing-content" className="mx-auto max-w-[1400px] px-5 pb-24 pt-20 sm:px-8 lg:px-12 lg:pb-32 lg:pt-28">
          {/* Wireframe intro: metrics → who / value */}
          <section className="w-full">
            <p className="mx-auto max-w-3xl text-center text-lg font-semibold leading-snug text-balance text-foreground">
              12 of the best schools across the US have spoken.
            </p>

            <ul className="mx-auto mt-16 grid max-w-5xl gap-x-6 gap-y-24 sm:mt-20 sm:gap-x-8 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-32">
              {HERO_METRICS.map((item) => (
                <li
                  key={item.label}
                  className="border border-primary/15 bg-[#F8FAFC] p-3 sm:p-4"
                >
                  <div className="min-w-0 px-1">
                    <p className="text-lg font-semibold leading-none text-foreground">
                      {item.value}
                    </p>
                    <p className="mt-1.5 text-lg leading-snug text-foreground/65">
                      {item.label}
                    </p>
                  </div>

                  <div className="relative mt-3 aspect-video w-full overflow-hidden border border-primary/20 bg-primary/95">
                    {item.youtubeId ? (
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube.com/embed/${item.youtubeId}`}
                        title={item.label}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center text-background">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-background/35 bg-background/10">
                          <span className="ml-0.5 border-y-[7px] border-l-[12px] border-y-transparent border-l-background" />
                        </span>
                        <p className="text-lg text-background/60">
                          YouTube video
                        </p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mx-auto mt-24 grid max-w-5xl gap-6 sm:mt-28 lg:mt-32 lg:grid-cols-2 lg:gap-10">
              <div className="border border-border bg-card p-5 sm:p-6">
                <p className="text-lg font-semibold text-foreground">
                  Who needs our videos
                </p>
                <p className="mt-3 text-lg leading-[1.8] text-foreground/90">
                  You run AI courses, founder camps, or growth programs. Every ad, livestream, and parent briefing answers the same question:{" "}
                  <strong className="font-semibold text-foreground">after this, what can they actually make?</strong>{" "}
                  You do not lack students or instructors. You lack an answer the other side can verify themselves — and that is who these videos are for.
                </p>
              </div>
              <div className="border border-border bg-card p-5 sm:p-6">
                <p className="text-lg font-semibold text-foreground">
                  Our value
                </p>
                <p className="mt-3 text-lg leading-[1.8] text-foreground/90">
                  Not polished testimonials — auditable proof. Three hundred forty-three structured rows, original video on every interview, and 156 rejections left in the same table. Parents do not have to trust you. They can check.
                </p>
              </div>
            </div>
          </section>

          {/* CTA → full commercial offer */}
          <section className="mt-20 border-t border-border pt-14 md:mt-28 md:pt-20">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-serif text-2xl font-bold leading-[1.15] text-balance text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                You sell the dream. Borrow the proof.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.8] text-foreground/90 sm:mt-8">
                Full commercial licensing — what the package includes, why it converts, and five ways it becomes your enrollment engine.
              </p>
              <Link
                href="/universities/licensing/offer"
                className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 border border-foreground bg-foreground px-6 py-3.5 text-lg font-semibold text-background transition-colors hover:bg-foreground/90 sm:mt-10 sm:w-auto sm:px-8"
              >
                Read the commercial offer
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </Link>
            </div>
          </section>

          {/* Final ask */}
          <section className="mt-20 border-t border-border pt-14 md:mt-28 md:pt-20">
            <h2 className="mx-auto max-w-3xl text-center text-lg font-semibold leading-snug text-foreground">
              Ask for a read-only database link. Spend ten minutes.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-[1.8] text-foreground/90">
              Pick a random row. I will send the matching original video. If it is useful after you check, we talk about how to work together.
            </p>

            <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4">
              <Link
                href="/universities"
                className="inline-flex items-center justify-center border border-border px-6 py-3.5 text-lg font-semibold text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground sm:px-8"
              >
                Back to the project
              </Link>
            </div>
            <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-muted-foreground">
              Contact:{" "}
              <a href="mailto:will@hao.com.co" className="text-accent underline-offset-4 hover:underline">
                will@hao.com.co
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
