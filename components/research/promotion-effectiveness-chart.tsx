"use client"

import { useEffect, useRef } from "react"

export function PromotionEffectivenessChart() {
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

    // Promotion effectiveness data
    const promotions = [
      { name: "Loyalty Program", effectiveness: 22, cost: "Low", complexity: "Medium" },
      { name: "Happy Hour", effectiveness: 18, cost: "Low", complexity: "Low" },
      { name: "Business Package", effectiveness: 15, cost: "Medium", complexity: "Medium" },
      { name: "Seasonal Specials", effectiveness: 20, cost: "Medium", complexity: "High" },
      { name: "Social Media", effectiveness: 12, cost: "Low", complexity: "Low" },
      { name: "Email Campaign", effectiveness: 14, cost: "Low", complexity: "Medium" },
      { name: "Local Events", effectiveness: 16, cost: "High", complexity: "High" },
    ]

    // Sort by effectiveness
    promotions.sort((a, b) => b.effectiveness - a.effectiveness)

    // Draw horizontal bar chart
    const padding = 150 // Extra padding for labels
    const chartWidth = width - padding - 50
    const barHeight = 30
    const barGap = 15
    const chartHeight = (barHeight + barGap) * promotions.length

    // Start position
    const startX = padding
    const startY = 50

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX, startY + chartHeight)
    ctx.stroke()

    // Draw effectiveness scale
    ctx.textAlign = "center"
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "#64748b"

    const maxEffectiveness = Math.max(...promotions.map((p) => p.effectiveness))
    const scaleSteps = 5

    for (let i = 0; i <= scaleSteps; i++) {
      const value = (i / scaleSteps) * maxEffectiveness
      const x = startX + (i / scaleSteps) * chartWidth

      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.moveTo(x, startY)
      ctx.lineTo(x, startY + chartHeight)
      ctx.stroke()

      ctx.fillText(`${Math.round(value)}%`, x, startY - 10)
    }

    // Draw bars and labels
    promotions.forEach((promotion, i) => {
      const y = startY + i * (barHeight + barGap)
      const barWidth = (promotion.effectiveness / maxEffectiveness) * chartWidth

      // Determine bar color based on cost
      let barColor
      if (promotion.cost === "Low") {
        barColor = "#3b82f6" // Blue
      } else if (promotion.cost === "Medium") {
        barColor = "#f59e0b" // Amber
      } else {
        barColor = "#ef4444" // Red
      }

      // Draw bar
      ctx.fillStyle = barColor
      ctx.fillRect(startX, y, barWidth, barHeight)

      // Draw bar label (effectiveness percentage)
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"

      // Only show text inside bar if bar is wide enough
      if (barWidth > 40) {
        ctx.fillText(`${promotion.effectiveness}%`, startX + barWidth - 10, y + barHeight / 2)
      } else {
        ctx.fillStyle = "#0f172a"
        ctx.fillText(`${promotion.effectiveness}%`, startX + barWidth + 15, y + barHeight / 2)
      }

      // Draw promotion name
      ctx.fillStyle = "#0f172a"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"
      ctx.fillText(promotion.name, startX - 10, y + barHeight / 2)

      // Draw complexity indicator
      ctx.textAlign = "left"
      ctx.fillStyle = "#64748b"
      ctx.font = "10px sans-serif"
      ctx.fillText(`Complexity: ${promotion.complexity}`, startX + chartWidth + 10, y + barHeight / 2)
    })

    // Draw legend for cost
    const legendX = 50
    const legendY = startY + chartHeight + 30

    // Blue rectangle for low cost
    ctx.fillStyle = "#3b82f6"
    ctx.fillRect(legendX, legendY, 15, 15)

    ctx.fillStyle = "#64748b"
    ctx.textAlign = "left"
    ctx.font = "11px sans-serif"
    ctx.fillText("Low Cost", legendX + 20, legendY + 7.5)

    // Amber rectangle for medium cost
    ctx.fillStyle = "#f59e0b"
    ctx.fillRect(legendX + 100, legendY, 15, 15)

    ctx.fillStyle = "#64748b"
    ctx.fillText("Medium Cost", legendX + 120, legendY + 7.5)

    // Red rectangle for high cost
    ctx.fillStyle = "#ef4444"
    ctx.fillRect(legendX + 220, legendY, 15, 15)

    ctx.fillStyle = "#64748b"
    ctx.fillText("High Cost", legendX + 240, legendY + 7.5)

    // Draw title
    ctx.fillStyle = "#0f172a"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Promotion Effectiveness by Cost and Complexity", width / 2, 20)
  }, [])

  return (
    <div className="w-full h-[400px]">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
    </div>
  )
}

