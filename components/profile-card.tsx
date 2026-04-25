import Link from "next/link"
import type { F18Profile } from "@/lib/data"

interface ProfileCardProps {
  profile: F18Profile
  size?: "default" | "large"
}

export function ProfileCard({ profile, size = "default" }: ProfileCardProps) {
  const cardWidth = size === "large" ? "w-[400px]" : "w-[340px]"
  const cardHeight = size === "large" ? "h-[480px]" : "h-[420px]"

  return (
    <Link href={`/profile/${profile.slug}`} className="block">
      <article
        className={`${cardWidth} ${cardHeight} flex-shrink-0 rounded-2xl border border-border bg-card p-8 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-xl`}
      >
        <div className="flex h-full flex-col">
          {/* Age - The star of the card */}
          <span className="font-serif text-8xl font-bold text-accent lg:text-9xl">
            {profile.age}
          </span>

          {/* Name */}
          <h3 className="mt-4 text-2xl font-bold text-foreground lg:text-3xl">
            {profile.name}
          </h3>

          {/* Project */}
          <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground line-clamp-4">
            {profile.project}
          </p>

          {/* Industry Tag */}
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
