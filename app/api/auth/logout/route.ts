// POST /api/auth/logout
// Staff logout endpoint
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // In a JWT-based auth system, logout is handled client-side
    // by removing the token from storage
    // This endpoint can be used for logging or additional cleanup

    return NextResponse.json({
      success: true,
      message: 'Logout successful'
    })

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

