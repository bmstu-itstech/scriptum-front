import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('csrftoken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const res = NextResponse.next();

  let role = null;

  if (token === process.env.NEXT_PUBLIC_JWT_ADMIN) {
    res.headers.set('x-user-role', 'admin');
    role = 'admin';
  }

  if (token === process.env.NEXT_PUBLIC_JWT_USER) {
    res.headers.set('x-user-role', 'user');
    role = 'user';
  }

  // маршруты
  const adminRoutes = ['/user/create', '/users/handle'];

  if (adminRoutes.some((route) => pathname.startsWith(route)) && role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!login|_next|favicon.ico|api).*)'],
};
