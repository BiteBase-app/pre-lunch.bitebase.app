"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, LineChart, Map, PieChart, Plus, Settings, ShoppingBag, Users, Brain } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon?: React.ReactNode
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
            "flex items-center justify-start rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          {item.icon && <span className="mr-2 h-4 w-4">{item.icon}</span>}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

export function DashboardNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      title: "Insights",
      href: "/dashboard/insights",
      icon: <LineChart className="h-4 w-4" />,
    },
    {
      title: "Geospatial",
      href: "/dashboard/geospatial",
      icon: <Map className="h-4 w-4" />,
    },
    {
      title: "Data",
      href: "/dashboard/data",
      icon: <PieChart className="h-4 w-4" />,
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Inventory",
      href: "/dashboard/inventory",
      icon: <ShoppingBag className="h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-4 w-4" />,
    },
    {
      title: "AI Intelligence",
      href: "/dashboard/ai",
      icon: <Brain className="h-4 w-4" />,
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="px-3 py-2">
        <div className="space-y-1">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Dashboard</h2>
          <SidebarNav items={navItems} />
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Projects</h2>
        <div className="space-y-1">
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link href="/dashboard/new-project">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

