"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/10 transition-all duration-200 lg:h-24 ${
        scrolled || menuOpen
          ? "bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-12">
        <Link
          href="/"
          className="group relative inline-flex items-center overflow-hidden rounded-full border border-white/30 bg-white/8 px-4 py-1.5 font-serif text-xl font-bold tracking-tight text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/16 hover:shadow-[0_14px_40px_rgba(0,0,0,0.32)] sm:text-2xl lg:text-3xl"
          onClick={closeMenu}
        >
          <span className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,255,255,0.32),rgba(255,255,255,0)_45%),radial-gradient(120%_120%_at_100%_100%,rgba(255,255,255,0.18),rgba(255,255,255,0)_55%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="founder-wave-text bg-gradient-to-r from-foreground/88 via-foreground to-foreground/82 bg-clip-text text-transparent">
            Founder18
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex lg:gap-10">
          <Link
            href="/explore"
            className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground lg:text-lg"
          >
            Explore
          </Link>
          <Link
            href="/about"
            className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground lg:text-lg"
          >
            About
          </Link>
        </div>

        <div className="hidden lg:block">
          <Link
            target="_blank"
            href="https://forms.gle/evkDGtdsratB7kWZ9"
            className="rounded-full bg-accent px-7 py-3 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90 lg:px-8 lg:py-3.5 lg:text-lg"
          >
            Get Featured
          </Link>
        </div>

        <button
          type="button"
          className="group relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/12 bg-secondary/55 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_14px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-300 hover:border-white/18 hover:bg-secondary/65 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_6px_18px_rgba(0,0,0,0.22)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="site-mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,255,255,0.22),rgba(255,255,255,0)_45%),radial-gradient(120%_120%_at_100%_100%,rgba(255,255,255,0.12),rgba(255,255,255,0)_55%)]" />
          <span
            className={`relative inline-flex items-center justify-center text-foreground/90 transition-all duration-300 ease-out group-hover:text-foreground group-hover:scale-110 ${menuOpen ? "rotate-90" : "rotate-0"}`}
          >
            {menuOpen ? <X className="h-5 w-5" strokeWidth={2.25} /> : <Menu className="h-5 w-5" strokeWidth={2.25} />}
          </span>
        </button>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 top-20 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
            onClick={closeMenu}
          />
          <nav
            id="site-mobile-nav"
            className="absolute left-0 right-0 top-full z-50 border-b border-border bg-background px-4 py-3 shadow-lg lg:hidden"
          >
            <div className="mx-auto flex max-w-[1400px] flex-col gap-0.5 sm:px-2">
              <Link
                href="/explore"
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:text-base"
                onClick={closeMenu}
              >
                Explore
              </Link>
              <Link
                href="/about"
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:text-base"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                target="_blank"
                href="https://forms.gle/evkDGtdsratB7kWZ9"
                className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                onClick={closeMenu}
              >
                Get Featured
              </Link>
            </div>
          </nav>
        </>
      ) : null}
    </header>
  )
}
