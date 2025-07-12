import {Button} from '@/shared/Button';
import {SiriusIcon} from '../icons/SiriusIcon';
import {PersonIcon} from '../icons/PersonIcon';
import {Props as LinkProps} from '@/shared/Link/Link.props';
import {HomeIcon} from '../icons/HomeIcon';
import {TaskIcon} from '../icons/TaskIcon';
import {LoadIcon} from '../icons/LoadIcon';
import {Link} from '@/shared/Link';

// export const headUsecase = {
// 	icon: <SiriusIcon width={40} height={40} />,
// 	title: 'Scriptum',
// 	subtitle: 'Система управления скриптами',
// };
const Links: LinkProps[] = [
  {
    icon: <HomeIcon />,
    title: 'Главная',
  },
  {
    icon: <TaskIcon />,
    title: 'Задачи',
  },
  {
    icon: <LoadIcon />,
    title: 'Загрузка скрипта',
  },
];

export const HeaderUsecase = {
  head: (
    <>
      <SiriusIcon />
      <p>Scriptum</p>
      <p>Система управления скриптами</p>
    </>
  ),
  center: (
    <>
      {Links.map((link, index) => (
        <Link key={index} icon={link.icon} title={link.title} />
      ))}
    </>
  ),
  tail: (
    <>
      <span>Иванов Иван</span>
      <Button icon={<PersonIcon />}>Выйти</Button>
    </>
  ),
};

// export const centerUsecase = () => {
//   return (
//     <nav>
//       {Links.map((link, index) => (
//         <Link key={index} icon={link.icon} title={link.title} />
//       ))}
//     </nav>
//   );
// };

// export const tailUsecase = () => {
//   return (
//     <div>
//       <span>Иванов Иван</span>
//       <Button icon={<PersonIcon />}>Выйти</Button>
//     </div>
//   );
// };
