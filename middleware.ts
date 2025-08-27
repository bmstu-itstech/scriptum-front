// // middleware.ts
// import { NextResponse, NextRequest } from 'next/server';

// // Пример: определите пути для каждой роли
// const adminRoutes = ['/user/create', '/users/handle'];
// const userRoutes = ['/', '/tasks', '/script/create'];

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const token = req.cookies.get('csrftoken')?.value;
//   const user = token ? /* декодируйте токен, получите роль */ { role: 'user' } : null;

//   // Если не авторизован
//   if (!user) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   // Ограничение для админов
//   if (adminRoutes.some((route) => pathname.startsWith(route)) && user.role !== 'admin') {
//     return NextResponse.redirect(new URL('/', req.url)); // или страница "нет доступа"
//   }

//   // Пользовательские маршруты
//   if (userRoutes.some((route) => pathname.startsWith(route)) && user.role !== 'user') {
//     return NextResponse.redirect(new URL('/', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/:path*'], // применяем middleware только к этим маршрутам
// };
