import bcrypt from 'bcryptjs';
import pool from '../config/database';

const seedUsers = async () => {
  try {
    // Create default employee
    const [employeeResult] = await pool.query(
      'INSERT INTO employees (name, email, department, position) VALUES (?, ?, ?, ?)',
      ['John Doe', 'john@example.com', 'IT', 'Developer']
    );
    const employeeId = (employeeResult as any).insertId;

    // Create admin user
    const adminPassword = await bcrypt.hash('1234', 10);
    await pool.query(
      'INSERT INTO auth (username, password, role, employee_id) VALUES (?, ?, ?, ?)',
      ['admin', adminPassword, 'admin', employeeId]
    );

    console.log('Default users created successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
};

// Run seeding
seedUsers()
  .then(() => process.exit(0))
  .catch(() => process.exit(1)); 