import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/formatters"

interface SalesCardProps {
  title: string
  value: number
  description?: string
  percentageChange?: number
  period?: string
  className?: string
}

export function SalesCard({
  title,
  value,
  description,
  percentageChange,
  period = "from last month",
  className,
}: SalesCardProps) {
  const isPositive = percentageChange && percentageChange > 0
  const isNegative = percentageChange && percentageChange < 0

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(value)}</div>
        {percentageChange !== undefined && (
          <p className="text-xs text-muted-foreground">
            <span
              className={cn(
                "inline-flex items-center font-medium",
                isPositive ? "text-green-600" : "",
                isNegative ? "text-red-600" : "",
              )}
            >
              {isPositive && <ArrowUpIcon className="mr-1 h-3 w-3" />}
              {isNegative && <ArrowDownIcon className="mr-1 h-3 w-3" />}
              {Math.abs(percentageChange).toFixed(1)}%
            </span>{" "}
            {period}
          </p>
        )}
        {description && <p className="mt-2 text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  )
}

