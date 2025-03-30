import { neon } from "@neondatabase/serverless"

// Create a SQL client with the Neon connection
export const sql = neon(process.env.DATABASE_URL!)

// Global flag to track database initialization status
let isDatabaseInitialized = false

// Check if database is initialized
export async function checkDatabaseInitialized() {
  try {
    const result = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'restaurants'
      );
    `
    return result[0]?.exists || false
  } catch (error) {
    console.error("Error checking database initialization:", error)
    return false
  }
}

// Initialize the database flag
async function initializeDatabaseFlag() {
  try {
    isDatabaseInitialized = await checkDatabaseInitialized()
    console.log(`Database initialization check: ${isDatabaseInitialized ? "Tables exist" : "Tables do not exist"}`)
    return isDatabaseInitialized
  } catch (error) {
    console.error("Error during database initialization check:", error)
    isDatabaseInitialized = false
    return false
  }
}

// Call this immediately to set the flag
initializeDatabaseFlag()

// Helper function for raw SQL queries with fallback data
export async function executeQuery(query: string, params: any[] = [], fallbackData: any = []) {
  // If database is not initialized, return fallback data immediately without attempting query
  if (!isDatabaseInitialized) {
    console.log("Database not initialized, returning mock data")
    return { data: fallbackData, error: null }
  }

  try {
    const result = await sql(query, params)
    return { data: result, error: null }
  } catch (error: any) {
    console.error("Database query error:", error)

    // If the error is about a missing relation/table, return fallback data
    if (
      error.message &&
      (error.message.includes("does not exist") ||
        error.message.includes("relation") ||
        error.message.includes("undefined_table"))
    ) {
      console.log("Table does not exist, returning fallback data")
      return { data: fallbackData, error: null }
    }

    return { data: fallbackData, error: error }
  }
}

// Mock data functions - these will be used when database tables don't exist
// =========================================================================

// Mock restaurant data
function getMockRestaurants() {
  return [
    {
      id: 1,
      name: "Basil Thai Kitchen",
      cuisine_type: "Thai",
      concept: "Upscale Thai Dining",
      address: "123 Sukhumvit Soi 10",
      district: "Sukhumvit",
      city: "Bangkok",
      country: "Thailand",
      postal_code: "10110",
      status: "Active",
      seating_capacity: 80,
      has_outdoor_seating: true,
      has_parking: true,
      has_delivery: true,
      has_takeout: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Mango Tree",
      cuisine_type: "Thai",
      concept: "Contemporary Thai",
      address: "456 Sukhumvit Soi 24",
      district: "Sukhumvit",
      city: "Bangkok",
      country: "Thailand",
      postal_code: "10110",
      status: "Active",
      seating_capacity: 120,
      has_outdoor_seating: true,
      has_parking: true,
      has_delivery: true,
      has_takeout: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      name: "La Boulange",
      cuisine_type: "French",
      concept: "Artisan Bakery & Cafe",
      address: "789 Sukhumvit Soi 31",
      district: "Sukhumvit",
      city: "Bangkok",
      country: "Thailand",
      postal_code: "10110",
      status: "Active",
      seating_capacity: 40,
      has_outdoor_seating: true,
      has_parking: false,
      has_delivery: true,
      has_takeout: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]
}

// Mock dashboard stats
function getMockDashboardStats() {
  return {
    active_restaurants: 3,
    active_projects: 5,
    active_campaigns: 8,
    avg_daily_sales: 5000,
  }
}

// Mock sales data
function getMockSalesData(days = 30) {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (days - i - 1))

    // Generate random sales data
    const total_sales = 30000 + Math.floor(Math.random() * 20000)
    const food_sales = total_sales * 0.7
    const beverage_sales = total_sales * 0.2
    const dessert_sales = total_sales * 0.1
    const customer_count = Math.floor(total_sales / 350)

    return {
      date: date.toISOString().split("T")[0],
      total_sales,
      food_sales,
      beverage_sales,
      dessert_sales,
      customer_count,
      average_check: total_sales / customer_count,
    }
  })
}

// Mock hourly sales data
function getMockHourlySalesData() {
  return Array.from({ length: 24 }, (_, i) => {
    // Generate a bell curve pattern with peak at lunch and dinner times
    let salesFactor = 0
    if (i >= 11 && i <= 14) {
      // Lunch peak
      salesFactor = 0.8 - Math.abs(i - 12.5) * 0.4
    } else if (i >= 17 && i <= 22) {
      // Dinner peak
      salesFactor = 1 - Math.abs(i - 19.5) * 0.3
    } else if (i >= 6 && i <= 10) {
      // Breakfast
      salesFactor = 0.4 - Math.abs(i - 8) * 0.1
    } else {
      salesFactor = 0.1
    }

    const sales = Math.floor(5000 * salesFactor)
    const customer_count = Math.floor(sales / 350)

    return {
      hour: i,
      sales,
      customer_count,
    }
  })
}

// Mock customer demographics
function getMockCustomerDemographics() {
  return [
    { age_group: "18-24", percentage: 15, income_level: "Medium" },
    { age_group: "25-34", percentage: 35, income_level: "Medium-High" },
    { age_group: "35-44", percentage: 25, income_level: "High" },
    { age_group: "45-54", percentage: 15, income_level: "High" },
    { age_group: "55+", percentage: 10, income_level: "High" },
  ]
}

// Mock competitors data
function getMockCompetitors() {
  return [
    {
      competitor_name: "Thai Orchid",
      cuisine_type: "Thai",
      distance_km: 0.5,
      price_level: 3,
      rating: 4.2,
      market_share: 15.0,
      strengths: "Lower prices, larger portions",
      weaknesses: "Less authentic, touristy",
    },
    {
      competitor_name: "Spice Market",
      cuisine_type: "Thai",
      distance_km: 0.8,
      price_level: 4,
      rating: 4.5,
      market_share: 20.0,
      strengths: "More upscale, better ambiance",
      weaknesses: "Higher prices, smaller portions",
    },
    {
      competitor_name: "Bangkok Kitchen",
      cuisine_type: "Thai",
      distance_km: 1.2,
      price_level: 2,
      rating: 3.8,
      market_share: 10.0,
      strengths: "More affordable, faster service",
      weaknesses: "Lower quality ingredients, less refined dishes",
    },
  ]
}

// Mock menu items
function getMockMenuItems() {
  return [
    {
      id: 1,
      name: "Spring Rolls",
      description: "Fresh vegetables wrapped in rice paper",
      price: 120.0,
      cost: 40.0,
      is_vegetarian: true,
      is_vegan: true,
      is_gluten_free: true,
      is_signature: false,
      is_seasonal: false,
      popularity_score: 85,
      category: "Appetizers",
    },
    {
      id: 2,
      name: "Tom Yum Goong",
      description: "Spicy shrimp soup with lemongrass",
      price: 180.0,
      cost: 70.0,
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: true,
      is_signature: true,
      is_seasonal: false,
      popularity_score: 95,
      category: "Appetizers",
    },
    {
      id: 3,
      name: "Pad Thai",
      description: "Stir-fried rice noodles with shrimp",
      price: 220.0,
      cost: 80.0,
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: true,
      is_signature: true,
      is_seasonal: false,
      popularity_score: 90,
      category: "Main Courses",
    },
    {
      id: 4,
      name: "Green Curry",
      description: "Chicken in coconut milk curry",
      price: 240.0,
      cost: 90.0,
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: true,
      is_signature: false,
      is_seasonal: false,
      popularity_score: 85,
      category: "Main Courses",
    },
    {
      id: 5,
      name: "Mango Sticky Rice",
      description: "Sweet sticky rice with fresh mango",
      price: 150.0,
      cost: 50.0,
      is_vegetarian: true,
      is_vegan: true,
      is_gluten_free: true,
      is_signature: false,
      is_seasonal: true,
      popularity_score: 90,
      category: "Desserts",
    },
  ]
}

// Mock staff performance
function getMockStaffPerformance() {
  return [
    {
      id: 1,
      name: "John Smith",
      position: "Server",
      avg_sales: 1416.67,
      total_sales: 42500,
      avg_orders: 28.33,
      total_orders: 850,
      avg_tips: 226.67,
      total_tips: 6800,
      avg_rating: 4.8,
    },
    {
      id: 2,
      name: "Maria Garcia",
      position: "Server",
      avg_sales: 1266.67,
      total_sales: 38000,
      avg_orders: 25.33,
      total_orders: 760,
      avg_tips: 203.33,
      total_tips: 6100,
      avg_rating: 4.7,
    },
    {
      id: 3,
      name: "David Chen",
      position: "Bartender",
      avg_sales: 1733.33,
      total_sales: 52000,
      avg_orders: 43.33,
      total_orders: 1300,
      avg_tips: 260.0,
      total_tips: 7800,
      avg_rating: 4.6,
    },
    {
      id: 4,
      name: "Sarah Johnson",
      position: "Server",
      avg_sales: 1066.67,
      total_sales: 32000,
      avg_orders: 21.33,
      total_orders: 640,
      avg_tips: 160.0,
      total_tips: 4800,
      avg_rating: 4.3,
    },
    {
      id: 5,
      name: "Michael Brown",
      position: "Host",
      avg_sales: 0,
      total_sales: 0,
      avg_orders: 0,
      total_orders: 0,
      avg_tips: 106.67,
      total_tips: 3200,
      avg_rating: 4.5,
    },
  ]
}

// Mock inventory items
function getMockInventoryItems() {
  return [
    {
      id: 1,
      name: "Flour",
      category: "Dry Goods",
      stock_quantity: 45,
      unit: "kg",
      reorder_point: 20,
      cost_per_unit: 1.2,
      supplier: "Global Foods",
      status: "In Stock",
    },
    {
      id: 2,
      name: "Sugar",
      category: "Dry Goods",
      stock_quantity: 30,
      unit: "kg",
      reorder_point: 15,
      cost_per_unit: 0.8,
      supplier: "Sweet Supplies",
      status: "In Stock",
    },
    {
      id: 3,
      name: "Olive Oil",
      category: "Oils",
      stock_quantity: 12,
      unit: "L",
      reorder_point: 10,
      cost_per_unit: 8.5,
      supplier: "Mediterranean Imports",
      status: "In Stock",
    },
    {
      id: 4,
      name: "Tomatoes",
      category: "Produce",
      stock_quantity: 8,
      unit: "kg",
      reorder_point: 10,
      cost_per_unit: 2.5,
      supplier: "Local Farms",
      status: "Low Stock",
    },
    {
      id: 5,
      name: "Chicken Breast",
      category: "Meat",
      stock_quantity: 15,
      unit: "kg",
      reorder_point: 12,
      cost_per_unit: 7.2,
      supplier: "Premium Meats",
      status: "In Stock",
    },
    {
      id: 6,
      name: "Parmesan Cheese",
      category: "Dairy",
      stock_quantity: 5,
      unit: "kg",
      reorder_point: 8,
      cost_per_unit: 12.5,
      supplier: "Cheese Imports",
      status: "Low Stock",
    },
    {
      id: 7,
      name: "Basil",
      category: "Herbs",
      stock_quantity: 0,
      unit: "bunch",
      reorder_point: 5,
      cost_per_unit: 1.8,
      supplier: "Local Farms",
      status: "Out of Stock",
    },
  ]
}

// Mock projects
function getMockProjects() {
  return [
    {
      id: 1,
      name: "Downtown Thai Restaurant",
      location: "Silom",
      cuisine_type: "Thai",
      concept: "Upscale Thai Dining",
      address: "123 Silom Road, Bangkok",
      latitude: 13.7262,
      longitude: 100.523,
      radius: 1.5,
      status: "In Progress",
      progress: 85,
      created_at: "2023-01-15T00:00:00Z",
      updated_at: "2023-03-20T00:00:00Z",
    },
    {
      id: 2,
      name: "Thonglor Cafe Concept",
      location: "Thonglor",
      cuisine_type: "Cafe",
      concept: "Specialty Coffee & Brunch",
      address: "456 Thonglor Soi 10, Bangkok",
      latitude: 13.731,
      longitude: 100.578,
      radius: 1.2,
      status: "In Progress",
      progress: 62,
      created_at: "2023-02-10T00:00:00Z",
      updated_at: "2023-03-15T00:00:00Z",
    },
    {
      id: 3,
      name: "Sathorn Italian Bistro",
      location: "Sathorn",
      cuisine_type: "Italian",
      concept: "Casual Italian Dining",
      address: "789 Sathorn Soi 8, Bangkok",
      latitude: 13.72,
      longitude: 100.532,
      radius: 2.0,
      status: "Completed",
      progress: 100,
      created_at: "2022-11-05T00:00:00Z",
      updated_at: "2023-02-28T00:00:00Z",
    },
    {
      id: 4,
      name: "Asoke Japanese Izakaya",
      location: "Asoke",
      cuisine_type: "Japanese",
      concept: "Modern Izakaya",
      address: "101 Sukhumvit Soi 21, Bangkok",
      latitude: 13.738,
      longitude: 100.565,
      radius: 1.0,
      status: "Planning",
      progress: 25,
      created_at: "2023-03-01T00:00:00Z",
      updated_at: "2023-03-10T00:00:00Z",
    },
  ]
}

// Mock marketing campaigns
function getMockMarketingCampaigns() {
  return [
    {
      id: 1,
      name: "Summer Special",
      type: "Social Media",
      start_date: "2023-04-01",
      end_date: "2023-05-31",
      budget: 50000.0,
      roi: 3.5,
      description: "Instagram and Facebook campaign promoting summer specials",
    },
    {
      id: 2,
      name: "Lunch Deal Promotion",
      type: "Email",
      start_date: "2023-02-01",
      end_date: "2023-02-28",
      budget: 20000.0,
      roi: 4.2,
      description: "Email campaign to regular customers offering lunch deals",
    },
    {
      id: 3,
      name: "Anniversary Celebration",
      type: "Event",
      start_date: "2023-05-15",
      end_date: "2023-05-15",
      budget: 100000.0,
      roi: 2.8,
      description: "Special event celebrating restaurant anniversary",
    },
    {
      id: 4,
      name: "New Menu Launch",
      type: "Social Media",
      start_date: "2023-06-01",
      end_date: "2023-06-30",
      budget: 40000.0,
      roi: 3.8,
      description: "Campaign to promote new seasonal menu items",
    },
  ]
}

// Mock online presence
function getMockOnlinePresence() {
  return [
    {
      platform: "Google",
      rating: 4.5,
      review_count: 120,
      follower_count: null,
      engagement_rate: null,
    },
    {
      platform: "TripAdvisor",
      rating: 4.3,
      review_count: 85,
      follower_count: null,
      engagement_rate: null,
    },
    {
      platform: "Facebook",
      rating: 4.6,
      review_count: 65,
      follower_count: 2500,
      engagement_rate: 3.5,
    },
    {
      platform: "Instagram",
      rating: null,
      review_count: null,
      follower_count: 3500,
      engagement_rate: 4.2,
    },
  ]
}

// Database API functions
// =====================

// Restaurant data fetching functions
export async function getRestaurants(limit = 100, offset = 0) {
  // If database is not initialized, return mock data directly
  if (!isDatabaseInitialized) {
    return { data: getMockRestaurants(), error: null }
  }

  const query = `
    SELECT * FROM restaurants
    ORDER BY name
    LIMIT $1 OFFSET $2
  `
  return executeQuery(query, [limit, offset], getMockRestaurants())
}

export async function getRestaurantById(id: number) {
  const mockRestaurants = getMockRestaurants()
  const fallbackData = mockRestaurants.find((r) => r.id === id) || mockRestaurants[0]

  // If database is not initialized, return mock data directly
  if (!isDatabaseInitialized) {
    return fallbackData
  }

  const query = `
    SELECT * FROM restaurants
    WHERE id = $1
  `
  const result = await executeQuery(query, [id], [fallbackData])
  return result.data?.[0] || fallbackData
}

// Dashboard data fetching functions
export async function getDashboardStats() {
  // If database is not initialized, return mock data directly
  if (!isDatabaseInitialized) {
    return getMockDashboardStats()
  }

  const query = `
    SELECT 
      (SELECT COUNT(*) FROM restaurants WHERE status = 'Active') as active_restaurants,
      (SELECT COUNT(*) FROM projects) as active_projects,
      (SELECT COUNT(*) FROM marketing_campaigns WHERE end_date >= CURRENT_DATE) as active_campaigns,
      (SELECT AVG(total_sales) FROM sales WHERE date >= CURRENT_DATE - INTERVAL '30 days') as avg_daily_sales
  `
  const result = await executeQuery(query, [], [getMockDashboardStats()])
  return result.data?.[0] || getMockDashboardStats()
}

// Sales data fetching functions
export async function getSalesData(restaurantId: number, days = 30) {
  // If database is not initialized, return mock data directly
  if (!isDatabaseInitialized) {
    return { data: getMockSalesData(days), error: null }
  }

  const query = `
    SELECT 
      date, 
      total_sales, 
      food_sales, 
      beverage_sales, 
      dessert_sales, 
      customer_count, 
      average_check
    FROM sales
    WHERE restaurant_id = $1
    AND date >= CURRENT_DATE - INTERVAL '${days} days'
    ORDER BY date
  `
  return executeQuery(query, [restaurantId], getMockSalesData(days))
}

// Hourly sales data for peak hours analysis
export async function getHourlySalesData(restaurantId: number, date: string) {
  // If database is not initialized, return mock data directly
  if (!isDatabaseInitialized) {
    return { data: getMockHourlySalesData(), error: null }
  }

  const query = `
    SELECT 
      hour, 
      sales, 
      customer_count
    FROM hourly_sales
    WHERE restaurant_id = $1
    AND date = $2
    ORDER BY hour
  `
  return executeQuery(query, [restaurantId, date], getMockHourlySalesData())
}

// Customer demographics data
export async function getCustomerDemographics(restaurantId: number) {
  // If database is not initialized, return mock data directly
  if (!isDatabaseInitialized) {
    return { data: getMockCustomerDemographics(), error: null }
  }

  const query = `
    SELECT 
      age_group, 
      percentage, 
      income_level
    FROM demographics
    WHERE restaurant_id = $1
    ORDER BY 
      CASE 
        WHEN age_group = '18-24' THEN 1
        WHEN age_group = '25-34' THEN 2
        WHEN age_group = '35-44' THEN 3
        WHEN age_group = '45-54' THEN 4
        WHEN age_group = '55+' THEN 5
      END
  `
  return executeQuery(query, [restaurantId], getMockCustomerDemographics())
}

// Competitor data
export async function getCompetitors(restaurantId: number) {
  // If database is not initialized, return mock data directly
  if (!isDatabaseInitialized) {
    return { data: getMockCompetitors(), error: null }
  }

  const query = `
    SELECT 
      competitor_name, 
      cuisine_type, 
      distance_km, 
      price_level, 
      rating, 
      market_share, 
      strengths, 
      weaknesses
    FROM competitors
    WHERE restaurant_id = $1
    ORDER BY distance_km
  `
  return executeQuery(query, [restaurantId], getMockCompetitors())
}

// Menu items data
export async function getMenuItems(restaurantId: number) {
  // If database is not initialized, return mock data directly
  if (!isDatabaseInitialized) {
    return { data: getMockMenuItems(), error: null }
  }

  const query = `
    SELECT 
      mi.id, 
      mi.name, 
      mi.description, 
      mi.price, 
      mi.cost, 
      mi.is_vegetarian, 
      mi.is_vegan, 
      mi.is_gluten_free, 
      mi.is_signature, 
      mi.is_seasonal, 
      mi.popularity_score,
      mc.name as category
    FROM menu_items mi
    JOIN menu_categories mc ON mi.category_id = mc.id
    WHERE mi.restaurant_id = $1
    ORDER BY mi.category_id, mi.name
  `
  return executeQuery(query, [restaurantId], getMockMenuItems())
}

// Staff performance data
export async function getStaffPerformance(restaurantId: number, days = 30) {
  // If database is not initialized, return mock data directly
  if (!isDatabaseInitialized) {
    return { data: getMockStaffPerformance(), error: null }
  }

  const query = `
    SELECT 
      s.id, 
      s.name, 
      s.position,
      AVG(sp.sales) as avg_sales,
      SUM(sp.sales) as total_sales,
      AVG(sp.orders) as avg_orders,
      SUM(sp.orders) as total_orders,
      AVG(sp.tips) as avg_tips,
      SUM(sp.tips) as total_tips,
      AVG(sp.rating) as avg_rating
    FROM staff s
    LEFT JOIN staff_performance sp ON s.id = sp.staff_id
    WHERE s.restaurant_id = $1
    AND sp.date >= CURRENT_DATE - INTERVAL '${days} days'
    GROUP BY s.id, s.name, s.position
    ORDER BY total_sales DESC
  `
  return executeQuery(query, [restaurantId], getMockStaffPerformance())
}

// Inventory data
export async function getInventoryItems(restaurantId: number) {
  // If database is not initialized, return mock data directly
  if (!isDatabaseInitialized) {
    return { data: getMockInventoryItems(), error: null }
  }

  const query = `
    SELECT 
      ii.id, 
      ii.name, 
      ii.unit, 
      ii.stock_quantity, 
      ii.reorder_point, 
      ii.cost_per_unit, 
      ii.supplier,
      ic.name as category,
      CASE 
        WHEN ii.stock_quantity <= ii.reorder_point THEN 'Out of Stock'
        WHEN ii.stock_quantity <= (ii.reorder_point * 1.5) THEN 'Low Stock'
        ELSE 'In Stock'
      END as status
    FROM inventory_items ii
    JOIN inventory_categories ic ON ii.category_id = ic.id
    WHERE ii.restaurant_id = $1
    ORDER BY ic.name, ii.name
  `
  return executeQuery(query, [restaurantId], getMockInventoryItems())
}

// Projects data
export async function getProjects(limit = 10, offset = 0) {
  // If database is not initialized, return mock data directly
  if (!isDatabaseInitialized) {
    return { data: getMockProjects(), error: null }
  }

  const query = `
    SELECT 
      id, 
      name, 
      location, 
      cuisine_type, 
      concept, 
      address, 
      latitude, 
      longitude, 
      radius, 
      status, 
      progress, 
      created_at, 
      updated_at
    FROM projects
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
  `
  return executeQuery(query, [limit, offset], getMockProjects())
}

export async function getProjectById(id: number) {
  const mockProjects = getMockProjects()
  const fallbackData = mockProjects.find((p) => p.id === id) || mockProjects[0]

  // If database is not initialized, return mock data directly
  if (!isDatabaseInitialized) {
    return fallbackData
  }

  const query = `
    SELECT 
      id, 
      name, 
      location, 
      cuisine_type, 
      concept, 
      address, 
      latitude, 
      longitude, 
      radius, 
      status, 
      progress, 
      created_at, 
      updated_at
    FROM projects
    WHERE id = $1
  `
  const result = await executeQuery(query, [id], [fallbackData])
  return result.data?.[0] || fallbackData
}

// Marketing campaigns data
export async function getMarketingCampaigns(restaurantId: number) {
  // If database is not initialized, return mock data directly
  if (!isDatabaseInitialized) {
    return { data: getMockMarketingCampaigns(), error: null }
  }

  const query = `
    SELECT 
      id, 
      name, 
      type, 
      start_date, 
      end_date, 
      budget, 
      roi, 
      description
      type, 
      start_date, 
      end_date, 
      budget, 
      roi, 
      description
    FROM marketing_campaigns
    WHERE restaurant_id = $1
    ORDER BY start_date DESC
  `
  return executeQuery(query, [restaurantId], getMockMarketingCampaigns())
}

// Online presence data
export async function getOnlinePresence(restaurantId: number) {
  // If database is not initialized, return mock data directly
  if (!isDatabaseInitialized) {
    return { data: getMockOnlinePresence(), error: null }
  }

  const query = `
    SELECT 
      platform, 
      rating, 
      review_count, 
      follower_count, 
      engagement_rate
    FROM online_presence
    WHERE restaurant_id = $1
    ORDER BY platform
  `
  return executeQuery(query, [restaurantId], getMockOnlinePresence())
}

// Function to create database schema
export async function createDatabaseSchema() {
  try {
    console.log("Attempting to create database schema...")

    // This is a simplified schema creation - in a real app, you'd want to use migrations
    await sql`
      CREATE TABLE IF NOT EXISTS restaurants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        cuisine_type VARCHAR(100),
        concept VARCHAR(255),
        address TEXT,
        district VARCHAR(100),
        city VARCHAR(100),
        country VARCHAR(100),
        postal_code VARCHAR(20),
        status VARCHAR(50) DEFAULT 'Active',
        seating_capacity INTEGER,
        has_outdoor_seating BOOLEAN DEFAULT FALSE,
        has_parking BOOLEAN DEFAULT FALSE,
        has_delivery BOOLEAN DEFAULT FALSE,
        has_takeout BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    console.log("Database schema created successfully")
    return true
  } catch (error) {
    console.error("Error creating database schema:", error)
    return false
  }
}

// Export a function to manually trigger database initialization
export async function setupDatabase() {
  try {
    // Check if database is already initialized
    const isInitialized = await checkDatabaseInitialized()

    if (isInitialized) {
      console.log("Database is already initialized.")
      isDatabaseInitialized = true
      return true
    }

    // Try to create the schema
    const schemaCreated = await createDatabaseSchema()

    if (schemaCreated) {
      console.log("Database schema created successfully.")
      isDatabaseInitialized = true
      return true
    } else {
      console.log("Failed to create database schema. Using mock data.")
      isDatabaseInitialized = false
      return false
    }
  } catch (error) {
    console.error("Error setting up database:", error)
    isDatabaseInitialized = false
    return false
  }
}

// Add a route handler to initialize the database
export async function initializeDatabase() {
  console.log("Database initialization status:", isDatabaseInitialized ? "Initialized" : "Not initialized")
  console.log("Using mock data for all queries.")
  return isDatabaseInitialized
}

// Call initialization on module load
console.log("Database module loaded. Using mock data until database is initialized.")

