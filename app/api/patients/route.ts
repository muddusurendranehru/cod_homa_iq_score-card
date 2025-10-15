// Patient CRUD endpoints
import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/patients - Fetch all patients
export async function GET(request: NextRequest) {
  try {
    const result = await query(
      `SELECT id, name, age, sex, phone, email, created_at, updated_at
       FROM homa_patients
       ORDER BY created_at DESC`
    )

    return NextResponse.json({
      success: true,
      patients: result.rows
    })

  } catch (error) {
    console.error('Error fetching patients:', error)
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    )
  }
}

// POST /api/patients - Create new patient
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, age, sex, phone, email } = body

    // Validation
    if (!name || !age || !sex) {
      return NextResponse.json(
        { error: 'Name, age, and sex are required' },
        { status: 400 }
      )
    }

    // Validate age
    if (age < 0 || age > 150) {
      return NextResponse.json(
        { error: 'Age must be between 0 and 150' },
        { status: 400 }
      )
    }

    // Validate sex
    if (!['male', 'female', 'other'].includes(sex)) {
      return NextResponse.json(
        { error: 'Sex must be male, female, or other' },
        { status: 400 }
      )
    }

    // Validate phone (India format - flexible)
    if (phone && phone.trim() !== '') {
      // Remove spaces and check if it matches India format
      const cleanPhone = phone.replace(/\s/g, '')
      // Accept: +919963721999, 9963721999, 919963721999, +91 9963721999
      const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/
      if (!phoneRegex.test(cleanPhone)) {
        return NextResponse.json(
          { error: 'Phone must be a valid Indian mobile number (10 digits starting with 6-9)' },
          { status: 400 }
        )
      }
    }

    // Insert patient
    const result = await query(
      `INSERT INTO homa_patients (name, age, sex, phone, email)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, age, sex, phone, email, created_at`,
      [name, age, sex, phone || null, email || null]
    )

    const patient = result.rows[0]

    return NextResponse.json({
      success: true,
      message: 'Patient created successfully',
      patient
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating patient:', error)
    return NextResponse.json(
      { error: 'Failed to create patient' },
      { status: 500 }
    )
  }
}

