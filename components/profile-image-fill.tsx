"use client"

import Image from "next/image"
import { useCallback, useState } from "react"

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase() || "?"
}

type Stage = "primary" | "placeholder" | "initials"

interface ProfileImageFillProps {
  primarySrc: string
  alt: string
  className?: string
  /** Replaces default secondary/muted initials panel (e.g. dark hero sections). */
  initialsClassName?: string
}

/**
 * Portrait cover for profile cards: tries primary URL, then local placeholder, then initials.
 */
export function ProfileImageFill({
  primarySrc,
  alt,
  className,
  initialsClassName,
}: ProfileImageFillProps) {
  const [stage, setStage] = useState<Stage>("primary")

  const placeholderSrc = `/placeholder.svg?height=400&width=400&query=portrait%20${encodeURIComponent(alt)}`

  const onPrimaryError = useCallback(() => {
    setStage((s) => {
      if (s !== "primary") return s
      if (primarySrc.includes("placeholder.svg")) return "initials"
      return "placeholder"
    })
  }, [primarySrc])

  const onPlaceholderError = useCallback(() => {
    setStage("initials")
  }, [])

  if (stage === "initials") {
    return (
      <div
        className={
          initialsClassName ??
          "flex h-full w-full items-center justify-center bg-secondary font-serif text-3xl font-bold tracking-tight text-muted-foreground sm:text-4xl"
        }
        aria-hidden
      >
        {initialsFrom(alt)}
      </div>
    )
  }

  const src = stage === "primary" ? primarySrc : placeholderSrc

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      onError={stage === "primary" ? onPrimaryError : onPlaceholderError}
    />
  )
}
