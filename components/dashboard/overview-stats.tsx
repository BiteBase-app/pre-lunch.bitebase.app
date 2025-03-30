import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UsersIcon, ShoppingBagIcon, CalendarIcon, TrendingUpIcon } from "lucide-react"
import { formatCurrency, formatNumber } from "@/lib/formatters"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: React.ReactNode
  className?: string
}

function StatsCard({ title, value, description, icon, className }: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 p-1.5 text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  )
}

interface OverviewStatsProps {
  totalCustomers: number
  totalOrders: number
  averageOrderValue: number
  salesGrowth: number
  period?: string
  className?: string
}

export function OverviewStats({
  totalCustomers,
  totalOrders,
  averageOrderValue,
  salesGrowth,
  period = "this month",
  className,
}: OverviewStatsProps) {

  // Safely format sales growth
  const growthValue = typeof salesGrowth === 'number' && !isNaN(salesGrowth) ? salesGrowth.toFixed(1) : 'N/A';
  const growthPrefix = typeof salesGrowth === 'number' && salesGrowth > 0 ? '+' : '';
  const growthDisplay = typeof salesGrowth === 'number' && !isNaN(salesGrowth) ? `${growthPrefix}${growthValue}%` : 'N/A';

  return (
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      <StatsCard
        title="Total Customers"
        value={formatNumber(totalCustomers)}
        description={`Active customers ${period}`}
        icon={<UsersIcon className="h-full w-full" />}
      />
      <StatsCard
        title="Total Orders"
        value={formatNumber(totalOrders)}
        description={`Completed orders ${period}`}
        icon={<ShoppingBagIcon className="h-full w-full" />}
      />
      <StatsCard
        title="Average Order"
        value={formatCurrency(averageOrderValue)}
        description={`Per order ${period}`}
        icon={<CalendarIcon className="h-full w-full" />}
      />
      <StatsCard
        title="Sales Growth"
        value={growthDisplay}
        description={`Compared to last ${period}`}
        icon={<TrendingUpIcon className="h-full w-full" />}
      />
    </div>
  )
}

