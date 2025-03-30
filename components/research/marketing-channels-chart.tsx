"use client"

import { useEffect, useRef } from "react"

export function MarketingChannelsChart() {
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

    // Marketing channel data
    const data = [
      {
        category: "Digital",
        allocation: 60,
        channels: [
          { name: "Instagram", allocation: 25, effectiveness: 85 },
          { name: "Local SEO", allocation: 15, effectiveness: 80 },
          { name: "Email Marketing", allocation: 10, effectiveness: 75 },
          { name: "Targeted Ads", allocation: 10, effectiveness: 70 },
        ],
      },
      {
        category: "Local Community",
        allocation: 25,
        channels: [
          { name: "Local Partnerships", allocation: 15, effectiveness: 75 },
          { name: "Community Events", allocation: 10, effectiveness: 65 },
        ],
      },
      {
        category: "Traditional",
        allocation: 15,
        channels: [
          { name: "Signage", allocation: 10, effectiveness: 60 },
          { name: "Print Materials", allocation: 5, effectiveness: 50 },
        ],
      },
    ]

    // Calculate total number of channels
    const totalChannels = data.reduce((sum, category) => sum + category.channels.length, 0)

    // Dimensions for the visualization
    const padding = 60
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Draw treemap
    const drawTreemap = () => {
      // Start with the whole canvas area
      const totalArea = chartWidth * chartHeight

      let yOffset = padding

      // Draw each category
      data.forEach((category) => {
        const categoryHeight = (category.allocation / 100) * chartHeight

        // Category label
        ctx.fillStyle = "#0f172a"
        ctx.font = "bold 12px sans-serif"
        ctx.textAlign = "left"
        ctx.textBaseline = "top"
        ctx.fillText(`${category.category} (${category.allocation}%)`, padding, yOffset - 15)

        let xOffset = padding

        // Draw channels within this category
        category.channels.forEach((channel) => {
          const channelWidth = (channel.allocation / category.allocation) * chartWidth

          // Draw rectangle
          const colorIntensity = Math.min(255, Math.round(255 * (channel.effectiveness / 100)))
          const channelColor = `rgb(59, ${colorIntensity}, 246)`

          ctx.fillStyle = channelColor
          ctx.fillRect(xOffset, yOffset, channelWidth, categoryHeight)

          // Draw border
          ctx.strokeStyle = "#ffffff"
          ctx.lineWidth = 2
          ctx.strokeRect(xOffset, yOffset, channelWidth, categoryHeight)

          // Draw channel label
          ctx.fillStyle = "#ffffff"
          ctx.font = "bold 11px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"

          // Only add text if there's enough space
          if (channelWidth > 60 && categoryHeight > 30) {
            ctx.fillText(channel.name, xOffset + channelWidth / 2, yOffset + categoryHeight / 2 - 8)
            ctx.font = "10px sans-serif"
            ctx.fillText(
              `${channel.allocation}% of budget`,
              xOffset + channelWidth / 2,
              yOffset + categoryHeight / 2 + 8,
            )
          }

          xOffset += channelWidth
        })

        yOffset += categoryHeight + 20 // Add gap between categories
      })
    }

    // Draw a legend showing effectiveness scale
    const drawLegend = () => {
      const legendY = height - 30
      const legendWidth = 200
      const legendHeight = 15

      // Draw gradient
      const gradient = ctx.createLinearGradient(padding, legendY, padding + legendWidth, legendY)
      gradient.addColorStop(0, "rgb(59, 100, 246)")
      gradient.addColorStop(0.5, "rgb(59, 175, 246)")
      gradient.addColorStop(1, "rgb(59, 246, 246)")

      ctx.fillStyle = gradient
      ctx.fillRect(padding, legendY, legendWidth, legendHeight)

      // Draw border
      ctx.strokeStyle = "#e2e8f0"
      ctx.lineWidth = 1
      ctx.strokeRect(padding, legendY, legendWidth, legendHeight)

      // Add labels
      ctx.fillStyle = "#64748b"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"

      ctx.fillText("Lower Effectiveness", padding, legendY + legendHeight + 5)
      ctx.fillText("Higher Effectiveness", padding + legendWidth, legendY + legendHeight + 5)
    }

    // Draw title
    ctx.fillStyle = "#0f172a"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText("Recommended Marketing Budget Allocation", width / 2, 20)

    // Draw the visualizations
    drawTreemap()
    drawLegend()
  }, [])

  return (
    <div className="w-full h-[400px]">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
    </div>
  )
}

