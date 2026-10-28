import { CAMPUSES, campusLogoPath } from "@/lib/campuses"
import { cn } from "@/lib/utils"

type CampusListProps = {
  className?: string
  dense?: boolean
}

export function CampusList({ className, dense = false }: CampusListProps) {
  return (
    <ul
      className={cn(
        "mx-auto grid max-w-5xl",
        dense
          ? "grid-cols-3 gap-1.5 sm:grid-cols-4 lg:grid-cols-6 lg:gap-2"
          : "grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4",
        className,
      )}
    >
      {CAMPUSES.map((campus) => (
        <li
          key={campus.name}
          className={cn(
            "flex items-center justify-center border border-border/80 bg-white",
            dense ? "rounded-md px-2 py-1.5" : "rounded-xl px-4 py-5 sm:px-5 sm:py-6",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={campusLogoPath(campus.file)}
            alt={campus.name}
            className={cn("h-auto w-full object-contain", dense && "max-h-7 sm:max-h-8")}
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  )
}
