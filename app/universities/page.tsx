import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const CAMPUSES = [
  "Harvard",
  "MIT",
  "Brown",
  "Yale",
  "NYU",
  "Columbia",
  "Princeton",
  "UPenn",
  "Stanford",
  "Berkeley",
  "Caltech",
  "UCL",
]

export default function UniversitiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20 lg:pt-24">
        <article className="mx-auto max-w-[1400px] px-5 pb-24 pt-12 sm:px-8 lg:px-12 lg:pb-32 lg:pt-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted-foreground sm:text-xs">
            New from F18
          </p>
          <h1 className="mt-5 max-w-[16ch] font-serif text-[2rem] font-bold leading-[1.12] text-balance text-foreground sm:mt-6 sm:max-w-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Are universities the right places for young people today?
          </h1>

          <div className="mt-8 max-w-3xl space-y-6 md:mt-10 md:space-y-8">
            <p className="text-lg leading-[1.8] text-foreground/90 md:text-xl lg:text-2xl">
              Teenager William Hao walked onto twelve of the world&apos;s most powerful campuses — Harvard, MIT, Brown, Yale, NYU, Columbia, Princeton, UPenn, Stanford, Berkeley, Caltech, and UCL — and asked students, professors, and staff a question almost nobody wants answered out loud: are universities still the right places for young people today?
            </p>
            <p className="text-lg leading-[1.8] text-foreground/90 md:text-xl lg:text-2xl">
              What came back was not polite consensus. It was raw, divided, and — in places — devastating. The people inside the system did not all defend it. Some hesitated. Some laughed. Some said what you are not supposed to say on the quad.
            </p>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-2 border-t border-border pt-8 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:mt-12 sm:gap-x-4 md:text-sm">
            {CAMPUSES.map((campus) => (
              <li key={campus} className="after:ml-3 after:text-border after:content-['·'] last:after:content-none sm:after:ml-4">
                {campus}
              </li>
            ))}
          </ul>

          <div className="mt-20 border-t border-border pt-14 md:mt-28 md:pt-20">
            <h2 className="max-w-2xl font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
              You sell the dream. Borrow the proof.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-[1.8] text-muted-foreground sm:mt-6 sm:text-lg md:text-xl">
              AI courses, founder camps, growth programs — license the footage, the database, and the story parents can verify themselves.
            </p>
            <Link
              href="/universities/licensing"
              className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 border border-foreground bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 sm:mt-10 sm:w-auto sm:px-8"
            >
              See commercial licensing
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
