import type { Metadata } from "next"
import { AIInsightsPanel } from "@/components/ai/ai-insights-panel"

export const metadata: Metadata = {
  title: "AI Business Intelligence | BiteBase",
  description: "Get AI-powered insights for your restaurant business",
}

export default function AIPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">AI Business Intelligence</h1>
      <p className="mb-8 text-muted-foreground">
        Ask questions about your restaurant business and get AI-powered insights and recommendations.
      </p>
      <AIInsightsPanel />
    </div>
  )
}

