import { neon } from "@neondatabase/serverless"

// Create a SQL client with the Neon serverless driver
export const sql = neon(process.env.DATABASE_URL!)

// Helper function for raw SQL queries when needed
export async function executeQuery(query: string, params: any[] = []) {
  if (params.length === 0) {
    // Use tagged template literal for simple queries
    return sql`${query}`
  } else {
    // Use sql.query for parameterized queries
    return sql.query(query, params)
  }
}
