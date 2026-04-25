"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-200 lg:h-24 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-8 lg:px-12">
        {/* Left: Logo */}
        <Link href="/" className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
          F18
        </Link>

        {/* Center: Navigation Links */}
        <div className="flex items-center gap-10">
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

        {/* Right: CTA Button */}
        <Link
          href="/get-featured"
          className="rounded-full bg-accent px-7 py-3 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90 lg:px-8 lg:py-3.5 lg:text-lg"
        >
          Get Featured
        </Link>
      </nav>
    </header>
  )
}
