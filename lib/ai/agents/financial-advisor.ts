import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { FinancialAnalysisSchema } from "../agents"

// Define the financial advisor agent's input schema
const FinancialAdvisorInputSchema = z.object({
  query: z.string().min(1, "Query is required"),
  context: z
    .object({
      businessType: z.string().optional(),
      financialData: z
        .object({
          revenue: z.number().optional(),
          expenses: z.number().optional(),
          profit: z.number().optional(),
          cashFlow: z.number().optional(),
          costBreakdown: z.record(z.number()).optional(),
        })
        .optional(),
      businessStage: z.string().optional(),
      additionalContext: z.string().optional(),
      specificQuestions: z.array(z.string()).optional(),
    })
    .optional(),
})

export type FinancialAdvisorInput = z.infer<typeof FinancialAdvisorInputSchema>
export type FinancialAdvisorOutput = z.infer<typeof FinancialAnalysisSchema>

export class FinancialAdvisorAgent {
  async analyze(input: FinancialAdvisorInput): Promise<FinancialAdvisorOutput> {
    try {
      // Validate input
      FinancialAdvisorInputSchema.parse(input)

      // Generate the financial analysis
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: this.buildPrompt(input),
        temperature: 0.2,
      })

      // Parse and validate the response
      const jsonResponse = JSON.parse(text)
      return FinancialAnalysisSchema.parse({
        ...jsonResponse,
        success: true,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("FinancialAdvisorAgent error:", error)
      return {
        success: false,
        message: `Failed to analyze finances: ${error instanceof Error ? error.message : String(error)}`,
        profitabilityMetrics: {
          grossProfitMargin: 0,
          netProfitMargin: 0,
          operatingProfitMargin: 0,
          returnOnInvestment: 0,
        },
        cashFlowAnalysis: {
          operatingCashFlow: 0,
          freeCashFlow: 0,
          cashBurnRate: 0,
          cashRunway: 0,
        },
        costBreakdown: [],
        revenueStreams: [],
        financialProjections: [],
        breakEvenAnalysis: {
          breakEvenPoint: 0,
          timeToBreakEven: "Unable to determine",
        },
        financialRecommendations: ["Unable to generate recommendations due to an error"],
        timestamp: new Date().toISOString(),
      }
    }
  }

  private buildPrompt(input: FinancialAdvisorInput): string {
    return `
You are the Financial Advisor Agent for a restaurant business intelligence system. Your job is to analyze financial data and provide strategic insights based on the user's query.

USER QUERY: ${input.query}

BUSINESS CONTEXT:
${this.formatContext(input.context)}

FINANCIAL DATA:
${this.formatFinancialData(input.context?.financialData)}

SPECIFIC QUESTIONS TO ADDRESS:
${this.formatQuestions(input.context?.specificQuestions)}

Your task is to analyze the financial data and provide insights on:
1. Profitability metrics
2. Cash flow analysis
3. Cost breakdown and optimization opportunities
4. Revenue streams and growth potential
5. Financial projections
6. Break-even analysis
7. Financial recommendations

Respond with a JSON object that includes the following fields:
- profitabilityMetrics: Object with "grossProfitMargin", "netProfitMargin", "operatingProfitMargin", and "returnOnInvestment" fields (as decimals)
- cashFlowAnalysis: Object with "operatingCashFlow", "freeCashFlow", "cashBurnRate" (if applicable), and "cashRunway" (if applicable) fields
- costBreakdown: Array of objects with "category", "percentage", and "optimizationPotential" fields
- revenueStreams: Array of objects with "stream", "percentage", and "growthRate" fields
- financialProjections: Array of objects with "period", "revenue", "expenses", and "profit" fields
- breakEvenAnalysis: Object with "breakEvenPoint" and "timeToBreakEven" fields
- financialRecommendations: Array of strings with financial recommendations

Be data-driven, specific, and actionable in your analysis. If exact data is not available, provide reasonable estimates based on industry standards for restaurants.
`
  }

  private formatContext(context?: FinancialAdvisorInput["context"]): string {
    if (!context) return "No specific business context provided."

    return `
- Business Type: ${context.businessType || "Not specified"}
- Business Stage: ${context.businessStage || "Not specified"}
- Additional Context: ${context.additionalContext || "None provided"}
`
  }

  private formatFinancialData(data?: FinancialAdvisorInput["context"]["financialData"]): string {
    if (!data) return "No financial data provided."

    let result = `
- Revenue: ${data.revenue !== undefined ? `$${data.revenue.toLocaleString()}` : "Not provided"}
- Expenses: ${data.expenses !== undefined ? `$${data.expenses.toLocaleString()}` : "Not provided"}
- Profit: ${data.profit !== undefined ? `$${data.profit.toLocaleString()}` : "Not provided"}
- Cash Flow: ${data.cashFlow !== undefined ? `$${data.cashFlow.toLocaleString()}` : "Not provided"}
`

    if (data.costBreakdown && Object.keys(data.costBreakdown).length > 0) {
      result += "\nCost Breakdown:\n"
      for (const [category, amount] of Object.entries(data.costBreakdown)) {
        result += `- ${category}: $${amount.toLocaleString()}\n`
      }
    }

    return result
  }

  private formatQuestions(questions?: string[]): string {
    if (!questions || questions.length === 0) return "No specific questions provided."
    return questions.map((q, i) => `${i + 1}. ${q}`).join("\n")
  }
}

