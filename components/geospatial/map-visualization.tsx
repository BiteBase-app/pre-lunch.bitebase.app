"use client"

import { useEffect, useState } from "react"
import { VChart } from "@visactor/react-vchart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MapVisualizationProps {
  restaurantId?: number
  title?: string
  description?: string
  data: any[]
  type: "point" | "heatmap" | "flow"
  height?: number
}

export function MapVisualization({
  restaurantId,
  title = "Geospatial Visualization",
  description = "Interactive map visualization",
  data = [],
  type = "point",
  height = 500,
}: MapVisualizationProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mapSpec, setMapSpec] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<string>("map")

  useEffect(() => {
    if (!data || data.length === 0) {
      setError("No data available for visualization")
      setIsLoading(false)
      return
    }

    try {
      // Create different specs based on visualization type
      if (type === "point") {
        setMapSpec({
          type: "map",
          background: "#f8f9fa",
          padding: [20, 20, 20, 20],
          map: {
            type: "amap",
            style: "light",
            center: [data[0].longitude, data[0].latitude],
            zoom: 14,
          },
          layers: [
            {
              type: "point",
              source: {
                data: data,
                parser: {
                  type: "json",
                  x: "longitude",
                  y: "latitude",
                },
              },
              encode: {
                size: 15,
                shape: "circle",
                color: {
                  field: "cuisine_type",
                  scale: {
                    type: "ordinal",
                    domain: [...new Set(data.map((d) => d.cuisine_type))],
                    range: ["#1E88E5", "#FFC107", "#D81B60", "#7CB342", "#8E24AA", "#00ACC1", "#FF7043", "#5E35B1"],
                  },
                },
                opacity: 0.8,
                tooltip: [
                  { field: "name", title: "Restaurant" },
                  { field: "cuisine_type", title: "Cuisine" },
                  { field: "avg_daily_sales", title: "Avg. Daily Sales", format: "$.2f" },
                  { field: "customer_count", title: "Daily Customers" },
                ],
              },
              style: {
                stroke: "#fff",
                strokeWidth: 1,
              },
            },
          ],
          legends: [
            {
              type: "discrete",
              orient: "right",
              title: "Cuisine Type",
              shape: "circle",
              padding: [0, 0, 0, 20],
              encode: {
                color: {
                  field: "cuisine_type",
                  scale: {
                    type: "ordinal",
                    domain: [...new Set(data.map((d) => d.cuisine_type))],
                    range: ["#1E88E5", "#FFC107", "#D81B60", "#7CB342", "#8E24AA", "#00ACC1", "#FF7043", "#5E35B1"],
                  },
                },
              },
            },
          ],
        })
      } else if (type === "heatmap") {
        setMapSpec({
          type: "map",
          background: "#f8f9fa",
          padding: [20, 20, 20, 20],
          map: {
            type: "amap",
            style: "light",
            center: [data[0].lng, data[0].lat],
            zoom: 15,
          },
          layers: [
            {
              type: "heatmap",
              source: {
                data: data,
                parser: {
                  type: "json",
                  x: "lng",
                  y: "lat",
                  value: "customer_count",
                },
              },
              encode: {
                color: {
                  field: "customer_count",
                  scale: {
                    type: "sequential",
                    range: [
                      "#313695",
                      "#4575b4",
                      "#74add1",
                      "#abd9e9",
                      "#e0f3f8",
                      "#ffffbf",
                      "#fee090",
                      "#fdae61",
                      "#f46d43",
                      "#d73027",
                      "#a50026",
                    ],
                  },
                },
                radius: 30,
                opacity: 0.8,
                tooltip: [{ field: "customer_count", title: "Customer Count" }],
              },
            },
          ],
          legends: [
            {
              type: "continuous",
              orient: "right",
              title: "Customer Density",
              length: 200,
              encode: {
                color: {
                  field: "customer_count",
                  scale: {
                    type: "sequential",
                    range: [
                      "#313695",
                      "#4575b4",
                      "#74add1",
                      "#abd9e9",
                      "#e0f3f8",
                      "#ffffbf",
                      "#fee090",
                      "#fdae61",
                      "#f46d43",
                      "#d73027",
                      "#a50026",
                    ],
                  },
                },
              },
            },
          ],
        })
      } else if (type === "flow") {
        // For flow data, we'll create a time-based chart
        setMapSpec({
          type: "line",
          background: "#f8f9fa",
          padding: [40, 40, 60, 60],
          data: [
            {
              id: "traffic",
              values: data,
            },
          ],
          scales: [
            {
              id: "xScale",
              type: "band",
              domain: { data: "traffic", field: "hour" },
              range: "width",
              padding: 0.05,
            },
            {
              id: "yScale",
              type: "linear",
              domain: { data: "traffic", field: ["pedestrian_count", "vehicle_count"] },
              range: "height",
              nice: true,
            },
            {
              id: "colorScale",
              type: "ordinal",
              domain: ["Pedestrians", "Vehicles"],
              range: ["#1E88E5", "#FFC107"],
            },
          ],
          axes: [
            {
              orient: "bottom",
              scale: "xScale",
              title: "Hour of Day",
              grid: true,
              tickCount: 12,
              label: {
                formatter: (val: any) => `${val}:00`,
              },
            },
            {
              orient: "left",
              scale: "yScale",
              title: "Count",
              grid: true,
              tickCount: 5,
            },
          ],
          marks: [
            {
              type: "line",
              from: { data: "traffic" },
              encode: {
                x: { scale: "xScale", field: "hour" },
                y: { scale: "yScale", field: "pedestrian_count" },
                stroke: { scale: "colorScale", value: "Pedestrians" },
                strokeWidth: 3,
                tooltip: [
                  { field: "hour", title: "Hour", format: (val: any) => `${val}:00` },
                  { field: "pedestrian_count", title: "Pedestrians" },
                ],
              },
            },
            {
              type: "line",
              from: { data: "traffic" },
              encode: {
                x: { scale: "xScale", field: "hour" },
                y: { scale: "yScale", field: "vehicle_count" },
                stroke: { scale: "colorScale", value: "Vehicles" },
                strokeWidth: 3,
                tooltip: [
                  { field: "hour", title: "Hour", format: (val: any) => `${val}:00` },
                  { field: "vehicle_count", title: "Vehicles" },
                ],
              },
            },
          ],
          legends: [
            {
              type: "discrete",
              orient: "top",
              title: "Traffic Type",
              shape: "line",
              encode: {
                color: {
                  scale: "colorScale",
                },
              },
            },
          ],
        })
      }

      setIsLoading(false)
    } catch (err) {
      console.error("Error creating map visualization:", err)
      setError("Failed to create visualization")
      setIsLoading(false)
    }
  }, [data, type])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className={`w-full h-[${height}px]`} />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-red-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {type === "flow" ? (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="chart">Time Chart</TabsTrigger>
            </TabsList>
            <TabsContent value="map">
              <div className="h-[400px] w-full">
                {/* Placeholder for map view of traffic flow */}
                <div className="flex items-center justify-center h-full bg-muted rounded-md">
                  <p className="text-muted-foreground">Map view of traffic flow is not available in this demo</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="chart">
              <div className="h-[400px] w-full">
                <VChart spec={mapSpec} />
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="h-[400px] w-full">
            <VChart spec={mapSpec} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

