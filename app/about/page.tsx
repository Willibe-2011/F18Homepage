import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-32">
        {/* Mission Section */}
        <section className="mx-auto max-w-[1400px] px-8 lg:px-12 pt-16">
          <p className="font-mono text-sm font-semibold tracking-widest text-accent uppercase mb-6">
            Mission
          </p>
          <h1 className="font-serif text-5xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl xl:text-8xl text-balance max-w-5xl">
            Accelerate Next Gen Founder Shift.
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
            Next Gen Founders identify and solve real problems before 18. Founders18 accelerates that shift — finding them, amplifying their story, and bringing them the attention and capital they deserve.
          </p>
        </section>

        {/* Separator */}
        <div className="mx-auto max-w-[1400px] px-8 lg:px-12 mt-24 mb-24">
          <div className="h-px w-full bg-white/10" />
        </div>

        {/* What is F18 Section */}
        <section className="mx-auto max-w-[1400px] px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                What is F18?
              </h2>
            </div>
            <div className="max-w-3xl">
              <p className="text-xl leading-relaxed text-foreground mb-8">
                Founders18 (F18) is a discovery and amplification platform for the next generation of founders — builders who are already solving real problems before they turn 18.
              </p>
              <p className="text-xl leading-relaxed text-muted-foreground mb-8">
                F18 is not a competition. Not a program. Not a directory of high achievers.
              </p>
              <p className="text-xl leading-relaxed text-foreground font-medium mb-8">
                It is a verified record of Next Gen Founders — backed by evidence: real products, real users, real impact. <span className="text-muted-foreground font-normal">Every profile on F18 is researched, verified, and told through a story that captures who they are and what they&apos;ve built.</span>
              </p>
              <p className="text-xl leading-relaxed text-muted-foreground">
                In the AI age, age is no longer a barrier to solving what matters. F18 exists to make sure the world sees that — and that the builders driving this shift get the attention and capital they deserve.
              </p>
            </div>
          </div>
        </section>

        {/* Why F18 Matters Section - Bento Grid */}
        <section className="mx-auto max-w-[1400px] px-8 lg:px-12 mt-32">
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Why F18 Matters — For You
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Card 1: VCs */}
            <div className="flex flex-col rounded-none border border-white/10 bg-card/40 p-8 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all hover:bg-card/60">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6 pb-6 border-b border-white/10">
                For VCs & Investors
              </h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                The best founders start early. F18 gives you a verified pipeline of Next Gen Founders — builders who have already shipped, already proven they can execute, and are just getting started. Find them before everyone else does.
              </p>
            </div>

            {/* Card 2: Media */}
            <div className="flex flex-col rounded-none border border-white/10 bg-card/40 p-8 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all hover:bg-card/60">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6 pb-6 border-b border-white/10">
                For Media & Journalists
              </h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                The most compelling founder stories are the ones that start young. F18 surfaces verified, story-ready profiles — each backed by real evidence, not self-reported claims. Your media should put them on your watching list.
              </p>
            </div>

            {/* Card 3: Universities */}
            <div className="flex flex-col rounded-none border border-white/10 bg-card/40 p-8 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all hover:bg-card/60">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6 pb-6 border-b border-white/10">
                For Universities & Schools
              </h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                These are not just exceptional students. They are creators who have already made an impact before stepping into your program. F18 helps you identify and recruit the builders who will define your next decade.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-[1400px] px-8 lg:px-12 mt-32 text-center">
          <Link
            href="/get-featured"
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-10 py-5 text-lg font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Get Featured on F18
            <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
