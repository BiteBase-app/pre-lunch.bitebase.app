/**
 * Customer Insights Agent
 *
 * This agent specializes in analyzing customer data, reviews, and feedback
 * to provide insights about customer preferences, satisfaction, and loyalty.
 */

import { BaseAgent, AgentType } from "../agent-architecture"
import { z } from "zod"
import { getCustomerDemographics } from "@/lib/db"

// Schema for customer insights
export const CustomerInsightsSchema = z.object({
  customerSegments: z.array(
    z.object({
      segment: z.string(),
      percentage: z.number(),
      characteristics: z.array(z.string()),
      preferences: z.array(z.string()),
      loyaltyLevel: z.string(),
      growthPotential: z.string(),
    }),
  ),
  satisfactionAnalysis: z.object({
    overallScore: z.number(),
    foodQuality: z.number(),
    service: z.number(),
    ambiance: z.number(),
    valueForMoney: z.number(),
    topPositiveThemes: z.array(z.string()),
    topNegativeThemes: z.array(z.string()),
  }),
  loyaltyMetrics: z.object({
    repeatCustomerRate: z.number(),
    customerLifetimeValue: z.number(),
    netPromoterScore: z.number(),
    churnRate: z.number(),
  }),
  reviewAnalysis: z.array(
    z.object({
      platform: z.string(),
      averageRating: z.number(),
      reviewVolume: z.number(),
      sentimentBreakdown: z.object({
        positive: z.number(),
        neutral: z.number(),
        negative: z.number(),
      }),
      commonPraises: z.array(z.string()),
      commonComplaints: z.array(z.string()),
    }),
  ),
  recommendations: z.array(
    z.object({
      area: z.string(),
      recommendation: z.string(),
      expectedImpact: z.string(),
      implementationDifficulty: z.string(),
    }),
  ),
})

export class CustomerInsightsAgent extends BaseAgent {
  constructor() {
    super(
      AgentType.CUSTOMER_INSIGHTS,
      "Customer Insights Specialist",
      "Analyzes customer data, reviews, and feedback for restaurant insights",
      [
        "Analyze customer demographics and segmentation",
        "Evaluate customer satisfaction and loyalty metrics",
        "Identify customer preferences and trends",
        "Analyze review sentiment and themes",
        "Recommend strategies to improve customer experience",
      ],
    )
  }

  async execute<T>(input: any, schema?: z.ZodType<T>): Promise<T> {
    // Get real customer data if available
    let customerData = []

    try {
      const restaurantId = input.restaurantId || 1
      const result = await getCustomerDemographics(restaurantId)
      customerData = result.data || []
    } catch (error) {
      console.error("Error fetching customer data:", error)
      // Continue with empty data, the agent will use its knowledge
    }

    const systemPrompt = `You are the Customer Insights Agent for BiteBase Intelligence, a restaurant business intelligence platform.
    Your job is to analyze customer data, reviews, and feedback to provide insights about customer preferences, satisfaction, and loyalty.
    Base your analysis on the provided customer data if available, and use your knowledge of restaurant customer behavior otherwise.`

    const prompt = `Task: ${input.task || "Provide customer insights"}
    
    Customer Demographics: ${JSON.stringify(customerData)}
    
    Additional Context: ${JSON.stringify(input.originalInput || {})}
    
    Please provide comprehensive customer insights based on this information.`

    return this.generateResponse<T>(prompt, systemPrompt, schema as any)
  }
}

