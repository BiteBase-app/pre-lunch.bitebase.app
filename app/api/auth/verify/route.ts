import { NextRequest, NextResponse } from "next/server"
import { adminAuth } from "@/lib/firebase-admin"

export const runtime = 'nodejs'

type TokenRequest = {
  token: string;
};

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json() as TokenRequest

    if (!token) {
      return NextResponse.json({
        valid: false,
        error: "No token provided"
      }, { status: 400 })
    }

    try {
      const decodedToken = await adminAuth.verifyIdToken(token)
      return NextResponse.json({
        valid: true,
        uid: decodedToken.uid
      })
    } catch (error) {
      console.error('Token verification error:', error)
      return NextResponse.json({
        valid: false,
        error: "Invalid token"
      }, { status: 401 })
    }
  } catch (error) {
    console.error('Request processing error:', error)
    return NextResponse.json({
      valid: false,
      error: "Failed to process request"
    }, { status: 500 })
  }
}
