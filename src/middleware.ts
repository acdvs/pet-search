import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get('fetch-access-token');

  console.log('authToken', authToken);

  // const res = new NextResponse();
  // res.cookies.

  if (authToken && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/search', req.url));
  } else if (!authToken && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
