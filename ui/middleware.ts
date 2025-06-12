import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Server-side logging
  console.log("\n=== MIDDLEWARE DEBUG ===");
  console.log("Request URL:", request.url);
  console.log("Pathname:", pathname);
  console.log("Method:", request.method);
  console.log("Headers:", Object.fromEntries(request.headers.entries()));
  console.log("Cookies:", request.cookies.getAll().map(c => c.name));

  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/callback',
    '/about',
    '/contact',
    '/faq',
    '/jobs',
    /^\/jobs\/[^/]+$/,
    '/companies',
    '/admin',
    /^\/admin\/.*$/, // This will match all admin routes
  ];

  const isPublic = publicPaths.some((path) => {
    if (typeof path === 'string') {
      return path === pathname || pathname.startsWith(path + '/');
    }
    return path.test(pathname);
  });

  
  console.log("Is public path:", isPublic);
  console.log("Current pathname:", pathname);
  console.log("Public paths:", publicPaths);

  if (isPublic) {
    // Public path: allow access, no checks!
    return NextResponse.next();
  }

  // Check for auth token
  const token = request.cookies.get('sb-access-token')?.value;
  console.log("Has token:", !!token);
  console.log("Token value:", token ? "present" : "missing");

  // If no token and trying to access protected route, redirect to login
  if (!token && !isPublic) {
    console.log("❌ No token and accessing protected route, redirecting to login");
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  console.log("✅ Allowing access to path:", pathname);
  return NextResponse.next();
}

// Limit middleware to paths where protection matters
export const config = {
  matcher: [
    /*
     * Match all routes except for:
     * - API routes
     * - _next static files
     * - public auth pages
     */
    '/((?!_next|api|favicon.ico|login|register|callback|about|contact|faq|jobs|companies).*)',
  ],
};
