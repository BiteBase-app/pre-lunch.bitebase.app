import { setupDatabase } from '../lib/db';

async function initializeDatabase() {
  console.log('Starting database initialization...');
  
  try {
    const result = await setupDatabase();
    
    if (result) {
      console.log('✅ Database initialization successful!');
    } else {
      console.log('⚠️ Database initialization failed. Check connection settings and permissions.');
    }
  } catch (error) {
    console.error('❌ Error during database initialization:', error);
  }
  
  process.exit(0);
}

initializeDatabase(); 