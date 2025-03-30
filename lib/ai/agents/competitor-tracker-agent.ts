/**
 * Competitor Tracker Agent
 *
 * This agent specializes in monitoring and analyzing competitors to provide
 * insights about competitive positioning, threats, and opportunities.
 */

import { BaseAgent, AgentType } from "../agent-architecture"
import { z } from "zod"
import { getCompetitors } from "@/lib/db"

// Schema for competitor analysis
export const CompetitorAnalysisSchema = z.object({
  competitiveLandscape: z.object({
    directCompetitors: z.array(
      z.object({
        name: z.string(),
        distance: z.number().optional(),
        cuisineType: z.string(),
        pricePoint: z.string(),
        rating: z.number().optional(),
        strengths: z.array(z.string()),
        weaknesses: z.array(z.string()),
        uniqueSellingPoints: z.array(z.string()),
      }),
    ),
    indirectCompetitors: z.array(
      z.object({
        name: z.string(),
        businessType: z.string(),
        threatLevel: z.string(),
        notes: z.string(),
      }),
    ),
    marketShareAnalysis: z.object({
      yourShare: z.number(),
      largestCompetitorShare: z.number(),
      growthOpportunities: z.array(z.string()),
    }),
  }),
  competitiveAdvantages: z.array(
    z.object({
      area: z.string(),
      yourPosition: z.string(),
      competitorPosition: z.string(),
      opportunityToLeverage: z.string(),
    }),
  ),
  competitiveThreats: z.array(
    z.object({
      area: z.string(),
      threatDescription: z.string(),
      impactLevel: z.string(),
      mitigationStrategy: z.string(),
    }),
  ),
  benchmarking: z.object({
    pricing: z.object({
      yourAverage: z.number(),
      competitorAverage: z.number(),
      recommendation: z.string(),
    }),
    menu: z.object({
      uniqueItemPercentage: z.number(),
      menuSizeComparison: z.string(),
      recommendation: z.string(),
    }),
    service: z.object({
      yourRating: z.number(),
      competitorAverage: z.number(),
      recommendation: z.string(),
    }),
    onlinePresence: z.object({
      yourScore: z.number(),
      competitorAverage: z.number(),
      recommendation: z.string(),
    }),
  }),
  actionableRecommendations: z.array(z.string()),
})

export class CompetitorTrackerAgent extends BaseAgent {
  constructor() {
    super(
      AgentType.COMPETITOR_TRACKER,
      "Competitor Tracker",
      "Monitors and analyzes competitors for strategic insights",
      [
        "Track competitor pricing, promotions, and menu changes",
        "Analyze competitor strengths and weaknesses",
        "Identify competitive threats and opportunities",
        "Benchmark your restaurant against competitors",
        "Recommend competitive positioning strategies",
      ],
    )
  }

  async execute<T>(input: any, schema?: z.ZodType<T>): Promise<T> {
    // Get real competitor data if available
    let competitorData = []

    try {
      const restaurantId = input.restaurantId || 1
      const result = await getCompetitors(restaurantId)
      competitorData = result.data || []
    } catch (error) {
      console.error("Error fetching competitor data:", error)
      // Continue with empty data, the agent will use its knowledge
    }

    const systemPrompt = `You are the Competitor Tracker Agent for BiteBase Intelligence, a restaurant business intelligence platform.
    Your job is to monitor and analyze competitors to provide insights about competitive positioning, threats, and opportunities.
    Base your analysis on the provided competitor data if available, and use your knowledge of restaurant competitive analysis otherwise.`

    const prompt = `Task: ${input.task || "Provide competitor analysis"}
    
    Competitor Data: ${JSON.stringify(competitorData)}
    
    Additional Context: ${JSON.stringify(input.originalInput || {})}
    
    Please provide comprehensive competitor analysis based on this information.`

    return this.generateResponse<T>(prompt, systemPrompt, schema as any)
  }
}

