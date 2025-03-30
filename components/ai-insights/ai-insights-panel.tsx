"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getAIInsight, type InsightType, type InsightResponse } from "@/lib/ai-insights"
import {
  Bot,
  BarChart2,
  Users,
  Coffee,
  MapPin,
  TrendingUp,
  Send,
  Sparkles,
  RefreshCw,
  Clock,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"

export default function AIInsightsPanel() {
  const [activeTab, setActiveTab] = useState<InsightType>("general")
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [insight, setInsight] = useState<InsightResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [recentQuestions, setRecentQuestions] = useState<string[]>([
    "How can I improve my revenue this month?",
    "Which menu items should I promote more?",
    "What are my peak customer hours?",
    "How do I compare to nearby competitors?",
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const responseRef = useRef<HTMLDivElement>(null)

  // Sample restaurant data - in a real app, this would come from your database
  const mockRestaurantData = {
    revenue: {
      current: 42500,
      previous: 38900,
      trend: 0.09,
    },
    customers: {
      count: 1250,
      retention: 0.68,
      satisfaction: 4.2,
    },
    menu: {
      topItems: ["Pasta Carbonara", "Grilled Salmon", "Tiramisu"],
      lowPerformers: ["Vegetable Soup", "Caesar Salad"],
    },
    location: {
      footTraffic: "High",
      competitors: 5,
      demographics: "Urban professionals, 25-45",
    },
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value as InsightType)
    setInsight(null)
    setError(null)
  }

  const handleQuestionSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!question.trim() && !activeTab) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await getAIInsight({
        type: activeTab,
        question: question.trim() || undefined,
        restaurantData: mockRestaurantData,
        timeframe: "month",
      })

      setInsight(result)

      // Add to recent questions if it's not already there
      if (question.trim() && !recentQuestions.includes(question)) {
        setRecentQuestions((prev) => [question, ...prev.slice(0, 3)])
      }

      // Clear the input
      setQuestion("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate insight")
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-generate insight when tab changes
  useEffect(() => {
    if (activeTab) {
      handleQuestionSubmit()
    }
  }, [activeTab])

  // Scroll to the response when it's loaded
  useEffect(() => {
    if (insight && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [insight])

  return (
    <Card className="w-full h-full overflow-hidden flex flex-col glass-panel">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI Insights</CardTitle>
          </div>
          <Badge variant="outline" className="px-2 py-1">
            <Clock className="h-3 w-3 mr-1" />
            Real-time
          </Badge>
        </div>
        <CardDescription>Ask questions about your restaurant data or select a category for insights</CardDescription>
      </CardHeader>

      <Tabs defaultValue="general" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="px-6">
          <TabsList className="w-full grid grid-cols-6 mb-4">
            <TabsTrigger value="general" className="flex items-center gap-1">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-1">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">Revenue</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Customers</span>
            </TabsTrigger>
            <TabsTrigger value="menu" className="flex items-center gap-1">
              <Coffee className="h-4 w-4" />
              <span className="hidden sm:inline">Menu</span>
            </TabsTrigger>
            <TabsTrigger value="location" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Location</span>
            </TabsTrigger>
            <TabsTrigger value="competition" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Competition</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="flex-grow overflow-y-auto pb-0">
          <form onSubmit={handleQuestionSubmit} className="mb-4">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                placeholder="Ask a question about your restaurant data..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {recentQuestions.length > 0 && !insight && !isLoading && (
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Recent Questions</h4>
              <div className="flex flex-wrap gap-2">
                {recentQuestions.map((q, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/20"
                    onClick={() => {
                      setQuestion(q)
                      inputRef.current?.focus()
                    }}
                  >
                    {q}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <Skeleton className="h-24 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-md">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => handleQuestionSubmit()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}

          {insight && (
            <div ref={responseRef} className="space-y-4 animate-fadeInUp">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: insight.answer.replace(/\n/g, "<br />") }} />
                  </div>

                  {insight.relatedMetrics && insight.relatedMetrics.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Related Metrics</h4>
                      <div className="flex flex-wrap gap-2">
                        {insight.relatedMetrics.map((metric, i) => (
                          <Badge key={i} variant="outline">
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {insight && (
          <CardFooter className="flex justify-between border-t p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <ThumbsUp className="h-3 w-3 mr-1" />
                Helpful
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                <ThumbsDown className="h-3 w-3 mr-1" />
                Not Helpful
              </Button>
            </div>
            <Button variant="outline" size="sm" className="h-8" onClick={() => handleQuestionSubmit()}>
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
          </CardFooter>
        )}
      </Tabs>
    </Card>
  )
}

