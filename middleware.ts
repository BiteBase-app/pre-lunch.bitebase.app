import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = true // For static files

  // Get the token from the cookies
  const token = request.cookies.get("authToken")?.value

  // If the path requires authentication and there's no token, redirect to login
  // Authentication disabled
  // if (!isPublicPath && !token) {
  //   return NextResponse.redirect(new URL("/login", request.url))
  // }

  // if (token && (path === "/login" || path === "/signup")) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url))
  // }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

