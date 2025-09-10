import { NextResponse, type NextRequest } from 'next/server';

// export async function GET(req: NextRequest) {
//   const token = req.cookies.get('csrftoken')?.value;
//   if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//   if (token == process.env.NEXT_PUBLIC_JWT_ADMIN) {

//   }
//   // Теперь подгружаем задачи конкретного пользователя
//   const tasks = await db.getTasksForUser(userId);

//   return NextResponse.json(tasks);
// }
