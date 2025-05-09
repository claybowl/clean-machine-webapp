// Refactored database connection to prevent build-time initialization
import { neon, type NeonQueryFunction } from "@neondatabase/serverless"

// Create a function that returns the SQL client instead of initializing it at module level
export function getNeonClient(): NeonQueryFunction<any> {
  // Only initialize the client when the function is called (at runtime)
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    console.error(
      "WARNING: No database connection string found. Please set DATABASE_URL or POSTGRES_URL environment variable.",
    )
  }

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || ""
  return neon(connectionString)
}

// Helper function for raw SQL queries with timeout and error handling
export async function executeQuery(query: string, params: any[] = [], timeoutMs = 5000) {
  try {
    // Get the SQL client at runtime
    const sql = getNeonClient()

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database query timeout")), timeoutMs),
    )

    if (params.length === 0) {
      // Use tagged template literal for simple queries with timeout
      const queryPromise = sql`${query}`
      return await Promise.race([queryPromise, timeoutPromise])
    } else {
      // Use sql.query for parameterized queries with timeout
      const queryPromise = sql.query(query, params)
      return await Promise.race([queryPromise, timeoutPromise])
    }
  } catch (error) {
    console.error("Database query error:", error)
    throw error // Re-throw to allow caller to handle
  }
}

// Function to test database connection
export async function testConnection() {
  try {
    const sql = getNeonClient()
    const result = await sql`SELECT 1 as connection_test`
    return { connected: true, result }
  } catch (error) {
    console.error("Database connection test failed:", error)
    return { connected: false, error }
  }
}

export const sql = getNeonClient()
