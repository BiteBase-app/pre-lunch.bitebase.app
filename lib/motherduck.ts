import { createClient } from "@motherduck/client"

// Initialize the MotherDuck client
// You'll need to set MOTHERDUCK_TOKEN as an environment variable
const motherduckClient = createClient({
  token: process.env.MOTHERDUCK_TOKEN,
  // Optional: Set a default database
  database: "restaurant_bi",
})

// Function to execute queries against MotherDuck
export async function queryMotherDuck(query: string, params: any[] = []) {
  try {
    const result = await motherduckClient.query(query, params)
    return { data: result, error: null }
  } catch (error) {
    console.error("MotherDuck query error:", error)
    return { data: null, error }
  }
}

// Function to get geospatial data for restaurants
export async function getRestaurantLocations() {
  const query = `
    SELECT 
      id, 
      name, 
      cuisine_type,
      latitude, 
      longitude,
      city,
      district,
      avg_daily_sales,
      customer_count
    FROM restaurants
    WHERE latitude IS NOT NULL AND longitude IS NOT NULL
  `

  // For testing/demo purposes, return mock data if query fails
  const mockData = [
    {
      id: 1,
      name: "Basil Thai Kitchen",
      cuisine_type: "Thai",
      latitude: 13.7262,
      longitude: 100.523,
      city: "Bangkok",
      district: "Sukhumvit",
      avg_daily_sales: 45000,
      customer_count: 120,
    },
    {
      id: 2,
      name: "Mango Tree",
      cuisine_type: "Thai",
      latitude: 13.731,
      longitude: 100.528,
      city: "Bangkok",
      district: "Sukhumvit",
      avg_daily_sales: 52000,
      customer_count: 145,
    },
    {
      id: 3,
      name: "La Boulange",
      cuisine_type: "French",
      latitude: 13.724,
      longitude: 100.526,
      city: "Bangkok",
      district: "Sukhumvit",
      avg_daily_sales: 38000,
      customer_count: 95,
    },
    {
      id: 4,
      name: "Sushi Delight",
      cuisine_type: "Japanese",
      latitude: 13.722,
      longitude: 100.531,
      city: "Bangkok",
      district: "Sathorn",
      avg_daily_sales: 42000,
      customer_count: 110,
    },
    {
      id: 5,
      name: "Pasta Palace",
      cuisine_type: "Italian",
      latitude: 13.728,
      longitude: 100.535,
      city: "Bangkok",
      district: "Silom",
      avg_daily_sales: 39000,
      customer_count: 105,
    },
    {
      id: 6,
      name: "Burger Joint",
      cuisine_type: "American",
      latitude: 13.732,
      longitude: 100.529,
      city: "Bangkok",
      district: "Thonglor",
      avg_daily_sales: 35000,
      customer_count: 130,
    },
    {
      id: 7,
      name: "Spice Garden",
      cuisine_type: "Indian",
      latitude: 13.725,
      longitude: 100.532,
      city: "Bangkok",
      district: "Asoke",
      avg_daily_sales: 32000,
      customer_count: 85,
    },
    {
      id: 8,
      name: "Dim Sum House",
      cuisine_type: "Chinese",
      latitude: 13.729,
      longitude: 100.527,
      city: "Bangkok",
      district: "Silom",
      avg_daily_sales: 48000,
      customer_count: 140,
    },
  ]

  const result = await queryMotherDuck(query)
  return result.data || mockData
}

// Function to get competitor locations
export async function getCompetitorLocations(restaurantId: number, radius = 2) {
  const query = `
    WITH restaurant AS (
      SELECT latitude, longitude FROM restaurants WHERE id = ?
    )
    SELECT 
      c.competitor_name, 
      c.cuisine_type, 
      c.latitude, 
      c.longitude, 
      c.rating, 
      c.price_level,
      c.market_share
    FROM competitors c, restaurant r
    WHERE ST_Distance(
      ST_Point(r.longitude, r.latitude),
      ST_Point(c.longitude, c.latitude)
    ) <= ?
    ORDER BY ST_Distance(
      ST_Point(r.longitude, r.latitude),
      ST_Point(c.longitude, r.latitude)
    )
  `

  // Mock data for testing/demo
  const mockData = [
    {
      competitor_name: "Thai Orchid",
      cuisine_type: "Thai",
      latitude: 13.7272,
      longitude: 100.524,
      rating: 4.2,
      price_level: 3,
      market_share: 15.0,
    },
    {
      competitor_name: "Spice Market",
      cuisine_type: "Thai",
      latitude: 13.7252,
      longitude: 100.522,
      rating: 4.5,
      price_level: 4,
      market_share: 20.0,
    },
    {
      competitor_name: "Bangkok Kitchen",
      cuisine_type: "Thai",
      latitude: 13.7282,
      longitude: 100.525,
      rating: 3.8,
      price_level: 2,
      market_share: 10.0,
    },
    {
      competitor_name: "Siam Bistro",
      cuisine_type: "Thai",
      latitude: 13.7242,
      longitude: 100.521,
      rating: 4.0,
      price_level: 3,
      market_share: 12.0,
    },
  ]

  const result = await queryMotherDuck(query, [restaurantId, radius])
  return result.data || mockData
}

