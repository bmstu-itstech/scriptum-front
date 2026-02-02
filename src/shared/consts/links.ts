export const LinkDirection = {
  Main: '/',
  Tasks: '/tasks',
  CreateScript: '/script/create',
  CreateUser: '/user/create',
  HandleUsers: '/users/handle',
} as const;

export const ADMIN_ROUTES: string[] = [LinkDirection.CreateUser, LinkDirection.HandleUsers];
