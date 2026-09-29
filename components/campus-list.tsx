import { CAMPUSES, campusLogoPath } from "@/lib/campuses"
import { cn } from "@/lib/utils"

type CampusListProps = {
  className?: string
}

export function CampusList({ className }: CampusListProps) {
  return (
    <ul
      className={cn(
        "mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4",
        className,
      )}
    >
      {CAMPUSES.map((campus) => (
        <li
          key={campus.name}
          className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border/80 bg-white px-4 py-6 text-center sm:gap-4 sm:px-5 sm:py-7"
        >
          <div className="flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={campusLogoPath(campus.file)}
              alt={`${campus.name} logo`}
              width={120}
              height={120}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>
          <span className="text-sm font-semibold leading-tight text-foreground sm:text-base">
            {campus.name}
          </span>
        </li>
      ))}
    </ul>
  )
}
