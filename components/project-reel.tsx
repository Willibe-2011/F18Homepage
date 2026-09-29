"use client"

import { ChevronDown } from "lucide-react"

/** Full-viewport project reel placeholder until the master cut is ready. */
export function ProjectReel() {
  return (
    <section className="relative h-svh w-full overflow-hidden bg-foreground text-background">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-background/40 bg-background/10 backdrop-blur-sm">
          <span className="ml-1 border-y-[10px] border-l-[18px] border-y-transparent border-l-background" />
        </span>
        <p className="max-w-xs text-lg font-semibold leading-snug text-balance">
          Project reel
        </p>
        <p className="text-lg text-background/60">Video placeholder</p>
      </div>
      <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center sm:bottom-10">
        <a
          href="#licensing-content"
          className="grid h-12 w-12 animate-bounce place-items-center rounded-full border border-background/35 bg-background/15 backdrop-blur-sm transition-colors hover:bg-background/25"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-5 w-5 text-background" strokeWidth={2.5} aria-hidden />
        </a>
      </div>
    </section>
  )
}
