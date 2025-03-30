"use client"

import { useEffect, useRef, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface CustomerChartProps {
  restaurantId: number
}

interface DemographicData {
  age_group: string
  percentage: number
  income_level: string
}

export function CustomerChart({ restaurantId }: CustomerChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [demographicData, setDemographicData] = useState<DemographicData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDemographicData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/customers/demographics?restaurantId=${restaurantId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch demographic data")
        }

        const data = await response.json()
        setDemographicData(data)
      } catch (err) {
        console.error("Error fetching demographic data:", err)
        setError("Failed to load demographic data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDemographicData()
  }, [restaurantId])

  useEffect(() => {
    if (!canvasRef.current || isLoading || demographicData.length === 0) return

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

    // Assign colors to age groups
    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

    // Prepare data for pie chart
    const demographics = demographicData.map((item, index) => ({
      name: item.age_group,
      percentage: item.percentage,
      color: colors[index % colors.length],
    }))

    // Draw pie chart
    const centerX = width / 3
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 40

    let startAngle = 0
    demographics.forEach((segment) => {
      const endAngle = startAngle + (segment.percentage / 100) * Math.PI * 2

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = segment.color
      ctx.fill()

      // Draw percentage label if segment is large enough
      if (segment.percentage > 5) {
        const midAngle = startAngle + (endAngle - startAngle) / 2
        const labelRadius = radius * 0.7
        const labelX = centerX + Math.cos(midAngle) * labelRadius
        const labelY = centerY + Math.sin(midAngle) * labelRadius

        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(`${segment.percentage}%`, labelX, labelY)
      }

      startAngle = endAngle
    })

    // Draw legend
    const legendX = (width * 2) / 3
    const legendY = height / 2 - demographics.length * 15
    const itemHeight = 25

    demographics.forEach((segment, i) => {
      const y = legendY + i * itemHeight

      // Draw color box
      ctx.fillStyle = segment.color
      ctx.fillRect(legendX, y, 15, 15)

      // Draw text
      ctx.fillStyle = "#64748b"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "top"
      ctx.fillText(`${segment.name} (${segment.percentage}%)`, legendX + 25, y)
    })

    // Draw title
    ctx.fillStyle = "#0f172a"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Customer Demographics", width / 2, 20)
  }, [demographicData, isLoading])

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

