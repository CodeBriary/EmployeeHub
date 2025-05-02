import { pool, testConnection } from '../config/database';

async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('Failed to connect to database');
      return;
    }

    // Test query
    const [rows] = await pool.query('SELECT 1 as test');
    console.log('Query test successful:', rows);

    // Test users table
    const [users] = await pool.query('SELECT * FROM users');
    console.log('Users in database:', users);

    console.log('All database tests passed successfully!');
  } catch (error) {
    console.error('Database test failed:', error);
  } finally {
    await pool.end();
  }
}

// Run the test
testDatabaseConnection(); 