"use client"

import { useEffect, useState } from "react"
import { VChart } from "@visactor/react-vchart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { createChartSpec } from "@/lib/chart-utils"

interface VisChartProps {
  title?: string
  description?: string
  data: any[]
  type: "bar" | "line" | "pie" | "scatter" | "heatmap"
  options?: any
  height?: number
  className?: string
}

export function VisChart({
  title,
  description,
  data = [],
  type = "bar",
  options = {},
  height = 400,
  className,
}: VisChartProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [chartSpec, setChartSpec] = useState<any>(null)

  useEffect(() => {
    if (!data || data.length === 0) {
      setError("No data available for visualization")
      setIsLoading(false)
      return
    }

    try {
      const spec = createChartSpec(type, data, { ...options, height })
      setChartSpec(spec)
      setIsLoading(false)
    } catch (err) {
      console.error("Error creating chart:", err)
      setError("Failed to create chart")
      setIsLoading(false)
    }
  }, [data, type, options, height])

  if (isLoading) {
    return (
      <Card className={className}>
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>
          <Skeleton className={`w-full h-[${height}px]`} />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={className}>
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>
          <div className={`flex items-center justify-center h-[${height}px]`}>
            <p className="text-red-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <div className={`h-[${height}px] w-full`}>
          <VChart spec={chartSpec} />
        </div>
      </CardContent>
    </Card>
  )
}