// Function to get customer density heatmap data
export async function getCustomerDensityData(restaurantId: number) {
  const query = `
    WITH restaurant AS (
      SELECT latitude, longitude FROM restaurants WHERE id = ?
    ),
    grid AS (
      SELECT 
        r.latitude + (i * 0.001) AS lat,
        r.longitude + (j * 0.001) AS lng
      FROM restaurant r
      CROSS JOIN UNNEST(SEQUENCE(0, 20)) AS t(i)
      CROSS JOIN UNNEST(SEQUENCE(0, 20)) AS t(j)
    )
    SELECT 
      g.lat,
      g.lng,
      COUNT(c.id) AS customer_count
    FROM grid g
    LEFT JOIN customer_visits c ON 
      ST_Distance(
        ST_Point(g.lng, g.lat),
        ST_Point(c.longitude, c.latitude)
      ) <= 0.002
    GROUP BY g.lat, g.lng
  `

  // Generate mock heatmap data
  const mockData = []
  const centerLat = 13.7262
  const centerLng = 100.523

  // Create a grid of points around the center
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      const lat = centerLat + (i - 10) * 0.001
      const lng = centerLng + (j - 10) * 0.001

      // Create a density that's higher near the center
      const distFromCenter = Math.sqrt(Math.pow(i - 10, 2) + Math.pow(j - 10, 2))
      let density = Math.max(0, 100 - distFromCenter * 5)

      // Add some randomness
      density += Math.random() * 20 - 10

      mockData.push({
        lat,
        lng,
        customer_count: Math.round(density),
      })
    }
  }

  const result = await queryMotherDuck(query, [restaurantId])
  return result.data || mockData
}

// Function to get traffic flow data
export async function getTrafficFlowData(restaurantId: number) {
  const query = `
    WITH restaurant AS (
      SELECT latitude, longitude FROM restaurants WHERE id = ?
    )
    SELECT 
      hour,
      pedestrian_count,
      vehicle_count
    FROM traffic_data
    WHERE restaurant_id = ?
    ORDER BY hour
  `

  // Mock traffic data by hour
  const mockData = Array.from({ length: 24 }, (_, i) => {
    // Create a pattern with morning and evening rush hours
    let pedestrianFactor = 0
    let vehicleFactor = 0

    if (i >= 7 && i <= 9) {
      // Morning rush
      pedestrianFactor = 0.7 + (i - 7) * 0.15
      vehicleFactor = 0.8 + (i - 7) * 0.1
    } else if (i >= 11 && i <= 14) {
      // Lunch
      pedestrianFactor = 0.8 - Math.abs(i - 12.5) * 0.2
      vehicleFactor = 0.5 - Math.abs(i - 12.5) * 0.1
    } else if (i >= 17 && i <= 19) {
      // Evening rush
      pedestrianFactor = 0.9 - (i - 17) * 0.1
      vehicleFactor = 0.9 - (i - 17) * 0.1
    } else if (i >= 20 && i <= 22) {
      // Dinner
      pedestrianFactor = 0.6 - (i - 20) * 0.2
      vehicleFactor = 0.4 - (i - 20) * 0.1
    } else {
      pedestrianFactor = Math.max(0.1, 0.3 - Math.abs(i - 15) * 0.02)
      vehicleFactor = Math.max(0.1, 0.3 - Math.abs(i - 15) * 0.02)
    }

    // Add some randomness
    pedestrianFactor += Math.random() * 0.1 - 0.05
    vehicleFactor += Math.random() * 0.1 - 0.05

    return {
      hour: i,
      pedestrian_count: Math.round(pedestrianFactor * 1000),
      vehicle_count: Math.round(vehicleFactor * 500),
    }
  })

  const result = await queryMotherDuck(query, [restaurantId, restaurantId])
  return result.data || mockData
}

