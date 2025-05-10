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

  // Publicly accessible routes
  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/callback',
    '/about',
    '/contact',
    '/faq',
    '/jobs',
    /^\/jobs\/[^/]+$/, // Allow /jobs/[id]
    '/companies',
  ];

  const isPublic = publicPaths.some((path) =>
    typeof path === 'string' ? path === pathname : path.test(pathname)
  );
  console.log("Is public path:", isPublic);

  // Check for Supabase auth token in cookie
  const token = request.cookies.get('sb-access-token')?.value;
  console.log("Has token:", !!token);
  console.log("Token value:", token ? "present" : "missing");

  // If user has a token, they're authenticated and can access any path
  if (token) {
    console.log("✅ User is authenticated, allowing access to:", pathname);
    return NextResponse.next();
  }

  // If no token and trying to access protected route, redirect to login
  if (!isPublic) {
    console.log("❌ No token and accessing protected route, redirecting to login");
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  console.log("✅ Allowing access to public path:", pathname);
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
