import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { TrendForecastSchema } from "../agents"

// Define the trend forecaster agent's input schema
const TrendForecasterInputSchema = z.object({
  query: z.string().min(1, "Query is required"),
  context: z
    .object({
      businessType: z.string().optional(),
      location: z.string().optional(),
      timeframe: z.string().optional(),
      currentTrends: z.array(z.string()).optional(),
      additionalContext: z.string().optional(),
      specificQuestions: z.array(z.string()).optional(),
    })
    .optional(),
})

export type TrendForecasterInput = z.infer<typeof TrendForecasterInputSchema>
export type TrendForecasterOutput = z.infer<typeof TrendForecastSchema>

export class TrendForecasterAgent {
  async forecast(input: TrendForecasterInput): Promise<TrendForecasterOutput> {
    try {
      // Validate input
      TrendForecasterInputSchema.parse(input)

      // Generate the trend forecast
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: this.buildPrompt(input),
        temperature: 0.4,
      })

      // Parse and validate the response
      const jsonResponse = JSON.parse(text)
      return TrendForecastSchema.parse({
        ...jsonResponse,
        success: true,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("TrendForecasterAgent error:", error)
      return {
        success: false,
        message: `Failed to forecast trends: ${error instanceof Error ? error.message : String(error)}`,
        emergingCulinaryTrends: [],
        consumerBehaviorShifts: [],
        technologyTrends: [],
        sustainabilityTrends: [],
        seasonalPredictions: [],
        longTermIndustryOutlook: "Unable to generate outlook due to an error",
        timestamp: new Date().toISOString(),
      }
    }
  }

  private buildPrompt(input: TrendForecasterInput): string {
    return `
You are the Trend Forecaster Agent for a restaurant business intelligence system. Your job is to predict future trends in the restaurant industry based on the user's query.

USER QUERY: ${input.query}

BUSINESS CONTEXT:
${this.formatContext(input.context)}

TIMEFRAME FOR FORECAST:
${input.context?.timeframe || "No specific timeframe provided. Assume short-term (6-12 months) and long-term (2-5 years)."}

CURRENT TRENDS:
${this.formatTrends(input.context?.currentTrends)}

SPECIFIC QUESTIONS TO ADDRESS:
${this.formatQuestions(input.context?.specificQuestions)}

Your task is to forecast future trends and provide insights on:
1. Emerging culinary trends
2. Consumer behavior shifts
3. Technology trends in restaurants
4. Sustainability trends
5. Seasonal predictions
6. Long-term industry outlook

Respond with a JSON object that includes the following fields:
- emergingCulinaryTrends: Array of objects with "trend", "projectedGrowth", "relevanceScore", and "adoptionRecommendation" fields
- consumerBehaviorShifts: Array of objects with "behavior", "impact", and "timeframe" fields
- technologyTrends: Array of objects with "technology", "applicationInRestaurants", "implementationCost", and "potentialROI" fields
- sustainabilityTrends: Array of objects with "trend", "consumerDemand", and "implementationStrategy" fields
- seasonalPredictions: Array of objects with "season", "predictedTrends", and "recommendedFocus" fields
- longTermIndustryOutlook: String with long-term industry outlook

Be data-driven, specific, and actionable in your forecast. Focus on trends that are most relevant to the restaurant industry and the specific business context provided.
`
  }

  private formatContext(context?: TrendForecasterInput["context"]): string {
    if (!context) return "No specific business context provided."

    return `
- Business Type: ${context.businessType || "Not specified"}
- Location: ${context.location || "Not specified"}
- Additional Context: ${context.additionalContext || "None provided"}
`
  }

  private formatTrends(trends?: string[]): string {
    if (!trends || trends.length === 0) return "No current trends provided."
    return trends.map((t, i) => `${i + 1}. ${t}`).join("\n")
  }

  private formatQuestions(questions?: string[]): string {
    if (!questions || questions.length === 0) return "No specific questions provided."
    return questions.map((q, i) => `${i + 1}. ${q}`).join("\n")
  }
}

