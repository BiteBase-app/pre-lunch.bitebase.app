import { db } from "./database"
import { sql } from "drizzle-orm"

// Types for scraper configuration
export type ScraperSource = {
  id: string
  name: string
  url: string
  type: "reviews" | "competitors" | "trends" | "prices"
  selector: string
  frequency: "daily" | "weekly" | "monthly"
  lastRun: Date | null
  isActive: boolean
}

export type ScrapedData = {
  id: string
  sourceId: string
  data: any
  scrapedAt: Date
}

// Get all scraper configurations
export async function getScraperSources() {
  try {
    return await db.execute(sql`
      SELECT * FROM scraper_sources
      ORDER BY name
    `)
  } catch (error) {
    console.error("Error fetching scraper sources:", error)
    throw new Error("Failed to fetch scraper sources")
  }
}

// Get scraper results
export async function getScraperResults(sourceId: string) {
  try {
    return await db.execute(sql`
      SELECT * FROM scraped_data
      WHERE source_id = ${sourceId}
      ORDER BY scraped_at DESC
      LIMIT 100
    `)
  } catch (error) {
    console.error("Error fetching scraper results:", error)
    throw new Error("Failed to fetch scraper results")
  }
}

// Add a new scraper source
export async function addScraperSource(source: Omit<ScraperSource, "id" | "lastRun">) {
  try {
    await db.execute(sql`
      INSERT INTO scraper_sources (
        name, url, type, selector, frequency, is_active
      ) VALUES (
        ${source.name}, ${source.url}, ${source.type}, 
        ${source.selector}, ${source.frequency}, ${source.isActive}
      )
    `)
    return { success: true }
  } catch (error) {
    console.error("Error adding scraper source:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Update a scraper source
export async function updateScraperSource(id: string, updates: Partial<ScraperSource>) {
  try {
    // Build the SET clause dynamically based on provided updates
    const setClauses = []
    const values: any[] = []

    if (updates.name !== undefined) {
      setClauses.push("name = ?")
      values.push(updates.name)
    }
    if (updates.url !== undefined) {
      setClauses.push("url = ?")
      values.push(updates.url)
    }
    if (updates.type !== undefined) {
      setClauses.push("type = ?")
      values.push(updates.type)
    }
    if (updates.selector !== undefined) {
      setClauses.push("selector = ?")
      values.push(updates.selector)
    }
    if (updates.frequency !== undefined) {
      setClauses.push("frequency = ?")
      values.push(updates.frequency)
    }
    if (updates.isActive !== undefined) {
      setClauses.push("is_active = ?")
      values.push(updates.isActive)
    }

    if (setClauses.length === 0) {
      return { success: true } // Nothing to update
    }

    // Add the ID for the WHERE clause
    values.push(id)

    await db.execute(sql.raw(`UPDATE scraper_sources SET ${setClauses.join(", ")} WHERE id = ?`, ...values))

    return { success: true }
  } catch (error) {
    console.error("Error updating scraper source:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Delete a scraper source
export async function deleteScraperSource(id: string) {
  try {
    await db.execute(sql`
      DELETE FROM scraper_sources
      WHERE id = ${id}
    `)
    return { success: true }
  } catch (error) {
    console.error("Error deleting scraper source:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

