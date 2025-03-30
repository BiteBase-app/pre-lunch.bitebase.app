"use client"

import { useEffect, useRef } from "react"

export function PricingStrategyChart() {
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

    // Pricing data for different categories
    const categories = [
      { name: "Coffee", yours: 5.25, competitors: [3.75, 4.25, 4.75, 6.0], recommended: 5.25 },
      { name: "Espresso", yours: 4.5, competitors: [3.5, 4.0, 4.5, 5.5], recommended: 4.75 },
      { name: "Pastries", yours: 4.25, competitors: [3.25, 3.75, 4.25, 5.0], recommended: 4.5 },
      { name: "Sandwiches", yours: 12.5, competitors: [9.5, 10.5, 12.0, 14.0], recommended: 12.5 },
      { name: "Pasta", yours: 14.5, competitors: [11.0, 13.0, 15.0, 17.0], recommended: 14.5 },
    ]

    // Draw scatter plot
    const padding = 50
    const plotWidth = width - padding * 2
    const plotHeight = height - padding * 2

    // Find max price value for scaling
    const allPrices = categories.flatMap((c) => [...c.competitors, c.yours, c.recommended])
    const maxPrice = Math.max(...allPrices) * 1.2 // Add some margin

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw y-axis labels
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "right"

    const ySteps = 5
    for (let i = 0; i <= ySteps; i++) {
      const value = (i / ySteps) * maxPrice
      const y = height - padding - (i / ySteps) * plotHeight

      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()

      ctx.fillText(`$${value.toFixed(2)}`, padding - 5, y + 4)
    }

    // Draw categories on x-axis
    ctx.textAlign = "center"
    ctx.font = "10px sans-serif"

    const categoryWidth = plotWidth / categories.length

    categories.forEach((category, i) => {
      const x = padding + i * categoryWidth + categoryWidth / 2

      // Draw category name
      ctx.fillText(category.name, x, height - padding + 15)

      // Draw competitor scatter points
      category.competitors.forEach((price) => {
        const y = height - padding - (price / maxPrice) * plotHeight

        ctx.beginPath()
        ctx.fillStyle = "rgba(100, 116, 139, 0.5)"
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw your price point
      const yourY = height - padding - (category.yours / maxPrice) * plotHeight

      ctx.beginPath()
      ctx.fillStyle = "#3b82f6"
      ctx.arc(x, yourY, 7, 0, Math.PI * 2)
      ctx.fill()

      // Draw recommended price point
      const recY = height - padding - (category.recommended / maxPrice) * plotHeight

      ctx.beginPath()
      ctx.fillStyle = "#10b981"
      ctx.strokeStyle = "#047857"
      ctx.lineWidth = 2
      ctx.arc(x, recY, 7, 0, Math.PI * 2)
      ctx.stroke()
      ctx.fillStyle = "rgba(16, 185, 129, 0.3)"
      ctx.fill()
    })

    // Draw legend
    ctx.fillStyle = "rgba(100, 116, 139, 0.5)"
    ctx.beginPath()
    ctx.arc(width - 150, 20, 5, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#64748b"
    ctx.textAlign = "left"
    ctx.font = "10px sans-serif"
    ctx.fillText("Competitors", width - 140, 23)

    ctx.fillStyle = "#3b82f6"
    ctx.beginPath()
    ctx.arc(width - 150, 40, 7, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#64748b"
    ctx.fillText("Your Price", width - 140, 43)

    ctx.beginPath()
    ctx.fillStyle = "rgba(16, 185, 129, 0.3)"
    ctx.strokeStyle = "#047857"
    ctx.lineWidth = 2
    ctx.arc(width - 150, 60, 7, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fill()

    ctx.fillStyle = "#64748b"
    ctx.fillText("Recommended", width - 140, 63)

    // Draw title
    ctx.fillStyle = "#0f172a"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Price Comparison & Strategy", width / 2, 20)
  }, [])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} width={600} height={300} className="w-full h-full" />
    </div>
  )
}

