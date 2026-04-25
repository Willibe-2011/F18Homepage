import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="mx-auto max-w-[720px] px-6 py-24">
          {/* Title */}
          <h1 className="font-serif text-5xl font-bold text-foreground md:text-6xl">
            The mission.
          </h1>

          {/* Lede */}
          <p className="mt-8 font-serif text-2xl leading-relaxed text-foreground">
            Most extraordinary teenagers go unseen until they&apos;re 25. F18 fixes
            that.
          </p>

          {/* Section 1 */}
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Why under 18?
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              The world has a discovery problem. Every year, thousands of
              teenagers build remarkable things — apps that reach millions,
              research that advances science, companies that solve real problems.
              But most of them remain invisible to the people who could help them
              go further.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We believe age should be a feature, not a barrier. The constraints
              of being young — limited resources, skeptical adults, the constant
              need to prove yourself — forge a particular kind of resilience and
              creativity. We celebrate that.
            </p>
          </section>

          {/* Pull Quote */}
          <blockquote className="my-16 border-l-4 border-accent pl-6">
            <p className="font-serif text-3xl italic text-foreground">
              &ldquo;Talent doesn&apos;t wait for permission.&rdquo;
            </p>
          </blockquote>

          {/* Section 2 */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              What we verify
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              F18 is not a vanity directory. Every entry is backed by evidence —
              published papers, granted patents, verified revenue, official
              selections, real users. We reject inflated claims and vague
              accomplishments.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Our review process is rigorous because credibility matters. When a
              VC or school sees someone featured on F18, they know the work is
              real. That trust is the foundation of everything we do.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Who this is for
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              <strong>For investors:</strong> Find the next generation of
              founders before everyone else. These are builders who have already
              shipped, already proven they can execute, and are just getting
              started.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              <strong>For schools:</strong> Identify exceptional students who
              would thrive in your programs. These are not just high achievers —
              they are creators who have already made an impact.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              <strong>For the F18s themselves:</strong> Get the visibility you
              deserve. Connect with opportunities that match your ambition. Join
              a community of peers who understand what it means to build
              something real while the world tells you to wait.
            </p>
          </section>

          {/* CTA */}
          <div className="mt-16">
            <Link
              href="/get-featured"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-lg font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Get Featured
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
