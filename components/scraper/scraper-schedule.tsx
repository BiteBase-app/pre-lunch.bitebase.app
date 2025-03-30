"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ScraperSource } from "@/lib/scraper"
import { Calendar, Clock, RefreshCw } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface ScraperScheduleProps {
  sources: ScraperSource[]
}

export function ScraperSchedule({ sources }: ScraperScheduleProps) {
  const [scheduledSources, setScheduledSources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  useEffect(() => {
    checkSchedule()
  }, [sources])

  const checkSchedule = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/scraper/schedule")
      const data = await response.json()

      if (data.success) {
        setScheduledSources(data.scrapers || [])
      }
    } catch (error) {
      console.error("Error checking schedule:", error)
    } finally {
      setLoading(false)
      setLastChecked(new Date())
    }
  }

  const getNextRunDate = (source: ScraperSource) => {
    if (!source.lastRun) return "As soon as possible"

    const lastRun = new Date(source.lastRun)
    const nextRun = new Date(lastRun)

    switch (source.frequency) {
      case "daily":
        nextRun.setDate(lastRun.getDate() + 1)
        break
      case "weekly":
        nextRun.setDate(lastRun.getDate() + 7)
        break
      case "monthly":
        nextRun.setMonth(lastRun.getMonth() + 1)
        break
    }

    return nextRun.toLocaleString()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Scheduled Jobs</h2>
        <div className="flex items-center">
          {lastChecked && (
            <span className="text-xs text-muted-foreground mr-2">Last checked: {lastChecked.toLocaleTimeString()}</span>
          )}
          <Button variant="outline" size="sm" onClick={checkSchedule} disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Jobs</CardTitle>
          <CardDescription>Sources that will be scraped based on their schedule</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : scheduledSources.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No scheduled jobs at this time.</p>
              <p className="text-sm">All sources are up to date with their schedules.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {scheduledSources.map((source) => (
                <div key={source.id} className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <div className="font-medium">{source.name}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {source.frequency}
                      <span className="mx-2">•</span>
                      <Calendar className="h-3 w-3 mr-1" />
                      {source.lastRun ? new Date(source.lastRun).toLocaleDateString() : "Never run"}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      Next run: {getNextRunDate(source)}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      Run Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schedule Settings</CardTitle>
          <CardDescription>Configure when and how often the scraper runs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-1">Daily Jobs</h3>
                <p className="text-sm text-muted-foreground">Run at 2:00 AM UTC</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Weekly Jobs</h3>
                <p className="text-sm text-muted-foreground">Run on Sundays at 3:00 AM UTC</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-1">Monthly Jobs</h3>
                <p className="text-sm text-muted-foreground">Run on the 1st of each month at 4:00 AM UTC</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Retry Policy</h3>
                <p className="text-sm text-muted-foreground">3 attempts with exponential backoff</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

