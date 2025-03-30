"use client"

import { useEffect, useRef } from "react"

export function CustomerSegmentationChart() {
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
      { name: "Urban Professionals", percentage: 35, traits: ["High income", "Tech-savvy", "Quality-focused"] },
      {
        name: "Business Customers",
        percentage: 25,
        traits: ["Expense accounts", "Time-conscious", "Service-oriented"],
      },
      {
        name: "Food Enthusiasts",
        percentage: 15,
        traits: ["Social media active", "Trend-aware", "Experience-seeking"],
      },
      { name: "Students", percentage: 10, traits: ["Price-sensitive", "WiFi users", "Longer stays"] },
      {
        name: "Local Residents",
        percentage: 10,
        traits: ["Regular visits", "Community-focused", "Relationship-building"],
      },
      {
        name: "Tourists",
        percentage: 5,
        traits: ["One-time visitors", "Experience-seeking", "Higher spend per visit"],
      },
    ]

    // Colors for segments
    const colors = [
      "#3b82f6", // blue
      "#10b981", // green
      "#f59e0b", // amber
      "#ef4444", // red
      "#8b5cf6", // purple
      "#ec4899", // pink
    ]

    // Draw donut chart
    const centerX = width / 2 - 100 // Offset to make room for labels
    const centerY = height / 2
    const outerRadius = Math.min(centerX, centerY) - 20
    const innerRadius = outerRadius * 0.6

    let startAngle = 0
    segments.forEach((segment, i) => {
      const endAngle = startAngle + (segment.percentage / 100) * Math.PI * 2

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX + innerRadius * Math.cos(startAngle), centerY + innerRadius * Math.sin(startAngle))
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle)
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true)
      ctx.closePath()
      ctx.fillStyle = colors[i % colors.length]
      ctx.fill()

      // Calculate middle angle for label line
      const midAngle = startAngle + (endAngle - startAngle) / 2

      // Draw line to label for larger segments
      if (segment.percentage >= 10) {
        const labelRadius = outerRadius + 20
        const labelX = centerX + labelRadius * Math.cos(midAngle)
        const labelY = centerY + labelRadius * Math.sin(midAngle)

        ctx.beginPath()
        ctx.moveTo(centerX + outerRadius * Math.cos(midAngle), centerY + outerRadius * Math.sin(midAngle))
        ctx.lineTo(labelX, labelY)

        const textX = labelX + (midAngle < Math.PI / 2 || midAngle > (Math.PI * 3) / 2 ? 10 : -10)
        ctx.lineTo(textX, labelY)

        ctx.strokeStyle = colors[i % colors.length]
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw segment label
        ctx.fillStyle = "#0f172a"
        ctx.font = "12px sans-serif"
        ctx.textAlign = midAngle < Math.PI / 2 || midAngle > (Math.PI * 3) / 2 ? "left" : "right"
        ctx.textBaseline = "middle"
        ctx.fillText(`${segment.name} (${segment.percentage}%)`, textX, labelY)
      }

      startAngle = endAngle
    })

    // Draw segment details on the right side
    const detailsX = centerX + outerRadius + 150
    const detailsY = height / 2 - (segments.length * 50) / 2

    segments.forEach((segment, i) => {
      const y = detailsY + i * 50

      // Draw colored box
      ctx.fillStyle = colors[i % colors.length]
      ctx.fillRect(detailsX, y, 15, 15)

      // Draw segment name
      ctx.fillStyle = "#0f172a"
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "top"
      ctx.fillText(segment.name, detailsX + 25, y)

      // Draw traits
      ctx.fillStyle = "#64748b"
      ctx.font = "11px sans-serif"

      segment.traits.forEach((trait, j) => {
        ctx.fillText(`• ${trait}`, detailsX + 25, y + 20 + j * 14)
      })
    })

    // Draw title
    ctx.fillStyle = "#0f172a"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText("Customer Segmentation Analysis", width / 2, 20)
  }, [])

  return (
    <div className="w-full h-[400px]">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
    </div>
  )
}

