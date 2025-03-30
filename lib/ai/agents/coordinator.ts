import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

// Define the coordinator agent's input schema
const CoordinatorInputSchema = z.object({
  query: z.string().min(1, "Query is required"),
  context: z
    .object({
      businessType: z.string().optional(),
      location: z.string().optional(),
      businessSize: z.string().optional(),
      targetCustomers: z.string().optional(),
      additionalContext: z.string().optional(),
    })
    .optional(),
})

// Define the coordinator agent's output schema
const CoordinatorOutputSchema = z.object({
  plan: z.array(
    z.object({
      agentType: z.string(),
      priority: z.number(),
      rationale: z.string(),
      specificQuestions: z.array(z.string()).optional(),
    }),
  ),
  mainObjective: z.string(),
  additionalContext: z.string().optional(),
})

export type CoordinatorInput = z.infer<typeof CoordinatorInputSchema>
export type CoordinatorOutput = z.infer<typeof CoordinatorOutputSchema>

export class CoordinatorAgent {
  async process(input: CoordinatorInput): Promise<CoordinatorOutput> {
    try {
      // Validate input
      CoordinatorInputSchema.parse(input)

      // Generate the coordination plan
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: this.buildPrompt(input),
        temperature: 0.2,
      })

      // Parse and validate the response
      const jsonResponse = JSON.parse(text)
      return CoordinatorOutputSchema.parse(jsonResponse)
    } catch (error) {
      console.error("CoordinatorAgent error:", error)
      throw new Error(`Failed to process request: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  private buildPrompt(input: CoordinatorInput): string {
    return `
You are the Coordinator Agent for a restaurant business intelligence system. Your job is to analyze the user's query and determine which specialized agents should be involved in generating a comprehensive response.

USER QUERY: ${input.query}

BUSINESS CONTEXT:
${this.formatContext(input.context)}

Your task is to:
1. Understand the main objective of the query
2. Determine which specialized agents should be involved (Market Analyst, Menu Optimizer, Customer Insights, Competitor Tracker, Financial Advisor, Location Scout, Trend Forecaster)
3. Prioritize the agents based on relevance to the query (1 = highest priority)
4. Provide a rationale for each agent's involvement
5. Suggest specific questions or analysis points for each agent

Respond with a JSON object in the following format:
{
  "plan": [
    {
      "agentType": "AgentName",
      "priority": priorityNumber,
      "rationale": "Explanation of why this agent is needed",
      "specificQuestions": ["Question 1", "Question 2"]
    }
  ],
  "mainObjective": "Clear statement of what the user is trying to achieve",
  "additionalContext": "Any additional context or clarification needed"
}

Only include agents that are relevant to the query. Be concise but thorough in your planning.
`
  }

  private formatContext(context?: CoordinatorInput["context"]): string {
    if (!context) return "No specific business context provided."

    return `
- Business Type: ${context.businessType || "Not specified"}
- Location: ${context.location || "Not specified"}
- Business Size: ${context.businessSize || "Not specified"}
- Target Customers: ${context.targetCustomers || "Not specified"}
- Additional Context: ${context.additionalContext || "None provided"}
`
  }
}

