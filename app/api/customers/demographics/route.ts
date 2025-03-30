import { type NextRequest, NextResponse } from "next/server"
import { getCustomerDemographics } from "@/lib/db"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const restaurantId = searchParams.get("restaurantId")

  if (!restaurantId) {
    return NextResponse.json({ error: "Restaurant ID is required" }, { status: 400 })
  }

  try {
    const result = await getCustomerDemographics(Number(restaurantId))

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json(result.data)
  } catch (error) {
    console.error("Error fetching customer demographics:", error)
    return NextResponse.json({ error: "Failed to fetch customer demographics" }, { status: 500 })
  }
}

