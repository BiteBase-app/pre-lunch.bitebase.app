import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export type InsightType = "revenue" | "customers" | "menu" | "location" | "competition" | "general"

export interface InsightRequest {
  type: InsightType
  question?: string
  restaurantData?: any
  timeframe?: "day" | "week" | "month" | "year"
  customPrompt?: string
}

export interface InsightResponse {
  answer: string
  confidence: number
  relatedMetrics?: string[]
  recommendations?: string[]
  sources?: string[]
}

const SYSTEM_PROMPT = `You are BiteBaseAI, an expert restaurant business intelligence assistant.
You analyze restaurant data and provide actionable insights to help restaurant owners make better business decisions.
Your responses should be concise, data-driven, and focused on practical recommendations.
Format your responses with clear sections: Summary, Key Insights, and Recommendations.
Use bullet points for clarity and highlight important metrics or trends.`

export async function getAIInsight(request: InsightRequest): Promise<InsightResponse> {
  try {
    const { type, question, restaurantData, timeframe, customPrompt } = request

    // Build the prompt based on the request type
    let prompt = customPrompt || ""

    if (!customPrompt) {
      prompt = `Analyze the following restaurant data for ${timeframe || "recent"} performance:\n\n`

      if (restaurantData) {
        prompt += `Restaurant Data: ${JSON.stringify(restaurantData, null, 2)}\n\n`
      }

      if (question) {
        prompt += `Question: ${question}\n\n`
      } else {
        // Default questions based on insight type
        switch (type) {
          case "revenue":
            prompt += "What are the key revenue trends and how can we improve our financial performance?"
            break
          case "customers":
            prompt += "What customer patterns do you see and how can we improve customer retention and satisfaction?"
            break
          case "menu":
            prompt += "Which menu items are performing well and what menu optimizations do you recommend?"
            break
          case "location":
            prompt += "How is our location performing and what location-based strategies should we consider?"
            break
          case "competition":
            prompt += "How do we compare to competitors and what competitive advantages should we focus on?"
            break
          case "general":
            prompt += "What are the most important insights from this data and what actions should we take?"
            break
        }
      }
    }

    // Generate the insight using AI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: SYSTEM_PROMPT,
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 1000,
    })

    // Parse the response
    return {
      answer: text,
      confidence: 0.85, // Mock confidence score
      relatedMetrics: extractRelatedMetrics(text, type),
      recommendations: extractRecommendations(text),
      sources: ["Restaurant sales data", "Customer feedback", "Market trends"],
    }
  } catch (error) {
    console.error("Error generating AI insight:", error)
    throw new Error("Failed to generate insight. Please try again later.")
  }
}

// Helper function to extract related metrics from the AI response
function extractRelatedMetrics(text: string, type: InsightType): string[] {
  // This is a simplified implementation
  // In a real application, you would use more sophisticated NLP techniques
  const metrics: Record<InsightType, string[]> = {
    revenue: ["Revenue Growth", "Profit Margin", "Average Order Value"],
    customers: ["Customer Retention", "Customer Satisfaction", "Visit Frequency"],
    menu: ["Item Popularity", "Food Cost", "Menu Item Profitability"],
    location: ["Foot Traffic", "Local Demographics", "Competitor Density"],
    competition: ["Market Share", "Pricing Comparison", "Unique Selling Points"],
    general: ["Overall Performance", "Growth Opportunities", "Risk Factors"],
  }

  return metrics[type] || []
}

// Helper function to extract recommendations from the AI response
function extractRecommendations(text: string): string[] {
  // Look for recommendations section in the text
  const recommendationsMatch = text.match(/Recommendations:([\s\S]*?)(?:\n\n|$)/i)

  if (recommendationsMatch && recommendationsMatch[1]) {
    // Extract bullet points
    const bulletPoints = recommendationsMatch[1].split(/\n-|\n•/).filter(Boolean)
    return bulletPoints.map((point) => point.trim())
  }

  // Fallback: return empty array if no recommendations found
  return []
}

