/**
 * Coordinator Agent
 *
 * This agent is responsible for coordinating tasks between other agents,
 * determining which agent(s) should handle a given task, and combining
 * results from multiple agents when necessary.
 */

import { BaseAgent, AgentType, type Agent } from "../agent-architecture"
import { z } from "zod"

// Schema for agent selection
const AgentSelectionSchema = z.object({
  selectedAgents: z.array(
    z.enum([
      AgentType.MARKET_ANALYST,
      AgentType.MENU_OPTIMIZER,
      AgentType.CUSTOMER_INSIGHTS,
      AgentType.COMPETITOR_TRACKER,
      AgentType.FINANCIAL_ADVISOR,
      AgentType.LOCATION_SCOUT,
      AgentType.TREND_FORECASTER,
    ]),
  ),
  reasoning: z.string(),
  taskBreakdown: z.array(
    z.object({
      agentType: z.enum([
        AgentType.MARKET_ANALYST,
        AgentType.MENU_OPTIMIZER,
        AgentType.CUSTOMER_INSIGHTS,
        AgentType.COMPETITOR_TRACKER,
        AgentType.FINANCIAL_ADVISOR,
        AgentType.LOCATION_SCOUT,
        AgentType.TREND_FORECASTER,
      ]),
      subtask: z.string(),
      priority: z.number().min(1).max(10),
    }),
  ),
})

export class CoordinatorAgent extends BaseAgent {
  constructor() {
    super(
      AgentType.COORDINATOR,
      "Task Coordinator",
      "Coordinates tasks between specialized agents and combines their outputs",
      [
        "Analyze tasks to determine which specialized agents are needed",
        "Break down complex tasks into subtasks for different agents",
        "Prioritize subtasks for efficient processing",
        "Combine outputs from multiple agents into coherent responses",
        "Handle dependencies between agent tasks",
      ],
    )
  }

  async execute<T>(input: any, schema?: z.ZodType<T>): Promise<T> {
    // For direct execution, the coordinator just analyzes the task
    const systemPrompt = `You are the Coordinator Agent for BiteBase Intelligence, a restaurant business intelligence platform. 
    Your job is to analyze tasks and determine which specialized agents should handle them.`

    const prompt = `Analyze the following task and determine which specialized agents should handle it:
    
    Task: ${input.task || input}
    
    Provide your analysis and agent selection.`

    return this.generateResponse<T>(prompt, systemPrompt, schema)
  }

  async coordinateTask(task: string, input: any, agents: Map<AgentType, Agent>): Promise<any> {
    // Step 1: Determine which agents to use
    const agentSelection = await this.execute(
      {
        task,
        input,
      },
      AgentSelectionSchema,
    )

    // Step 2: Execute subtasks in priority order
    const results: Record<string, any> = {}

    // Sort subtasks by priority (highest first)
    const sortedSubtasks = [...agentSelection.taskBreakdown].sort((a, b) => b.priority - a.priority)

    for (const subtask of sortedSubtasks) {
      const agent = agents.get(subtask.agentType)
      if (!agent) {
        throw new Error(`Agent not found: ${subtask.agentType}`)
      }

      // Execute the subtask
      const subtaskResult = await agent.execute({
        task: subtask.subtask,
        originalTask: task,
        originalInput: input,
        previousResults: results, // Pass results from previous subtasks
      })

      // Store the result
      results[subtask.agentType] = subtaskResult
    }

    // Step 3: Combine results
    return this.combineResults(task, results, agentSelection)
  }

  private async combineResults(task: string, results: Record<string, any>, agentSelection: any): Promise<any> {
    // Create a prompt that includes all the results
    const systemPrompt = `You are the Coordinator Agent for BiteBase Intelligence. Your job is to combine results from multiple specialized agents into a coherent response.`

    let resultsText = ""
    for (const [agentType, result] of Object.entries(results)) {
      resultsText += `\n\n${agentType.toUpperCase()} RESULT:\n${JSON.stringify(result, null, 2)}`
    }

    const prompt = `Task: ${task}
    
    The following specialized agents have provided results:
    ${resultsText}
    
    Please combine these results into a coherent response that addresses the original task.`

    // Generate the combined response
    const combinedResponse = await this.generateResponse<string>(prompt, systemPrompt)

    return {
      task,
      agentSelection,
      individualResults: results,
      combinedResponse,
    }
  }
}

