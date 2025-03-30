"use client"

import { useEffect, useRef } from "react"

export function DemographicsChart() {
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
    const demographics = [
      { group: "Young Professionals", percentage: 35, color: "#3b82f6" },
      { group: "Business Customers", percentage: 25, color: "#10b981" },
      { group: "Students", percentage: 15, color: "#f59e0b" },
      { group: "Families", percentage: 12, color: "#ef4444" },
      { group: "Seniors", percentage: 8, color: "#8b5cf6" },
      { group: "Tourists", percentage: 5, color: "#ec4899" },
    ]

    // Draw pie chart
    const centerX = width / 2
    const centerY = height / 2 + 10 // Offset slightly to make room for title
    const radius = Math.min(centerX, centerY) - 40

    let startAngle = 0
    demographics.forEach((demo) => {
      const endAngle = startAngle + (demo.percentage / 100) * Math.PI * 2

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = demo.color
      ctx.fill()

      // Calculate position for label connector
      const midAngle = startAngle + (endAngle - startAngle) / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + labelRadius * Math.cos(midAngle)
      const labelY = centerY + labelRadius * Math.sin(midAngle)

      // Draw label connector
      if (demo.percentage >= 8) {
        // Only for segments large enough
        const outerX = centerX + (radius + 10) * Math.cos(midAngle)
        const outerY = centerY + (radius + 10) * Math.sin(midAngle)

        ctx.beginPath()
        ctx.moveTo(labelX, labelY)
        ctx.lineTo(outerX, outerY)
        ctx.strokeStyle = demo.color
        ctx.lineWidth = 1
        ctx.stroke()

        // Add percentage label for larger segments
        ctx.fillStyle = "#0f172a"
        ctx.font = "bold 12px sans-serif"
        ctx.textAlign = midAngle < Math.PI ? "left" : "right"
        ctx.textBaseline = "middle"

        const textOffset = 5
        const textX = outerX + (midAngle < Math.PI ? textOffset : -textOffset)
        ctx.fillText(`${demo.percentage}%`, textX, outerY)
      }

      startAngle = endAngle
    })

    // Draw center circle (donut hole)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2)
    ctx.fillStyle = "#ffffff"
    ctx.fill()

    // Add total population text in center
    ctx.fillStyle = "#0f172a"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("12,450", centerX, centerY - 8)

    ctx.fillStyle = "#64748b"
    ctx.font = "11px sans-serif"
    ctx.fillText("Total Population", centerX, centerY + 8)

    // Draw legend
    const legendX = 10
    const legendY = 10
    const itemHeight = 20

    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    demographics.forEach((demo, i) => {
      const y = legendY + i * itemHeight

      // Draw color box
      ctx.fillStyle = demo.color
      ctx.fillRect(legendX, y, 12, 12)

      // Draw text
      ctx.fillStyle = "#64748b"
      ctx.font = "11px sans-serif"
      ctx.fillText(`${demo.group} (${demo.percentage}%)`, legendX + 18, y + 6)
    })

    // Draw title
    ctx.fillStyle = "#0f172a"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText("Target Area Demographics", centerX, 10)
  }, [])

  return (
    <div className="w-full h-[250px]">
      <canvas ref={canvasRef} width={400} height={250} className="w-full h-full" />
    </div>
  )
}

