"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getScraperResults } from "@/lib/scraper"
import { Play, RefreshCw, Download } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface ScraperResultsProps {
  sourceId: string
  sourceName: string
}

export function ScraperResults({ sourceId, sourceName }: ScraperResultsProps) {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [running, setRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("data")

  useEffect(() => {
    loadResults()
  }, [sourceId])

  const loadResults = async () => {
    setLoading(true)
    try {
      const data = await getScraperResults(sourceId)
      setResults(data || [])
    } catch (error) {
      console.error("Error loading results:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRunScraper = async () => {
    setRunning(true)
    try {
      const response = await fetch("/api/scraper/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sourceId }),
      })

      if (response.ok) {
        await loadResults()
      }
    } catch (error) {
      console.error("Error running scraper:", error)
    } finally {
      setRunning(false)
    }
  }

  const handleExportData = () => {
    if (results.length === 0) return

    // Create a JSON blob and download it
    const dataStr = JSON.stringify(results, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `${sourceName.toLowerCase().replace(/\s+/g, "-")}-data.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Results: {sourceName}</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={loadResults} disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportData} disabled={loading || results.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" onClick={handleRunScraper} disabled={running}>
            <Play className="mr-2 h-4 w-4" />
            {running ? "Running..." : "Run Now"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="data" className="mt-0">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No data available. Run the scraper to collect data.</p>
              </div>
            ) : (
              <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96">
                {JSON.stringify(results[0]?.data || {}, null, 2)}
              </pre>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <div className="space-y-2">
                {results.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No history available.</p>
                  </div>
                ) : (
                  results.map((result, index) => (
                    <div key={index} className="flex justify-between items-center p-2 border-b">
                      <span>{new Date(result.scrapedAt).toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">
                        {Object.keys(result.data || {}).length} items
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="logs" className="mt-0">
            <div className="bg-muted p-4 rounded-md overflow-auto max-h-96 font-mono text-sm">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <div className="space-y-1">
                  {results.length === 0 ? (
                    <div className="text-muted-foreground">No logs available.</div>
                  ) : (
                    results.map((result, index) => (
                      <div key={index}>
                        <span className="text-muted-foreground">[{new Date(result.scrapedAt).toLocaleString()}]</span>{" "}
                        Scraper ran successfully
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  )
}

