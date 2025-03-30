import { CoordinatorAgent, type CoordinatorInput } from "./agents/coordinator"
import { MarketAnalystAgent, type MarketAnalystInput } from "./agents/market-analyst"
import { MenuOptimizerAgent, type MenuOptimizerInput } from "./agents/menu-optimizer"
import { CustomerInsightsAgent, type CustomerInsightsInput } from "./agents/customer-insights"
import { CompetitorTrackerAgent, type CompetitorTrackerInput } from "./agents/competitor-tracker"
import { FinancialAdvisorAgent, type FinancialAdvisorInput } from "./agents/financial-advisor"
import { LocationScoutAgent, type LocationScoutInput } from "./agents/location-scout"
import { TrendForecasterAgent, type TrendForecasterInput } from "./agents/trend-forecaster"

export class AIService {
  private coordinatorAgent: CoordinatorAgent
  private marketAnalystAgent: MarketAnalystAgent
  private menuOptimizerAgent: MenuOptimizerAgent
  private customerInsightsAgent: CustomerInsightsAgent
  private competitorTrackerAgent: CompetitorTrackerAgent
  private financialAdvisorAgent: FinancialAdvisorAgent
  private locationScoutAgent: LocationScoutAgent
  private trendForecasterAgent: TrendForecasterAgent

  constructor() {
    this.coordinatorAgent = new CoordinatorAgent()
    this.marketAnalystAgent = new MarketAnalystAgent()
    this.menuOptimizerAgent = new MenuOptimizerAgent()
    this.customerInsightsAgent = new CustomerInsightsAgent()
    this.competitorTrackerAgent = new CompetitorTrackerAgent()
    this.financialAdvisorAgent = new FinancialAdvisorAgent()
    this.locationScoutAgent = new LocationScoutAgent()
    this.trendForecasterAgent = new TrendForecasterAgent()
  }

  async processBusinessQuestion(query: string, context?: any) {
    try {
      // Step 1: Coordinator agent determines which specialized agents to use
      const coordinatorInput: CoordinatorInput = { query, context }
      const coordinationPlan = await this.coordinatorAgent.process(coordinatorInput)

      // Step 2: Execute the specialized agents in parallel based on priority
      const agentResults = await this.executeAgents(query, coordinationPlan, context)

      // Step 3: Return the combined results
      return {
        success: true,
        mainObjective: coordinationPlan.mainObjective,
        results: agentResults,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Error processing business question:", error)
      return {
        success: false,
        message: `Failed to process business question: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      }
    }
  }

  private async executeAgents(query: string, coordinationPlan: any, context?: any) {
    const agentPromises: Record<string, Promise<any>> = {}
    const results: Record<string, any> = {}

    // Create promises for each agent in the plan
    for (const agent of coordinationPlan.plan) {
      switch (agent.agentType.toLowerCase()) {
        case "marketanalyst":
        case "market analyst":
          const marketInput: MarketAnalystInput = {
            query,
            context: {
              ...context,
              specificQuestions: agent.specificQuestions,
            },
          }
          agentPromises["marketAnalysis"] = this.marketAnalystAgent.analyze(marketInput)
          break

        case "menuoptimizer":
        case "menu optimizer":
          const menuInput: MenuOptimizerInput = {
            query,
            context: {
              ...context,
              specificQuestions: agent.specificQuestions,
            },
          }
          agentPromises["menuOptimization"] = this.menuOptimizerAgent.optimize(menuInput)
          break

        case "customerinsights":
        case "customer insights":
          const customerInput: CustomerInsightsInput = {
            query,
            context: {
              ...context,
              specificQuestions: agent.specificQuestions,
            },
          }
          agentPromises["customerInsights"] = this.customerInsightsAgent.analyze(customerInput)
          break

        case "competitortracker":
        case "competitor tracker":
          const competitorInput: CompetitorTrackerInput = {
            query,
            context: {
              ...context,
              specificQuestions: agent.specificQuestions,
            },
          }
          agentPromises["competitorAnalysis"] = this.competitorTrackerAgent.analyze(competitorInput)
          break

        case "financialadvisor":
        case "financial advisor":
          const financialInput: FinancialAdvisorInput = {
            query,
            context: {
              ...context,
              specificQuestions: agent.specificQuestions,
            },
          }
          agentPromises["financialAnalysis"] = this.financialAdvisorAgent.analyze(financialInput)
          break

        case "locationscout":
        case "location scout":
          const locationInput: LocationScoutInput = {
            query,
            context: {
              ...context,
              specificQuestions: agent.specificQuestions,
            },
          }
          agentPromises["locationAnalysis"] = this.locationScoutAgent.analyze(locationInput)
          break

        case "trendforecaster":
        case "trend forecaster":
          const trendInput: TrendForecasterInput = {
            query,
            context: {
              ...context,
              specificQuestions: agent.specificQuestions,
            },
          }
          agentPromises["trendForecast"] = this.trendForecasterAgent.forecast(trendInput)
          break

        default:
          console.warn(`Unknown agent type: ${agent.agentType}`)
      }
    }

    // Execute all agent promises in parallel
    const agentKeys = Object.keys(agentPromises)
    if (agentKeys.length === 0) {
      return { message: "No suitable agents found for this query" }
    }

    // Wait for all promises to resolve
    const promiseResults = await Promise.allSettled(agentKeys.map((key) => agentPromises[key]))

    // Process results
    agentKeys.forEach((key, index) => {
      const result = promiseResults[index]
      if (result.status === "fulfilled") {
        results[key] = result.value
      } else {
        results[key] = {
          success: false,
          message: `Agent execution failed: ${result.reason}`,
        }
      }
    })

    return results
  }

  // Specialized methods for direct agent access
  async getMarketAnalysis(query: string, context?: any) {
    const input: MarketAnalystInput = { query, context }
    return this.marketAnalystAgent.analyze(input)
  }

  async getMenuOptimization(query: string, context?: any) {
    const input: MenuOptimizerInput = { query, context }
    return this.menuOptimizerAgent.optimize(input)
  }

  async getCustomerInsights(query: string, context?: any) {
    const input: CustomerInsightsInput = { query, context }
    return this.customerInsightsAgent.analyze(input)
  }

  async getCompetitorAnalysis(query: string, context?: any) {
    const input: CompetitorTrackerInput = { query, context }
    return this.competitorTrackerAgent.analyze(input)
  }

  async getFinancialAnalysis(query: string, context?: any) {
    const input: FinancialAdvisorInput = { query, context }
    return this.financialAdvisorAgent.analyze(input)
  }

  async getLocationAnalysis(query: string, context?: any) {
    const input: LocationScoutInput = { query, context }
    return this.locationScoutAgent.analyze(input)
  }

  async getTrendForecast(query: string, context?: any) {
    const input: TrendForecasterInput = { query, context }
    return this.trendForecasterAgent.forecast(input)
  }
}

// Export a singleton instance
export const aiService = new AIService()

