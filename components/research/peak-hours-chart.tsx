"use client"

import { useEffect, useRef } from "react"

export function PeakHoursChart() {
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

    // Data for weekly heatmap
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const hours = [
      "6AM",
      "7AM",
      "8AM",
      "9AM",
      "10AM",
      "11AM",
      "12PM",
      "1PM",
      "2PM",
      "3PM",
      "4PM",
      "5PM",
      "6PM",
      "7PM",
      "8PM",
      "9PM",
    ]

    // Foot traffic data (0-100 scale)
    const data = [
      // Monday
      [10, 45, 85, 70, 40, 55, 90, 85, 45, 30, 40, 60, 80, 65, 40, 25],
      // Tuesday
      [12, 48, 82, 68, 42, 58, 85, 80, 42, 32, 44, 62, 75, 62, 38, 20],
      // Wednesday
      [15, 50, 80, 65, 45, 60, 88, 78, 40, 35, 48, 65, 80, 60, 35, 18],
      // Thursday
      [18, 55, 78, 68, 48, 65, 90, 85, 45, 38, 52, 70, 95, 75, 50, 30],
      // Friday
      [20, 60, 85, 70, 50, 70, 95, 90, 50, 45, 60, 85, 98, 90, 75, 55],
      // Saturday
      [30, 50, 65, 80, 85, 90, 95, 90, 85, 80, 75, 70, 80, 85, 75, 50],
      // Sunday
      [20, 35, 55, 75, 80, 85, 80, 78, 75, 70, 60, 55, 50, 45, 30, 15],
    ]

    // Colors for heatmap
    function getColor(value: number): string {
      // Color gradient from light blue (low) to dark red (high)
      if (value < 20) return "rgba(226, 232, 240, 0.8)" // Very light gray
      if (value < 40) return "rgba(186, 230, 253, 0.8)" // Light blue
      if (value < 60) return "rgba(125, 211, 252, 0.8)" // Medium blue
      if (value < 75) return "rgba(251, 191, 36, 0.8)" // Yellow
      if (value < 90) return "rgba(249, 115, 22, 0.8)" // Orange
      return "rgba(239, 68, 68, 0.8)" // Red
    }

    // Draw heatmap
    const cellWidth = (width - 100) / hours.length
    const cellHeight = (height - 100) / days.length

    // Draw cells
    days.forEach((day, i) => {
      hours.forEach((hour, j) => {
        const value = data[i][j]
        const x = 80 + j * cellWidth
        const y = 50 + i * cellHeight

        // Draw rectangle
        ctx.fillStyle = getColor(value)
        ctx.fillRect(x, y, cellWidth, cellHeight)

        // Add value text for cells with enough space
        if (cellWidth > 25 && cellHeight > 20) {
          ctx.fillStyle = "#1e293b"
          ctx.font = "10px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(value.toString(), x + cellWidth / 2, y + cellHeight / 2)
        }
      })
    })

    // Draw y-axis labels (days)
    ctx.fillStyle = "#64748b"
    ctx.font = "11px sans-serif"
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"

    days.forEach((day, i) => {
      const y = 50 + i * cellHeight + cellHeight / 2
      ctx.fillText(day, 75, y)
    })

    // Draw x-axis labels (hours)
    ctx.textAlign = "center"
    ctx.textBaseline = "top"

    hours.forEach((hour, i) => {
      const x = 80 + i * cellWidth + cellWidth / 2

      // Only show every other hour label to avoid crowding
      if (i % 2 === 0 || i === hours.length - 1) {
        ctx.fillText(hour, x, 50 + days.length * cellHeight + 5)
      }
    })

    // Draw legend
    const legendX = 80
    const legendY = 20
    const legendWidth = 200
    const legendHeight = 15

    // Draw gradient
    const gradient = ctx.createLinearGradient(legendX, legendY, legendX + legendWidth, legendY)
    gradient.addColorStop(0, "rgba(226, 232, 240, 0.8)")
    gradient.addColorStop(0.25, "rgba(186, 230, 253, 0.8)")
    gradient.addColorStop(0.5, "rgba(125, 211, 252, 0.8)")
    gradient.addColorStop(0.75, "rgba(251, 191, 36, 0.8)")
    gradient.addColorStop(0.9, "rgba(249, 115, 22, 0.8)")
    gradient.addColorStop(1, "rgba(239, 68, 68, 0.8)")

    ctx.fillStyle = gradient
    ctx.fillRect(legendX, legendY, legendWidth, legendHeight)

    // Draw legend labels
    ctx.fillStyle = "#64748b"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.font = "10px sans-serif"

    ctx.fillText("Low Traffic", legendX, legendY + legendHeight + 5)
    ctx.fillText("High Traffic", legendX + legendWidth, legendY + legendHeight + 5)

    // Draw title
    ctx.fillStyle = "#0f172a"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Weekly Traffic Heatmap", width / 2, legendY - 10)
  }, [])

  return (
    <div className="w-full h-[400px]">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
    </div>
  )
}

