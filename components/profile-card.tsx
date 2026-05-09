import Link from "next/link"
import type { F18Profile } from "@/lib/data"
import { ProfileImageFill } from "@/components/profile-image-fill"

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

    const widthClass =
      size === "large"
        ? "w-full"
        : "w-full max-w-md mx-auto md:mx-0 md:w-[320px] md:max-w-none md:flex-shrink-0"

    return (
      <Link href={`/profile/${profile.slug}`} className="block group">
        <article
          className={`${widthClass} overflow-hidden rounded-none border border-border border-b-[4px] bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-md`}
        >
          <div className="relative aspect-square w-full overflow-hidden bg-secondary">
            <ProfileImageFill
              primarySrc={imgSrc}
              alt={profile.name}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif text-xl font-bold text-foreground truncate lg:text-2xl">
                {profile.name}
              </h3>
              <span className="shrink-0 rounded-md bg-secondary px-2 py-1 font-mono text-xs font-medium text-muted-foreground">
                {profile.age}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="truncate">{profile.location || "Global"}</span>
              <span className="shrink-0 text-muted-foreground/30">•</span>
              <span className="truncate">{profile.industry}</span>
            </div>
            {profile.breakTheRecord && (
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-sm font-medium leading-snug text-foreground/90 line-clamp-2">
                  {profile.breakTheRecord}
                </p>
              </div>
            )}
          </div>
        </article>
      </Link>
    )
  }

  const cardWidth = size === "large" ? "w-[400px]" : "w-[340px]"
  const cardHeight = size === "large" ? "h-[480px]" : "h-[420px]"

  return (
    <Link href={`/profile/${profile.slug}`} className="block group">
      <article
        className={`${cardWidth} ${cardHeight} flex-shrink-0 rounded-none border border-border border-b-[4px] bg-card p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-md`}
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
