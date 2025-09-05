import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth/login' || path === '/auth/signup' || path === '/auth/forgot-password'

  // Check if user is authenticated by looking for the token in cookies
  const token = request.cookies.get('p1ntar_auth_token')?.value || ''

  // If the path is public and user is logged in, redirect to dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If the path is protected and user is not logged in, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Otherwise, continue with the request
  return NextResponse.next()
}
 
// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    // Match all paths except static files, api routes, and auth paths
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}