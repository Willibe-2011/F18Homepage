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
      className={`fixed top-0 left-0 right-0 z-50 h-20 border-b transition-all duration-200 lg:h-24 ${
        scrolled || menuOpen
          ? "bg-background/80 backdrop-blur-md border-border"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-12">
        {/* Left: Logo */}
        <div className="flex lg:flex-1 items-center justify-start">
          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-80 lg:text-[1.75rem]"
            onClick={closeMenu}
          >
            Founder18
          </Link>
        </div>

        {/* Center: Nav Links (Pill Design) */}
        <div className="hidden lg:flex items-center justify-center gap-2 border border-foreground px-2 py-1">
          <Link
            href="/explore"
            className="px-3 py-1.5 text-sm font-semibold text-foreground/70 transition-all hover:text-foreground"
          >
            Explore
          </Link>
          <Link
            href="/about"
            className="px-3 py-1.5 text-sm font-semibold text-foreground/70 transition-all hover:text-foreground"
          >
            Mission
          </Link>
          <Link
            href="/standard"
            className="px-3 py-1.5 text-sm font-semibold text-foreground/70 transition-all hover:text-foreground"
          >
            The Standard
          </Link>
        </div>

        {/* Right: CTA & Mobile Toggle */}
        <div className="flex lg:flex-1 items-center justify-end gap-4">
          <div className="hidden lg:block">
            <div className="flex items-center justify-center border border-foreground px-2 py-1">
              <Link
                target="_blank"
                href="https://forms.gle/evkDGtdsratB7kWZ9"
                className="px-3 py-1.5 text-sm font-semibold text-foreground/70 transition-all hover:text-foreground"
              >
                Nominate Someone
              </Link>
            </div>
          </div>

          <button
            type="button"
            className="group relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-none border border-border bg-secondary/50 text-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:border-border/80 hover:bg-secondary active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="site-mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(0,0,0,0.05),rgba(0,0,0,0)_45%),radial-gradient(120%_120%_at_100%_100%,rgba(0,0,0,0.02),rgba(0,0,0,0)_55%)]" />
            <span
              className={`relative inline-flex items-center justify-center text-foreground/90 transition-all duration-300 ease-out group-hover:text-foreground group-hover:scale-110 ${menuOpen ? "rotate-90" : "rotate-0"}`}
            >
              {menuOpen ? <X className="h-5 w-5" strokeWidth={2.25} /> : <Menu className="h-5 w-5" strokeWidth={2.25} />}
            </span>
          </button>
        </div>
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
                className="rounded-none px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:text-base"
                onClick={closeMenu}
              >
                Explore
              </Link>
              <Link
                href="/about"
                className="rounded-none px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:text-base"
                onClick={closeMenu}
              >
                Mission
              </Link>
              <Link
                href="/standard"
                className="rounded-none px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:text-base"
                onClick={closeMenu}
              >
                The Standard
              </Link>
              <Link
                target="_blank"
                href="https://forms.gle/evkDGtdsratB7kWZ9"
                className="mt-2 inline-flex w-fit items-center justify-center border border-foreground px-3 py-1.5 text-sm font-semibold text-foreground/70 transition-all hover:text-foreground"
                onClick={closeMenu}
              >
                Nominate Someone
              </Link>
            </div>
          </nav>
        </>
      ) : null}
    </header>
  )
}
