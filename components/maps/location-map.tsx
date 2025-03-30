"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface LocationMapProps {
  initialLat: number
  initialLng: number
  radius?: number
  onLocationSelect?: (lat: number, lng: number, address: string) => void
  readOnly?: boolean
}

export function LocationMap({ initialLat, initialLng, radius, onLocationSelect, readOnly = false }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState("")

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

    // Add a circle for the radius if provided
    if (radius) {
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
    locationInfo.textContent = `Lat: ${initialLat.toFixed(6)}, Lng: ${initialLng.toFixed(6)}`
    mapCanvas.appendChild(locationInfo)

    // Add map controls if not read-only
    if (!readOnly) {
      const zoomControls = document.createElement("div")
      zoomControls.style.position = "absolute"
      zoomControls.style.top = "10px"
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

      // Add click handler for the map
      mapCanvas.addEventListener("click", (e) => {
        if (onLocationSelect) {
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
          locationInfo.textContent = `Lat: ${newLat.toFixed(6)}, Lng: ${newLng.toFixed(6)}`
        }
      })
    }

    mapContainer.appendChild(mapCanvas)

    return () => {
      // Cleanup
      if (mapContainer.contains(mapCanvas)) {
        mapContainer.removeChild(mapCanvas)
      }
    }
  }, [initialLat, initialLng, radius, onLocationSelect, readOnly])

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

  return (
    <div className="h-full w-full">
      {!readOnly && (
        <div className="absolute z-10 m-4 w-[calc(100%-2rem)] max-w-md">
          <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
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
        </div>
      )}
      <div ref={mapRef} className="h-full w-full" />
    </div>
  )
}

