import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { MarketAnalysisSchema } from "../agents"

// Define the market analyst agent's input schema
const MarketAnalystInputSchema = z.object({
  query: z.string().min(1, "Query is required"),
  context: z
    .object({
      businessType: z.string().optional(),
      location: z.string().optional(),
      businessSize: z.string().optional(),
      targetCustomers: z.string().optional(),
      additionalContext: z.string().optional(),
      specificQuestions: z.array(z.string()).optional(),
    })
    .optional(),
})

export type MarketAnalystInput = z.infer<typeof MarketAnalystInputSchema>
export type MarketAnalystOutput = z.infer<typeof MarketAnalysisSchema>

export class MarketAnalystAgent {
  async analyze(input: MarketAnalystInput): Promise<MarketAnalystOutput> {
    try {
      // Validate input
      MarketAnalystInputSchema.parse(input)

      // Generate the market analysis
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: this.buildPrompt(input),
        temperature: 0.3,
      })

      // Parse and validate the response
      const jsonResponse = JSON.parse(text)
      return MarketAnalysisSchema.parse({
        ...jsonResponse,
        success: true,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("MarketAnalystAgent error:", error)
      return {
        success: false,
        message: `Failed to analyze market: ${error instanceof Error ? error.message : String(error)}`,
        marketSize: 0,
        growthRate: 0,
        keyTrends: ["Data unavailable"],
        competitorDensity: 0,
        marketSaturation: 0,
        consumerPreferences: [],
        seasonalFactors: [],
        recommendations: ["Unable to generate recommendations due to an error"],
        timestamp: new Date().toISOString(),
      }
    }
  }

  private buildPrompt(input: MarketAnalystInput): string {
    return `
You are the Market Analyst Agent for a restaurant business intelligence system. Your job is to provide detailed market analysis based on the user's query.

USER QUERY: ${input.query}

BUSINESS CONTEXT:
${this.formatContext(input.context)}

SPECIFIC QUESTIONS TO ADDRESS:
${this.formatQuestions(input.context?.specificQuestions)}

Your task is to analyze the restaurant market relevant to the query and provide insights on:
1. Market size and growth rate
2. Key trends in the restaurant industry
3. Competitor density and market saturation
4. Consumer preferences and behavior
5. Seasonal factors affecting the market
6. Strategic recommendations based on market conditions

Respond with a JSON object that includes the following fields:
- marketSize: A numerical estimate of the market size (in millions of dollars)
- growthRate: Annual growth rate as a decimal (e.g., 0.05 for 5%)
- keyTrends: Array of strings describing important market trends
- competitorDensity: A number from 0-10 indicating competitor density (0=none, 10=extremely saturated)
- marketSaturation: A number from 0-1 indicating market saturation (0=unsaturated, 1=fully saturated)
- consumerPreferences: Array of objects with "preference" and "percentage" fields
- seasonalFactors: Array of objects with "season", "impact", and "opportunityScore" fields
- recommendations: Array of strings with strategic recommendations

Be data-driven, specific, and actionable in your analysis.
`
  }

  private formatContext(context?: MarketAnalystInput["context"]): string {
    if (!context) return "No specific business context provided."

    return `
- Business Type: ${context.businessType || "Not specified"}
- Location: ${context.location || "Not specified"}
- Business Size: ${context.businessSize || "Not specified"}
- Target Customers: ${context.targetCustomers || "Not specified"}
- Additional Context: ${context.additionalContext || "None provided"}
`
  }

  private formatQuestions(questions?: string[]): string {
    if (!questions || questions.length === 0) return "No specific questions provided."
    return questions.map((q, i) => `${i + 1}. ${q}`).join("\n")
  }
}

