"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Users, ClipboardList, MapPin, Menu, Sparkles, Settings, BugIcon as Spider, LayoutDashboard, BarChart2, ShoppingBag, Cpu, MessageSquare, Search, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from 'react'

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    primary: true
  },
  {
    name: "Analytics",
    href: "/insights",
    icon: BarChart2,
    primary: true
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
    primary: true
  },
  {
    name: "Orders",
    href: "/orders",
    icon: ShoppingBag,
    primary: true
  },
  {
    name: "AI Insights",
    href: "/ai-insights",
    icon: Cpu,
    primary: true
  },
  {
    name: "Menu Management",
    href: "/menu",
    icon: Menu,
    primary: false
  },
  {
    name: "Locations",
    href: "/locations",
    icon: MapPin,
    primary: false
  },
  {
    name: "Data",
    href: "/data",
    icon: Database,
    primary: false
  },
  {
    name: "Feedback",
    href: "/feedback",
    icon: MessageSquare,
    primary: false
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    primary: false
  },
]

export default function SideNav() {
  const [collapsed, setCollapsed] = useState(false)
  const [showAll, setShowAll] = useState(false)

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 flex-shrink-0 overflow-y-auto bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out z-10"
           style={{ width: collapsed ? '80px' : '240px' }}>
      <div className="px-3 py-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <div className="flex items-center">
              <span className="font-semibold text-lg text-gray-900 dark:text-white">Navigation</span>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md bg-white dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white shadow-sm border border-gray-200 dark:border-gray-700"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {!collapsed && (
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-800 text-sm rounded-md border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
        )}

        <nav className="space-y-1 flex-1">
          <div className="space-y-1">
            {navItems
              .filter(item => showAll || item.primary)
              .map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={cn(
                    "flex items-center py-2 px-3 text-sm font-medium rounded-md transition-colors",
                    "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    "dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                  )}
                >
                  <item.icon className={cn("text-gray-500 dark:text-gray-400", collapsed ? "h-6 w-6" : "h-5 w-5 mr-3")} />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              ))}
          </div>

          {!collapsed && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="mt-2 w-full flex items-center justify-center py-2 px-3 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span>Show more</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
          )}

          {!collapsed && showAll && (
            <button
              onClick={() => setShowAll(false)}
              className="mt-2 w-full flex items-center justify-center py-2 px-3 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span>Show less</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          )}
        </nav>

        <div className="pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
          <div className={cn(
            "flex items-center rounded-md p-2",
            "bg-blue-50 dark:bg-blue-900/20",
            "border border-blue-100 dark:border-blue-800"
          )}>
            {!collapsed ? (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Pro Features</span>
                <span className="text-xs text-blue-500 dark:text-blue-500">Upgrade for full access</span>
              </div>
            ) : (
              <Cpu className="h-5 w-5 text-blue-500" />
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}

