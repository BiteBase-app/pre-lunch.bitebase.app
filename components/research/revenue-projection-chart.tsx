"use client"

import { useEffect, useRef } from "react"

export function RevenueProjectionChart() {
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

    // Revenue projection data by month
    const months = [
      "Month 1",
      "Month 2",
      "Month 3",
      "Month 4",
      "Month 5",
      "Month 6",
      "Month 7",
      "Month 8",
      "Month 9",
      "Month 10",
      "Month 11",
      "Month 12",
    ]
    const lowEstimate = [35000, 38000, 42000, 45000, 48000, 52000, 55000, 58000, 60000, 62000, 63000, 65000]
    const highEstimate = [40000, 44000, 48000, 52000, 55000, 58000, 62000, 65000, 68000, 70000, 72000, 75000]
    const breakEven = Array(12).fill(54000) // Example break-even point

    // Draw line chart
    const padding = 60
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Find max revenue value for scaling
    const maxRevenue = Math.max(...highEstimate) * 1.1 // Add 10% margin

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw y-axis labels and grid lines
    ctx.textAlign = "right"
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "#64748b"

    const ySteps = 5
    for (let i = 0; i <= ySteps; i++) {
      const value = Math.round((i / ySteps) * maxRevenue)
      const y = height - padding - (i / ySteps) * chartHeight

      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()

      ctx.fillText(`$${(value).toLocaleString()}`, padding - 8, y + 4)
    }

    // Draw x-axis labels
    ctx.textAlign = "center"
    const monthWidth = chartWidth / (months.length - 1)

    months.forEach((month, i) => {
      // Only show every other month label to avoid crowding
      if (i % 2 === 0 || i === months.length - 1) {
        const x = padding + i * monthWidth
        ctx.fillText(month, x, height - padding + 15)
      }
    })

    // Draw area between low and high estimates
    ctx.beginPath()
    ctx.fillStyle = "rgba(59, 130, 246, 0.2)"

    // Draw top line (high estimate)
    months.forEach((_, i) => {
      const x = padding + i * monthWidth
      const y = height - padding - (highEstimate[i] / maxRevenue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    // Draw bottom line (low estimate) in reverse
    months
      .slice()
      .reverse()
      .forEach((_, i) => {
        const monthIndex = months.length - 1 - i
        const x = padding + monthIndex * monthWidth
        const y = height - padding - (lowEstimate[monthIndex] / maxRevenue) * chartHeight

        ctx.lineTo(x, y)
      })

    ctx.closePath()
    ctx.fill()

    // Draw high estimate line
    ctx.beginPath()
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    months.forEach((_, i) => {
      const x = padding + i * monthWidth
      const y = height - padding - (highEstimate[i] / maxRevenue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Draw low estimate line
    ctx.beginPath()
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    months.forEach((_, i) => {
      const x = padding + i * monthWidth
      const y = height - padding - (lowEstimate[i] / maxRevenue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Draw break-even line
    ctx.beginPath()
    ctx.setLineDash([5, 5])
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 2
    months.forEach((_, i) => {
      const x = padding + i * monthWidth
      const y = height - padding - (breakEven[i] / maxRevenue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()
    ctx.setLineDash([])

    // Add break-even label
    ctx.fillStyle = "#ef4444"
    ctx.textAlign = "left"
    ctx.font = "10px sans-serif"
    const breakEvenY = height - padding - (breakEven[0] / maxRevenue) * chartHeight
    ctx.fillText("Break-even Point", padding + 5, breakEvenY - 5)

    // Draw legend
    ctx.fillStyle = "rgba(59, 130, 246, 0.2)"
    ctx.fillRect(width - 150, 20, 15, 15)
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.strokeRect(width - 150, 20, 15, 15)

    ctx.fillStyle = "#64748b"
    ctx.textAlign = "left"
    ctx.font = "10px sans-serif"
    ctx.fillText("Projected Revenue Range", width - 130, 30)

    ctx.beginPath()
    ctx.setLineDash([5, 5])
    ctx.strokeStyle = "#ef4444"
    ctx.moveTo(width - 150, 45)
    ctx.lineTo(width - 135, 45)
    ctx.stroke()
    ctx.setLineDash([])

    ctx.fillStyle = "#64748b"
    ctx.fillText("Break-even Point", width - 130, 48)

    // Draw title
    ctx.fillStyle = "#0f172a"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Revenue Projection - First Year", width / 2, 20)
  }, [])

  return (
    <div className="w-full h-[400px]">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
    </div>
  )
}

