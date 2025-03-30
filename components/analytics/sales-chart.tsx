"use client"

import { useEffect, useRef, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface SalesChartProps {
  restaurantId: number
  days?: number
}

interface SalesData {
  date: string
  total_sales: number
  food_sales: number
  beverage_sales: number
  dessert_sales: number
}

export function SalesChart({ restaurantId, days = 30 }: SalesChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/analytics/sales?restaurantId=${restaurantId}&days=${days}`)

        if (!response.ok) {
          throw new Error("Failed to fetch sales data")
        }

        const data = await response.json()
        setSalesData(data)
      } catch (err) {
        console.error("Error fetching sales data:", err)
        setError("Failed to load sales data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSalesData()
  }, [restaurantId, days])

  useEffect(() => {
    if (!canvasRef.current || isLoading || salesData.length === 0) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set dimensions
    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Extract data for chart
    const dates = salesData.map((item) => new Date(item.date).toLocaleDateString())
    const foodSales = salesData.map((item) => item.food_sales)
    const beverageSales = salesData.map((item) => item.beverage_sales)
    const dessertSales = salesData.map((item) => item.dessert_sales)

    // Calculate total sales for each day
    const totalSales = salesData.map((item) => item.total_sales)

    // Find max value for scaling
    const maxSales = Math.max(...totalSales) * 1.1

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw grid lines
    const gridLines = 5
    ctx.textAlign = "right"
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "#64748b"

    for (let i = 0; i <= gridLines; i++) {
      const y = height - padding - (i / gridLines) * chartHeight
      const value = Math.round((i / gridLines) * maxSales)

      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()

      ctx.fillText(`$${value.toLocaleString()}`, padding - 5, y + 3)
    }

    // Draw x-axis labels
    ctx.textAlign = "center"
    dates.forEach((date, i) => {
      if (i % Math.ceil(dates.length / 10) === 0) {
        // Show fewer labels to avoid crowding
        const x = padding + (i / (dates.length - 1)) * chartWidth
        ctx.fillText(date, x, height - padding + 15)
      }
    })

    // Draw stacked bar chart
    const barWidth = (chartWidth / dates.length) * 0.8
    const barSpacing = (chartWidth / dates.length) * 0.2

    dates.forEach((_, i) => {
      const x = padding + (i / (dates.length - 1)) * chartWidth - barWidth / 2
      let y = height - padding

      // Draw dessert sales (top)
      const dessertHeight = (dessertSales[i] / maxSales) * chartHeight
      ctx.fillStyle = "#8b5cf6" // Purple
      ctx.fillRect(x, y - dessertHeight, barWidth, dessertHeight)
      y -= dessertHeight

      // Draw beverage sales (middle)
      const beverageHeight = (beverageSales[i] / maxSales) * chartHeight
      ctx.fillStyle = "#3b82f6" // Blue
      ctx.fillRect(x, y - beverageHeight, barWidth, beverageHeight)
      y -= beverageHeight

      // Draw food sales (bottom)
      const foodHeight = (foodSales[i] / maxSales) * chartHeight
      ctx.fillStyle = "#10b981" // Green
      ctx.fillRect(x, y - foodHeight, barWidth, foodHeight)
    })

    // Draw legend
    const legendX = width - 150
    const legendY = padding + 10

    // Food sales
    ctx.fillStyle = "#10b981"
    ctx.fillRect(legendX, legendY, 15, 15)
    ctx.fillStyle = "#64748b"
    ctx.textAlign = "left"
    ctx.fillText("Food", legendX + 20, legendY + 12)

    // Beverage sales
    ctx.fillStyle = "#3b82f6"
    ctx.fillRect(legendX, legendY + 20, 15, 15)
    ctx.fillStyle = "#64748b"
    ctx.fillText("Beverages", legendX + 20, legendY + 32)

    // Dessert sales
    ctx.fillStyle = "#8b5cf6"
    ctx.fillRect(legendX, legendY + 40, 15, 15)
    ctx.fillStyle = "#64748b"
    ctx.fillText("Desserts", legendX + 20, legendY + 52)

    // Draw title
    ctx.fillStyle = "#0f172a"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Daily Sales by Category", width / 2, 20)
  }, [salesData, isLoading])

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="w-full h-[400px]">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
    </div>
  )
}

