/**
 * Financial Advisor Agent
 *
 * This agent specializes in analyzing financial data and providing
 * recommendations for improving profitability and financial performance.
 */

import { BaseAgent, AgentType } from "../agent-architecture"
import { z } from "zod"
import { getSalesData } from "@/lib/db"

// Schema for financial analysis
export const FinancialAnalysisSchema = z.object({
  profitabilityAnalysis: z.object({
    grossProfitMargin: z.number(),
    netProfitMargin: z.number(),
    ebitdaMargin: z.number(),
    returnOnInvestment: z.number(),
    breakEvenAnalysis: z.object({
      breakEvenPoint: z.number(),
      currentOperatingLevel: z.number(),
      safetyMargin: z.number(),
    }),
  }),
  costStructure: z.object({
    foodCost: z.object({
      percentage: z.number(),
      benchmark: z.number(),
      recommendation: z.string(),
    }),
    laborCost: z.object({
      percentage: z.number(),
      benchmark: z.number(),
      recommendation: z.string(),
    }),
    occupancyCost: z.object({
      percentage: z.number(),
      benchmark: z.number(),
      recommendation: z.string(),
    }),
    marketingCost: z.object({
      percentage: z.number(),
      benchmark: z.number(),
      recommendation: z.string(),
    }),
    otherOperatingCosts: z.object({
      percentage: z.number(),
      benchmark: z.number(),
      recommendation: z.string(),
    }),
  }),
  revenueAnalysis: z.object({
    averageCheck: z.number(),
    salesPerSquareFoot: z.number(),
    salesPerSeat: z.number(),
    salesPerLaborHour: z.number(),
    salesTrend: z.string(),
    seasonalityImpact: z.string(),
  }),
  cashFlowAnalysis: z.object({
    operatingCashFlow: z.number(),
    cashConversionCycle: z.number(),
    liquidityRatio: z.number(),
    recommendation: z.string(),
  }),
  investmentOpportunities: z.array(
    z.object({
      area: z.string(),
      estimatedCost: z.number(),
      expectedReturn: z.number(),
      paybackPeriod: z.number(),
      recommendation: z.string(),
    }),
  ),
  financialRecommendations: z.array(z.string()),
})

export class FinancialAdvisorAgent extends BaseAgent {
  constructor() {
    super(
      AgentType.FINANCIAL_ADVISOR,
      "Financial Advisor",
      "Analyzes financial data and provides recommendations for improving profitability",
      [
        "Analyze profit margins and cost structures",
        "Identify cost-saving opportunities",
        "Recommend pricing strategies for profitability",
        "Provide cash flow management advice",
        "Evaluate investment opportunities and ROI",
      ],
    )
  }

  async execute<T>(input: any, schema?: z.ZodType<T>): Promise<T> {
    // Get real sales data if available
    let salesData = []

    try {
      const restaurantId = input.restaurantId || 1
      const days = input.days || 30
      const result = await getSalesData(restaurantId, days)
      salesData = result.data || []
    } catch (error) {
      console.error("Error fetching sales data:", error)
      // Continue with empty data, the agent will use its knowledge
    }

    const systemPrompt = `You are the Financial Advisor Agent for BiteBase Intelligence, a restaurant business intelligence platform.
    Your job is to analyze financial data and provide recommendations for improving profitability and financial performance.
    Base your analysis on the provided sales data if available, and use your knowledge of restaurant financial management otherwise.`

    const prompt = `Task: ${input.task || "Provide financial analysis"}
    
    Sales Data: ${JSON.stringify(salesData)}
    
    Additional Context: ${JSON.stringify(input.originalInput || {})}
    
    Please provide comprehensive financial analysis based on this information.`

    return this.generateResponse<T>(prompt, systemPrompt, schema as any)
  }
}

