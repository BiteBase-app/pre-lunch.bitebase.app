import NextAuth from "next-auth"
import { authOptions } from "@/auth"

// Create and export the handler
const handler = NextAuth(authOptions)

// Export the GET and POST handlers
export const GET = handler
export const POST = handler 