import { neon, neonConfig } from "@neondatabase/serverless"
import type { Pool } from "@neondatabase/serverless"
import { createPool } from "@neondatabase/serverless"
import type { NeonQueryFunction } from "@neondatabase/serverless"

// Detect if we're in a Node.js environment (runtime) vs browser/build time
const isServer = typeof window === "undefined"

// Configure neon to use WebSockets in all environments
neonConfig.webSocketConstructor = isServer ? require("ws") : WebSocket
neonConfig.fetchConnectionCache = true

// Function to get the database connection string
function getConnectionString(): string | null {
  // Only attempt to access environment variables on the server
  if (!isServer) {
    return null
  }

  // Try different environment variable names that might contain the connection string
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL

  return connectionString || null
}

// Create a dummy client for build time or when no connection string is available
function createDummyClient(): NeonQueryFunction<any, any> {
  return new Proxy(() => {}, {
    apply: (_target, _thisArg, args) => {
      console.error("Database client was called during build time or without a connection string")
      console.error("Query attempted:", args[0])

      // Return a Promise that resolves to an empty array to prevent crashes
      return Promise.resolve([])
    },
    get: (_target, prop) => {
      if (prop === "then") {
        // Make the proxy not thenable to avoid Promise-related issues
        return undefined
      }
      return () => createDummyClient()
    },
  }) as unknown as NeonQueryFunction<any, any>
}

// Get a Neon SQL client - only creates a real connection at runtime when a connection string exists
export function getNeonClient(): NeonQueryFunction<any, any> {
  const connectionString = getConnectionString()

  // If we're not on the server or don't have a connection string, return a dummy client
  if (!isServer || !connectionString) {
    console.warn("Using dummy SQL client - no database connection will be made")
    return createDummyClient()
  }

  try {
    // Only create the real client at runtime with a valid connection string
    return neon(connectionString)
  } catch (error) {
    console.error("Failed to create Neon SQL client:", error)
    return createDummyClient()
  }
}

// Get a Neon connection pool - only creates a real pool at runtime when a connection string exists
export function getNeonPool(): Pool {
  const connectionString = getConnectionString()

  // If we're not on the server or don't have a connection string, return a dummy pool
  if (!isServer || !connectionString) {
    console.warn("Using dummy connection pool - no database connection will be made")
    return {} as Pool
  }

  try {
    // Only create the real pool at runtime with a valid connection string
    return createPool({ connectionString })
  } catch (error) {
    console.error("Failed to create Neon connection pool:", error)
    return {} as Pool
  }
}

// Export functions but NOT initialized clients
export { neon as sql, neonConfig }
