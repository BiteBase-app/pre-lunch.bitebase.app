"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface Location {
  id: string
  name: string
  address: string
  city: string
  state: string
  latitude: number
  longitude: number
  monthly_revenue: number
}

interface LocationMapProps {
  locations: Location[]
}

export function LocationMap({ locations }: LocationMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  useEffect(() => {
    // This would normally load a mapping library like Google Maps or Mapbox
    // For demo purposes, we're just simulating loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!mapLoaded) {
    return (
      <Card className="h-[500px]">
        <CardContent className="flex h-full items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="mb-2 h-8 w-8 animate-spin text-primary" />
            <p>Loading map...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardContent className="p-0">
          <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
            {/* Map placeholder - would be replaced with actual map */}
            <div className="absolute inset-0 bg-muted/50">
              <div className="h-full w-full bg-[url('/placeholder.svg?height=600&width=800')]"></div>

              {/* Location markers */}
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="absolute flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  style={{
                    left: `${30 + Math.random() * 40}%`, // Placeholder positioning
                    top: `${20 + Math.random() * 60}%`, // Placeholder positioning
                  }}
                  onClick={() => setSelectedLocation(location)}
                >
                  <span className="text-xs">{location.name.charAt(0)}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-2 text-lg font-medium">Locations Overview</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Locations</span>
                <span className="font-medium">{locations.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Revenue</span>
                <span className="font-medium">
                  ${locations.reduce((sum, loc) => sum + Number(loc.monthly_revenue), 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Avg Revenue/Location</span>
                <span className="font-medium">
                  $
                  {(
                    locations.reduce((sum, loc) => sum + Number(loc.monthly_revenue), 0) / locations.length
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="max-h-[300px] overflow-auto p-0">
            <div className="p-4">
              <h3 className="mb-2 text-lg font-medium">All Locations</h3>
            </div>
            <div className="space-y-2 px-4 pb-4">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className={`cursor-pointer rounded-lg border p-2 transition-colors hover:bg-muted/50 ${
                    selectedLocation?.id === location.id ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{location.name}</h4>
                    <Badge variant="outline">${Number(location.monthly_revenue).toLocaleString()}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {location.city}, {location.state}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedLocation && (
        <Card className="md:col-span-3">
          <CardContent className="p-4">
            <h3 className="mb-2 text-lg font-medium">{selectedLocation.name} Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
                <p>{selectedLocation.address}</p>
                <p>
                  {selectedLocation.city}, {selectedLocation.state}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Performance</h4>
                <p className="text-2xl font-bold">${Number(selectedLocation.monthly_revenue).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Monthly Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

