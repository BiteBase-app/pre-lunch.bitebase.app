"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, TrendingUp } from "lucide-react"

interface CompetitorInsightsProps {
  className?: string
}

export function CompetitorInsights({ className }: CompetitorInsightsProps) {
  const [question, setQuestion] = useState<string>("")
  const [insights, setInsights] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!question.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/competitor-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch competitor insights")
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
    "Who are our main competitors in the area?",
    "What pricing strategies are our competitors using?",
    "How does our menu compare to competitors?",
    "What are our competitors' strengths and weaknesses?",
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Competitor Insights
        </CardTitle>
        <CardDescription>Analyze your competitors' strategies, offerings, and market positioning</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Ask a question about your competitors..."
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
                <TabsTrigger value="strengths">Strengths</TabsTrigger>
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="mt-4 space-y-4">
                <div className="text-sm">
                  <h4 className="font-medium mb-2">Key Insights</h4>
                  <p>{insights.summary}</p>
                </div>
              </TabsContent>
              <TabsContent value="strengths" className="mt-4 space-y-4">
                <div className="text-sm">
                  <h4 className="font-medium mb-2">Competitor Strengths</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {insights.competitorStrengths?.map((strength: string, i: number) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="opportunities" className="mt-4 space-y-4">
                <div className="text-sm">
                  <h4 className="font-medium mb-2">Opportunities</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {insights.opportunities?.map((opportunity: string, i: number) => (
                      <li key={i}>{opportunity}</li>
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

