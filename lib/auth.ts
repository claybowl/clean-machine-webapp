import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Only accept the demo user for now
        if (credentials?.email === "demo@curveai.com" && credentials?.password === "demo1234") {
          return {
            id: "1",
            email: "demo@curveai.com",
            name: "Demo User",
            role: "client",
            company: "Curve AI Demo",
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: false,
  secret: process.env.NEXTAUTH_SECRET || "development-secret-do-not-use-in-production",
}
