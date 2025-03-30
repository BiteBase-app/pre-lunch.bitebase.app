/**
 * Market Analyst Agent
 *
 * This agent specializes in analyzing market data, trends, and demographics
 * to provide insights about the restaurant's market position and opportunities.
 */

import { BaseAgent, AgentType } from "../agent-architecture"
import { z } from "zod"
import { getRestaurantLocations, getCompetitorLocations, getCustomerDensityData } from "@/lib/motherduck"

// Schema for market analysis
export const MarketAnalysisSchema = z.object({
  marketSize: z.object({
    totalAddressableMarket: z.number(),
    serviceableAvailableMarket: z.number(),
    serviceableObtainableMarket: z.number(),
    unit: z.string(),
  }),
  demographics: z.array(
    z.object({
      segment: z.string(),
      percentage: z.number(),
      spendingPower: z.string(),
      preferences: z.array(z.string()),
    }),
  ),
  competitorAnalysis: z.array(
    z.object({
      name: z.string(),
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
      marketShare: z.number().optional(),
      pricePoint: z.string(),
      uniqueSellingPoints: z.array(z.string()),
    }),
  ),
  opportunities: z.array(z.string()),
  threats: z.array(z.string()),
  recommendations: z.array(z.string()),
})

export class MarketAnalystAgent extends BaseAgent {
  constructor() {
    super(
      AgentType.MARKET_ANALYST,
      "Market Analyst",
      "Analyzes market data, trends, and demographics for restaurant insights",
      [
        "Analyze local market demographics and spending patterns",
        "Identify market opportunities and threats",
        "Evaluate competitor landscape and market positioning",
        "Provide market share analysis and growth potential",
        "Recommend market entry or expansion strategies",
      ],
    )
  }

  async execute<T>(input: any, schema?: z.ZodType<T>): Promise<T> {
    // Get real data from the database if available
    let restaurantData = []
    let competitorData = []
    let densityData = []

    try {
      const restaurantId = input.restaurantId || 1

      // Fetch data in parallel
      ;[restaurantData, competitorData, densityData] = await Promise.all([
        getRestaurantLocations(),
        getCompetitorLocations(restaurantId),
        getCustomerDensityData(restaurantId),
      ])
    } catch (error) {
      console.error("Error fetching market data:", error)
      // Continue with empty data, the agent will use its knowledge
    }

    const systemPrompt = `You are the Market Analyst Agent for BiteBase Intelligence, a restaurant business intelligence platform.
    Your job is to analyze market data and provide insights about restaurant market positioning and opportunities.
    Base your analysis on the provided data if available, and use your knowledge of restaurant industry trends otherwise.`

    const prompt = `Task: ${input.task || "Provide a market analysis"}
    
    Restaurant Data: ${JSON.stringify(restaurantData)}
    Competitor Data: ${JSON.stringify(competitorData)}
    Customer Density Data: ${JSON.stringify(densityData)}
    
    Additional Context: ${JSON.stringify(input.originalInput || {})}
    
    Please provide a comprehensive market analysis based on this information.`

    return this.generateResponse<T>(prompt, systemPrompt, schema as any)
  }
}

