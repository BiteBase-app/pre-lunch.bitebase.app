import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { CompetitorAnalysisSchema } from "../agents"

// Define the competitor tracker agent's input schema
const CompetitorTrackerInputSchema = z.object({
  query: z.string().min(1, "Query is required"),
  context: z
    .object({
      businessType: z.string().optional(),
      location: z.string().optional(),
      knownCompetitors: z.array(z.string()).optional(),
      competitorData: z.string().optional(),
      additionalContext: z.string().optional(),
      specificQuestions: z.array(z.string()).optional(),
    })
    .optional(),
})

export type CompetitorTrackerInput = z.infer<typeof CompetitorTrackerInputSchema>
export type CompetitorTrackerOutput = z.infer<typeof CompetitorAnalysisSchema>

export class CompetitorTrackerAgent {
  async analyze(input: CompetitorTrackerInput): Promise<CompetitorTrackerOutput> {
    try {
      // Validate input
      CompetitorTrackerInputSchema.parse(input)

      // Generate the competitor analysis
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: this.buildPrompt(input),
        temperature: 0.3,
      })

      // Parse and validate the response
      const jsonResponse = JSON.parse(text)
      return CompetitorAnalysisSchema.parse({
        ...jsonResponse,
        success: true,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("CompetitorTrackerAgent error:", error)
      return {
        success: false,
        message: `Failed to analyze competitors: ${error instanceof Error ? error.message : String(error)}`,
        directCompetitors: [],
        indirectCompetitors: [],
        competitiveAdvantages: [],
        competitiveDisadvantages: [],
        marketPositioning: "Unable to determine market positioning due to an error",
        recommendedStrategies: [],
        timestamp: new Date().toISOString(),
      }
    }
  }

  private buildPrompt(input: CompetitorTrackerInput): string {
    return `
You are the Competitor Tracker Agent for a restaurant business intelligence system. Your job is to analyze competitors and provide strategic insights based on the user's query.

USER QUERY: ${input.query}

BUSINESS CONTEXT:
${this.formatContext(input.context)}

KNOWN COMPETITORS:
${this.formatCompetitors(input.context?.knownCompetitors)}

COMPETITOR DATA:
${input.context?.competitorData || "No detailed competitor data provided."}

SPECIFIC QUESTIONS TO ADDRESS:
${this.formatQuestions(input.context?.specificQuestions)}

Your task is to analyze the competitive landscape and provide insights on:
1. Direct competitors (similar restaurant type/concept)
2. Indirect competitors (different restaurant type but competing for same customers)
3. Competitive advantages and disadvantages
4. Market positioning relative to competitors
5. Recommended competitive strategies

Respond with a JSON object that includes the following fields:
- directCompetitors: Array of objects with "name", "strengths", "weaknesses", "marketShare" (optional), and "priceComparison" fields
- indirectCompetitors: Array of objects with "name", "type", "threatLevel", and "notes" fields
- competitiveAdvantages: Array of strings listing competitive advantages
- competitiveDisadvantages: Array of strings listing competitive disadvantages
- marketPositioning: String describing current market positioning
- recommendedStrategies: Array of strings with recommended competitive strategies

Be data-driven, specific, and actionable in your analysis.
`
  }

  private formatContext(context?: CompetitorTrackerInput["context"]): string {
    if (!context) return "No specific business context provided."

    return `
- Business Type: ${context.businessType || "Not specified"}
- Location: ${context.location || "Not specified"}
- Additional Context: ${context.additionalContext || "None provided"}
`
  }

  private formatCompetitors(competitors?: string[]): string {
    if (!competitors || competitors.length === 0) return "No known competitors provided."
    return competitors.map((c, i) => `${i + 1}. ${c}`).join("\n")
  }

  private formatQuestions(questions?: string[]): string {
    if (!questions || questions.length === 0) return "No specific questions provided."
    return questions.map((q, i) => `${i + 1}. ${q}`).join("\n")
  }
}

