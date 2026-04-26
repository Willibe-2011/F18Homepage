"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { ProfileImageFill } from "@/components/profile-image-fill"

interface StickyIntroBarProps {
  name: string
  age: number
  location: string
  pictureUrl?: string
  record: string
}

export function StickyIntroBar({
  name,
  age,
  location,
  pictureUrl,
  record,
}: StickyIntroBarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Show after the user scrolls past ~80% of the viewport height (past the Hero)
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const avatarSrc =
    pictureUrl ||
    `/placeholder.svg?height=96&width=96&query=editorial%20portrait%20founder%20${age}%20year%20old`

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-4 pb-4 lg:px-8 lg:pb-6">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/95 p-3 shadow-2xl backdrop-blur-md lg:gap-6 lg:p-4">
          {/* Left: Avatar */}
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-secondary lg:h-16 lg:w-16">
            <ProfileImageFill primarySrc={avatarSrc} alt={name} className="object-cover" />
          </div>

          {/* Middle: Identity */}
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-base font-bold text-foreground lg:text-xl">
              {name}
            </p>
            <p className="hidden truncate text-sm text-muted-foreground sm:block lg:text-base">
              <span className="font-semibold text-foreground">{age}</span>
            </p>
          </div>

          {/* Right: CTA */}
          <button className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 lg:gap-3 lg:px-7 lg:py-4 lg:text-base">
            <span className="hidden sm:inline">Request an Intro</span>
            <span className="sm:hidden">Intro</span>
            <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
