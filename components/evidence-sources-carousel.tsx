"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type EvidenceSource = {
  name: string
  weight: number
  className: string
}

const EVIDENCE_SOURCES: EvidenceSource[] = [
  // Tier 1 — household names (appear ~3× more often)
  { name: "Forbes", weight: 3, className: "font-serif text-2xl font-black italic" },
  { name: "BBC", weight: 3, className: "font-serif text-2xl font-black tracking-widest" },
  { name: "TechCrunch", weight: 3, className: "font-serif text-2xl font-black tracking-tighter" },
  { name: "MIT", weight: 3, className: "font-serif text-2xl font-black tracking-tight" },
  { name: "Stanford", weight: 3, className: "font-serif text-2xl font-black tracking-tight" },
  { name: "Harvard", weight: 3, className: "font-serif text-2xl font-black" },
  { name: "The New York Times", weight: 3, className: "font-serif text-xl font-black md:text-2xl" },
  { name: "Bloomberg", weight: 3, className: "font-serif text-2xl font-black" },
  { name: "Reuters", weight: 3, className: "font-serif text-2xl font-black italic" },
  { name: "The Wall Street Journal", weight: 3, className: "font-serif text-xl font-black tracking-tight md:text-2xl" },
  { name: "Y Combinator", weight: 3, className: "font-serif text-xl font-black md:text-2xl" },

  // Tier 2 — well known, appear ~2×
  { name: "Business Insider", weight: 2, className: "font-serif text-2xl font-black italic" },
  { name: "Wired", weight: 2, className: "font-serif text-2xl font-black tracking-tight" },
  { name: "Nature", weight: 2, className: "font-serif text-2xl font-black italic" },

  // Tier 3 — less prominent
  { name: "Goldman Sachs", weight: 1, className: "font-serif text-xl font-black md:text-2xl" },
  { name: "Crunchbase", weight: 1, className: "font-serif text-2xl font-black tracking-tighter" },
]

const DISPLAY_MS = 2800
const FADE_MS = 500

function pickWeightedSource(excludeName?: string): EvidenceSource {
  const candidates = excludeName
    ? EVIDENCE_SOURCES.filter((s) => s.name !== excludeName)
    : EVIDENCE_SOURCES

  const totalWeight = candidates.reduce((sum, s) => sum + s.weight, 0)
  let roll = Math.random() * totalWeight

  for (const source of candidates) {
    roll -= source.weight
    if (roll <= 0) return source
  }

  return candidates[candidates.length - 1]
}

export function EvidenceSourcesCarousel() {
  const [source, setSource] = useState<EvidenceSource>(EVIDENCE_SOURCES[0])
  const [visible, setVisible] = useState(true)
  const currentRef = useRef(source)

  useEffect(() => {
    currentRef.current = source
  }, [source])

  useEffect(() => {
    let swapTimeout: ReturnType<typeof setTimeout> | undefined

    const interval = setInterval(() => {
      setVisible(false)
      swapTimeout = setTimeout(() => {
        const next = pickWeightedSource(currentRef.current.name)
        currentRef.current = next
        setSource(next)
        setVisible(true)
      }, FADE_MS)
    }, DISPLAY_MS + FADE_MS)

    return () => {
      clearInterval(interval)
      if (swapTimeout) clearTimeout(swapTimeout)
    }
  }, [])

  return (
    <div
      className="relative flex h-14 items-center justify-center overflow-hidden"
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        className={cn(
          source.className,
          "text-foreground transition-opacity duration-500",
          visible ? "opacity-100" : "opacity-0"
        )}
      >
        {source.name}
      </span>
    </div>
  )
}
