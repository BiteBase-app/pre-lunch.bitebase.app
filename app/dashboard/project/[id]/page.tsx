import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Share } from "lucide-react"
import { ProjectMap } from "@/components/maps/project-map"
import { MetricCard } from "@/components/dashboard/metric-card"
import { CompetitorList } from "@/components/dashboard/competitor-list"
import { DemographicChart } from "@/components/dashboard/demographic-chart"
import { TrafficAnalysis } from "@/components/dashboard/traffic-analysis"
import { RealEstateMetrics } from "@/components/dashboard/real-estate-metrics"

export default function ProjectPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the project data based on the ID
  const projectData = {
    id: params.id,
    name: "Downtown Italian Restaurant",
    location: "Chicago, IL",
    address: "123 W Madison St, Chicago, IL 60602",
    cuisine: "Italian",
    coordinates: { lat: 41.8819, lng: -87.6278 },
    radius: 1.5,
    createdAt: "2023-06-15",
    lastUpdated: "2023-06-22",
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={projectData.name}
        text={`${projectData.address} • ${projectData.cuisine} • Created on ${projectData.createdAt}`}
      >
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </DashboardHeader>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="product">Product</TabsTrigger>
          <TabsTrigger value="place">Place</TabsTrigger>
          <TabsTrigger value="price">Price</TabsTrigger>
          <TabsTrigger value="promotion">Promotion</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="col-span-2 md:row-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Market Analysis Map</CardTitle>
                <CardDescription>Interactive map showing key market insights</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px] w-full">
                  <ProjectMap
                    lat={projectData.coordinates.lat}
                    lng={projectData.coordinates.lng}
                    radius={projectData.radius}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Market Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <MetricCard
                    title="Population Density"
                    value="12,450"
                    unit="people/sq mi"
                    change={8}
                    description="Within 1.5 mile radius"
                  />
                  <MetricCard
                    title="Competitors"
                    value="14"
                    unit="restaurants"
                    change={-2}
                    description="Similar cuisine within radius"
                  />
                  <MetricCard
                    title="Avg. Foot Traffic"
                    value="1,850"
                    unit="people/day"
                    change={12}
                    description="Weekday average on this block"
                  />
                  <MetricCard
                    title="Rent Estimate"
                    value="$42"
                    unit="per sq ft"
                    change={3}
                    description="Commercial space in this area"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Competitor Analysis</CardTitle>
                <CardDescription>Nearby competitors and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <CompetitorList />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Demographics</CardTitle>
                <CardDescription>Population demographics in target area</CardDescription>
              </CardHeader>
              <CardContent>
                <DemographicChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Analysis</CardTitle>
                <CardDescription>Foot and vehicle traffic patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <TrafficAnalysis />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Real Estate</CardTitle>
                <CardDescription>Commercial real estate metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <RealEstateMetrics />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="place" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic & Customer Insights</CardTitle>
              <CardDescription>Detailed analysis of location factors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="h-[500px] w-full">
                  <ProjectMap
                    lat={projectData.coordinates.lat}
                    lng={projectData.coordinates.lng}
                    radius={projectData.radius}
                    layerType="heatmap"
                  />
                </div>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium">Customer Density Heatmap</h3>
                    <p className="text-sm text-muted-foreground">
                      The map shows population density with higher concentrations in red and orange areas. Your selected
                      location is in a high-density area with strong foot traffic potential.
                    </p>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium">Competitor Landscape</h3>
                    <p className="text-sm text-muted-foreground">
                      There are 14 restaurants within your analysis radius, with 4 offering similar cuisine. The closest
                      direct competitor is 0.3 miles away.
                    </p>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium">Delivery & Pickup Hotspots</h3>
                    <p className="text-sm text-muted-foreground">
                      Your location has strong potential for delivery services with 3 major residential complexes within
                      a 1-mile radius. The area also has good accessibility for pickup orders.
                    </p>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium">Real Estate Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      Commercial rent in this area averages $42 per square foot, which is 8% higher than the city
                      average but justified by the high foot traffic and visibility.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

