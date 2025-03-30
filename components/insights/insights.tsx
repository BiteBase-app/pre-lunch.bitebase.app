"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { InsightDisplay } from "./insight-display"
import { Sparkles, Loader2 } from "lucide-react"
import type { InsightResult } from "@/lib/ai"

export function Insights() {
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [insight, setInsight] = useState<InsightResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!question.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate insight")
      }

      if (data.success && data.insight) {
        setInsight(data.insight)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (err) {
      console.error("Error generating insight:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const exampleQuestions = [
    "What were my busiest days last month?",
    "Which menu items have the highest profit margin?",
    "How does customer retention compare across locations?",
    "What is the average order value by day of week?",
  ]

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about your restaurant business..."
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Insight
            </>
          )}
        </Button>
      </form>

      {!insight && !isLoading && !error && (
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-medium">Example Questions</h3>
            <div className="grid gap-2">
              {exampleQuestions.map((q, i) => (
                <Button key={i} variant="outline" className="justify-start" onClick={() => setQuestion(q)}>
                  {q}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-destructive">
          <CardContent className="p-6 text-destructive">
            <p>Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {insight && <InsightDisplay insight={insight} />}
    </div>
  )
}

