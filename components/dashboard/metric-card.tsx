import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  unit: string
  change: number
  description: string
}

export function MetricCard({ title, value, unit, change, description }: MetricCardProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium leading-none">{title}</p>
      <div className="flex items-baseline gap-1">
        <p className="text-2xl font-bold">{value}</p>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      <div className="flex items-center gap-1">
        {change > 0 ? (
          <ArrowUpIcon className="h-3 w-3 text-green-500" />
        ) : change < 0 ? (
          <ArrowDownIcon className="h-3 w-3 text-red-500" />
        ) : null}
        <p
          className={`text-xs ${change > 0 ? "text-green-500" : change < 0 ? "text-red-500" : "text-muted-foreground"}`}
        >
          {change > 0 ? "+" : ""}
          {change}% vs. average
        </p>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

