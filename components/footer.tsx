import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10 lg:py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 lg:px-12">
        <p className="text-sm font-medium tracking-wide text-foreground/90 sm:text-base lg:text-lg">
          F18 © 2026
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-4">
          <Link
            href="/about"
            className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm font-semibold text-foreground/90 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-border/80 hover:bg-secondary hover:text-foreground sm:px-4 sm:py-2 sm:text-base lg:text-lg"
          >
            Mission
          </Link>
          <Link
            href="/standard"
            className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm font-semibold text-foreground/90 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-border/80 hover:bg-secondary hover:text-foreground sm:px-4 sm:py-2 sm:text-base lg:text-lg"
          >
            The Standard
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://forms.gle/evkDGtdsratB7kWZ9"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm font-semibold text-foreground/90 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-border/80 hover:bg-secondary hover:text-foreground sm:px-4 sm:py-2 sm:text-base lg:text-lg"
          >
            Nominate Someone
            <span
              className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border bg-secondary text-[10px] leading-none text-foreground/90 transition-all duration-200 group-hover:border-border/80 group-hover:bg-secondary/80"
              aria-hidden="true"
            >
              ↗
            </span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
