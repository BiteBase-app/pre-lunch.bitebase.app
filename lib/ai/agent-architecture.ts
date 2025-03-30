/**
 * BiteBase Intelligence Agent Architecture
 *
 * This file defines the core architecture for the agentic AI system
 * that powers BiteBase Intelligence. The system uses a multi-agent
 * approach where specialized agents handle different aspects of
 * restaurant business intelligence.
 */

import { generateText, generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import type { z } from "zod"

// Agent types
export enum AgentType {
  COORDINATOR = "coordinator",
  MARKET_ANALYST = "market_analyst",
  MENU_OPTIMIZER = "menu_optimizer",
  CUSTOMER_INSIGHTS = "customer_insights",
  COMPETITOR_TRACKER = "competitor_tracker",
  FINANCIAL_ADVISOR = "financial_advisor",
  LOCATION_SCOUT = "location_scout",
  TREND_FORECASTER = "trend_forecaster",
}

// Agent interface
export interface Agent {
  type: AgentType
  name: string
  description: string
  capabilities: string[]
  execute: <T>(input: any, schema?: z.ZodType<T>) => Promise<T>
}

// Base agent class
export abstract class BaseAgent implements Agent {
  type: AgentType
  name: string
  description: string
  capabilities: string[]

  constructor(type: AgentType, name: string, description: string, capabilities: string[]) {
    this.type = type
    this.name = name
    this.description = description
    this.capabilities = capabilities
  }

  async execute<T>(input: any, schema?: z.ZodType<T>): Promise<T> {
    // This will be implemented by specific agent classes
    throw new Error("Method not implemented.")
  }

  protected async generateResponse<T>(prompt: string, systemPrompt: string, schema?: z.ZodType<T>): Promise<T> {
    if (schema) {
      const result = await generateObject({
        model: openai("gpt-4o"),
        prompt,
        system: systemPrompt,
        schema,
      })
      return result.object
    } else {
      const result = await generateText({
        model: openai("gpt-4o"),
        prompt,
        system: systemPrompt,
      })
      return result.text as unknown as T
    }
  }
}

// Import agent implementations
import { CoordinatorAgent } from "./agents/coordinator"
import { MarketAnalystAgent } from "./agents/market-analyst"
import { MenuOptimizerAgent } from "./agents/menu-optimizer"
import { CustomerInsightsAgent } from "./agents/customer-insights"
import { CompetitorTrackerAgent } from "./agents/competitor-tracker"
import { FinancialAdvisorAgent } from "./agents/financial-advisor"
import { LocationScoutAgent } from "./agents/location-scout"
import { TrendForecasterAgent } from "./agents/trend-forecaster"

// Agent factory
export class AgentFactory {
  static createAgent(type: AgentType): Agent {
    switch (type) {
      case AgentType.COORDINATOR:
        return new CoordinatorAgent()
      case AgentType.MARKET_ANALYST:
        return new MarketAnalystAgent()
      case AgentType.MENU_OPTIMIZER:
        return new MenuOptimizerAgent()
      case AgentType.CUSTOMER_INSIGHTS:
        return new CustomerInsightsAgent()
      case AgentType.COMPETITOR_TRACKER:
        return new CompetitorTrackerAgent()
      case AgentType.FINANCIAL_ADVISOR:
        return new FinancialAdvisorAgent()
      case AgentType.LOCATION_SCOUT:
        return new LocationScoutAgent()
      case AgentType.TREND_FORECASTER:
        return new TrendForecasterAgent()
      default:
        throw new Error(`Unknown agent type: ${type}`)
    }
  }
}

// Agent orchestrator
export class AgentOrchestrator {
  private agents: Map<AgentType, Agent> = new Map()

  constructor() {
    // Initialize all agents
    Object.values(AgentType).forEach((type) => {
      this.agents.set(type as AgentType, AgentFactory.createAgent(type as AgentType))
    })
  }

  async executeTask(task: string, input: any, agentType?: AgentType): Promise<any> {
    // If agent type is specified, use that agent
    if (agentType) {
      const agent = this.agents.get(agentType)
      if (!agent) {
        throw new Error(`Agent not found: ${agentType}`)
      }
      return await agent.execute(input)
    }

    // Otherwise, use the coordinator to determine which agent(s) to use
    const coordinator = this.agents.get(AgentType.COORDINATOR) as CoordinatorAgent
    return await coordinator.coordinateTask(task, input, this.agents)
  }

  getAgent(type: AgentType): Agent {
    const agent = this.agents.get(type)
    if (!agent) {
      throw new Error(`Agent not found: ${type}`)
    }
    return agent
  }
}

// Export singleton instance
export const agentOrchestrator = new AgentOrchestrator()

