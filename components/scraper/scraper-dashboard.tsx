"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScraperSourceList } from "./scraper-source-list"
import { ScraperResults } from "./scraper-results"
import { ScraperForm } from "./scraper-form"
import { ScraperSchedule } from "./scraper-schedule"
import type { ScraperSource } from "@/lib/scraper"
import { PlusCircle } from "lucide-react"

interface ScraperDashboardProps {
  initialSources: ScraperSource[]
}

export function ScraperDashboard({ initialSources }: ScraperDashboardProps) {
  const [sources, setSources] = useState<ScraperSource[]>(initialSources)
  const [selectedSource, setSelectedSource] = useState<ScraperSource | null>(null)
  const [activeTab, setActiveTab] = useState("sources")
  const [isAddingNew, setIsAddingNew] = useState(false)

  const handleSourceSelect = (source: ScraperSource) => {
    setSelectedSource(source)
    setActiveTab("results")
  }

  const handleAddNew = () => {
    setIsAddingNew(true)
    setActiveTab("new")
  }

  const handleSourceAdded = (newSource: ScraperSource) => {
    setSources([...sources, newSource])
    setIsAddingNew(false)
    setActiveTab("sources")
  }

  const handleSourceUpdated = (updatedSource: ScraperSource) => {
    setSources(sources.map((s) => (s.id === updatedSource.id ? updatedSource : s)))
    setSelectedSource(updatedSource)
  }

  const handleSourceDeleted = (deletedId: string) => {
    setSources(sources.filter((s) => s.id !== deletedId))
    if (selectedSource?.id === deletedId) {
      setSelectedSource(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="results" disabled={!selectedSource}>
              Results
            </TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="new" disabled={!isAddingNew}>
              New Source
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sources" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Data Sources</h2>
              <Button onClick={handleAddNew}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Source
              </Button>
            </div>

            <ScraperSourceList sources={sources} onSelect={handleSourceSelect} onDelete={handleSourceDeleted} />
          </TabsContent>

          <TabsContent value="results">
            {selectedSource && <ScraperResults sourceId={selectedSource.id} sourceName={selectedSource.name} />}
          </TabsContent>

          <TabsContent value="schedule">
            <ScraperSchedule sources={sources} />
          </TabsContent>

          <TabsContent value="new">
            <Card>
              <CardHeader>
                <CardTitle>Add New Data Source</CardTitle>
                <CardDescription>Configure a new external data source to scrape</CardDescription>
              </CardHeader>
              <CardContent>
                <ScraperForm
                  onSubmit={handleSourceAdded}
                  onCancel={() => {
                    setIsAddingNew(false)
                    setActiveTab("sources")
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

