// Authentication utilities
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production'

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12)
  return await bcrypt.hash(password, salt)
}

// Compare password with hash
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

// Generate JWT token
export function generateToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// User type for authentication
export interface AuthUser {
  id: number
  email: string
  name: string
  role: 'staff' | 'admin' | 'doctor'
}

