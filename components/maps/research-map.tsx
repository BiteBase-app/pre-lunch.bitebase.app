"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Layers, MapPin, Search, Users } from "lucide-react"

interface ResearchMapProps {
  initialLat: number
  initialLng: number
  radius?: number
  onLocationSelect?: (lat: number, lng: number, address: string) => void
  showLayers?: boolean
}

export function ResearchMap({
  initialLat,
  initialLng,
  radius = 1.5,
  onLocationSelect,
  showLayers = false,
}: ResearchMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeLayer, setActiveLayer] = useState<string>("default")

  useEffect(() => {
    if (!mapRef.current) return

    // This is a placeholder for the actual map implementation
    // In a real application, you would use a library like Mapbox, Google Maps, or Leaflet

    const mapContainer = mapRef.current
    mapContainer.style.position = "relative"

    // Create a simple placeholder map
    const mapCanvas = document.createElement("div")
    mapCanvas.style.width = "100%"
    mapCanvas.style.height = "100%"
    mapCanvas.style.backgroundColor = "#e2e8f0"
    mapCanvas.style.position = "absolute"
    mapCanvas.style.top = "0"
    mapCanvas.style.left = "0"

    // Add grid lines to simulate a map
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const gridLine = document.createElement("div")
        gridLine.style.position = "absolute"
        gridLine.style.top = `${i * 10}%`
        gridLine.style.left = `${j * 10}%`
        gridLine.style.width = "100%"
        gridLine.style.height = "1px"
        gridLine.style.backgroundColor = "#cbd5e1"
        mapCanvas.appendChild(gridLine)

        const vertLine = document.createElement("div")
        vertLine.style.position = "absolute"
        vertLine.style.top = "0"
        vertLine.style.left = `${j * 10}%`
        vertLine.style.width = "1px"
        vertLine.style.height = "100%"
        vertLine.style.backgroundColor = "#cbd5e1"
        mapCanvas.appendChild(vertLine)
      }
    }

    // Add a marker for the selected location
    const marker = document.createElement("div")
    marker.style.position = "absolute"
    marker.style.top = "50%"
    marker.style.left = "50%"
    marker.style.width = "20px"
    marker.style.height = "20px"
    marker.style.borderRadius = "50%"
    marker.style.backgroundColor = "#3b82f6"
    marker.style.transform = "translate(-50%, -50%)"
    marker.style.boxShadow = "0 0 0 4px rgba(59, 130, 246, 0.3)"
    marker.style.zIndex = "10"
    mapCanvas.appendChild(marker)

    // Add a circle for the radius
    const circle = document.createElement("div")
    circle.style.position = "absolute"
    circle.style.top = "50%"
    circle.style.left = "50%"
    circle.style.width = `${radius * 50}px`
    circle.style.height = `${radius * 50}px`
    circle.style.borderRadius = "50%"
    circle.style.border = "2px solid #3b82f6"
    circle.style.backgroundColor = "rgba(59, 130, 246, 0.1)"
    circle.style.transform = "translate(-50%, -50%)"
    circle.style.zIndex = "5"
    mapCanvas.appendChild(circle)

    // Add different visualizations based on the layer type
    if (activeLayer === "heatmap") {
      // Create a simple heatmap overlay
      const heatmap = document.createElement("div")
      heatmap.style.position = "absolute"
      heatmap.style.top = "0"
      heatmap.style.left = "0"
      heatmap.style.width = "100%"
      heatmap.style.height = "100%"
      heatmap.style.background =
        "radial-gradient(circle at 50% 40%, rgba(239, 68, 68, 0.7) 0%, rgba(239, 68, 68, 0.5) 20%, rgba(245, 158, 11, 0.3) 40%, rgba(16, 185, 129, 0.1) 60%, transparent 80%)"
      heatmap.style.opacity = "0.7"
      heatmap.style.pointerEvents = "none"
      heatmap.style.zIndex = "2"
      mapCanvas.appendChild(heatmap)
    } else if (activeLayer === "competitors") {
      // Add competitor markers
      const competitors = [
        { lat: 0.45, lng: 0.48, name: "Cafe Milano", rating: 4.2 },
        { lat: 0.55, lng: 0.45, name: "Espresso Bar", rating: 3.8 },
        { lat: 0.52, lng: 0.58, name: "The Coffee House", rating: 4.5 },
        { lat: 0.42, lng: 0.52, name: "Brew & Bake", rating: 4.0 },
      ]

      competitors.forEach((comp) => {
        const compMarker = document.createElement("div")
        compMarker.style.position = "absolute"
        compMarker.style.top = `${comp.lat * 100}%`
        compMarker.style.left = `${comp.lng * 100}%`
        compMarker.style.width = "16px"
        compMarker.style.height = "16px"
        compMarker.style.borderRadius = "50%"
        compMarker.style.backgroundColor = "#ef4444"
        compMarker.style.transform = "translate(-50%, -50%)"
        compMarker.style.boxShadow = "0 0 0 2px rgba(239, 68, 68, 0.3)"
        compMarker.style.zIndex = "3"

        const label = document.createElement("div")
        label.style.position = "absolute"
        label.style.top = "20px"
        label.style.left = "50%"
        label.style.transform = "translateX(-50%)"
        label.style.backgroundColor = "white"
        label.style.padding = "2px 6px"
        label.style.borderRadius = "4px"
        label.style.fontSize = "10px"
        label.style.whiteSpace = "nowrap"
        label.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)"
        label.textContent = `${comp.name} (${comp.rating}★)`

        compMarker.appendChild(label)
        mapCanvas.appendChild(compMarker)
      })
    } else if (activeLayer === "traffic") {
      // Add traffic flow visualization
      const trafficOverlay = document.createElement("div")
      trafficOverlay.style.position = "absolute"
      trafficOverlay.style.top = "0"
      trafficOverlay.style.left = "0"
      trafficOverlay.style.width = "100%"
      trafficOverlay.style.height = "100%"
      trafficOverlay.style.backgroundImage =
        "linear-gradient(45deg, rgba(59, 130, 246, 0.3) 25%, transparent 25%, transparent 50%, rgba(59, 130, 246, 0.3) 50%, rgba(59, 130, 246, 0.3) 75%, transparent 75%, transparent)"
      trafficOverlay.style.backgroundSize = "20px 20px"
      trafficOverlay.style.opacity = "0.5"
      trafficOverlay.style.pointerEvents = "none"
      trafficOverlay.style.zIndex = "2"
      mapCanvas.appendChild(trafficOverlay)

      // Add main roads
      const horizontalRoad = document.createElement("div")
      horizontalRoad.style.position = "absolute"
      horizontalRoad.style.top = "50%"
      horizontalRoad.style.left = "0"
      horizontalRoad.style.width = "100%"
      horizontalRoad.style.height = "10px"
      horizontalRoad.style.backgroundColor = "rgba(59, 130, 246, 0.7)"
      horizontalRoad.style.transform = "translateY(-50%)"
      horizontalRoad.style.zIndex = "3"
      mapCanvas.appendChild(horizontalRoad)

      const verticalRoad = document.createElement("div")
      verticalRoad.style.position = "absolute"
      verticalRoad.style.top = "0"
      verticalRoad.style.left = "50%"
      verticalRoad.style.width = "10px"
      verticalRoad.style.height = "100%"
      verticalRoad.style.backgroundColor = "rgba(59, 130, 246, 0.7)"
      verticalRoad.style.transform = "translateX(-50%)"
      verticalRoad.style.zIndex = "3"
      mapCanvas.appendChild(verticalRoad)
    } else if (activeLayer === "demographics") {
      // Add demographic zones
      const zones = [
        { top: 0, left: 0, width: 50, height: 50, color: "rgba(59, 130, 246, 0.3)", label: "Young Professionals" },
        { top: 0, left: 50, width: 50, height: 50, color: "rgba(245, 158, 11, 0.3)", label: "Families" },
        { top: 50, left: 0, width: 50, height: 50, color: "rgba(16, 185, 129, 0.3)", label: "Students" },
        { top: 50, left: 50, width: 50, height: 50, color: "rgba(139, 92, 246, 0.3)", label: "Seniors" },
      ]

      zones.forEach((zone) => {
        const zoneElement = document.createElement("div")
        zoneElement.style.position = "absolute"
        zoneElement.style.top = `${zone.top}%`
        zoneElement.style.left = `${zone.left}%`
        zoneElement.style.width = `${zone.width}%`
        zoneElement.style.height = `${zone.height}%`
        zoneElement.style.backgroundColor = zone.color
        zoneElement.style.border = "1px dashed rgba(0,0,0,0.2)"
        zoneElement.style.zIndex = "2"

        const label = document.createElement("div")
        label.style.position = "absolute"
        label.style.top = "50%"
        label.style.left = "50%"
        label.style.transform = "translate(-50%, -50%)"
        label.style.backgroundColor = "white"
        label.style.padding = "4px 8px"
        label.style.borderRadius = "4px"
        label.style.fontSize = "12px"
        label.style.fontWeight = "bold"
        label.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)"
        label.textContent = zone.label

        zoneElement.appendChild(label)
        mapCanvas.appendChild(zoneElement)
      })
    }

    // Add location info
    const locationInfo = document.createElement("div")
    locationInfo.style.position = "absolute"
    locationInfo.style.bottom = "10px"
    locationInfo.style.left = "10px"
    locationInfo.style.padding = "8px 12px"
    locationInfo.style.backgroundColor = "white"
    locationInfo.style.borderRadius = "4px"
    locationInfo.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)"
    locationInfo.style.fontSize = "12px"
    locationInfo.textContent = `Lat: ${initialLat.toFixed(6)}, Lng: ${initialLng.toFixed(6)} | Radius: ${radius} miles`
    locationInfo.style.zIndex = "20"
    mapCanvas.appendChild(locationInfo)

    // Add map controls
    const zoomControls = document.createElement("div")
    zoomControls.style.position = "absolute"
    zoomControls.style.top = "70px"
    zoomControls.style.right = "10px"
    zoomControls.style.display = "flex"
    zoomControls.style.flexDirection = "column"
    zoomControls.style.gap = "4px"
    zoomControls.style.zIndex = "20"

    const zoomIn = document.createElement("button")
    zoomIn.textContent = "+"
    zoomIn.style.width = "30px"
    zoomIn.style.height = "30px"
    zoomIn.style.backgroundColor = "white"
    zoomIn.style.border = "1px solid #cbd5e1"
    zoomIn.style.borderRadius = "4px"
    zoomIn.style.cursor = "pointer"

    const zoomOut = document.createElement("button")
    zoomOut.textContent = "-"
    zoomOut.style.width = "30px"
    zoomOut.style.height = "30px"
    zoomOut.style.backgroundColor = "white"
    zoomOut.style.border = "1px solid #cbd5e1"
    zoomOut.style.borderRadius = "4px"
    zoomOut.style.cursor = "pointer"

    zoomControls.appendChild(zoomIn)
    zoomControls.appendChild(zoomOut)
    mapCanvas.appendChild(zoomControls)

    // Add click handler for the map if onLocationSelect is provided
    if (onLocationSelect) {
      mapCanvas.addEventListener("click", (e) => {
        // In a real implementation, you would convert click coordinates to lat/lng
        // For this mockup, we'll just use random offsets from the initial position
        const offsetLat = Math.random() * 0.02 - 0.01
        const offsetLng = Math.random() * 0.02 - 0.01
        const newLat = initialLat + offsetLat
        const newLng = initialLng + offsetLng

        // Generate a fake address
        const address = `${Math.floor(Math.random() * 1000)} Main St, Chicago, IL`

        onLocationSelect(newLat, newLng, address)

        // Update marker position (in a real implementation)
        locationInfo.textContent = `Lat: ${newLat.toFixed(6)}, Lng: ${newLng.toFixed(6)} | Radius: ${radius} miles`
      })
    }

    mapContainer.appendChild(mapCanvas)

    return () => {
      // Cleanup
      if (mapContainer.contains(mapCanvas)) {
        mapContainer.removeChild(mapCanvas)
      }
    }
  }, [initialLat, initialLng, radius, onLocationSelect, activeLayer])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim() || !onLocationSelect) return

    // In a real implementation, you would geocode the address
    // For this mockup, we'll just use random offsets from the initial position
    const offsetLat = Math.random() * 0.05 - 0.025
    const offsetLng = Math.random() * 0.05 - 0.025
    const newLat = initialLat + offsetLat
    const newLng = initialLng + offsetLng

    onLocationSelect(newLat, newLng, searchQuery)
    setSearchQuery("")
  }

  const handleLayerChange = (value: string) => {
    setActiveLayer(value)
  }

  return (
    <div className="h-full w-full">
      <div className="absolute z-10 m-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between w-[calc(100%-2rem)]">
        {onLocationSelect && (
          <form onSubmit={handleSearch} className="flex w-full max-w-md items-center space-x-2">
            <Input
              type="text"
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 bg-white"
            />
            <Button type="submit" size="sm" className="h-9 px-3">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        )}

        {showLayers && (
          <Tabs value={activeLayer} onValueChange={handleLayerChange} className="bg-white rounded-md shadow-sm">
            <TabsList>
              <TabsTrigger value="default">Default</TabsTrigger>
              <TabsTrigger value="heatmap">Population</TabsTrigger>
              <TabsTrigger value="competitors">Competitors</TabsTrigger>
              <TabsTrigger value="traffic">Traffic</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </div>

      {showLayers && (
        <div className="absolute z-10 right-4 top-16 flex flex-col gap-2">
          <Button variant="outline" size="sm" className="h-9 bg-white">
            <Layers className="h-4 w-4 mr-2" />
            Layers
          </Button>
          <Button variant="outline" size="sm" className="h-9 bg-white">
            <MapPin className="h-4 w-4 mr-2" />
            POI
          </Button>
          <Button variant="outline" size="sm" className="h-9 bg-white">
            <Users className="h-4 w-4 mr-2" />
            Demographics
          </Button>
        </div>
      )}

      <div ref={mapRef} className="h-full w-full" />
    </div>
  )
}

