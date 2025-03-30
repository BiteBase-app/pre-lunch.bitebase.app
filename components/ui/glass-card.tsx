import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "accent" | "secondary" | "contrast"
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white/85 backdrop-blur-md rounded-lg p-6 shadow-md border border-white/25 relative overflow-hidden",
          {
            "border-t-4 border-t-primary": variant === "accent",
            "border-t-4 border-t-secondary": variant === "secondary",
            "border-t-4 border-t-accent": variant === "contrast",
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
GlassCard.displayName = "GlassCard"

export { GlassCard }

