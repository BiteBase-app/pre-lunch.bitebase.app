"use client"

import { useEffect, useRef } from "react"

export function DemographicChart() {
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

    // Demographics data
    const data = [
      { age: "18-24", percentage: 15, color: "#3b82f6" },
      { age: "25-34", percentage: 35, color: "#10b981" },
      { age: "35-44", percentage: 25, color: "#f59e0b" },
      { age: "45-54", percentage: 15, color: "#ef4444" },
      { age: "55+", percentage: 10, color: "#8b5cf6" },
    ]

    // Draw bar chart
    const barWidth = (width - 80) / data.length
    const maxPercentage = Math.max(...data.map((d) => d.percentage))
    const barHeightMultiplier = (height - 80) / maxPercentage

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(40, 40)
    ctx.lineTo(40, height - 40)
    ctx.lineTo(width - 40, height - 40)
    ctx.stroke()

    // Draw bars
    data.forEach((item, index) => {
      const x = 40 + index * barWidth + barWidth * 0.1
      const barWidthActual = barWidth * 0.8
      const barHeight = item.percentage * barHeightMultiplier
      const y = height - 40 - barHeight

      // Draw bar
      ctx.fillStyle = item.color
      ctx.fillRect(x, y, barWidthActual, barHeight)

      // Draw age label
      ctx.fillStyle = "#64748b"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.age, x + barWidthActual / 2, height - 20)

      // Draw percentage on top of bar
      ctx.fillStyle = "#64748b"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`${item.percentage}%`, x + barWidthActual / 2, y - 5)
    })

    // Draw y-axis labels
    ctx.fillStyle = "#64748b"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "right"

    for (let i = 0; i <= 5; i++) {
      const value = i * 10
      const y = height - 40 - value * barHeightMultiplier
      ctx.fillText(`${value}%`, 35, y + 4)
    }

    // Draw title
    ctx.fillStyle = "#0f172a"
    ctx.font = "14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Age Demographics in Target Area", width / 2, 20)
  }, [])

  return (
    <div className="w-full h-[250px]">
      <canvas ref={canvasRef} width={400} height={250} className="w-full h-full" />
    </div>
  )
}

