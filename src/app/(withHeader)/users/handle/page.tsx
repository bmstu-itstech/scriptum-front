'use client';
import { PageLayout } from '@/layouts/PageLayout';
import { handleUsersPageUsecase } from './page.usecase';
import { Search } from '@/components/Search';
import { Filter } from '@/components/Filter/Filter';
import { useMemo, useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { FilterIcon } from '@/components/icons/FilterIcon';
import { Stats } from '@/shared/Stats';
import Pagination from '@/shared/Pagination';
import { Role } from '@/shared/api/generated/data-contracts';
import type { User } from '@/shared/api/generated/data-contracts';
import style from './page.module.css';
import { UserTable } from '@/components/UserTable';
import { pageSelectStyles, roleUsecase } from '@/components/Filter/Filter.usecase';
import { useGetAllUsers } from '@/hooks/user/useGetAllUsers';
import { usePatchUser } from '@/hooks/user/usePatchUser';
import { useDeleteUser } from '@/hooks/user/useDeleteUser';
import { useCustomToast } from '@/hooks/other/useCustomToast';
import { notifyMutationError } from '@/utils/notifyMutationError';

const ITEMS_PER_PAGE = 8;

export default function HandlePage() {
  const { data: usersData, isLoading, refetch } = useGetAllUsers();
  const { mutate: patchUser } = usePatchUser();
  const { mutate: deleteUser } = useDeleteUser();
  const notify = useCustomToast();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (usersData) {
      setUsers(usersData);
    }
  }, [usersData]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchLower = debouncedSearchTerm.toLowerCase();
      const name = user.name || '';
      const email = user.email || '';
      const matchesSearch =
        name.toLowerCase().includes(searchLower) || email.toLowerCase().includes(searchLower);
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, debouncedSearchTerm, roleFilter]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) || 1;
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const adminCount = users.filter((u) => u.role === Role.Admin).length;

  const handleEditUser = (editedUser: User & { password?: string }) => {
    const patchData: {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
    } = {};

    if (editedUser.name) {
      patchData.name = editedUser.name;
    }
    if (editedUser.email) {
      patchData.email = editedUser.email;
    }
    if (editedUser.password) {
      patchData.password = editedUser.password;
    }
    if (editedUser.role) {
      patchData.role = editedUser.role;
    }

    patchUser(
      { id: editedUser.id, data: patchData },
      {
        onSuccess: (data) => {
          setUsers(users.map((u) => (u.id === editedUser.id ? data : u)));
          notify('Данные пользователя успешно обновлены', 'success');
          refetch();
        },
        onError: notifyMutationError(notify),
      },
    );
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId, {
      onSuccess: () => {
        setUsers(users.filter((u) => u.id !== userId));
        if (paginatedUsers.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
        notify('Пользователь успешно удалён', 'success');
        refetch();
      },
      onError: notifyMutationError(notify),
    });
  };

  return (
    <PageLayout
      title={handleUsersPageUsecase.title}
      subtitle={handleUsersPageUsecase.subtitle}
      className={style.container}>
      <div className={style.controlPanel}>
        <div className={style.searchFilterGroup}>
          <Search
            placeholder='Поиск по имени или email...'
            callback={(value) => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
            icon={<SearchIcon />}
            className={style.search}
          />

          <Filter
            placeholder='Все роли'
            name='roleFilter'
            value={roleFilter}
            onChange={(value) => {
              setRoleFilter(value as Role | 'all');
              setCurrentPage(1);
            }}
            options={roleUsecase}
            icon={<FilterIcon />}
            style={pageSelectStyles}
            className={style.filter}
          />
        </div>

        <Stats
          stats={[
            { text: 'Всего пользователей', count: users.length },
            { text: 'Администраторов', count: adminCount },
            { text: 'Найдено', count: filteredUsers.length },
            { text: 'Страница', count: currentPage, total: totalPages },
          ]}
        />
      </div>

      <div className={style.usersList}>
        {isLoading ? (
          <div className={style.emptyState}>Загрузка...</div>
        ) : paginatedUsers.length > 0 ? (
          <UserTable
            users={paginatedUsers}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        ) : (
          <div className={style.emptyState}>
            Ничего не найдено. Попробуйте изменить параметры поиска
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </PageLayout>
  );
}
