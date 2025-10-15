// Database connection utility for Neon PostgreSQL
// Database: COD_HOMA_IQ_SCORE

import { Pool } from 'pg'

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

// Test database connection
export async function testConnection() {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT NOW()')
    client.release()
    console.log('✅ Database connected:', result.rows[0].now)
    return true
  } catch (error) {
    console.error('❌ Database connection error:', error)
    return false
  }
}

// Query helper function
export async function query(text: string, params?: any[]) {
  const start = Date.now()
  try {
    const result = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('Executed query', { text, duration, rows: result.rowCount })
    return result
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

// Get a client from the pool for transactions
export async function getClient() {
  return await pool.connect()
}

export default pool

