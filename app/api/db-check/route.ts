import { NextResponse } from "next/server"
import { getNeonClient } from "@/lib/db"

export async function GET() {
  try {
    // Get the SQL client at runtime
    const sql = getNeonClient()

    // Simple query to check database connection
    const result = await sql`SELECT NOW() as time`

    return NextResponse.json({
      status: "connected",
      timestamp: result[0]?.time || new Date().toISOString(),
      message: "Database connection successful",
    })
  } catch (error) {
    console.error("Database connection error:", error)

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to database",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
