import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 lg:py-16">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 lg:px-12">
        <p className="text-base text-muted-foreground lg:text-lg">F18 © 2026</p>
        <div className="flex items-center gap-8">
          <Link
            href="/about"
            className="text-base text-muted-foreground transition-colors hover:text-foreground lg:text-lg"
          >
            Mission
          </Link>
          <Link
            target="_blank"
            href="https://forms.gle/evkDGtdsratB7kWZ9"
            className="text-base text-muted-foreground transition-colors hover:text-foreground lg:text-lg"
          >
            Get Featured
          </Link>
        </div>
      </div>
    </footer>
  )
}
