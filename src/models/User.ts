import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database';

export interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  role: 'employee' | 'admin';
  employee_id: number | null;
  firstname?: string;
  lastname?: string;
}

export class UserModel {
  static async findByUsername(username: string): Promise<User | null> {
    try {
      const [rows] = await pool.query<User[]>(
        `SELECT a.*, e.firstname, e.lastname 
         FROM auth a 
         LEFT JOIN employees e ON a.employee_id = e.id 
         WHERE a.username = ?`,
        [username]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error finding user by username:', error);
      throw error;
    }
  }

  static async create(username: string, password: string, role: User['role'], employee_id: number | null = null): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await pool.query(
        'INSERT INTO auth (username, password, role, employee_id) VALUES (?, ?, ?, ?)',
        [username, hashedPassword, role, employee_id]
      );
      const [rows] = await pool.query<User[]>(
        `SELECT a.*, e.firstname, e.lastname 
         FROM auth a 
         LEFT JOIN employees e ON a.employee_id = e.id 
         WHERE a.id = ?`,
        [(result as any).insertId]
      );
      return rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async verifyPassword(user: User, password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, user.password);
    } catch (error) {
      console.error('Error verifying password:', error);
      throw error;
    }
  }

  static generateToken(user: User): string {
    try {
      return jwt.sign(
        { 
          id: user.id, 
          username: user.username, 
          role: user.role,
          firstname: user.firstname,
          lastname: user.lastname
        },
        process.env.JWT_SECRET || 'your_jwt_secret_key_here',
        { expiresIn: '24h' }
      );
    } catch (error) {
      console.error('Error generating token:', error);
      throw error;
    }
  }
} 