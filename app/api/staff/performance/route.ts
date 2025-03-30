import { type NextRequest, NextResponse } from "next/server"
import { getStaffPerformance } from "@/lib/db"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const restaurantId = searchParams.get("restaurantId")
  const days = searchParams.get("days") || "30"

  if (!restaurantId) {
    return NextResponse.json({ error: "Restaurant ID is required" }, { status: 400 })
  }

  try {
    const result = await getStaffPerformance(Number(restaurantId), Number(days))

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json(result.data)
  } catch (error) {
    console.error("Error fetching staff performance data:", error)
    return NextResponse.json({ error: "Failed to fetch staff performance data" }, { status: 500 })
  }
}

