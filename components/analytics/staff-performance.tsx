"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

interface StaffMember {
  id: string
  name: string
  position: string
  avg_sales: number
  total_sales: number
  avg_orders: number
  total_orders: number
  avg_tips: number
  total_tips: number
  avg_rating: number
  performance?: "Excellent" | "Good" | "Average" | "Below Average"
}

interface StaffPerformanceProps {
  restaurantId: number
}

export function StaffPerformance({ restaurantId }: StaffPerformanceProps) {
  const [timeframe, setTimeframe] = useState("week")
  const [staffData, setStaffData] = useState<StaffMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        setIsLoading(true)
        // Convert timeframe to days
        const days = timeframe === "day" ? 1 : timeframe === "week" ? 7 : timeframe === "month" ? 30 : 90

        const response = await fetch(`/api/staff/performance?restaurantId=${restaurantId}&days=${days}`)

        if (!response.ok) {
          throw new Error("Failed to fetch staff data")
        }

        const data = await response.json()

        // Add performance rating based on avg_rating
        const dataWithPerformance = data.map((staff: StaffMember) => {
          let performance: "Excellent" | "Good" | "Average" | "Below Average" = "Average"

          if (staff.avg_rating >= 4.5) {
            performance = "Excellent"
          } else if (staff.avg_rating >= 4.0) {
            performance = "Good"
          } else if (staff.avg_rating >= 3.5) {
            performance = "Average"
          } else {
            performance = "Below Average"
          }

          return { ...staff, performance }
        })

        setStaffData(dataWithPerformance)
      } catch (err) {
        console.error("Error fetching staff data:", err)
        setError("Failed to load staff data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStaffData()
  }, [restaurantId, timeframe])

  // Get performance badge color
  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "Excellent":
        return "bg-green-500 hover:bg-green-600"
      case "Good":
        return "bg-blue-500 hover:bg-blue-600"
      case "Average":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "Below Average":
        return "bg-red-500 hover:bg-red-600"
      default:
        return ""
    }
  }

  if (isLoading) {
    return <StaffPerformanceSkeleton />
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  // Calculate totals and averages
  const totalStaff = staffData.length
  const avgRating =
    staffData.length > 0
      ? (staffData.reduce((sum, staff) => sum + staff.avg_rating, 0) / staffData.length).toFixed(1)
      : "0.0"
  const totalSales = staffData.reduce((sum, staff) => sum + staff.total_sales, 0)
  const totalTips = staffData.reduce((sum, staff) => sum + staff.total_tips, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Staff Performance</h3>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="ratings">Ratings</TabsTrigger>
          <TabsTrigger value="shifts">Shifts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStaff}</div>
                <p className="text-xs text-muted-foreground">Active employees</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgRating}</div>
                <p className="text-xs text-muted-foreground">Customer satisfaction</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalSales.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This {timeframe}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalTips.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This {timeframe}</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead className="text-right">Sales</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Avg Order</TableHead>
                  <TableHead className="text-right">Tips</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No staff data found
                    </TableCell>
                  </TableRow>
                ) : (
                  staffData.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.position}</TableCell>
                      <TableCell className="text-right">${staff.total_sales.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{Math.round(staff.total_orders)}</TableCell>
                      <TableCell className="text-right">
                        ${staff.total_orders > 0 ? (staff.total_sales / staff.total_orders).toFixed(2) : "0.00"}
                      </TableCell>
                      <TableCell className="text-right">${staff.total_tips.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{staff.avg_rating.toFixed(1)}</TableCell>
                      <TableCell>
                        <Badge className={getPerformanceColor(staff.performance || "Average")}>
                          {staff.performance}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
              <CardDescription>Staff sales metrics for this {timeframe}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Sales chart visualization would go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ratings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Ratings</CardTitle>
              <CardDescription>Staff ratings and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Ratings chart visualization would go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shifts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shift Performance</CardTitle>
              <CardDescription>Performance metrics by shift</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Shift performance visualization would go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StaffPerformanceSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-[180px]" />
      </div>

      <Skeleton className="h-10 w-full" />

      <div className="grid gap-4 md:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="rounded-md border p-4">
        <Skeleton className="h-[300px] w-full" />
      </div>
    </div>
  )
}

