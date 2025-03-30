import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AIInsightsPanel from "@/components/ai-insights/ai-insights-panel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart2, Calendar, Download, FileText, History, Share2, Star, TrendingUp, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Insights | BiteBase",
  description: "AI-powered insights for your restaurant business",
}

export default function AIInsightsPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground">
            Get AI-powered insights and recommendations for your restaurant business
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="reports">Saved Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2 h-[700px]">
              <AIInsightsPanel />
            </Card>

            <div className="col-span-1 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Key Metrics</CardTitle>
                  <CardDescription>Current performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Revenue</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">$42,500</span>
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        +9%
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Customers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">1,250</span>
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        +5%
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Satisfaction</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">4.2/5</span>
                      <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                        -0.1
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Growth</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">7.5%</span>
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        +2.1%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Recent Reports</CardTitle>
                  <CardDescription>AI-generated reports from the last 30 days</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 cursor-pointer">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Monthly Performance Review</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Generated 2 days ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 cursor-pointer">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Menu Optimization Suggestions</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Generated 1 week ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 cursor-pointer">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Customer Satisfaction Analysis</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Generated 2 weeks ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 cursor-pointer">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Competitive Analysis Report</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Generated 3 weeks ago</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Reports</CardTitle>
              <CardDescription>View and manage your saved AI-generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your saved reports will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Settings</CardTitle>
              <CardDescription>Configure your AI insights preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p>AI settings will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

