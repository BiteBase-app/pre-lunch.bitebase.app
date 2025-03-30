"use client"

import { useEffect, useRef } from "react"

export function BrandPositioningChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set dimensions
    const width = canvasRef.current.width
    const height = canvasRef.current.height

    // Set up the coordinate system
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 70

    // Draw quadrant labels
    ctx.fillStyle = "#64748b"
    ctx.font = "bold 12px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    ctx.fillText("Premium", centerX, centerY - radius - 20)
    ctx.fillText("Budget", centerX, centerY + radius + 20)
    ctx.fillText("Traditional", centerX - radius - 20, centerY)
    ctx.fillText("Modern", centerX + radius + 20, centerY)

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(centerX, centerY - radius)
    ctx.lineTo(centerX, centerY + radius)
    ctx.moveTo(centerX - radius, centerY)
    ctx.lineTo(centerX + radius, centerY)
    ctx.stroke()

    // Draw quadrant labels inside
    ctx.fillStyle = "#94a3b8"
    ctx.font = "11px sans-serif"

    ctx.fillText("Traditional Premium", centerX - radius / 2, centerY - radius / 2)
    ctx.fillText("Modern Premium", centerX + radius / 2, centerY - radius / 2)
    ctx.fillText("Traditional Budget", centerX - radius / 2, centerY + radius / 2)
    ctx.fillText("Modern Budget", centerX + radius / 2, centerY + radius / 2)

    // Brand positioning data
    const brands = [
      { name: "Your Brand", x: 0.2, y: -0.7, color: "#3b82f6", size: 12 },
      { name: "Chain Cafe", x: 0.5, y: 0.5, color: "#ef4444", size: 10 },
      { name: "Specialty Coffee", x: 0.8, y: -0.6, color: "#10b981", size: 8 },
      { name: "Local Bakery", x: -0.6, y: -0.4, color: "#f59e0b", size: 7 },
      { name: "Italian Restaurant", x: -0.3, y: -0.8, color: "#8b5cf6", size: 9 },
    ]

    // Draw grid lines
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.setLineDash([5, 5])

    // Draw intermediate X grid lines
    ctx.moveTo(centerX - radius / 2, centerY - radius)
    ctx.lineTo(centerX - radius / 2, centerY + radius)
    ctx.moveTo(centerX + radius / 2, centerY - radius)
    ctx.lineTo(centerX + radius / 2, centerY + radius)

    // Draw intermediate Y grid lines
    ctx.moveTo(centerX - radius, centerY - radius / 2)
    ctx.lineTo(centerX + radius, centerY - radius / 2)
    ctx.moveTo(centerX - radius, centerY + radius / 2)
    ctx.lineTo(centerX + radius, centerY + radius / 2)

    ctx.stroke()
    ctx.setLineDash([])

    // Draw brands
    brands.forEach((brand) => {
      // Convert normalized coordinates (-1 to 1) to canvas coordinates
      const x = centerX + brand.x * radius
      const y = centerY + brand.y * radius

      // Draw circle
      ctx.beginPath()
      ctx.fillStyle = brand.color
      ctx.arc(x, y, brand.size, 0, Math.PI * 2)
      ctx.fill()

      // Draw brand name
      ctx.fillStyle = "#0f172a"
      ctx.font = brand.name === "Your Brand" ? "bold 12px sans-serif" : "11px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(brand.name, x, y + brand.size + 10)
    })

    // Draw legend
    const legendX = width - 150
    const legendY = 40
    const itemHeight = 25

    brands.forEach((brand, i) => {
      const y = legendY + i * itemHeight

      // Draw circle
      ctx.beginPath()
      ctx.fillStyle = brand.color
      ctx.arc(legendX, y, 6, 0, Math.PI * 2)
      ctx.fill()

      // Draw name
      ctx.fillStyle = "#64748b"
      ctx.font = brand.name === "Your Brand" ? "bold 11px sans-serif" : "11px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(brand.name, legendX + 12, y)
    })

    // Draw title
    ctx.fillStyle = "#0f172a"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText("Brand Positioning Map", centerX, 20)
  }, [])

  return (
    <div className="w-full h-[400px]">
      <canvas ref={canvasRef} width={600} height={400} className="w-full h-full" />
    </div>
  )
}

