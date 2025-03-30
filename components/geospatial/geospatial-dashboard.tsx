"use client"

import { useEffect, useState } from "react"
import { MapVisualization } from "@/components/geospatial/map-visualization"
import {
  getRestaurantLocations,
  getCompetitorLocations,
  getCustomerDensityData,
  getTrafficFlowData,
} from "@/lib/motherduck"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

interface GeospatialDashboardProps {
  restaurantId?: number
}

export function GeospatialDashboard({ restaurantId = 1 }: GeospatialDashboardProps) {
  const [restaurantData, setRestaurantData] = useState<any[]>([])
  const [competitorData, setCompetitorData] = useState<any[]>([])
  const [densityData, setDensityData] = useState<any[]>([])
  const [trafficData, setTrafficData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("restaurants")

  useEffect(() => {
    async function fetchGeospatialData() {
      try {
        setIsLoading(true)

        // Fetch all data in parallel
        const [restaurants, competitors, density, traffic] = await Promise.all([
          getRestaurantLocations(),
          getCompetitorLocations(restaurantId),
          getCustomerDensityData(restaurantId),
          getTrafficFlowData(restaurantId),
        ])

        setRestaurantData(restaurants)
        setCompetitorData(competitors)
        setDensityData(density)
        setTrafficData(traffic)
      } catch (err) {
        console.error("Error fetching geospatial data:", err)
        setError("Failed to load geospatial data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGeospatialData()
  }, [restaurantId])

  return (
    <div className="space-y-4">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Geospatial Analysis</AlertTitle>
        <AlertDescription>
          This dashboard uses MotherDuck (DuckDB) for geospatial data processing and VisActor for visualization. The
          data shown is simulated for demonstration purposes.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="restaurants">Restaurant Locations</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
          <TabsTrigger value="density">Customer Density</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="restaurants" className="mt-4">
          <MapVisualization
            title="Restaurant Locations"
            description="Map of all restaurant locations with performance metrics"
            data={restaurantData}
            type="point"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Distribution</CardTitle>
                <CardDescription>Distribution of restaurants by district</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* District distribution chart would go here */}
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <p className="text-muted-foreground">District distribution chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cuisine Distribution</CardTitle>
                <CardDescription>Distribution of restaurants by cuisine type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* Cuisine distribution chart would go here */}
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <p className="text-muted-foreground">Cuisine distribution chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitors" className="mt-4">
          <MapVisualization
            title="Competitor Analysis"
            description="Map of competitors within selected radius"
            data={competitorData}
            type="point"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Competitor Ratings</CardTitle>
                <CardDescription>Ratings comparison with competitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* Competitor ratings chart would go here */}
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <p className="text-muted-foreground">Competitor ratings chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Share</CardTitle>
                <CardDescription>Market share distribution among competitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* Market share chart would go here */}
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <p className="text-muted-foreground">Market share chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="density" className="mt-4">
          <MapVisualization
            title="Customer Density"
            description="Heatmap showing customer density around restaurant"
            data={densityData}
            type="heatmap"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Demographics</CardTitle>
                <CardDescription>Demographics by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* Demographics chart would go here */}
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <p className="text-muted-foreground">Demographics chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Catchment</CardTitle>
                <CardDescription>Distance analysis of customer origins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* Catchment chart would go here */}
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <p className="text-muted-foreground">Catchment area chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="mt-4">
          <MapVisualization
            title="Traffic Flow Analysis"
            description="Hourly traffic patterns around restaurant"
            data={trafficData}
            type="flow"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Peak Hours Analysis</CardTitle>
                <CardDescription>Traffic patterns during peak hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* Peak hours chart would go here */}
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <p className="text-muted-foreground">Peak hours chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility Score</CardTitle>
                <CardDescription>Accessibility metrics by transportation type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* Accessibility chart would go here */}
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <p className="text-muted-foreground">Accessibility chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

