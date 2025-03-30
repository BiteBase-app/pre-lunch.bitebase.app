"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MarketInsights } from "./market-insights"
import { MenuInsights } from "./menu-insights"
import { CustomerInsights } from "./customer-insights"
import { CompetitorInsights } from "./competitor-insights"
import { FinancialInsights } from "./financial-insights"
import { LocationInsights } from "./location-insights"
import { TrendInsights } from "./trend-insights"

const formSchema = z.object({
  query: z.string().min(10, {
    message: "Your question must be at least 10 characters.",
  }),
})

export function AIInsightsPanel() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState("market")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/business-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: values.query,
          context: {
            businessType: "restaurant",
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get insights")
      }

      const data = await response.json()
      setResults(data)

      // Set active tab based on available results
      if (data.results) {
        if (data.results.marketAnalysis) {
          setActiveTab("market")
        } else if (data.results.menuOptimization) {
          setActiveTab("menu")
        } else if (data.results.customerInsights) {
          setActiveTab("customers")
        } else if (data.results.competitorAnalysis) {
          setActiveTab("competitors")
        } else if (data.results.financialAnalysis) {
          setActiveTab("financial")
        } else if (data.results.locationAnalysis) {
          setActiveTab("location")
        } else if (data.results.trendForecast) {
          setActiveTab("trends")
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Business Intelligence</CardTitle>
        <CardDescription>Ask any business question about your restaurant and get AI-powered insights</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Business Question</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., What menu items should I add to increase profit margins? or How can I improve customer retention?"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Be specific about what you want to know about your restaurant business.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Get AI Insights"
              )}
            </Button>
          </form>
        </Form>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {results && results.success && (
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-lg font-medium">Main Objective</h3>
              <p className="text-sm text-muted-foreground">{results.mainObjective}</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 md:grid-cols-7">
                {results.results.marketAnalysis && <TabsTrigger value="market">Market</TabsTrigger>}
                {results.results.menuOptimization && <TabsTrigger value="menu">Menu</TabsTrigger>}
                {results.results.customerInsights && <TabsTrigger value="customers">Customers</TabsTrigger>}
                {results.results.competitorAnalysis && <TabsTrigger value="competitors">Competitors</TabsTrigger>}
                {results.results.financialAnalysis && <TabsTrigger value="financial">Financial</TabsTrigger>}
                {results.results.locationAnalysis && <TabsTrigger value="location">Location</TabsTrigger>}
                {results.results.trendForecast && <TabsTrigger value="trends">Trends</TabsTrigger>}
              </TabsList>

              {results.results.marketAnalysis && (
                <TabsContent value="market">
                  <MarketInsights data={results.results.marketAnalysis} />
                </TabsContent>
              )}

              {results.results.menuOptimization && (
                <TabsContent value="menu">
                  <MenuInsights data={results.results.menuOptimization} />
                </TabsContent>
              )}

              {/* Add other tabs content components as needed */}
              {results.results.customerInsights && (
                <TabsContent value="customers">
                  <CustomerInsights insights={results.results.customerInsights} />
                </TabsContent>
              )}

              {results.results.competitorAnalysis && (
                <TabsContent value="competitors">
                  <CompetitorInsights insights={results.results.competitorAnalysis} />
                </TabsContent>
              )}

              {results.results.financialAnalysis && (
                <TabsContent value="financial">
                  <FinancialInsights insights={results.results.financialAnalysis} />
                </TabsContent>
              )}

              {results.results.locationAnalysis && (
                <TabsContent value="location">
                  <LocationInsights insights={results.results.locationAnalysis} />
                </TabsContent>
              )}

              {results.results.trendForecast && (
                <TabsContent value="trends">
                  <TrendInsights insights={results.results.trendForecast} />
                </TabsContent>
              )}
            </Tabs>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          Powered by AI agents specialized in restaurant business intelligence
        </p>
      </CardFooter>
    </Card>
  )
}

