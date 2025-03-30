"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, FileSpreadsheet, Link2, RefreshCw } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DataSourceCard } from "@/components/data/data-source-card"
import { DataTable } from "@/components/data/data-table"
import { DataUploadForm } from "@/components/data/data-upload-form"

export default function DataPage() {
  const [activeTab, setActiveTab] = useState("sources")

  return (
    <DashboardShell>
      <DashboardHeader heading="Data Management" text="Connect, upload, and manage your restaurant data sources." />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="upload">Upload Data</TabsTrigger>
          <TabsTrigger value="explore">Explore Data</TabsTrigger>
        </TabsList>
        <TabsContent value="sources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DataSourceCard
              icon={<Database className="h-8 w-8" />}
              title="MotherDuck Connection"
              description="Connect to your MotherDuck instance"
              status="connected"
              lastSync="10 minutes ago"
            />
            <DataSourceCard
              icon={<FileSpreadsheet className="h-8 w-8" />}
              title="POS System"
              description="Connect to your point of sale system"
              status="connected"
              lastSync="1 hour ago"
            />
            <DataSourceCard
              icon={<Link2 className="h-8 w-8" />}
              title="Reservation System"
              description="Connect to your reservation platform"
              status="not-connected"
            />
            <DataSourceCard
              icon={<Link2 className="h-8 w-8" />}
              title="Social Media"
              description="Connect to your social media accounts"
              status="not-connected"
            />
            <DataSourceCard
              icon={<Link2 className="h-8 w-8" />}
              title="Review Platforms"
              description="Connect to Yelp, Google Reviews, etc."
              status="not-connected"
            />
            <Card className="flex flex-col items-center justify-center p-6 text-center">
              <CardContent className="pt-6">
                <Button variant="outline" className="gap-2">
                  <Link2 className="h-4 w-4" />
                  Add New Data Source
                </Button>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Connected Data Sources</CardTitle>
              <CardDescription>Manage your connected data sources and synchronization settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <Database className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">MotherDuck</h3>
                      <p className="text-sm text-muted-foreground">Connected • Last sync: 10 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <RefreshCw className="h-4 w-4" />
                      Sync Now
                    </Button>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <FileSpreadsheet className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">POS System</h3>
                      <p className="text-sm text-muted-foreground">Connected • Last sync: 1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <RefreshCw className="h-4 w-4" />
                      Sync Now
                    </Button>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Data</CardTitle>
              <CardDescription>Upload CSV, Excel, or JSON files to import data into your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <DataUploadForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="explore" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Explore Your Data</CardTitle>
              <CardDescription>Browse and query your connected data sources</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

