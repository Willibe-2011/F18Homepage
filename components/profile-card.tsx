import Link from "next/link"
import Image from "next/image"
import type { F18Profile } from "@/lib/data"

interface ProfileCardProps {
  profile: F18Profile
  size?: "default" | "large"
  variant?: "full" | "simple"
}

export function ProfileCard({ profile, size = "default", variant = "full" }: ProfileCardProps) {
  if (variant === "simple") {
    const imgSrc =
      profile.pictureUrl ||
      `/placeholder.svg?height=400&width=400&query=portrait%20${encodeURIComponent(profile.name)}`

    const widthClass = size === "large" ? "w-full" : "w-[200px] flex-shrink-0"

    return (
      <Link href={`/profile/${profile.slug}`} className="block group">
        <article
          className={`${widthClass} overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-xl`}
        >
          <div className="relative aspect-square w-full overflow-hidden bg-secondary">
            <Image
              src={imgSrc}
              alt={profile.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="px-4 py-3">
            <h3 className="text-sm font-semibold text-foreground truncate lg:text-base">
              {profile.name}
            </h3>
          </div>
        </article>
      </Link>
    )
  }

  const cardWidth = size === "large" ? "w-[400px]" : "w-[340px]"
  const cardHeight = size === "large" ? "h-[480px]" : "h-[420px]"

  return (
    <Link href={`/profile/${profile.slug}`} className="block">
      <article
        className={`${cardWidth} ${cardHeight} flex-shrink-0 rounded-2xl border border-border bg-card p-8 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-xl`}
      >
        <div className="flex h-full flex-col">
          <span className="font-serif text-8xl font-bold text-accent lg:text-9xl">
            {profile.age}
          </span>

          <h3 className="mt-4 text-2xl font-bold text-foreground lg:text-3xl">
            {profile.name}
          </h3>

          <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground line-clamp-4">
            {profile.project}
          </p>

          <div className="mt-6">
            <span className="inline-block rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
              {profile.industry}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
