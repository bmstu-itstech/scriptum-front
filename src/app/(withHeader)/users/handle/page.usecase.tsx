import { IUser, UserRole } from '@/shared/consts/user';

export const handleUsersPageUsecase = {
  title: 'Управление пользователями',
  subtitle: 'Просматривайте и редактируйте данные пользователей системы',
};

export const APIUsers: IUser[] = [
  {
    id: 1,
    fullname: 'Иванов Иван Иванович',
    email: 'ivanov@company.com',
    role: UserRole.ADMIN,
  },
  {
    id: 2,
    fullname: 'Петрова Анна Сергеевна',
    email: 'petrova@company.com',
    role: UserRole.USER,
  },
  {
    id: 3,
    fullname: 'Сидоров Дмитрий Викторович',
    email: 'sidorov@company.com',
    role: UserRole.USER,
  },
  {
    id: 4,
    fullname: 'Козлова Елена Михайловна',
    email: 'kozlova@company.com',
    role: UserRole.ADMIN,
  },
  {
    id: 5,
    fullname: 'Васильев Андрей Петрович',
    email: 'vasilev@company.com',
    role: UserRole.USER,
  },
  {
    id: 6,
    fullname: 'Николаева Ольга Игоревна',
    email: 'nikolaeva@company.com',
    role: UserRole.USER,
  },
  {
    id: 7,
    fullname: 'Федоров Максим Александрович',
    email: 'fedorov@company.com',
    role: UserRole.USER,
  },
  {
    id: 8,
    fullname: 'Михайлова Светлана Владимировна',
    email: 'mikhailova@company.com',
    role: UserRole.ADMIN,
  },
  {
    id: 9,
    fullname: 'Алексеев Павел Николаевич',
    email: 'alekseev@company.com',
    role: UserRole.USER,
  },
  {
    id: 10,
    fullname: 'Сергеева Татьяна Дмитриевна',
    email: 'sergeeva@company.com',
    role: UserRole.USER,
  },
  {
    id: 11,
    fullname: 'Кузнецов Артем Игоревич',
    email: 'kuznetsov@company.com',
    role: UserRole.USER,
  },
  {
    id: 12,
    fullname: 'Павлова Виктория Сергеевна',
    email: 'pavlova@company.com',
    role: UserRole.ADMIN,
  },
  {
    id: 13,
    fullname: 'Григорьев Илья Вадимович',
    email: 'grigoriev@company.com',
    role: UserRole.USER,
  },
  {
    id: 14,
    fullname: 'Белова Анастасия Андреевна',
    email: 'belova@company.com',
    role: UserRole.USER,
  },
  {
    id: 15,
    fullname: 'Тимофеев Денис Олегович',
    email: 'timofeev@company.com',
    role: UserRole.USER,
  },
  {
    id: 16,
    fullname: 'Орлова Марина Витальевна',
    email: 'orlova@company.com',
    role: UserRole.ADMIN,
  },
  {
    id: 17,
    fullname: 'Лебедев Александр Михайлович',
    email: 'lebedev@company.com',
    role: UserRole.USER,
  },
  {
    id: 18,
    fullname: 'Егорова Кристина Денисовна',
    email: 'egorova@company.com',
    role: UserRole.USER,
  },
  {
    id: 19,
    fullname: 'Соколов Роман Ильич',
    email: 'sokolov@company.com',
    role: UserRole.USER,
  },
  {
    id: 20,
    fullname: 'Волкова Екатерина Алексеевна',
    email: 'volkova@company.com',
    role: UserRole.ADMIN,
  },
  {
    id: 21,
    fullname: 'Дмитриев Антон Павлович',
    email: 'dmitriev@company.com',
    role: UserRole.USER,
  },
  {
    id: 22,
    fullname: 'Фролова Юлия Валерьевна',
    email: 'frolova@company.com',
    role: UserRole.USER,
  },
  {
    id: 23,
    fullname: 'Комаров Владислав Сергеевич',
    email: 'komarov@company.com',
    role: UserRole.USER,
  },
  {
    id: 24,
    fullname: 'Ильина Наталья Викторовна',
    email: 'ilina@company.com',
    role: UserRole.ADMIN,
  },
  {
    id: 25,
    fullname: 'Жуков Станислав Андреевич',
    email: 'zhukov@company.com',
    role: UserRole.USER,
  },
  {
    id: 26,
    fullname: 'Савельева Алина Романовна',
    email: 'savelieva@company.com',
    role: UserRole.USER,
  },
];
