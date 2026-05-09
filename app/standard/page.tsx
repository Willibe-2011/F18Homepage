import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function StandardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-32">
        <section className="mx-auto max-w-[1400px] px-8 lg:px-12 pt-16">
          <p className="relative inline-block pb-1 font-mono text-sm font-semibold tracking-[0.28em] text-accent uppercase after:absolute after:left-1/2 after:bottom-0 after:h-px after:w-full after:-translate-x-1/2 after:bg-accent/70 mb-6">
            The Standard
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl text-balance max-w-5xl">
            How the record-breaking standard works.
          </h1>
          <div className="relative mt-10 max-w-3xl">
            <p className="text-xl leading-relaxed text-foreground/90 md:text-2xl md:leading-relaxed">
              F18 is built on a single premise: age is no longer a barrier to solving what matters. But we do not accept self-reported claims. Every member of F18 must meet a rigorous, verified standard.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[1400px] px-8 lg:px-12 mt-24 mb-24">
          <div className="h-px w-full bg-border" />
        </div>

        <section className="mx-auto max-w-[1400px] px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                The Rules
              </h2>
            </div>
            <div className="max-w-3xl space-y-8">
              <div className="relative rounded-none border border-border border-b-[4px] bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">1. One hero claim</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  If you cannot write a single-sentence record, the person does not qualify yet. We look for constraint-bounded claims that hold up even without the age constraint.
                </p>
              </div>
              <div className="relative rounded-none border border-border border-b-[4px] bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">2. Hyperlinked metrics</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Every metric, award, or milestone must link to a primary source. We verify funding raised, active users, press coverage, and awards. No inflated or unverified numbers.
                </p>
              </div>
              <div className="relative rounded-none border border-border border-b-[4px] bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">3. Third-person letters</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We write the case for the founder. Every profile includes third-person letters addressed to VCs and Universities, explaining why they should be reaching out to the founder, not the other way around.
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
