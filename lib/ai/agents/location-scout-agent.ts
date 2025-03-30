/**
 * Location Scout Agent
 *
 * This agent specializes in analyzing location data and providing
 * recommendations for site selection and expansion.
 */

import { BaseAgent, AgentType } from "../agent-architecture"
import { z } from "zod"
import { getRestaurantLocations, getCustomerDensityData, getTrafficFlowData } from "@/lib/motherduck"

// Schema for location analysis
export const LocationAnalysisSchema = z.object({
  currentLocationAnalysis: z.object({
    address: z.string(),
    overallScore: z.number(),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    opportunities: z.array(z.string()),
  }),
  expansionRecommendations: z.array(
    z.object({
      area: z.string(),
      score: z.number(),
      populationDensity: z.number(),
      incomeLevel: z.string(),
      competitorSaturation: z.string(),
      trafficPattern: z.string(),
      estimatedRent: z.string(),
      potentialRevenue: z.string(),
      recommendation: z.string(),
    }),
  ),
  siteSelectionCriteria: z.object({
    demographicFactors: z.array(z.string()),
    economicFactors: z.array(z.string()),
    competitiveFactors: z.array(z.string()),
    accessibilityFactors: z.array(z.string()),
    visibilityFactors: z.array(z.string()),
    costFactors: z.array(z.string()),
  }),
  trafficAnalysis: z.object({
    peakHours: z.array(z.string()),
    weekdayPattern: z.string(),
    weekendPattern: z.string(),
    seasonalVariation: z.string(),
    pedestrianTraffic: z.number(),
    vehicleTraffic: z.number(),
    publicTransitAccess: z.string(),
  }),
  neighborhoodAnalysis: z.object({
    type: z.string(),
    development: z.string(),
    safetyRating: z.number(),
    futureProspects: z.string(),
    complementaryBusinesses: z.array(z.string()),
  }),
  actionableRecommendations: z.array(z.string()),
})

export class LocationScoutAgent extends BaseAgent {
  constructor() {
    super(
      AgentType.LOCATION_SCOUT,
      "Location Scout",
      "Analyzes location data and provides recommendations for site selection",
      [
        "Evaluate current location performance",
        "Identify optimal areas for expansion",
        "Analyze foot and vehicle traffic patterns",
        "Assess demographic fit for target market",
        "Provide site selection criteria and recommendations",
      ],
    )
  }

  async execute<T>(input: any, schema?: z.ZodType<T>): Promise<T> {
    // Get real location data if available
    let restaurantLocations = []
    let densityData = []
    let trafficData = []

    try {
      const restaurantId = input.restaurantId || 1

      // Fetch data in parallel
      ;[restaurantLocations, densityData, trafficData] = await Promise.all([
        getRestaurantLocations(),
        getCustomerDensityData(restaurantId),
        getTrafficFlowData(restaurantId),
      ])
    } catch (error) {
      console.error("Error fetching location data:", error)
      // Continue with empty data, the agent will use its knowledge
    }

    const systemPrompt = `You are the Location Scout Agent for BiteBase Intelligence, a restaurant business intelligence platform.
    Your job is to analyze location data and provide recommendations for site selection and expansion.
    Base your analysis on the provided location data if available, and use your knowledge of restaurant site selection otherwise.`

    const prompt = `Task: ${input.task || "Provide location analysis"}
    
    Restaurant Locations: ${JSON.stringify(restaurantLocations)}
    Customer Density Data: ${JSON.stringify(densityData)}
    Traffic Data: ${JSON.stringify(trafficData)}
    
    Additional Context: ${JSON.stringify(input.originalInput || {})}
    
    Please provide comprehensive location analysis based on this information.`

    return this.generateResponse<T>(prompt, systemPrompt, schema as any)
  }
}

