import { type NextRequest, NextResponse } from "next/server"
import { aiService } from "@/lib/ai/ai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, context } = body

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required and must be a string" }, { status: 400 })
    }

    const result = await aiService.getCompetitorAnalysis(query, context)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error getting competitor analysis:", error)
    return NextResponse.json({ error: "Failed to get competitor analysis" }, { status: 500 })
  }
}

