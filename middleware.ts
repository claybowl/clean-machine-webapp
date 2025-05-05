import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // List of auth-protected routes
  const protectedRoutes = ["/admin", "/admin-dashboard", "/admin-simple", "/simple-admin", "/dashboard", "/profile"]
  const loginRoutes = ["/login", "/simple-login", "/auth/signin"]
  const adminRoutes = ["/admin", "/admin-dashboard", "/admin-simple", "/simple-admin", "/admin-users"]

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => path === route || path.startsWith(`${route}/`))

  // Check if the current path is a login route
  const isLoginRoute = loginRoutes.some((route) => path === route)

  // Check if the current path is an admin route
  const isAdminRoute = adminRoutes.some((route) => path === route || path.startsWith(`${route}/`))

  // Get auth cookie
  const adminAuth = request.cookies.get("simple-admin-auth")

  // For client-side auth, check the Authorization header as well
  const authHeader = request.headers.get("Authorization")
  let tokenFromHeader = null

  if (authHeader && authHeader.startsWith("Bearer ")) {
    tokenFromHeader = authHeader.substring(7)
  }

  // If the user is trying to access a protected route and isn't authenticated
  if (isProtectedRoute && !adminAuth && !tokenFromHeader) {
    return NextResponse.redirect(new URL("/auth/signin", request.url))
  }

  // If the user is already authenticated and trying to access a login route
  if (isLoginRoute && (adminAuth || tokenFromHeader)) {
    // Extract role from auth cookie or header
    let role = "client" // Default role

    if (adminAuth) {
      const [_, authRole] = adminAuth.value.split(":")
      role = authRole
    } else if (tokenFromHeader) {
      const [_, authRole] = tokenFromHeader.split(":")
      role = authRole
    }

    // Redirect to appropriate dashboard based on role
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url))
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  // For admin routes, check if the user has admin role
  if (isAdminRoute) {
    let isAdmin = false

    if (adminAuth) {
      const [_, role] = adminAuth.value.split(":")
      isAdmin = role === "admin"
    } else if (tokenFromHeader) {
      const [_, role] = tokenFromHeader.split(":")
      isAdmin = role === "admin"
    }

    if (!isAdmin) {
      console.log("User is not admin, redirecting to dashboard")
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/admin-dashboard/:path*",
    "/admin-simple/:path*",
    "/simple-admin/:path*",
    "/admin-users/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/login",
    "/simple-login",
    "/auth/signin",
  ],
}
