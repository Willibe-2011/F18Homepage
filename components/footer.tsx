import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10 lg:py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 lg:px-12">
        <p className="text-sm text-muted-foreground sm:text-base lg:text-lg">F18 © 2026</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:gap-8">
          <Link
            href="/about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground sm:text-base lg:text-lg"
          >
            Mission
          </Link>
          <Link
            target="_blank"
            href="https://forms.gle/evkDGtdsratB7kWZ9"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground sm:text-base lg:text-lg"
          >
            Get Featured
          </Link>
        </div>
      </div>
    </footer>
  )
}
