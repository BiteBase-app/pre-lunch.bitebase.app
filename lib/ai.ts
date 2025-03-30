import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Define the types for our insights
export type InsightData = {
  name: string
  value: number
}

export type InsightResult = {
  title: string
  description: string
  summary: string
  recommendations: string[]
  data: InsightData[] | null
  dataType: "bar" | "line" | "pie" | "text"
}

// Function to generate insights from a user question
export async function generateInsight(question: string, restaurantData: any): Promise<InsightResult> {
  try {
    // Create a context with the restaurant data
    const context = JSON.stringify({
      revenueData: restaurantData.revenueData,
      menuItems: restaurantData.menuItems,
      customerData: restaurantData.customerData,
      orderData: restaurantData.orderData,
      locationData: restaurantData.locationData,
    })

    // Generate the insight using AI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        You are an AI assistant for a restaurant business intelligence platform.
        
        CONTEXT:
        The following is data about the restaurant business:
        ${context}
        
        USER QUESTION:
        ${question}
        
        TASK:
        Analyze the data and provide insights about the restaurant business based on the user's question.
        Return your response as a JSON object with the following structure:
        {
          "title": "A clear title for the insight",
          "description": "A brief description of what this insight shows",
          "summary": "A detailed summary of the findings, including key metrics and trends",
          "recommendations": ["3-5 actionable recommendations based on the data"],
          "data": [{"name": "Category1", "value": 100}, {"name": "Category2", "value": 200}],
          "dataType": "bar" or "line" or "pie" or "text"
        }
        
        If the data doesn't contain information to answer the question, explain what data would be needed.
        Make the recommendations specific, actionable, and relevant to the restaurant business.
      `,
    })

    // Parse the response
    return JSON.parse(text) as InsightResult
  } catch (error) {
    console.error("Error generating insight:", error)

    // Return a fallback response
    return {
      title: "Analysis Error",
      description: "We couldn't generate insights for your question",
      summary:
        "There was an error processing your request. This could be due to insufficient data or an issue with the AI service.",
      recommendations: [
        "Try asking a more specific question",
        "Check if your question relates to available data (sales, customers, menu, locations)",
        "Try again in a few moments",
      ],
      data: null,
      dataType: "text",
    }
  }
}

