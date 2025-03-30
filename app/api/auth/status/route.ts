import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'

/**
 * GET /api/auth/status - Get current user's authorization status
 */
export async function GET(request: NextRequest) {
  try {
    // Get the Firebase ID token from the Authorization header
    const token = request.headers.get('Authorization')?.split('Bearer ')[1]
    
    if (!token) {
      return NextResponse.json({ 
        success: false, 
        error: { message: 'Authentication required' } 
      }, { status: 401 })
    }
    
    // Verify the token using Firebase Admin
    const decodedToken = await adminAuth.verifyIdToken(token)
    
    // Get user data
    const user = await adminAuth.getUser(decodedToken.uid)
    
    return NextResponse.json({
      success: true,
      data: {
        isAuthenticated: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }
      }
    })
  } catch (error) {
    console.error('Error in auth status endpoint:', error)
    
    return NextResponse.json({
      success: false,
      error: { message: 'Authentication failed' }
    }, { status: 401 })
  }
} 