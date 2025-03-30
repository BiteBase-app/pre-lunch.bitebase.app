import { ArrowDown, ArrowUp, DollarSign, Users, ShoppingBag, TrendingUp, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

interface KpiCardsProps {
  revenue: number
  customers: number
  orders: number
  className?: string
}

export function KpiCards({ revenue, customers, orders, className }: KpiCardsProps) {
  const avgOrderValue = orders > 0 ? revenue / orders : 0;
  
  const cards = [
    {
      title: "Total Revenue",
      value: `$${revenue.toLocaleString()}`,
      icon: DollarSign,
      change: 12.5,
      changeLabel: "from last month",
      bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40",
      iconGradient: "from-blue-500 to-indigo-600",
      borderGradient: "from-blue-100 to-indigo-100 dark:from-blue-800/30 dark:to-indigo-800/30"
    },
    {
      title: "Customers",
      value: customers.toLocaleString(),
      icon: Users,
      change: 5.2,
      changeLabel: "from last month",
      bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40",
      iconGradient: "from-emerald-500 to-teal-600",
      borderGradient: "from-emerald-100 to-teal-100 dark:from-emerald-800/30 dark:to-teal-800/30"
    },
    {
      title: "Orders",
      value: orders.toLocaleString(),
      icon: ShoppingBag,
      change: 8.7,
      changeLabel: "from last month",
      bgGradient: "from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40",
      iconGradient: "from-amber-500 to-orange-600",
      borderGradient: "from-amber-100 to-orange-100 dark:from-amber-800/30 dark:to-orange-800/30"
    },
    {
      title: "Avg. Order Value",
      value: `$${avgOrderValue.toFixed(2)}`,
      icon: Activity,
      change: 3.4,
      changeLabel: "from last month",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40",
      iconGradient: "from-purple-500 to-pink-600",
      borderGradient: "from-purple-100 to-pink-100 dark:from-purple-800/30 dark:to-pink-800/30"
    }
  ];

  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-4", className)}>
      {cards.map((card, index) => (
        <div 
          key={index}
          className={cn(
            "relative rounded-xl border p-5 overflow-hidden transition-all",
            "bg-gradient-to-br backdrop-blur-sm",
            "hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/10",
            "border-transparent",
            card.bgGradient
          )}
          style={{
            borderImage: `linear-gradient(to bottom right, ${card.borderGradient}) 1`,
          }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                {card.title}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {card.value}
              </h3>
            </div>
            <div className={cn(
              "h-10 w-10 rounded-md flex items-center justify-center bg-gradient-to-br",
              card.iconGradient,
            )}>
              <card.icon className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="mt-2 flex items-center text-xs">
            {card.change > 0 ? (
              <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400">
                <ArrowUp className="mr-1 h-3 w-3" />
                {card.change}%
              </span>
            ) : (
              <span className="inline-flex items-center text-red-600 dark:text-red-400">
                <ArrowDown className="mr-1 h-3 w-3" />
                {Math.abs(card.change)}%
              </span>
            )}
            <span className="ml-1 text-gray-500 dark:text-gray-400">{card.changeLabel}</span>
          </div>
          
          {/* Decorative element */}
          <div className={cn(
            "absolute -right-3 -bottom-5 h-24 w-24 rounded-full opacity-10",
            `bg-gradient-to-br ${card.iconGradient}`,
          )}></div>
        </div>
      ))}
    </div>
  )
}

