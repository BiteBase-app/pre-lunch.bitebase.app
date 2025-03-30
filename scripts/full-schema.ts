import { sql } from '../lib/db';
import fs from 'fs';
import path from 'path';

async function importFullSchema() {
  console.log('Starting full schema import...');
  
  try {
    // Read the schema.sql file
    const schemaPath = path.join(process.cwd(), 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    // Split the schema into individual statements
    const statements = schemaSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      try {
        await sql.query(statements[i] + ';');
        process.stdout.write('.');
      } catch (error) {
        console.error(`\n❌ Error executing statement ${i + 1}:`, error);
        console.log('Statement:', statements[i]);
      }
    }
    
    console.log('\n✅ Full schema import completed successfully!');
  } catch (error) {
    console.error('❌ Error during schema import:', error);
  }
  
  process.exit(0);
}

importFullSchema(); 