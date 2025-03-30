import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface MarketInsightsProps {
  data: any
}

export function MarketInsights({ data }: MarketInsightsProps) {
  if (!data || !data.success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market Analysis</CardTitle>
          <CardDescription>{data?.message || "Unable to load market analysis data"}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Analysis</CardTitle>
        <CardDescription>Insights about your market size, growth, and trends</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Market Size</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">${data.marketSize.toLocaleString()}M</span>
              <Badge variant={data.growthRate > 0.05 ? "success" : "default"}>
                {(data.growthRate * 100).toFixed(1)}% Growth
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Market Saturation</h3>
            <Progress value={data.marketSaturation * 100} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Unsaturated</span>
              <span>Fully Saturated</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">Key Market Trends</h3>
          <ul className="space-y-1">
            {data.keyTrends.map((trend: string, i: number) => (
              <li key={i} className="text-sm">
                • {trend}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">Consumer Preferences</h3>
          <div className="space-y-2">
            {data.consumerPreferences.map((pref: any, i: number) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{pref.preference}</span>
                  <span className="font-medium">{pref.percentage}%</span>
                </div>
                <Progress value={pref.percentage} className="h-1" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">Seasonal Factors</h3>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {data.seasonalFactors.map((factor: any, i: number) => (
              <div key={i} className="rounded-md border p-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{factor.season}</span>
                  <Badge variant={factor.opportunityScore > 7 ? "success" : "default"}>
                    {factor.opportunityScore}/10
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{factor.impact}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">Strategic Recommendations</h3>
          <ul className="space-y-1">
            {data.recommendations.map((rec: string, i: number) => (
              <li key={i} className="text-sm">
                • {rec}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

