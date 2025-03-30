import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { sql } from "drizzle-orm"

// Initialize the database client
// Mock mode fallback
const isMockMode = !process.env.DATABASE_URL;

export const db = {
  execute: async (query: any) => {
    if (isMockMode) return { rows: [] };
    const sql = neon(process.env.DATABASE_URL!);
    return drizzle(sql).execute(query);
  }
};

// Dashboard data
export async function getDashboardData() {
  try {
    // Get revenue data
    const revenueData = await db.execute(sql`
      SELECT 
        DATE(order_date) as day,
        SUM(total_amount) as revenue
      FROM orders
      WHERE order_date >= NOW() - INTERVAL '30 days'
      GROUP BY day
      ORDER BY day
    `)

    // Get popular items
    const popularItems = await db.execute(sql`
      SELECT 
        m.name,
        COUNT(oi.id) as order_count
      FROM order_items oi
      JOIN menu_items m ON oi.menu_item_id = m.id
      JOIN orders o ON oi.order_id = o.id
      WHERE o.order_date >= NOW() - INTERVAL '30 days'
      GROUP BY m.name
      ORDER BY order_count DESC
      LIMIT 5
    `)

    // Get customer demographics
    const customerDemographics = await db.execute(sql`
      SELECT 
        age_group,
        COUNT(*) as count
      FROM customers
      GROUP BY age_group
      ORDER BY count DESC
    `)

    return {
      revenueData,
      popularItems,
      customerDemographics,
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    throw new Error("Failed to fetch dashboard data")
  }
}

// Customer data
export async function getCustomerData() {
  try {
    if (isMockMode) return { rows: customers };
    return await db.execute(sql`
      SELECT 
        id, 
        name, 
        email, 
        phone, 
        visits, 
        last_visit_date, 
        age_group
      FROM customers
      ORDER BY last_visit_date DESC
    `)
  } catch (error) {
    console.error("Error fetching customer data:", error)
    throw new Error("Failed to fetch customer data")
  }
}

// Menu data
export async function getMenuData() {
  try {
    return await db.execute(sql`
      SELECT 
        id, 
        name, 
        description, 
        price, 
        cost,
        category, 
        is_available, 
        allergens
      FROM menu_items
      ORDER BY category, name
    `)
  } catch (error) {
    console.error("Error fetching menu data:", error)
    throw new Error("Failed to fetch menu data")
  }
}

// Order data
export async function getOrderData() {
  try {
    return await db.execute(sql`
      SELECT 
        o.id, 
        o.order_date, 
        o.total_amount, 
        c.name as customer_name
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      ORDER BY o.order_date DESC
      LIMIT 100
    `)
  } catch (error) {
    console.error("Error fetching order data:", error)
    throw new Error("Failed to fetch order data")
  }
}

// Location data
export async function getLocationData() {
  try {
    return await db.execute(sql`
      SELECT 
        id, 
        name, 
        address, 
        city, 
        state, 
        latitude, 
        longitude, 
        monthly_revenue
      FROM locations
      ORDER BY name
    `)
  } catch (error) {
    console.error("Error fetching location data:", error)
    throw new Error("Failed to fetch location data")
  }
}

// Generic query execution
export async function executeQuery(query: string) {
  try {
    const data = await db.execute(sql.raw(query))
    return { success: true, data }
  } catch (error) {
    console.error("Error executing query:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown database error",
    }
  }
}

