import { getNeonClient } from "./db"

// Safe database query function that handles errors gracefully
export async function safeQuery(query: string, params: any[] = []) {
  try {
    const sql = getNeonClient()
    // Use tagged template literal to safely pass parameters
    return await sql(query, params)
  } catch (error) {
    console.error("Database query error:", error)
    return []
  }
}

// Get a user by ID
export async function getUserById(id: string) {
  try {
    const sql = getNeonClient()
    const result = await sql`SELECT * FROM users WHERE id = ${id}`
    return result[0] || null
  } catch (error) {
    console.error("Error getting user by ID:", error)
    return null
  }
}

// Get a user by email
export async function getUserByEmail(email: string) {
  try {
    const sql = getNeonClient()
    const result = await sql`SELECT * FROM users WHERE email = ${email}`
    return result[0] || null
  } catch (error) {
    console.error("Error getting user by email:", error)
    return null
  }
}

// Get an admin by username
export async function getAdminByUsername(username: string) {
  try {
    const sql = getNeonClient()
    const result = await sql`SELECT * FROM admins WHERE username = ${username}`
    return result[0] || null
  } catch (error) {
    console.error("Error getting admin by username:", error)
    return null
  }
}

// Create a new user
export async function createUser(userData: any) {
  try {
    const sql = getNeonClient()
    const result = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${userData.name}, ${userData.email}, ${userData.password})
      RETURNING id, name, email
    `
    return result[0] || null
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}
