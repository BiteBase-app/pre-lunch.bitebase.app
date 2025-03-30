import { NextResponse } from "next/server"
import { generateInsight } from "@/lib/ai"
import { db } from "@/lib/database"
import { sql } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const { question } = await req.json()

    // Fetch the necessary data for the AI to analyze
    const [revenueData, menuItems, customerData, orderData, locationData] = await Promise.all([
      // Revenue data for the last 12 months
      db.execute(sql`
        SELECT 
          DATE_TRUNC('month', order_date) as month,
          SUM(total_amount) as revenue
        FROM orders
        WHERE order_date >= NOW() - INTERVAL '12 months'
        GROUP BY month
        ORDER BY month
      `),

      // Menu items with their performance metrics
      db.execute(sql`
        SELECT 
          m.*,
          COUNT(oi.id) as order_count,
          AVG(oi.quantity) as avg_quantity_per_order
        FROM menu_items m
        LEFT JOIN order_items oi ON m.id = oi.menu_item_id
        LEFT JOIN orders o ON oi.order_id = o.id
        WHERE o.order_date >= NOW() - INTERVAL '3 months' OR o.order_date IS NULL
        GROUP BY m.id
        ORDER BY order_count DESC
      `),

      // Customer data with visit patterns
      db.execute(sql`
        SELECT 
          c.*,
          COUNT(o.id) as order_count,
          SUM(o.total_amount) as total_spent,
          MAX(o.order_date) as last_order_date
        FROM customers c
        LEFT JOIN orders o ON c.id = o.customer_id
        GROUP BY c.id
      `),

      // Order data with detailed metrics
      db.execute(sql`
        SELECT 
          o.*,
          COUNT(oi.id) as item_count,
          c.name as customer_name,
          l.name as location_name
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN customers c ON o.customer_id = c.id
        LEFT JOIN locations l ON o.location_id = l.id
        WHERE o.order_date >= NOW() - INTERVAL '6 months'
        GROUP BY o.id, c.name, l.name
        ORDER BY o.order_date DESC
      `),

      // Location data with performance metrics
      db.execute(sql`
        SELECT 
          l.*,
          COUNT(o.id) as order_count,
          SUM(o.total_amount) as total_revenue,
          AVG(o.total_amount) as avg_order_value
        FROM locations l
        LEFT JOIN orders o ON l.id = o.location_id
        WHERE o.order_date >= NOW() - INTERVAL '6 months' OR o.order_date IS NULL
        GROUP BY l.id
      `),
    ])

    // Generate insights using AI
    const restaurantData = {
      revenueData,
      menuItems,
      customerData,
      orderData,
      locationData,
    }

    const insight = await generateInsight(question, restaurantData)

    // Save the question and insight to the database for future reference
    await db.execute(sql`
      INSERT INTO insights_history (
        question, insight, created_at
      ) VALUES (
        ${question}, ${JSON.stringify(insight)}, NOW()
      )
    `)

    return NextResponse.json({
      success: true,
      insight,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      },
      { status: 500 },
    )
  }
}

