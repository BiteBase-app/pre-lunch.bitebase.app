import { Badge } from "@/components/ui/badge"

export function RealEstateMetrics() {
  const metrics = [
    {
      title: "Average Rent",
      value: "$42",
      unit: "per sq ft",
      change: 8,
      trend: "up",
    },
    {
      title: "Vacancy Rate",
      value: "4.2",
      unit: "%",
      change: -2.1,
      trend: "down",
    },
    {
      title: "Avg. Lease Term",
      value: "3.5",
      unit: "years",
      change: 0.5,
      trend: "up",
    },
    {
      title: "Foot Traffic",
      value: "1,850",
      unit: "daily",
      change: 12,
      trend: "up",
    },
    {
      title: "Nearby Parking",
      value: "320",
      unit: "spaces",
      change: 0,
      trend: "neutral",
    },
  ]

  return (
    <div className="space-y-4">
      {metrics.map((metric, index) => (
        <div key={index} className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">{metric.title}</div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold">{metric.value}</span>
              <span className="text-xs text-muted-foreground">{metric.unit}</span>
            </div>
          </div>
          <Badge
            variant={metric.trend === "neutral" ? "outline" : "default"}
            className={
              metric.trend === "up"
                ? "bg-green-500 hover:bg-green-600"
                : metric.trend === "down"
                  ? "bg-red-500 hover:bg-red-600"
                  : ""
            }
          >
            {metric.change > 0 ? "+" : ""}
            {metric.change}%
          </Badge>
        </div>
      ))}

      <div className="mt-4 rounded-md border p-3 text-sm">
        <p className="font-medium">Real Estate Insight</p>
        <p className="mt-1 text-muted-foreground">
          Commercial rent in this area is 8% above city average, but the high foot traffic and low vacancy rate indicate
          strong business potential. Consider negotiating a longer lease term to secure current rates.
        </p>
      </div>
    </div>
  )
}

