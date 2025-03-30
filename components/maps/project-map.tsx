"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Layers, MapPin, Users } from "lucide-react"

interface ProjectMapProps {
  lat: number
  lng: number
  radius: number
  layerType?: "default" | "heatmap" | "competitors" | "traffic"
}

export function ProjectMap({ lat, lng, radius, layerType = "default" }: ProjectMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [activeLayer, setActiveLayer] = useState<string>(layerType)

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
      mapCanvas.appendChild(heatmap)
    } else if (activeLayer === "competitors") {
      // Add competitor markers
      const competitors = [
        { lat: 0.45, lng: 0.48 },
        { lat: 0.55, lng: 0.45 },
        { lat: 0.52, lng: 0.58 },
        { lat: 0.42, lng: 0.52 },
      ]

      competitors.forEach((comp, index) => {
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
        label.textContent = `Competitor ${index + 1}`

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
      mapCanvas.appendChild(horizontalRoad)

      const verticalRoad = document.createElement("div")
      verticalRoad.style.position = "absolute"
      verticalRoad.style.top = "0"
      verticalRoad.style.left = "50%"
      verticalRoad.style.width = "10px"
      verticalRoad.style.height = "100%"
      verticalRoad.style.backgroundColor = "rgba(59, 130, 246, 0.7)"
      verticalRoad.style.transform = "translateX(-50%)"
      mapCanvas.appendChild(verticalRoad)
    }

    // Add location info
    const locationInfo = document.createElement("div")
    locationInfo.style.position = "absolute"
    locationInfo.style.bottom = "10px"
    locationInfo.style.left = "10px"
    locationInfo.style.padding = `var(--spacing-sm) 12px`
    locationInfo.style.backgroundColor = "white"
    locationInfo.style.borderRadius = "4px"
    locationInfo.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)"
    locationInfo.style.fontSize = "12px"
    locationInfo.textContent = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)} | Radius: ${radius} miles`
    mapCanvas.appendChild(locationInfo)

    // Add map controls
    const zoomControls = document.createElement("div")
    zoomControls.style.position = "absolute"
    zoomControls.style.top = "70px"
    zoomControls.style.right = "10px"
    zoomControls.style.display = "flex"
    zoomControls.style.flexDirection = "column"
    zoomControls.style.gap = "4px"

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

    mapContainer.appendChild(mapCanvas)

    return () => {
      // Cleanup
      if (mapContainer.contains(mapCanvas)) {
        mapContainer.removeChild(mapCanvas)
      }
    }
  }, [lat, lng, radius, activeLayer])

  const handleLayerChange = (value: string) => {
    setActiveLayer(value)
  }

  return (
    <div className="h-full w-full">
      <div className="absolute z-10 m-4 flex items-center justify-between w-[calc(100%-2rem)]">
        <Tabs value={activeLayer} onValueChange={handleLayerChange} className="bg-white rounded-md shadow-sm">
          <TabsList>
            <TabsTrigger value="default">Default</TabsTrigger>
            <TabsTrigger value="heatmap">Population</TabsTrigger>
            <TabsTrigger value="competitors">Competitors</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 bg-white">
            <Layers className="h-4 w-4 mr-2" />
            Layers
          </Button>
          <Button variant="outline" size="sm" className="h-9 bg-white">
            <MapPin className="h-4 w-4 mr-2" />
            Points of Interest
          </Button>
          <Button variant="outline" size="sm" className="h-9 bg-white">
            <Users className="h-4 w-4 mr-2" />
            Demographics
          </Button>
        </div>
      </div>
      <div ref={mapRef} className="h-full w-full" />
    </div>
  )
}

