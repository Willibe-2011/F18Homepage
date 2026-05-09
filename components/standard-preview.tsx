import Link from "next/link"

export function StandardPreview() {
  return (
    <>
      <section className="py-24 border-t border-border grayscale opacity-30 transition-all hover:opacity-100">
        <div className="mx-auto max-w-[1400px] px-8 lg:px-12 text-center">
          {/* Section Label */}
          <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-muted-foreground/40">
            Evidence Sourced From
          </p>
          {/* Logos / Text Placeholder Grid */}
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24">
            {/* Forbes Style: Serif, Black, Italic */}
            <span className="font-serif text-2xl font-black italic text-foreground">
              Forbes
            </span>

            {/* TechCrunch Style: Serif, Black, Tight Tracking */}
            <span className="font-serif text-2xl font-black tracking-tighter text-foreground">
              TechCrunch
            </span>

            {/* YC Style: Sans/Serif, Black */}
            <span className="font-serif text-2xl font-black text-foreground">
              YC
            </span>

            {/* Business Insider Style: Serif, Black, Italic */}
            <span className="font-serif text-2xl font-black italic text-foreground">
              Business Insider
            </span>

            {/* MIT Style: Serif, Black, Tight Tracking */}
            <span className="font-serif text-2xl font-black tracking-tight text-foreground">
              MIT
            </span>
          </div>
        </div>
      </section>

      <section className="bg-black py-32 text-background">
        <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
          <div className="grid gap-24 lg:grid-cols-2 lg:items-center">
            {/* Left: Headline */}
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-12">
                The F18 Standard
              </div>
              <h2 className="font-serif text-5xl font-bold leading-tight md:text-6xl italic text-background">
                Every claim is a <br /> matter of public record.
              </h2>
              <p className="mt-12 max-w-xl font-serif text-xl italic leading-relaxed text-background/40 md:text-2xl">
                F18 is not a nomination-based list. It is an independently maintained index of builders whose work has already been verified by the market, the media, or major institutions.
              </p>
            </div>

            {/* Right: The Three Pillars */}
            <div className="relative space-y-12">
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
