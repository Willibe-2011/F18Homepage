import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const filterBadgeVariants = cva(
  "inline-flex items-center text-xs border transition-colors",
  {
    variants: {
      variant: {
        default: "rounded-none gap-x-2.5 py-1.5 pl-3 pr-1.5",
        pill: "rounded-none gap-x-2.5 py-1.5 pl-3 pr-1.5",
        avatar: "rounded-none gap-2 px-1.5 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface FilterBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof filterBadgeVariants> {
  label?: string
  value?: string
  avatar?: string
  onRemove?: (e: React.MouseEvent) => void
}

export function FilterBadge({
  className,
  variant,
  label,
  value,
  avatar,
  children,
  onRemove,
  ...props
}: FilterBadgeProps) {
  if (variant === "avatar") {
    return (
      <span className={cn(filterBadgeVariants({ variant }), className)} {...props}>
        {avatar && (
          <img
            className="inline-block size-5 rounded-none"
            src={avatar}
            alt=""
          />
        )}
        {children}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex size-5 items-center justify-center rounded-none opacity-70 hover:opacity-100 hover:bg-black/10 transition-all"
            aria-label="Remove"
          >
            <X className="size-3 shrink-0" aria-hidden={true} />
          </button>
        )}
      </span>
    )
  }

  return (
    <span className={cn(filterBadgeVariants({ variant }), className)} {...props}>
      {label && <span className="opacity-70">{label}</span>}
      {label && value && <span className="h-4 w-px bg-current opacity-30" />}
      <span className="font-medium">
        {value || children}
      </span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            "ml-1 flex size-5 items-center justify-center rounded-none opacity-70 hover:opacity-100 hover:bg-black/10 transition-all"
          )}
          aria-label="Remove"
        >
          <X className="size-3 shrink-0" aria-hidden={true} />
        </button>
      )}
    </span>
  )
}
