"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, MapPin } from "lucide-react"

interface LocationInsightsProps {
  className?: string
}

export function LocationInsights({ className }: LocationInsightsProps) {
  const [question, setQuestion] = useState<string>("")
  const [insights, setInsights] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!question.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/location-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch location insights")
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
    "What are the best areas for a new restaurant location?",
    "How does foot traffic affect our current locations?",
    "What demographic factors should we consider for expansion?",
    "How do nearby businesses impact our performance?",
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Insights
        </CardTitle>
        <CardDescription>Analyze location data to optimize current sites and find new opportunities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Ask a question about locations..."
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
                <TabsTrigger value="factors">Key Factors</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="mt-4 space-y-4">
                <div className="text-sm">
                  <h4 className="font-medium mb-2">Location Analysis</h4>
                  <p>{insights.summary}</p>
                </div>
              </TabsContent>
              <TabsContent value="factors" className="mt-4 space-y-4">
                <div className="text-sm">
                  <h4 className="font-medium mb-2">Key Location Factors</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {insights.keyFactors?.map((factor: string, i: number) => (
                      <li key={i}>{factor}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="recommendations" className="mt-4 space-y-4">
                <div className="text-sm">
                  <h4 className="font-medium mb-2">Location Recommendations</h4>
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

