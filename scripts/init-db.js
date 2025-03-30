// Require dotenv to load environment variables from .env file
require('dotenv').config();

// URL for your PostgreSQL database connection
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in your environment variables!');
  console.error('Please create or update your .env file with a valid DATABASE_URL');
  process.exit(1);
}

console.log('Starting database initialization...');
console.log(`Connecting to: ${DATABASE_URL.replace(/:.+@/, ':****@')}`);

// Import pg for PostgreSQL connection
const { Pool } = require('pg');

// Create a connection pool
const pool = new Pool({
  connectionString: DATABASE_URL,
});

// Function to setup basic database tables
async function setupDatabase() {
  try {
    // Check if the restaurants table exists
    const checkResult = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'restaurants'
      );
    `);
    
    if (checkResult.rows[0].exists) {
      console.log('✅ Database already initialized (restaurants table exists)');
      return true;
    }
    
    // Create a basic restaurants table if it doesn't exist
    await pool.query(`
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
    `);
    
    console.log('✅ Created restaurants table successfully');
    return true;
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    return false;
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the setup function
setupDatabase()
  .then(result => {
    if (result) {
      console.log('✅ Database initialization successful!');
    } else {
      console.log('⚠️ Database initialization failed. Check connection settings and permissions.');
    }
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error during database initialization:', error);
    process.exit(1);
  }); 