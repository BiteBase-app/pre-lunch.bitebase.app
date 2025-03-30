import { NextResponse } from "next/server"
import { AIService } from "@/lib/ai/ai-service"
import { z } from "zod"

const requestSchema = z.object({
  restaurantId: z.number().default(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { restaurantId } = requestSchema.parse(body)

    const report = await AIService.generateBusinessReport(restaurantId)

    return NextResponse.json({ success: true, data: report })
  } catch (error) {
    console.error("Error generating business report:", error)
    return NextResponse.json({ success: false, error: "Failed to generate business report" }, { status: 500 })
  }
}

