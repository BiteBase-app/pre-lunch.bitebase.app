"use client"

import { useEffect, useRef } from "react"

export function SeasonalTrendsChart() {
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

    // Seasonal data by quarter
    const seasons = ["Winter", "Spring", "Summer", "Fall"]
    const categories = [
      { name: "Coffee", data: [90, 85, 75, 95] },
      { name: "Pastries", data: [85, 80, 70, 90] },
      { name: "Sandwiches", data: [75, 85, 95, 80] },
      { name: "Pasta", data: [70, 80, 85, 75] },
    ]

    // Colors for categories
    const colors = [
      "#3b82f6", // blue
      "#10b981", // green
      "#f59e0b", // amber
      "#8b5cf6", // purple
    ]

    // Draw radar chart
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 50

    // Draw axes
    ctx.strokeStyle = "#e2e8f0"

    seasons.forEach((_, i) => {
      const angle = (i / seasons.length) * Math.PI * 2 - Math.PI / 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()

      // Draw season label
      ctx.fillStyle = "#64748b"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const labelX = centerX + (radius + 20) * Math.cos(angle)
      const labelY = centerY + (radius + 20) * Math.sin(angle)

      ctx.fillText(seasons[i], labelX, labelY)
    })

    // Draw circles
    const circles = 4
    for (let i = 1; i <= circles; i++) {
      const circleRadius = (i / circles) * radius

      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2)
      ctx.stroke()

      // Draw percentage label
      ctx.fillStyle = "#64748b"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"

      const percent = Math.round((i / circles) * 100)
      ctx.fillText(`${percent}%`, centerX - circleRadius - 5, centerY)
    }

    // Draw data for each category
    categories.forEach((category, categoryIndex) => {
      const color = colors[categoryIndex % colors.length]

      // Draw polygon
      ctx.beginPath()
      category.data.forEach((value, i) => {
        const angle = (i / seasons.length) * Math.PI * 2 - Math.PI / 2
        const distance = (value / 100) * radius
        const x = centerX + distance * Math.cos(angle)
        const y = centerY + distance * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      // Close the path
      const firstAngle = -Math.PI / 2
      const firstDistance = (category.data[0] / 100) * radius
      const firstX = centerX + firstDistance * Math.cos(firstAngle)
      const firstY = centerY + firstDistance * Math.sin(firstAngle)
      ctx.lineTo(firstX, firstY)

      // Fill and stroke
      ctx.fillStyle = `${color}33` // Add 33 for 20% opacity in hex
      ctx.fill()
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw points at each data point
      category.data.forEach((value, i) => {
        const angle = (i / seasons.length) * Math.PI * 2 - Math.PI / 2
        const distance = (value / 100) * radius
        const x = centerX + distance * Math.cos(angle)
        const y = centerY + distance * Math.sin(angle)

        ctx.beginPath()
        ctx.fillStyle = "#fff"
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.stroke()
      })
    })

    // Draw legend
    const legendX = width - 120
    const legendY = 30
    const itemHeight = 20

    categories.forEach((category, i) => {
      const y = legendY + i * itemHeight
      const color = colors[i % colors.length]

      ctx.fillStyle = color
      ctx.fillRect(legendX, y, 12, 12)

      ctx.fillStyle = "#64748b"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(category.name, legendX + 18, y + 6)
    })

    // Draw title
    ctx.fillStyle = "#0f172a"
    ctx.font = "14px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText("Seasonal Demand Patterns", centerX, 10)
  }, [])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} width={500} height={300} className="w-full h-full" />
    </div>
  )
}

