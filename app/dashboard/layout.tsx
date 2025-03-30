"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useTranslation } from "react-i18next"
import { DashboardNav } from "@/components/dashboard/sidebar-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { ThemeToggle } from "@/components/theme-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Utensils, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t } = useTranslation()
  const { user, loading, isAuthenticated } = useAuth()
  const pathname = usePathname()
  const { toast } = useToast()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Show page only when auth is checked
  if (!isMounted || loading) {
    return <DashboardSkeleton />
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="mt-2 text-muted-foreground">Please log in to access this page.</p>
        <Button className="mt-4" onClick={() => (window.location.href = "/login")}>
          Go to Login
        </Button>
      </div>
    )
  }

  // Function to get page title from path
  const getPageTitle = () => {
    if (pathname === "/dashboard") return t("dashboard.overview")
    const path = pathname.split("/").pop()
    if (!path) return t("dashboard.overview")

    // Map path to title using i18n
    const pathToTitle: Record<string, string> = {
      analytics: t("dashboard.analytics"),
      insights: t("dashboard.insights"),
      geospatial: t("dashboard.geospatial"),
      data: t("dashboard.data"),
      customers: t("dashboard.customers"),
      inventory: t("dashboard.inventory"),
      settings: t("dashboard.settings"),
      ai: t("dashboard.ai"),
    }

    return pathToTitle[path] || path.charAt(0).toUpperCase() + path.slice(1)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 md:px-8">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="flex items-center pb-4">
              <Utensils className="mr-2 h-6 w-6 text-primary" />
              <span className="font-bold">BiteBase</span>
            </div>
            <DashboardNav />
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-primary hidden md:block" />
          <span className="font-bold hidden md:block">BiteBase</span>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Only show demo badge in auth bypass mode */}
          <Badge variant="outline" className="hidden md:flex">
            Demo Mode
          </Badge>
          <LanguageSwitcher />
          <ThemeToggle />
          <UserNav user={user} />
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r bg-muted/40 md:block">
          <div className="sticky top-16 overflow-y-auto p-4 h-[calc(100vh-4rem)]">
            <DashboardNav />
          </div>
        </aside>
        <main className="flex flex-col">
          <div className="border-b">
            <div className="flex h-16 items-center px-6 md:px-8">
              <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
            </div>
          </div>
          <div className="flex-1 p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 md:px-8">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-24" />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r md:block">
          <div className="flex flex-col gap-2 p-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </aside>
        <main className="flex flex-col">
          <div className="border-b">
            <div className="flex h-16 items-center px-6 md:px-8">
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
          <div className="flex-1 p-6 md:p-8">
            <div className="grid gap-6">
              <Skeleton className="h-24 w-full" />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

