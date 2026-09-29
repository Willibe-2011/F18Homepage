import Link from "next/link"
import { ArrowRight } from "lucide-react"

/** Internal essay for the homepage CTA. */
const PROJECT_URL = "/universities"

export function UniversityQuestionSection() {
  return (
    <section className="border-t border-border py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-4xl flex-col items-start text-left sm:items-center sm:text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted-foreground sm:text-xs">
            New from F18
          </p>
          <h2 className="mt-5 max-w-[18ch] font-serif text-[1.85rem] font-bold leading-[1.15] text-balance text-foreground sm:mt-6 sm:max-w-none sm:text-4xl md:text-5xl lg:text-6xl">
            Are universities the right places for young people today?
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.8] text-muted-foreground sm:mt-6 sm:text-lg md:text-xl">
            William Hao asked twelve elite campuses the question they cannot dodge. The answers are not what you expect.
          </p>
          <Link
            href={PROJECT_URL}
            className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 border border-foreground bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 sm:mt-10 sm:w-auto sm:px-8"
          >
            Read the project
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
