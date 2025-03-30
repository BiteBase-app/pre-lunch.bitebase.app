"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

interface PopularItemsProps {
  data: any[]
}

export function PopularItems({ data }: PopularItemsProps) {
  // Format the data (simplified for demo)
  const formattedData = data.map((item) => ({
    name: item.name,
    orders: Number(item.order_count),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Items</CardTitle>
        <CardDescription>Your best-selling menu items this month</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[200px] w-full p-6">
          <ChartContainer
            config={{
              orders: {
                label: "Orders",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formattedData} layout="vertical">
                <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  tickLine={false}
                  axisLine={false}
                  className="text-xs text-muted-foreground"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="orders" fill="var(--color-orders)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

