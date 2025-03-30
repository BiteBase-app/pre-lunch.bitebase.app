"use client"

import { useEffect, useRef } from "react"

export function TrafficAnalysis() {
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

    // Traffic data by hour
    const data = [
      { hour: "6am", foot: 120, vehicle: 80 },
      { hour: "9am", foot: 450, vehicle: 320 },
      { hour: "12pm", foot: 780, vehicle: 250 },
      { hour: "3pm", foot: 650, vehicle: 220 },
      { hour: "6pm", foot: 920, vehicle: 380 },
      { hour: "9pm", foot: 580, vehicle: 180 },
      { hour: "12am", foot: 150, vehicle: 50 },
    ]

    // Draw line chart
    const chartWidth = width - 80
    const chartHeight = height - 80
    const maxTraffic = Math.max(...data.map((d) => Math.max(d.foot, d.vehicle)))

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(40, 40)
    ctx.lineTo(40, height - 40)
    ctx.lineTo(width - 40, height - 40)
    ctx.stroke()

    // Draw grid lines
    ctx.textAlign = "right"
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "#64748b"

    for (let i = 0; i <= 4; i++) {
      const y = height - 40 - (i / 4) * chartHeight
      const value = Math.round((i / 4) * maxTraffic)

      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.moveTo(40, y)
      ctx.lineTo(width - 40, y)
      ctx.stroke()

      ctx.fillText(value.toString(), 35, y + 4)
    }

    // Draw x-axis labels
    ctx.textAlign = "center"
    data.forEach((d, i) => {
      const x = 40 + (i / (data.length - 1)) * chartWidth
      ctx.fillText(d.hour, x, height - 20)
    })

    // Draw foot traffic line
    ctx.beginPath()
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    data.forEach((d, i) => {
      const x = 40 + (i / (data.length - 1)) * chartWidth
      const y = height - 40 - (d.foot / maxTraffic) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Draw vehicle traffic line
    ctx.beginPath()
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 2
    data.forEach((d, i) => {
      const x = 40 + (i / (data.length - 1)) * chartWidth
      const y = height - 40 - (d.vehicle / maxTraffic) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Draw legend
    ctx.fillStyle = "#3b82f6"
    ctx.fillRect(width - 120, 15, 10, 10)
    ctx.fillStyle = "#0f172a"
    ctx.textAlign = "left"
    ctx.fillText("Foot Traffic", width - 105, 23)

    ctx.fillStyle = "#ef4444"
    ctx.fillRect(width - 120, 35, 10, 10)
    ctx.fillStyle = "#0f172a"
    ctx.fillText("Vehicle Traffic", width - 105, 43)
  }, [])

  return (
    <div className="w-full h-[250px]">
      <canvas ref={canvasRef} width={400} height={250} className="w-full h-full" />
    </div>
  )
}

