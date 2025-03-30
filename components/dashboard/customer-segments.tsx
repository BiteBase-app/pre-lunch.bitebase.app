"use client"

import { useEffect, useRef } from "react"

export function CustomerSegments() {
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

    // Customer segment data
    const segments = [
      { name: "Young Professionals", percentage: 35, color: "#3b82f6" },
      { name: "Families", percentage: 25, color: "#10b981" },
      { name: "Students", percentage: 20, color: "#f59e0b" },
      { name: "Tourists", percentage: 15, color: "#ef4444" },
      { name: "Others", percentage: 5, color: "#8b5cf6" },
    ]

    // Draw pie chart
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 40

    let startAngle = 0
    segments.forEach((segment) => {
      const endAngle = startAngle + (segment.percentage / 100) * Math.PI * 2

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = segment.color
      ctx.fill()

      startAngle = endAngle
    })

    // Draw center circle (donut hole)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2)
    ctx.fillStyle = "#ffffff"
    ctx.fill()

    // Draw legend
    const legendX = width - 150
    const legendY = 30
    const itemHeight = 25

    segments.forEach((segment, i) => {
      const y = legendY + i * itemHeight

      // Draw color box
      ctx.fillStyle = segment.color
      ctx.fillRect(legendX, y, 15, 15)

      // Draw text
      ctx.fillStyle = "#64748b"
      ctx.font = "14px sans-serif"
      ctx.textAlign = "left"
      ctx.fillText(`${segment.name} (${segment.percentage}%)`, legendX + 25, y + 12)
    })
  }, [])

  return (
    <div className="w-full aspect-square">
      <canvas ref={canvasRef} width={500} height={500} className="w-full h-full" />
    </div>
  )
}

