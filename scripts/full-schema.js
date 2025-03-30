// Require dotenv to load environment variables from .env file
require('dotenv').config();

// Import required modules
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// URL for your PostgreSQL database connection
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in your environment variables!');
  console.error('Please create or update your .env file with a valid DATABASE_URL');
  process.exit(1);
}

console.log('Starting full schema import...');
console.log(`Connecting to: ${DATABASE_URL.replace(/:.+@/, ':****@')}`);

// Create a connection pool
const pool = new Pool({
  connectionString: DATABASE_URL,
});

// Function to import the full SQL schema
async function importFullSchema() {
  try {
    // Read the schema.sql file
    const schemaPath = path.join(process.cwd(), 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    // Split the schema into individual statements
    // This is a basic split - complex SQL might need a more robust parser
    const statements = schemaSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      try {
        await pool.query(statements[i] + ';');
        process.stdout.write('.');
      } catch (error) {
        console.error(`\n❌ Error executing statement ${i + 1}:`, error);
        console.log('Statement:', statements[i]);
      }
    }
    
    console.log('\n✅ Full schema import completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error during schema import:', error);
    return false;
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the import function
importFullSchema()
  .then(result => {
    if (result) {
      console.log('✅ Database schema import completed!');
    } else {
      console.log('⚠️ Database schema import encountered some errors. Check the logs above for details.');
    }
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Fatal error during schema import:', error);
    process.exit(1);
  }); 