"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, DollarSign } from "lucide-react"

interface FinancialInsightsProps {
  className?: string
}

export function FinancialInsights({ className }: FinancialInsightsProps) {
  const [question, setQuestion] = useState<string>("")
  const [insights, setInsights] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!question.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/financial-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch financial insights")
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
    "How can we improve our profit margins?",
    "What are our most profitable menu items?",
    "How do our labor costs compare to industry standards?",
    "What financial metrics should we focus on improving?",
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Financial Insights
        </CardTitle>
        <CardDescription>Analyze your financial performance and identify opportunities for improvement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Ask a question about your finances..."
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
                <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="mt-4 space-y-4">
                <div className="text-sm">
                  <h4 className="font-medium mb-2">Financial Overview</h4>
                  <p>{insights.summary}</p>
                </div>
              </TabsContent>
              <TabsContent value="metrics" className="mt-4 space-y-4">
                <div className="text-sm">
                  <h4 className="font-medium mb-2">Key Financial Metrics</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {insights.keyMetrics?.map((metric: string, i: number) => (
                      <li key={i}>{metric}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="recommendations" className="mt-4 space-y-4">
                <div className="text-sm">
                  <h4 className="font-medium mb-2">Financial Recommendations</h4>
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

