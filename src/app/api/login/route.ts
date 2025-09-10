import { NextResponse } from 'next/server';

const adminJWT = process.env.NEXT_PUBLIC_JWT_ADMIN!;
const userJWT = process.env.NEXT_PUBLIC_JWT_USER!;

export async function POST(req: Request) {
  const { username, password } = await req.json();

  let token = null;

  if (username === 'adminadmin' && password === 'adminadmin') {
    token = adminJWT;
  } else if (username === 'useruser' && password === 'useruser') {
    token = userJWT;
  }

  if (!token) {
    return NextResponse.json({ error: 'Неверные данные' }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set('csrftoken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24
  });

  return res;
}
