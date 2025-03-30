import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai/ai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, context } = body

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required and must be a string" }, { status: 400 })
    }

    const result = await aiService.processBusinessQuestion(query, context)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing business question:", error)
    return NextResponse.json({ error: "Failed to process business question" }, { status: 500 })
  }
}

