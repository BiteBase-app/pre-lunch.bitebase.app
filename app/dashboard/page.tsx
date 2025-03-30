import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { SalesCard } from "@/components/dashboard/sales-card"
import { OverviewStats } from "@/components/dashboard/overview-stats"
import { RecentSales } from "@/components/dashboard/recent-sales"
import AIInsightsWidget from "@/components/ai-insights/ai-insights-widget"
// Placeholder for actual data fetching function
import { getDashboardData } from "@/lib/db" // Assuming you have a function like this

export const metadata: Metadata = {
  title: "Dashboard | BiteBase",
  description: "Restaurant analytics dashboard",
}

// Placeholder mock data (replace with actual data fetching)
const mockRevenueData = [
  { day: "2024-03-01", revenue: 1200 },
  { day: "2024-03-02", revenue: 1500 },
  { day: "2024-03-03", revenue: 1350 },
  // Add more data points...
];
const mockOverviewStats = {
  totalCustomers: 2350,
  totalOrders: 1875,
  averageOrderValue: 19.25,
  salesGrowth: 8.5, // Example growth
};
const mockRecentSales = [
  { name: "Olivia Martin", email: "olivia@email.com", amount: 19.99 },
  { name: "Jackson Lee", email: "jackson@email.com", amount: 39.00 },
  // Add more sales...
];

export default async function DashboardPage() {
  // Fetch data - Replace with your actual data fetching logic
  // const { revenueData, overviewStats, recentSales } = await getDashboardData(); 
  const revenueData = mockRevenueData;
  const overviewStats = mockOverviewStats;
  const recentSales = mockRecentSales;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          {/* Keeping SalesCard for demonstration, but OverviewStats is preferred */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <SalesCard title="Total Revenue" value={`$${overviewStats.totalRevenue?.toLocaleString() ?? 'N/A'}`} description="+20.1% from last month" />
            <SalesCard title="Customers" value={overviewStats.totalCustomers?.toLocaleString() ?? 'N/A'} description="+10.1% from last month" />
            <SalesCard title="Average Order" value={`$${overviewStats.averageOrderValue?.toFixed(2) ?? 'N/A'}`} description="+5.2% from last month" />
            <SalesCard title="Sales Growth" value={`${overviewStats.salesGrowth > 0 ? '+' : ''}${overviewStats.salesGrowth?.toFixed(1) ?? 'N/A'}%`} description="from last month" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                {/* Pass the fetched revenueData to the component */}
                <RevenueChart data={revenueData} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made {recentSales?.length ?? 0} sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Pass the fetched recentSales data */}
                <RecentSales sales={recentSales} />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Key metrics for your restaurant</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                {/* Pass the fetched overviewStats data */}
                <OverviewStats {...overviewStats} />
              </CardContent>
            </Card>
            <div className="col-span-3">
              <AIInsightsWidget />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

