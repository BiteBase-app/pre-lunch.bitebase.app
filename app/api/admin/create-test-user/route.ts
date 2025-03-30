import { neon } from "@neondatabase/serverless"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Connect to the database
    const sql = neon(process.env.DATABASE_URL!)

    // Generate a random password
    const password = generatePassword()

    // Hash the password
    const hashedPassword = await hash(password, 10)

    // Create a test user with admin privileges
    const email = `testuser_${Date.now()}@example.com`
    const name = "Test User"

    // Check if users table exists
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'users'
      );
    `

    if (!tableExists[0].exists) {
      // Create users table if it doesn't exist
      await sql`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL,
          role VARCHAR(50) NOT NULL DEFAULT 'user',
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
      `
    }

    // Insert the test user
    await sql`
      INSERT INTO users (email, password, name, role)
      VALUES (${email}, ${hashedPassword}, ${name}, 'admin')
    `

    return NextResponse.json({
      success: true,
      email,
      password,
    })
  } catch (error) {
    console.error("Error creating test user:", error)
    return NextResponse.json({ error: "Failed to create test user" }, { status: 500 })
  }
}

// Helper function to generate a random password
function generatePassword(length = 10) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
  let password = ""

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset[randomIndex]
  }

  return password
}

