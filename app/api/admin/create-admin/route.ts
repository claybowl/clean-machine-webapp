import { NextResponse } from "next/server"
import { getNeonClient } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { username, password, email } = await request.json()

    // Get the SQL client at runtime
    const sql = getNeonClient()

    // Check if admin already exists
    const existingAdmin = await sql`
      SELECT * FROM admins WHERE username = ${username} OR email = ${email}
    `

    if (existingAdmin.length > 0) {
      return NextResponse.json({ error: "Admin with this username or email already exists" }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert the new admin
    const result = await sql`
      INSERT INTO admins (username, password, email, role)
      VALUES (${username}, ${hashedPassword}, ${email}, 'admin')
      RETURNING id, username, email, role
    `

    return NextResponse.json({
      message: "Admin created successfully",
      admin: {
        id: result[0].id,
        username: result[0].username,
        email: result[0].email,
        role: result[0].role,
      },
    })
  } catch (error) {
    console.error("Error creating admin:", error)
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 })
  }
}
