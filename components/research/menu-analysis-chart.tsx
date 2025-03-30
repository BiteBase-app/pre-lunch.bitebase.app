"use client"

import { useEffect, useRef } from "react"

export function MenuAnalysisChart() {
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

    // Menu category data
    const categories = [
      { name: "Coffee & Espresso", demand: 92, competition: 75, profitMargin: 85 },
      { name: "Pastries", demand: 88, competition: 65, profitMargin: 70 },
      { name: "Sandwiches", demand: 85, competition: 60, profitMargin: 65 },
      { name: "Pasta Dishes", demand: 76, competition: 45, profitMargin: 60 },
      { name: "Breakfast", demand: 72, competition: 70, profitMargin: 55 },
      { name: "Smoothies", demand: 58, competition: 50, profitMargin: 50 },
    ]

    // Draw bar chart
    const barWidth = (width - 150) / categories.length
    const barHeightMultiplier = (height - 80) / 100

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(100, 40)
    ctx.lineTo(100, height - 40)
    ctx.lineTo(width - 50, height - 40)
    ctx.stroke()

    // Draw y-axis labels
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "right"

    for (let i = 0; i <= 5; i++) {
      const value = i * 20
      const y = height - 40 - value * barHeightMultiplier

      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.moveTo(100, y)
      ctx.lineTo(width - 50, y)
      ctx.stroke()

      ctx.fillText(value.toString() + "%", 95, y + 4)
    }

    // Draw bars and labels
    categories.forEach((category, index) => {
      const x = 100 + index * barWidth + barWidth * 0.1
      const barWidthActual = barWidth * 0.8

      // Draw demand bar
      const demandHeight = category.demand * barHeightMultiplier
      const demandY = height - 40 - demandHeight
      ctx.fillStyle = "#3b82f6"
      ctx.fillRect(x, demandY, barWidthActual / 3, demandHeight)

      // Draw competition bar
      const competitionHeight = category.competition * barHeightMultiplier
      const competitionY = height - 40 - competitionHeight
      ctx.fillStyle = "#ef4444"
      ctx.fillRect(x + barWidthActual / 3, competitionY, barWidthActual / 3, competitionHeight)

      // Draw profit margin bar
      const profitHeight = category.profitMargin * barHeightMultiplier
      const profitY = height - 40 - profitHeight
      ctx.fillStyle = "#10b981"
      ctx.fillRect(x + (2 * barWidthActual) / 3, profitY, barWidthActual / 3, profitHeight)

      // Draw category label
      ctx.fillStyle = "#64748b"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"

      // Rotate and draw text
      ctx.save()
      ctx.translate(x + barWidthActual / 2, height - 20)
      ctx.rotate(-Math.PI / 4)
      ctx.fillText(category.name, 0, 0)
      ctx.restore()
    })

    // Draw legend
    ctx.fillStyle = "#3b82f6"
    ctx.fillRect(width - 120, 50, 10, 10)
    ctx.fillStyle = "#0f172a"
    ctx.textAlign = "left"
    ctx.font = "10px sans-serif"
    ctx.fillText("Demand", width - 105, 58)

    ctx.fillStyle = "#ef4444"
    ctx.fillRect(width - 120, 70, 10, 10)
    ctx.fillStyle = "#0f172a"
    ctx.fillText("Competition", width - 105, 78)

    ctx.fillStyle = "#10b981"
    ctx.fillRect(width - 120, 90, 10, 10)
    ctx.fillStyle = "#0f172a"
    ctx.fillText("Profit Margin", width - 105, 98)

    // Draw title
    ctx.fillStyle = "#0f172a"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Menu Category Analysis", width / 2, 20)
  }, [])

  return (
    <div className="w-full h-[250px]">
      <canvas ref={canvasRef} width={400} height={250} className="w-full h-full" />
    </div>
  )
}

