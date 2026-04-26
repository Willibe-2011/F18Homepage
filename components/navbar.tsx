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
          className="font-serif text-xl font-bold text-foreground sm:text-2xl lg:text-3xl"
          onClick={closeMenu}
        >
          Founder18
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
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-foreground/10 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="site-mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
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
