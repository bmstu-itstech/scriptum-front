import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // console.log('[MIDDLEWARE] путь:', pathname, req.cookies);
  // читаем JWT из cookie csrftoken
  const token = req.cookies.get('csrftoken')?.value;
  console.log('[MIDDLEWARE] токен из cookie:', token);

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const res = NextResponse.next();

  let role = null;

  if (token == process.env.NEXT_PUBLIC_JWT_ADMIN) {
    res.headers.set('x-user-role', 'admin');
    role = 'admin';
  }

  if (token == process.env.NEXT_PUBLIC_JWT_USER) {
    res.headers.set('x-user-role', 'user');
    role = 'user';
  }
    
    // let payload: any;
  // try {
  //   const { payload: decoded } = await jwtVerify(token, SECRET_KEY);
  //   payload = decoded;
  // } catch (err) {
  //   console.error('[MIDDLEWARE] JWT verification failed:', err);
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  // const userId = payload?.user_id;
  // if (!userId) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  // маршруты
  const adminRoutes = ['/user/create', '/users/handle'];
  // const userRoutes = ['/', '/tasks', '/script/create'];

  if (adminRoutes.some((route) => pathname.startsWith(route)) && role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // if (userRoutes.some((route) => pathname.startsWith(route)) && userId !== 2) {
  //   return NextResponse.redirect(new URL('/', req.url));
  // }

  // const res = NextResponse.next();
  // res.headers.set('x-user-role', userId === 1 ? 'admin' : 'user');
  return res;
}

export const config = {
  matcher: ['/((?!login|_next|favicon.ico|api).*)'],
};
