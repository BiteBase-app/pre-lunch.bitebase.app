import { NextResponse } from "next/server"
import { AIService } from "@/lib/ai/ai-service"
import { z } from "zod"

const requestSchema = z.object({
  area: z.string(),
  restaurantId: z.number().default(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { area, restaurantId } = requestSchema.parse(body)

    const recommendations = await AIService.generateRecommendations(area, restaurantId)

    return NextResponse.json({ success: true, data: recommendations })
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return NextResponse.json({ success: false, error: "Failed to generate recommendations" }, { status: 500 })
  }
}

