// POST /api/auth/login
// Staff login endpoint
import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { comparePassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const result = await query(
      `SELECT id, name, email, password_hash, phone, role, is_active
       FROM homa_users
       WHERE email = $1`,
      [email]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const user = result.rows[0]

    // Check if user is active
    if (!user.is_active) {
      return NextResponse.json(
        { error: 'Account is deactivated. Please contact administrator.' },
        { status: 403 }
      )
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password_hash)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      token
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

