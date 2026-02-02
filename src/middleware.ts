import { NextResponse, NextRequest } from 'next/server';
import { Users } from '@/shared/api/generated/Users';
import { ADMIN_ROUTES } from '@/shared/consts/links';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('access_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));

  if (isAdminRoute) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      const usersApi = new Users({
        baseURL: apiUrl,
        securityWorker: async () => ({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      });

      const userResponse = await usersApi.getUserMe();

      if (userResponse.status === 200 && userResponse.data) {
        const user = userResponse.data;
        if (user.role !== 'admin') {
          return NextResponse.redirect(new URL('/', req.url));
        }
      } else {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!login|_next|favicon\\.ico|icon\\.svg|api).*)'],
};
