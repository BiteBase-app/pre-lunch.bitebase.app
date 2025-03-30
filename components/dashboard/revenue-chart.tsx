"use client"

import { useState } from "react"
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart,
  Bar,
  Legend
} from "recharts"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowUp, 
  ArrowDown, 
  TrendingUp, 
  BarChart2, 
  LineChart, 
  ExternalLink, 
  Download 
} from "lucide-react"
import { cn } from "@/lib/utils"

interface RevenueChartProps {
  data: any[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  const [timeRange, setTimeRange] = useState("30d")
  const [chartType, setChartType] = useState("area")
  
  // Check if data is valid before processing
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[350px]">
          <p className="text-gray-500 dark:text-gray-400">No revenue data available.</p>
        </CardContent>
      </Card>
    );
  }

  // Calculate revenue stats only if data is valid
  const totalRevenue = data.reduce((sum, item) => sum + Number(item.revenue), 0)
  const previousPeriodRevenue = totalRevenue * 0.85 // Simulated previous period data
  const percentChange = previousPeriodRevenue > 0 
    ? ((totalRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100 
    : totalRevenue > 0 ? 100 : 0; // Handle division by zero or no change
  const isPositive = percentChange > 0
  
  // Format the data
  const formattedData = data.map((item) => ({
    date: new Date(item.day).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    revenue: Number(item.revenue),
    profit: Number(item.revenue) * 0.4, // Simulated profit data (40% of revenue)
    transactions: Math.round(Number(item.revenue) / 50), // Simulated transaction count
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <p 
                key={`item-${index}`} 
                className="text-xs flex items-center"
                style={{ color: entry.color }}
              >
                <span className="font-medium">
                  {entry.name === "revenue" || entry.name === "profit" 
                    ? `$${entry.value.toLocaleString()}` 
                    : entry.value.toLocaleString()}
                </span>
                <span className="ml-1 text-gray-500 dark:text-gray-400">
                  {entry.name === "transactions" ? "orders" : entry.name}
                </span>
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm">
      <CardHeader className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 px-6">
        <div>
          <CardTitle className="text-xl font-bold">Revenue Overview</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400 mt-1">
            Daily revenue performance
          </CardDescription>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className={cn(
              "flex items-center space-x-1 text-sm",
              isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
            )}>
              {isPositive ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              <span className="font-medium">{Math.abs(percentChange).toFixed(1)}%</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">vs last period</span>
          </div>
          <Select defaultValue={timeRange} onValueChange={(value) => setTimeRange(value)}>
            <SelectTrigger className="h-8 w-[120px] text-xs">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last quarter</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Tabs defaultValue="area" value={chartType} onValueChange={setChartType} className="px-6">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="bg-gray-100 dark:bg-gray-800 h-8 p-1">
              <TabsTrigger value="area" className="h-6 text-xs px-3">
                <LineChart className="h-3 w-3 mr-1" />
                Area
              </TabsTrigger>
              <TabsTrigger value="bar" className="h-6 text-xs px-3">
                <BarChart2 className="h-3 w-3 mr-1" />
                Bar
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <button className="text-xs flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ExternalLink className="h-3 w-3 mr-1" />
                Share
              </button>
              <button className="text-xs flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Download className="h-3 w-3 mr-1" />
                Export
              </button>
            </div>
          </div>
          
          <TabsContent value="area" className="mt-0">
            <div className="h-[350px] w-full p-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={formattedData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tickLine={false} 
                    axisLine={false} 
                    tickMargin={10}
                    className="text-xs text-gray-500 dark:text-gray-400" 
                  />
                  <YAxis
                    width={60}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="text-xs text-gray-500 dark:text-gray-400"
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    align="right" 
                    verticalAlign="top"
                    iconType="circle"
                    iconSize={8}
                    height={30}
                    formatter={(value) => <span className="text-xs capitalize">{value}</span>}
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    name="profit"
                    stroke="#10B981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorProfit)"
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="revenue"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="bar" className="mt-0">
            <div className="h-[350px] w-full p-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={formattedData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tickLine={false} 
                    axisLine={false} 
                    tickMargin={10}
                    className="text-xs text-gray-500 dark:text-gray-400" 
                  />
                  <YAxis
                    width={60}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="text-xs text-gray-500 dark:text-gray-400"
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    align="right" 
                    verticalAlign="top"
                    iconType="circle"
                    iconSize={8}
                    height={30}
                    formatter={(value) => <span className="text-xs capitalize">{value}</span>}
                  />
                  <Bar dataKey="revenue" name="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" name="profit" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

