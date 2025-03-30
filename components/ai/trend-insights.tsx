"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, LineChart } from "lucide-react"

interface TrendInsightsProps {
  className?: string
}

export function TrendInsights({ className }: TrendInsightsProps) {
  const [question, setQuestion] = useState<string>("")
  const [insights, setInsights] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!question.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/trend-forecast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch trend insights")
      }

      const data = await response.json()
      setInsights(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleExampleClick = (example: string) => {
    setQuestion(example)
  }

  const examples = [
    "What food trends are emerging in our area?",
    "How will consumer dining preferences change in the next year?",
    "What technology trends should we adopt?",
    "Which seasonal trends should we prepare for?",
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-5 w-5" />
          Trend Insights
        </CardTitle>
        <CardDescription>Identify emerging trends and forecast future market developments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Ask a question about industry trends..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[100px]"
          />

          <div className="flex flex-wrap gap-2">
            {examples.map((example) => (
              <Button key={example} variant="outline" size="sm" onClick={() => handleExampleClick(example)}>
                {example}
              </Button>
            ))}
          </div>

          {error && <div className="text-sm text-red-500 mt-2">{error}</div>}

          {insights && !loading && (
            <Tabs defaultValue="summary" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="emerging">Emerging Trends</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="mt-4 space-y-4">
                <div className="text-sm">
                  <h4 className="font-medium mb-2">Trend Overview</h4>
                  <p>{insights.summary}</p>
                </div>
              </TabsContent>
              <TabsContent value="emerging" className="mt-4 space-y-4">
                <div className="text-sm">
                  <h4 className="font-medium mb-2">Emerging Trends</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {insights.emergingTrends?.map((trend: string, i: number) => (
                      <li key={i}>{trend}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="recommendations" className="mt-4 space-y-4">
                <div className="text-sm">
                  <h4 className="font-medium mb-2">Trend-Based Recommendations</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {insights.recommendations?.map((rec: string, i: number) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={loading || !question.trim()} className="ml-auto">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Get Insights"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

