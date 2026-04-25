import Link from "next/link"
import Image from "next/image"
import type { F18Profile } from "@/lib/data"

interface ProfileCardProps {
  profile: F18Profile
  size?: "default" | "large"
}

export function ProfileCard({ profile, size = "default" }: ProfileCardProps) {
  const cardHeight = size === "large" ? "h-[480px]" : "h-[420px]"

  const avatarSrc =
    profile.pictureUrl ||
    `/placeholder.svg?height=400&width=400&query=editorial%20portrait%20photo%20of%20a%20${profile.age}%20year%20old%20${profile.gender.toLowerCase()}%20founder%20from%20${encodeURIComponent(
      profile.location
    )}%2C%20natural%20light%2C%20warm%20tones%2C%20muted%20background`

  return (
    <Link href={`/profile/${profile.id}`} className="group block h-full">
      <article
        className={`w-full ${cardHeight} rounded-none border border-border/40 bg-card/40 p-8 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-card/60 hover:shadow-2xl`}
      >
        <div className="flex h-full flex-col items-center text-center">
          {/* Avatar - Enlarge and Zero-Radius */}
          <div className="relative mb-6 aspect-square w-56 flex-shrink-0 overflow-hidden rounded-none border border-white/10 bg-secondary shadow-lg lg:w-64">
            <Image
              src={avatarSrc}
              alt={profile.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Name - Auto-scales down for long names */}
          <div className="w-full px-2">
            <h3 
              className={`mt-2 font-bold text-foreground truncate ${
                profile.name.length > 20 
                  ? "text-lg lg:text-xl" 
                  : profile.name.length > 15
                  ? "text-xl lg:text-2xl"
                  : "text-2xl lg:text-3xl"
              }`}
              title={profile.name}
            >
              {profile.name}
            </h3>
          </div>

          {/* Project */}
          <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground line-clamp-3">
            {profile.project}
          </p>

        </div>
      </article>
    </Link>
  )
}
