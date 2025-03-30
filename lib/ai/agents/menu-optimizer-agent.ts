/**
 * Menu Optimizer Agent
 *
 * This agent specializes in analyzing menu performance and providing
 * recommendations for menu optimization, pricing, and item selection.
 */

import { BaseAgent, AgentType } from "../agent-architecture"
import { z } from "zod"
import { getMenuItems } from "@/lib/db"

// Schema for menu optimization
export const MenuOptimizationSchema = z.object({
  menuAnalysis: z.object({
    topPerformers: z.array(
      z.object({
        itemName: z.string(),
        profitMargin: z.number(),
        popularity: z.number(),
        recommendation: z.string(),
      }),
    ),
    underperformers: z.array(
      z.object({
        itemName: z.string(),
        profitMargin: z.number(),
        popularity: z.number(),
        recommendation: z.string(),
      }),
    ),
    menuBalance: z.object({
      appetizers: z.number(),
      mainCourses: z.number(),
      desserts: z.number(),
      beverages: z.number(),
      balanceScore: z.number(),
      recommendation: z.string(),
    }),
  }),
  pricingRecommendations: z.array(
    z.object({
      itemName: z.string(),
      currentPrice: z.number(),
      recommendedPrice: z.number(),
      justification: z.string(),
    }),
  ),
  newItemSuggestions: z.array(
    z.object({
      itemName: z.string(),
      category: z.string(),
      description: z.string(),
      suggestedPrice: z.number(),
      rationale: z.string(),
    }),
  ),
  seasonalRecommendations: z.array(
    z.object({
      season: z.string(),
      recommendations: z.array(z.string()),
    }),
  ),
  overallRecommendations: z.array(z.string()),
})

export class MenuOptimizerAgent extends BaseAgent {
  constructor() {
    super(
      AgentType.MENU_OPTIMIZER,
      "Menu Optimizer",
      "Analyzes menu performance and provides optimization recommendations",
      [
        "Analyze menu item performance and profitability",
        "Identify menu gaps and opportunities",
        "Recommend optimal pricing strategies",
        "Suggest seasonal menu updates",
        "Provide menu engineering insights",
      ],
    )
  }

  async execute<T>(input: any, schema?: z.ZodType<T>): Promise<T> {
    // Get real menu data if available
    let menuItems = []

    try {
      const restaurantId = input.restaurantId || 1
      const result = await getMenuItems(restaurantId)
      menuItems = result.data || []
    } catch (error) {
      console.error("Error fetching menu data:", error)
      // Continue with empty data, the agent will use its knowledge
    }

    const systemPrompt = `You are the Menu Optimizer Agent for BiteBase Intelligence, a restaurant business intelligence platform.
    Your job is to analyze menu performance and provide recommendations for menu optimization, pricing, and item selection.
    Base your analysis on the provided menu data if available, and use your knowledge of restaurant menu engineering otherwise.`

    const prompt = `Task: ${input.task || "Provide menu optimization recommendations"}
    
    Menu Items: ${JSON.stringify(menuItems)}
    
    Additional Context: ${JSON.stringify(input.originalInput || {})}
    
    Please provide comprehensive menu optimization recommendations based on this information.`

    return this.generateResponse<T>(prompt, systemPrompt, schema as any)
  }
}

