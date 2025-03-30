"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart2, Home, MapPin, Menu, DollarSign, TrendingUp, Settings, Users, Sparkles } from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

export const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Location Analysis",
    href: "/dashboard/location",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    title: "Menu Analysis",
    href: "/dashboard/menu",
    icon: <Menu className="h-5 w-5" />,
  },
  {
    title: "Revenue Analysis",
    href: "/dashboard/revenue",
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    title: "Customer Analysis",
    href: "/dashboard/customers",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Competitor Analysis",
    href: "/dashboard/competitors",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    title: "AI Insights",
    href: "/dashboard/ai-insights",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: <BarChart2 className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

