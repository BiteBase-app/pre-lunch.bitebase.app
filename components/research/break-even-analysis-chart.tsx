"use client"

import { useEffect, useRef } from "react"

export function BreakEvenAnalysisChart() {
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

    // Break-even data by month
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
    const revenue = [35000, 38000, 42000, 45000, 48000, 52000, 55000, 58000, 60000, 62000, 63000, 65000]
    const fixedCosts = Array(12).fill(31000) // Monthly fixed costs
    const variableCosts = [17000, 18000, 19000, 20000, 21000, 22000, 23000, 23500, 24000, 24500, 25000, 25500]
    const totalCosts = fixedCosts.map((fixed, i) => fixed + variableCosts[i])
    const cumulativeProfit = []

    // Calculate cumulative profit/loss
    let runningTotal = -250000 // Initial investment
    for (let i = 0; i < months.length; i++) {
      runningTotal += revenue[i] - totalCosts[i]
      cumulativeProfit.push(runningTotal)
    }

    // Draw line chart
    const padding = 60
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Find min and max values for scaling
    const minValue = Math.min(0, ...cumulativeProfit) * 1.1 // Add 10% margin
    const maxValue = Math.max(0, ...cumulativeProfit) * 1.1 // Add 10% margin
    const valueRange = maxValue - minValue

    // Helper function to convert data point to y coordinate
    const getYCoord = (value: number) => {
      return height - padding - ((value - minValue) / valueRange) * chartHeight
    }

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(padding, getYCoord(0)) // X-axis at y=0
    ctx.lineTo(width - padding, getYCoord(0))
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.stroke()

    // Draw y-axis labels and grid lines
    ctx.textAlign = "right"
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "#64748b"

    const ySteps = 6
    for (let i = 0; i <= ySteps; i++) {
      const value = minValue + (i / ySteps) * valueRange
      const y = getYCoord(value)

      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()

      ctx.fillText(`$${value.toLocaleString()}`, padding - 8, y + 4)
    }

    // Draw zero line with different style if not at the bottom
    const zeroY = getYCoord(0)
    if (zeroY > padding && zeroY < height - padding) {
      ctx.beginPath()
      ctx.strokeStyle = "#94a3b8"
      ctx.lineWidth = 1
      ctx.moveTo(padding, zeroY)
      ctx.lineTo(width - padding, zeroY)
      ctx.stroke()
      ctx.lineWidth = 1
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

    // Draw break-even point (where cumulative profit crosses zero)
    let breakEvenMonth = -1
    let breakEvenX = 0
    let breakEvenY = 0

    for (let i = 1; i < cumulativeProfit.length; i++) {
      if (
        (cumulativeProfit[i - 1] < 0 && cumulativeProfit[i] >= 0) ||
        (cumulativeProfit[i - 1] <= 0 && cumulativeProfit[i] > 0)
      ) {
        // Linear interpolation to find exact point
        const ratio =
          Math.abs(cumulativeProfit[i - 1]) / (Math.abs(cumulativeProfit[i - 1]) + Math.abs(cumulativeProfit[i]))

        breakEvenMonth = i - 1 + ratio
        breakEvenX = padding + (i - 1) * monthWidth + ratio * monthWidth
        breakEvenY = getYCoord(0)
        break
      }
    }

    // Draw cumulative profit/loss line
    ctx.beginPath()
    ctx.strokeStyle = cumulativeProfit[cumulativeProfit.length - 1] >= 0 ? "#10b981" : "#ef4444"
    ctx.lineWidth = 2

    cumulativeProfit.forEach((value, i) => {
      const x = padding + i * monthWidth
      const y = getYCoord(value)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Shade area under curve
    ctx.beginPath()
    ctx.fillStyle = "rgba(16, 185, 129, 0.1)" // Green with low opacity

    // Start at bottom left if all values negative, or at y=0 if mixed
    const startY = cumulativeProfit.every((v) => v < 0) ? getYCoord(cumulativeProfit[0]) : getYCoord(0)

    ctx.moveTo(padding, startY)

    cumulativeProfit.forEach((value, i) => {
      const x = padding + i * monthWidth
      const y = getYCoord(value)
      ctx.lineTo(x, y)
    })

    // Complete the path
    ctx.lineTo(width - padding, getYCoord(0))
    ctx.lineTo(padding, getYCoord(0))
    ctx.closePath()
    ctx.fill()

    // Mark break-even point if found
    if (breakEvenMonth >= 0) {
      ctx.beginPath()
      ctx.fillStyle = "#ef4444"
      ctx.arc(breakEvenX, breakEvenY, 6, 0, Math.PI * 2)
      ctx.fill()

      // Add break-even label
      ctx.fillStyle = "#ef4444"
      ctx.textAlign = "center"
      ctx.font = "bold 12px sans-serif"
      ctx.fillText(`Break-even: Month ${breakEvenMonth.toFixed(1)}`, breakEvenX, breakEvenY - 15)
    }

    // Draw legend
    ctx.lineWidth = 2
    ctx.strokeStyle = "#10b981"
    ctx.beginPath()
    ctx.moveTo(width - 150, 30)
    ctx.lineTo(width - 130, 30)
    ctx.stroke()

    ctx.fillStyle = "#64748b"
    ctx.textAlign = "left"
    ctx.font = "10px sans-serif"
    ctx.fillText("Cumulative Profit/Loss", width - 125, 33)

    ctx.fillStyle = "#ef4444"
    ctx.beginPath()
    ctx.arc(width - 140, 50, 4, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#64748b"
    ctx.fillText("Break-even Point", width - 125, 53)

    // Draw initial investment marker
    ctx.textAlign = "left"
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "#64748b"
    ctx.fillText(`Initial Investment: $250,000`, padding, getYCoord(minValue) - 10)

    // Draw title
    ctx.fillStyle = "#0f172a"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Break-even Analysis", width / 2, 20)
  }, [])

  return (
    <div className="w-full h-[400px]">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
    </div>
  )
}

