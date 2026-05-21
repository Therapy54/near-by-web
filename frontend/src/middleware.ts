import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isPublicRoute(pathname: string): boolean {
  if (pathname === '/') {
    return true;
  }

  let publicRoutes = [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/_next',
    '/api/auth',
    '/api/health',
  ];

  return publicRoutes.some((route) => pathname.startsWith(route));
}

export function middleware(request: NextRequest) {
  let pathname = request.nextUrl.pathname;

  // Allow public routes without session check
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Gate everything else behind a session cookie
  let session = request.cookies.get('session')?.value;

  if (!session) {
    let loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export let config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

