// Individual patient operations
import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/patients/[id] - Fetch single patient
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const result = await query(
      `SELECT id, name, age, sex, phone, email, created_at, updated_at
       FROM homa_patients
       WHERE id = $1`,
      [id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      patient: result.rows[0]
    })

  } catch (error) {
    console.error('Error fetching patient:', error)
    return NextResponse.json(
      { error: 'Failed to fetch patient' },
      { status: 500 }
    )
  }
}

// PUT /api/patients/[id] - Update patient
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const { name, age, sex, phone, email } = body

    // Build update query dynamically
    const updates: string[] = []
    const values: any[] = []
    let paramIndex = 1

    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`)
      values.push(name)
    }
    if (age !== undefined) {
      updates.push(`age = $${paramIndex++}`)
      values.push(age)
    }
    if (sex !== undefined) {
      updates.push(`sex = $${paramIndex++}`)
      values.push(sex)
    }
    if (phone !== undefined) {
      updates.push(`phone = $${paramIndex++}`)
      values.push(phone)
    }
    if (email !== undefined) {
      updates.push(`email = $${paramIndex++}`)
      values.push(email)
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      )
    }

    values.push(id)

    const result = await query(
      `UPDATE homa_patients
       SET ${updates.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING id, name, age, sex, phone, email, updated_at`,
      values
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Patient updated successfully',
      patient: result.rows[0]
    })

  } catch (error) {
    console.error('Error updating patient:', error)
    return NextResponse.json(
      { error: 'Failed to update patient' },
      { status: 500 }
    )
  }
}

// DELETE /api/patients/[id] - Delete patient
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const result = await query(
      `DELETE FROM homa_patients
       WHERE id = $1
       RETURNING id`,
      [id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Patient deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting patient:', error)
    return NextResponse.json(
      { error: 'Failed to delete patient' },
      { status: 500 }
    )
  }
}

