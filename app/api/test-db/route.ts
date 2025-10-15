// Quick database connection test endpoint
// GET /api/test-db
import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    // Test 1: Database connection
    const timeResult = await query('SELECT NOW() as current_time')
    
    // Test 2: Check if tables exist
    const tablesResult = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `)
    
    // Test 3: Count records in each table
    const patientCount = await query('SELECT COUNT(*) as count FROM homa_patients')
    const assessmentCount = await query('SELECT COUNT(*) as count FROM homa_assessments')
    const userCount = await query('SELECT COUNT(*) as count FROM homa_users')
    
    return NextResponse.json({
      success: true,
      message: '✅ Database connection successful!',
      database: 'COD_HOMA_IQ_SCORE',
      connection: {
        status: 'connected',
        timestamp: timeResult.rows[0].current_time
      },
      tables: tablesResult.rows.map(r => r.table_name),
      recordCounts: {
        patients: parseInt(patientCount.rows[0].count),
        assessments: parseInt(assessmentCount.rows[0].count),
        users: parseInt(userCount.rows[0].count)
      }
    })
    
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

