import { NextResponse } from "next/server"

interface ProjectParams {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: ProjectParams) {
  const id = params.id

  // In a real application, you would fetch the project from a database
  // For this example, we'll return mock data

  // Check if the project exists
  if (id === "1" || id === "2" || id === "3") {
    const projectData = {
      id: id,
      name: id === "1" ? "Downtown Italian Restaurant" : id === "2" ? "Uptown Cafe Concept" : "Suburban Steakhouse",
      location: id === "1" ? "Chicago, IL" : id === "2" ? "Seattle, WA" : "Dallas, TX",
      address:
        id === "1"
          ? "123 W Madison St, Chicago, IL 60602"
          : id === "2"
            ? "456 Pine St, Seattle, WA 98101"
            : "789 Main St, Dallas, TX 75201",
      cuisine: id === "1" ? "Italian" : id === "2" ? "Cafe" : "Steakhouse",
      coordinates:
        id === "1"
          ? { lat: 41.8819, lng: -87.6278 }
          : id === "2"
            ? { lat: 47.6062, lng: -122.3321 }
            : { lat: 32.7767, lng: -96.797 },
      radius: id === "1" ? 1.5 : id === "2" ? 1.2 : 2.0,
      createdAt: id === "1" ? "2023-06-15" : id === "2" ? "2023-05-20" : "2023-04-10",
      lastUpdated: id === "1" ? "2023-06-22" : id === "2" ? "2023-06-15" : "2023-05-30",
      progress: id === "1" ? 85 : id === "2" ? 62 : 94,
      analysis: {
        demographics: {
          totalPopulation: id === "1" ? 12450 : id === "2" ? 9870 : 7650,
          ageGroups: [
            { age: "18-24", percentage: id === "1" ? 15 : id === "2" ? 22 : 10 },
            { age: "25-34", percentage: id === "1" ? 35 : id === "2" ? 40 : 25 },
            { age: "35-44", percentage: id === "1" ? 25 : id === "2" ? 18 : 30 },
            { age: "45-54", percentage: id === "1" ? 15 : id === "2" ? 12 : 20 },
            { age: "55+", percentage: id === "1" ? 10 : id === "2" ? 8 : 15 },
          ],
          incomeLevel: id === "1" ? "High" : id === "2" ? "Medium-High" : "Medium",
          educationLevel: id === "1" ? "College+" : id === "2" ? "College+" : "Some College",
        },
        competitors:
          id === "1"
            ? [
                { name: "Bella Vita", distance: 0.3, cuisine: "Italian", rating: 4.2 },
                { name: "Pasta Palace", distance: 0.7, cuisine: "Italian", rating: 3.8 },
                { name: "Milano Bistro", distance: 1.2, cuisine: "Italian", rating: 4.5 },
                { name: "Trattoria Roma", distance: 1.4, cuisine: "Italian", rating: 4.0 },
              ]
            : id === "2"
              ? [
                  { name: "Urban Grind", distance: 0.2, cuisine: "Cafe", rating: 4.3 },
                  { name: "Bean Scene", distance: 0.5, cuisine: "Cafe", rating: 4.1 },
                  { name: "Coffee Culture", distance: 0.9, cuisine: "Cafe", rating: 3.9 },
                ]
              : [
                  { name: "Prime Cut", distance: 0.8, cuisine: "Steakhouse", rating: 4.4 },
                  { name: "Grill Master", distance: 1.3, cuisine: "Steakhouse", rating: 4.2 },
                  { name: "Beef & Bourbon", distance: 1.7, cuisine: "Steakhouse", rating: 4.6 },
                ],
        traffic: {
          footTraffic: id === "1" ? 1850 : id === "2" ? 1450 : 950,
          vehicleTraffic: id === "1" ? 12500 : id === "2" ? 9800 : 15600,
          peakHours: id === "1" ? ["12pm-2pm", "6pm-8pm"] : id === "2" ? ["7am-9am", "3pm-5pm"] : ["6pm-9pm"],
        },
        realEstate: {
          averageRent: id === "1" ? 42 : id === "2" ? 38 : 32,
          vacancyRate: id === "1" ? 4.2 : id === "2" ? 5.8 : 3.5,
          leaseTerms: id === "1" ? 3.5 : id === "2" ? 2.5 : 4.0,
        },
      },
    }

    return NextResponse.json(projectData)
  }

  // Return 404 if project not found
  return NextResponse.json({ error: "Project not found" }, { status: 404 })
}

export async function PUT(request: Request, { params }: ProjectParams) {
  const id = params.id

  try {
    const body = await request.json()

    // In a real application, you would update the project in a database
    // For this example, we'll just return a mock response

    return NextResponse.json({
      id,
      ...body,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: ProjectParams) {
  const id = params.id

  // In a real application, you would delete the project from a database
  // For this example, we'll just return a success response

  return NextResponse.json({ success: true })
}

