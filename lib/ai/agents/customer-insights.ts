import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { CustomerInsightsSchema } from "../agents"

// Define the customer insights agent's input schema
const CustomerInsightsInputSchema = z.object({
  query: z.string().min(1, "Query is required"),
  context: z
    .object({
      businessType: z.string().optional(),
      location: z.string().optional(),
      customerData: z.string().optional(),
      feedbackSummary: z.string().optional(),
      additionalContext: z.string().optional(),
      specificQuestions: z.array(z.string()).optional(),
    })
    .optional(),
})

export type CustomerInsightsInput = z.infer<typeof CustomerInsightsInputSchema>
export type CustomerInsightsOutput = z.infer<typeof CustomerInsightsSchema>

export class CustomerInsightsAgent {
  async analyze(input: CustomerInsightsInput): Promise<CustomerInsightsOutput> {
    try {
      // Validate input
      CustomerInsightsInputSchema.parse(input)

      // Generate the customer insights
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: this.buildPrompt(input),
        temperature: 0.3,
      })

      // Parse and validate the response
      const jsonResponse = JSON.parse(text)
      return CustomerInsightsSchema.parse({
        ...jsonResponse,
        success: true,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("CustomerInsightsAgent error:", error)
      return {
        success: false,
        message: `Failed to analyze customer insights: ${error instanceof Error ? error.message : String(error)}`,
        demographicBreakdown: [],
        customerSentiment: {
          overall: 0,
          food: 0,
          service: 0,
          ambiance: 0,
          value: 0,
        },
        loyaltyMetrics: {
          repeatCustomerRate: 0,
          averageVisitsPerMonth: 0,
          customerLifetimeValue: 0,
        },
        feedbackThemes: [],
        customerJourneyInsights: "Unable to generate insights due to an error",
        timestamp: new Date().toISOString(),
      }
    }
  }

  private buildPrompt(input: CustomerInsightsInput): string {
    return `
You are the Customer Insights Agent for a restaurant business intelligence system. Your job is to analyze customer data and provide actionable insights based on the user's query.

USER QUERY: ${input.query}

BUSINESS CONTEXT:
${this.formatContext(input.context)}

CUSTOMER DATA SUMMARY:
${input.context?.customerData || "No customer data provided."}

FEEDBACK SUMMARY:
${input.context?.feedbackSummary || "No feedback summary provided."}

SPECIFIC QUESTIONS TO ADDRESS:
${this.formatQuestions(input.context?.specificQuestions)}

Your task is to analyze the customer data and provide insights on:
1. Demographic breakdown of customers
2. Customer sentiment analysis
3. Loyalty metrics
4. Common feedback themes
5. Customer journey insights

Respond with a JSON object that includes the following fields:
- demographicBreakdown: Array of objects with "segment", "percentage", and "spendingHabits" fields
- customerSentiment: Object with "overall", "food", "service", "ambiance", and "value" fields (0-10 scale)
- loyaltyMetrics: Object with "repeatCustomerRate", "averageVisitsPerMonth", and "customerLifetimeValue" fields
- feedbackThemes: Array of objects with "theme", "frequency", and "sentiment" fields
- customerJourneyInsights: String with insights about the customer journey

Be data-driven, specific, and actionable in your analysis.
`
  }

  private formatContext(context?: CustomerInsightsInput["context"]): string {
    if (!context) return "No specific business context provided."

    return `
- Business Type: ${context.businessType || "Not specified"}
- Location: ${context.location || "Not specified"}
- Additional Context: ${context.additionalContext || "None provided"}
`
  }

  private formatQuestions(questions?: string[]): string {
    if (!questions || questions.length === 0) return "No specific questions provided."
    return questions.map((q, i) => `${i + 1}. ${q}`).join("\n")
  }
}

