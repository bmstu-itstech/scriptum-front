export const useLogout = () => {
  const logout = () => {
    // Удаляем cookie на клиенте
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    location.reload();
  };

  return { logout };
};
