import { EvidenceSourcesCarousel } from "@/components/evidence-sources-carousel"

export function StandardPreview() {
  return (
    <>
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-[1400px] px-8 text-center lg:px-12">
          {/* Section Label */}
          <p className="mb-12 text-[10px] font-black uppercase tracking-[0.4em] text-foreground">
            Evidence Sourced From
          </p>
          <EvidenceSourcesCarousel />
        </div>
      </section>

      <section className="bg-black py-32 text-background">
        <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
          <div className="grid gap-32 lg:grid-cols-2 lg:items-center lg:gap-40">
            {/* Left: Headline */}
            <div>
              <div className="mb-12 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-background">
                The F18 Standard
              </div>
              <h2 className="font-serif text-5xl font-bold leading-tight md:text-6xl italic text-background">
                Every claim is a <br /> matter of public record.
              </h2>
              <p className="mt-12 max-w-xl font-serif text-xl italic leading-relaxed text-background/40 md:text-2xl lg:mb-4">
                F18 is not a nomination-based list. It is an independently maintained index of builders whose work has already been verified by the market, the media, or major institutions.
              </p>
            </div>

            {/* Right: The Three Pillars */}
            <div className="relative mt-8 space-y-12 lg:mt-12">
              {/* Decorative vertical line */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-background/10 hidden md:block"></div>

              {[
                {
                  title: "Independently Sourced",
                  desc: "We don't accept applications. Every entry is identified through public, third-party records.",
                },
                {
                  title: "Measurable Impact",
                  desc: "Achievements must have a real-world outcome — funding, revenue, users, or major awards.",
                },
                {
                  title: "Verified Evidence",
                  desc: "Every claim is linked to its original source. If it can't be verified, it doesn't stay.",
                }
              ].map((pillar, i) => (
                <div key={i} className="relative pl-0 md:pl-8 group">
                  <p className="text-xl leading-[1.8]">
                    <strong className="font-bold text-background">{pillar.title}</strong>
                    <span className="mx-2 text-background/40">—</span>
                    <span className="text-background/60">{pillar.desc}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
