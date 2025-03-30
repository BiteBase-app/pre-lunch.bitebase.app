"use client"

import { useEffect, useRef } from "react"

export function TrafficPatternChart() {
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

    // Traffic data by hour for weekdays and weekends
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
    const weekdayFoot = [120, 350, 580, 480, 320, 460, 780, 720, 340, 280, 350, 420, 580, 480, 350, 220]
    const weekendFoot = [70, 180, 350, 480, 520, 650, 720, 680, 580, 520, 470, 430, 510, 490, 380, 270]

    // Draw line chart
    const padding = 50
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Find max traffic value for scaling
    const maxTraffic = Math.max(...weekdayFoot, ...weekendFoot) * 1.1 // Add 10% margin

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
      const value = Math.round((i / ySteps) * maxTraffic)
      const y = height - padding - (i / ySteps) * chartHeight

      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()

      ctx.fillText(value.toString(), padding - 8, y + 4)
    }

    // Draw x-axis labels
    ctx.textAlign = "center"
    const hourWidth = chartWidth / (hours.length - 1)

    hours.forEach((hour, i) => {
      // Only show every other hour label to avoid crowding
      if (i % 2 === 0 || i === hours.length - 1) {
        const x = padding + i * hourWidth
        ctx.fillText(hour, x, height - padding + 15)
      }
    })

    // Draw weekday line
    ctx.beginPath()
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    hours.forEach((_, i) => {
      const x = padding + i * hourWidth
      const y = height - padding - (weekdayFoot[i] / maxTraffic) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Add area under weekday line
    ctx.beginPath()
    ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
    ctx.moveTo(padding, height - padding)
    hours.forEach((_, i) => {
      const x = padding + i * hourWidth
      const y = height - padding - (weekdayFoot[i] / maxTraffic) * chartHeight
      ctx.lineTo(x, y)
    })
    ctx.lineTo(width - padding, height - padding)
    ctx.closePath()
    ctx.fill()

    // Draw weekend line
    ctx.beginPath()
    ctx.strokeStyle = "#f59e0b"
    ctx.lineWidth = 2
    hours.forEach((_, i) => {
      const x = padding + i * hourWidth
      const y = height - padding - (weekendFoot[i] / maxTraffic) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Add area under weekend line
    ctx.beginPath()
    ctx.fillStyle = "rgba(245, 158, 11, 0.1)"
    ctx.moveTo(padding, height - padding)
    hours.forEach((_, i) => {
      const x = padding + i * hourWidth
      const y = height - padding - (weekendFoot[i] / maxTraffic) * chartHeight
      ctx.lineTo(x, y)
    })
    ctx.lineTo(width - padding, height - padding)
    ctx.closePath()
    ctx.fill()

    // Draw legend
    ctx.lineWidth = 2
    ctx.strokeStyle = "#3b82f6"
    ctx.beginPath()
    ctx.moveTo(width - 150, 20)
    ctx.lineTo(width - 130, 20)
    ctx.stroke()

    ctx.fillStyle = "#64748b"
    ctx.textAlign = "left"
    ctx.fillText("Weekday", width - 125, 23)

    ctx.strokeStyle = "#f59e0b"
    ctx.beginPath()
    ctx.moveTo(width - 150, 40)
    ctx.lineTo(width - 130, 40)
    ctx.stroke()

    ctx.fillStyle = "#64748b"
    ctx.fillText("Weekend", width - 125, 43)

    // Draw title
    ctx.fillStyle = "#0f172a"
    ctx.font = "bold 12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Foot Traffic Patterns by Time of Day", width / 2, 20)
  }, [])

  return (
    <div className="w-full h-[250px]">
      <canvas ref={canvasRef} width={500} height={250} className="w-full h-full" />
    </div>
  )
}

