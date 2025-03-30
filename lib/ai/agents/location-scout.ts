import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { LocationAnalysisSchema } from "../agents"

// Define the location scout agent's input schema
const LocationScoutInputSchema = z.object({
  query: z.string().min(1, "Query is required"),
  context: z
    .object({
      businessType: z.string().optional(),
      targetLocation: z.string().optional(),
      locationData: z
        .object({
          footTraffic: z.number().optional(),
          rentCost: z.number().optional(),
          nearbyCompetitors: z.number().optional(),
          demographicInfo: z.string().optional(),
        })
        .optional(),
      additionalContext: z.string().optional(),
      specificQuestions: z.array(z.string()).optional(),
    })
    .optional(),
})

export type LocationScoutInput = z.infer<typeof LocationScoutInputSchema>
export type LocationScoutOutput = z.infer<typeof LocationAnalysisSchema>

export class LocationScoutAgent {
  async analyze(input: LocationScoutInput): Promise<LocationScoutOutput> {
    try {
      // Validate input
      LocationScoutInputSchema.parse(input)

      // Generate the location analysis
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: this.buildPrompt(input),
        temperature: 0.3,
      })

      // Parse and validate the response
      const jsonResponse = JSON.parse(text)
      return LocationAnalysisSchema.parse({
        ...jsonResponse,
        success: true,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("LocationScoutAgent error:", error)
      return {
        success: false,
        message: `Failed to analyze location: ${error instanceof Error ? error.message : String(error)}`,
        locationScore: 0,
        footTrafficAnalysis: {
          averageDaily: 0,
          peakHours: [],
          weekdayVsWeekend: "Data unavailable",
        },
        demographicFit: {
          score: 0,
          notes: "Unable to analyze demographic fit due to an error",
        },
        competitorProximity: {
          directCompetitorsNearby: 0,
          indirectCompetitorsNearby: 0,
          competitiveSaturation: "Unable to determine",
        },
        accessibilityFactors: {
          publicTransport: "Data unavailable",
          parking: "Data unavailable",
          walkability: "Data unavailable",
        },
        rentalCostAnalysis: {
          currentRate: 0,
          marketComparison: "Unable to compare",
          projectedGrowth: "Unable to project",
        },
        locationRisks: ["Unable to identify risks due to an error"],
        locationOpportunities: ["Unable to identify opportunities due to an error"],
        timestamp: new Date().toISOString(),
      }
    }
  }

  private buildPrompt(input: LocationScoutInput): string {
    return `
You are the Location Scout Agent for a restaurant business intelligence system. Your job is to analyze location data and provide strategic insights based on the user's query.

USER QUERY: ${input.query}

BUSINESS CONTEXT:
${this.formatContext(input.context)}

TARGET LOCATION:
${input.context?.targetLocation || "No specific target location provided."}

LOCATION DATA:
${this.formatLocationData(input.context?.locationData)}

SPECIFIC QUESTIONS TO ADDRESS:
${this.formatQuestions(input.context?.specificQuestions)}

Your task is to analyze the location data and provide insights on:
1. Overall location score
2. Foot traffic analysis
3. Demographic fit for the restaurant concept
4. Competitor proximity analysis
5. Accessibility factors
6. Rental cost analysis
7. Location risks and opportunities

Respond with a JSON object that includes the following fields:
- locationScore: A number from 0-10 indicating overall location quality
- footTrafficAnalysis: Object with "averageDaily", "peakHours", and "weekdayVsWeekend" fields
- demographicFit: Object with "score" and "notes" fields
- competitorProximity: Object with "directCompetitorsNearby", "indirectCompetitorsNearby", and "competitiveSaturation" fields
- accessibilityFactors: Object with "publicTransport", "parking", and "walkability" fields
- rentalCostAnalysis: Object with "currentRate", "marketComparison", and "projectedGrowth" fields
- locationRisks: Array of strings listing location risks
- locationOpportunities: Array of strings listing location opportunities

Be data-driven, specific, and actionable in your analysis. If exact data is not available, provide reasonable estimates based on industry standards for restaurants in similar locations.
`
  }

  private formatContext(context?: LocationScoutInput["context"]): string {
    if (!context) return "No specific business context provided."

    return `
- Business Type: ${context.businessType || "Not specified"}
- Additional Context: ${context.additionalContext || "None provided"}
`
  }

  private formatLocationData(data?: LocationScoutInput["context"]["locationData"]): string {
    if (!data) return "No location data provided."

    return `
- Foot Traffic: ${data.footTraffic !== undefined ? `${data.footTraffic.toLocaleString()} people/day` : "Not provided"}
- Rent Cost: ${data.rentCost !== undefined ? `$${data.rentCost.toLocaleString()}/month` : "Not provided"}
- Nearby Competitors: ${data.nearbyCompetitors !== undefined ? data.nearbyCompetitors : "Not provided"}
- Demographic Info: ${data.demographicInfo || "Not provided"}
`
  }

  private formatQuestions(questions?: string[]): string {
    if (!questions || questions.length === 0) return "No specific questions provided."
    return questions.map((q, i) => `${i + 1}. ${q}`).join("\n")
  }
}

