// Assessment CRUD endpoints
import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/assessments - Fetch all assessments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const patientId = searchParams.get('patient_id')

    let sql = `
      SELECT 
        a.*,
        p.name as patient_name,
        p.age as patient_age,
        p.sex as patient_sex
      FROM homa_assessments a
      JOIN homa_patients p ON a.patient_id = p.id
    `

    const params: any[] = []

    if (patientId) {
      sql += ` WHERE a.patient_id = $1`
      params.push(patientId)
    }

    sql += ` ORDER BY a.created_at DESC`

    const result = await query(sql, params)

    return NextResponse.json({
      success: true,
      assessments: result.rows
    })

  } catch (error) {
    console.error('Error fetching assessments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch assessments' },
      { status: 500 }
    )
  }
}

// POST /api/assessments - Create new assessment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { patient_id, ...assessmentData } = body

    // Validation
    if (!patient_id) {
      return NextResponse.json(
        { error: 'Patient ID is required' },
        { status: 400 }
      )
    }

    // Check if patient exists
    const patientCheck = await query(
      'SELECT id FROM homa_patients WHERE id = $1',
      [patient_id]
    )

    if (patientCheck.rows.length === 0) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      )
    }

    // Build insert query with all possible fields
    const fields = ['patient_id']
    const values = [patient_id]
    const placeholders = ['$1']
    let paramIndex = 2

    // Add all provided assessment data
    for (const [key, value] of Object.entries(assessmentData)) {
      if (value !== undefined && value !== null) {
        fields.push(key)
        values.push(value)
        placeholders.push(`$${paramIndex++}`)
      }
    }

    const result = await query(
      `INSERT INTO homa_assessments (${fields.join(', ')})
       VALUES (${placeholders.join(', ')})
       RETURNING *`,
      values
    )

    const assessment = result.rows[0]

    return NextResponse.json({
      success: true,
      message: 'Assessment created successfully',
      assessment
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating assessment:', error)
    return NextResponse.json(
      { error: 'Failed to create assessment' },
      { status: 500 }
    )
  }
}

