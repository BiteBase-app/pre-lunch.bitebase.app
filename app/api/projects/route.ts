import { NextResponse } from "next/server"
import { z } from "zod"

// Schema for project creation
const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  cuisine: z.string().min(1, "Cuisine type is required"),
  location: z.string().min(1, "Location is required"),
  address: z.string().optional(),
  radius: z.number().min(0.5).max(5),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate request body
    const validatedData = projectSchema.parse(body)

    // In a real application, you would save this to a database
    // For this example, we'll just return a mock response

    return NextResponse.json(
      {
        id: Math.floor(Math.random() * 1000),
        ...validatedData,
        createdAt: new Date().toISOString(),
        status: "processing",
      },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET() {
  // In a real application, you would fetch projects from a database
  // For this example, we'll return mock data

  const projects = [
    {
      id: 1,
      name: "Downtown Italian Restaurant",
      location: "Chicago, IL",
      cuisine: "Italian",
      coordinates: { lat: 41.8819, lng: -87.6278 },
      radius: 1.5,
      createdAt: "2023-06-15",
      lastUpdated: "2023-06-22",
      progress: 85,
    },
    {
      id: 2,
      name: "Uptown Cafe Concept",
      location: "Seattle, WA",
      cuisine: "Cafe",
      coordinates: { lat: 47.6062, lng: -122.3321 },
      radius: 1.2,
      createdAt: "2023-05-20",
      lastUpdated: "2023-06-15",
      progress: 62,
    },
    {
      id: 3,
      name: "Suburban Steakhouse",
      location: "Dallas, TX",
      cuisine: "Steakhouse",
      coordinates: { lat: 32.7767, lng: -96.797 },
      radius: 2.0,
      createdAt: "2023-04-10",
      lastUpdated: "2023-05-30",
      progress: 94,
    },
  ]

  return NextResponse.json(projects)
}

