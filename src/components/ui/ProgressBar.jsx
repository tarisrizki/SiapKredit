import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "../../lib/utils"

const ProgressBar = React.forwardRef(({ className, value, max = 100, colorClass, ...props }, ref) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 transition-all duration-500 ease-in-out", colorClass || "bg-primary")}
        style={{ transform: `translateX(-${100 - (percentage || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
ProgressBar.displayName = ProgressPrimitive.Root.displayName

export { ProgressBar }
