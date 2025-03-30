"use client"

import type React from "react"
import { DashboardNav } from "@/components/dashboard/sidebar-nav"

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  open?: boolean
}

export function Sidebar({ open = false, ...props }: SidebarProps) {
  return (
    <aside
      className={
        "fixed inset-y-0 flex w-[220px] shrink-0 flex-col overflow-y-auto bg-background p-6 md:static md:w-auto md:flex-row md:space-x-4 md:overflow-x-auto md:bg-transparent"
      }
      {...props}
    >
      <DashboardNav open={open} />
    </aside>
  )
}

