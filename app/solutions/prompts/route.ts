import { NextResponse } from "next/server"

// This is a dummy route handler to ensure Next.js recognizes /solutions/prompts
// as a valid route and not a dynamic route parameter
export function GET() {
  return NextResponse.next()
}
