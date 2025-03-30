import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react"

export function RealEstateMetricsTable() {
  const metrics = [
    {
      title: "Average Rent",
      value: "$42",
      unit: "per sq ft/year",
      change: 8,
      trend: "up",
      vs: "vs. city average",
      note: "Higher than average but justified by foot traffic",
    },
    {
      title: "Vacancy Rate",
      value: "4.2",
      unit: "%",
      change: -2.1,
      trend: "down",
      vs: "vs. previous year",
      note: "Low vacancy indicates high demand for space",
    },
    {
      title: "Avg. Lease Term",
      value: "3.5",
      unit: "years",
      change: 0.5,
      trend: "up",
      vs: "vs. previous year",
      note: "Longer leases indicate landlord confidence",
    },
    {
      title: "Foot Traffic",
      value: "1,850",
      unit: "daily",
      change: 12,
      trend: "up",
      vs: "vs. area average",
      note: "Excellent foot traffic for a cafe location",
    },
    {
      title: "Nearby Parking",
      value: "320",
      unit: "spaces",
      change: 0,
      trend: "neutral",
      vs: "vs. area average",
      note: "Adequate parking availability within 2 blocks",
    },
  ]

  return (
    <div className="space-y-4">
      {metrics.map((metric, index) => (
        <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
          <div>
            <div className="font-medium">{metric.title}</div>
            <div className="text-xs text-muted-foreground">{metric.note}</div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1">
              <span className="text-lg font-bold">{metric.value}</span>
              <span className="text-xs text-muted-foreground">{metric.unit}</span>
            </div>
            <div className="flex items-center justify-end text-xs">
              {metric.trend === "up" && <ArrowUpIcon className="h-3 w-3 text-green-500" />}
              {metric.trend === "down" && <ArrowDownIcon className="h-3 w-3 text-red-500" />}
              {metric.trend === "neutral" && <MinusIcon className="h-3 w-3 text-muted-foreground" />}
              <span
                className={
                  metric.trend === "up"
                    ? "text-green-500"
                    : metric.trend === "down"
                      ? "text-red-500"
                      : "text-muted-foreground"
                }
              >
                {metric.change > 0
                  ? `+${metric.change}%`
                  : metric.change < 0
                    ? `${metric.change}%`
                    : `${metric.change}%`}{" "}
                {metric.vs}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

