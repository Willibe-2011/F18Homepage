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
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-semibold text-foreground/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:text-foreground sm:px-4 sm:py-2 sm:text-base lg:text-lg"
          >
            Mission
          </Link>
        </div>
      </div>
    </footer>
  )
}
