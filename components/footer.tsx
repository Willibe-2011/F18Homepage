import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black py-10 lg:py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 lg:px-12">
        <p className="text-sm font-medium tracking-wide text-white sm:text-base lg:text-lg">
          F18 © 2026
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-4">
          <div className="flex items-center justify-center border border-white/60 px-2 py-1">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://forms.gle/evkDGtdsratB7kWZ9"
              className="px-3 py-1.5 text-sm font-semibold text-white/70 transition-all hover:text-white sm:px-4 sm:py-2 sm:text-base lg:text-lg"
            >
              Nominate Someone
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
