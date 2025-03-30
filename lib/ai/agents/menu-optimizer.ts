import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { MenuOptimizationSchema } from "../agents"

// Define the menu optimizer agent's input schema
const MenuOptimizerInputSchema = z.object({
  query: z.string().min(1, "Query is required"),
  context: z
    .object({
      businessType: z.string().optional(),
      currentMenu: z
        .array(
          z.object({
            name: z.string(),
            price: z.number().optional(),
            cost: z.number().optional(),
            popularity: z.number().optional(),
            category: z.string().optional(),
          }),
        )
        .optional(),
      customerDemographics: z.string().optional(),
      competitorMenus: z.string().optional(),
      additionalContext: z.string().optional(),
      specificQuestions: z.array(z.string()).optional(),
    })
    .optional(),
})

export type MenuOptimizerInput = z.infer<typeof MenuOptimizerInputSchema>
export type MenuOptimizerOutput = z.infer<typeof MenuOptimizationSchema>

export class MenuOptimizerAgent {
  async optimize(input: MenuOptimizerInput): Promise<MenuOptimizerOutput> {
    try {
      // Validate input
      MenuOptimizerInputSchema.parse(input)

      // Generate the menu optimization
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: this.buildPrompt(input),
        temperature: 0.3,
      })

      // Parse and validate the response
      const jsonResponse = JSON.parse(text)
      return MenuOptimizationSchema.parse({
        ...jsonResponse,
        success: true,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("MenuOptimizerAgent error:", error)
      return {
        success: false,
        message: `Failed to optimize menu: ${error instanceof Error ? error.message : String(error)}`,
        topPerformingItems: [],
        underperformingItems: [],
        pricingRecommendations: [],
        newItemSuggestions: [],
        menuStructureRecommendations: "Unable to generate recommendations due to an error",
        timestamp: new Date().toISOString(),
      }
    }
  }

  private buildPrompt(input: MenuOptimizerInput): string {
    return `
You are the Menu Optimizer Agent for a restaurant business intelligence system. Your job is to analyze and optimize restaurant menus based on the user's query.

USER QUERY: ${input.query}

BUSINESS CONTEXT:
${this.formatContext(input.context)}

CURRENT MENU:
${this.formatMenu(input.context?.currentMenu)}

SPECIFIC QUESTIONS TO ADDRESS:
${this.formatQuestions(input.context?.specificQuestions)}

Your task is to analyze the menu and provide optimization recommendations:
1. Identify top-performing menu items
2. Identify underperforming items and suggest actions
3. Provide pricing recommendations
4. Suggest new menu items based on trends and customer preferences
5. Recommend menu structure improvements

Respond with a JSON object that includes the following fields:
- topPerformingItems: Array of objects with "name", "profitMargin", and "popularity" fields
- underperformingItems: Array of objects with "name", "profitMargin", "popularity", and "recommendedAction" fields
- pricingRecommendations: Array of objects with "itemName", "currentPrice", "recommendedPrice", and "rationale" fields
- newItemSuggestions: Array of objects with "name", "description", "estimatedPopularity", and "estimatedProfitMargin" fields
- menuStructureRecommendations: String with overall menu structure recommendations

Be data-driven, specific, and actionable in your analysis.
`
  }

  private formatContext(context?: MenuOptimizerInput["context"]): string {
    if (!context) return "No specific business context provided."

    return `
- Business Type: ${context.businessType || "Not specified"}
- Customer Demographics: ${context.customerDemographics || "Not specified"}
- Competitor Menus: ${context.competitorMenus || "Not specified"}
- Additional Context: ${context.additionalContext || "None provided"}
`
  }

  private formatMenu(menu?: MenuOptimizerInput["context"]["currentMenu"]): string {
    if (!menu || menu.length === 0) return "No current menu provided."

    return menu
      .map((item) => {
        return `- ${item.name} | Price: $${item.price || "N/A"} | Cost: $${item.cost || "N/A"} | Popularity: ${item.popularity || "N/A"}/10 | Category: ${item.category || "N/A"}`
      })
      .join("\n")
  }

  private formatQuestions(questions?: string[]): string {
    if (!questions || questions.length === 0) return "No specific questions provided."
    return questions.map((q, i) => `${i + 1}. ${q}`).join("\n")
  }
}

