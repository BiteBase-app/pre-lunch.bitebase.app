import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ResearchMap } from "@/components/maps/research-map"
import { CompetitorAnalysisTable } from "@/components/research/competitor-analysis-table"
import { DemographicsChart } from "@/components/research/demographics-chart"
import { TrafficPatternChart } from "@/components/research/traffic-pattern-chart"
import { RealEstateMetricsTable } from "@/components/research/real-estate-metrics-table"

interface PlaceInsightsProps {
  coordinates: {
    lat: number
    lng: number
  }
  radius: number
}

export function PlaceInsights({ coordinates, radius }: PlaceInsightsProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2 md:row-span-2">
          <CardHeader>
            <CardTitle>Location Analysis</CardTitle>
            <CardDescription>Interactive map showing key location insights</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[500px] w-full">
              <ResearchMap
                initialLat={coordinates.lat}
                initialLng={coordinates.lng}
                radius={radius}
                showLayers={true}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location Score</CardTitle>
            <CardDescription>Overall rating of your selected location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold text-primary">86</div>
              <div className="text-sm text-muted-foreground">out of 100</div>

              <div className="mt-6 w-full space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Foot Traffic</span>
                    <Badge>92/100</Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "92%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Demographics Match</span>
                    <Badge>88/100</Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "88%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Competitor Saturation</span>
                    <Badge>78/100</Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "78%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Accessibility</span>
                    <Badge>85/100</Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location Summary</CardTitle>
            <CardDescription>Key insights about your selected location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="rounded-md border p-3">
                <div className="font-medium">High Foot Traffic Area</div>
                <p className="text-muted-foreground">
                  Your selected location has 22% higher foot traffic than the area average, particularly during morning
                  and lunch hours.
                </p>
              </div>

              <div className="rounded-md border p-3">
                <div className="font-medium">Ideal Demographics</div>
                <p className="text-muted-foreground">
                  The area has a high concentration of your target demographics: young professionals and business
                  customers.
                </p>
              </div>

              <div className="rounded-md border p-3">
                <div className="font-medium">Moderate Competition</div>
                <p className="text-muted-foreground">
                  There are 4 similar cafes within your radius, but none offering your specific Italian cafe concept.
                </p>
              </div>

              <div className="rounded-md border p-3">
                <div className="font-medium">Good Accessibility</div>
                <p className="text-muted-foreground">
                  The location is easily accessible by public transit and has nearby parking options.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Competitor Analysis</CardTitle>
            <CardDescription>Nearby competitors and their performance</CardDescription>
          </CardHeader>
          <CardContent>
            <CompetitorAnalysisTable />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demographics</CardTitle>
            <CardDescription>Population demographics in target area</CardDescription>
          </CardHeader>
          <CardContent>
            <DemographicsChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Patterns</CardTitle>
            <CardDescription>Foot and vehicle traffic analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <TrafficPatternChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Real Estate Metrics</CardTitle>
            <CardDescription>Commercial real estate data for this area</CardDescription>
          </CardHeader>
          <CardContent>
            <RealEstateMetricsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

