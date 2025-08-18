import { FC } from 'react';
import { Props } from './SectionLayout.props';
import style from './SectionLayout.module.css';
import cn from 'classnames';

export const SectionLayout: FC<Props> = ({ title, subtitle, className, children, ...props }) => {
  return (
    <div className={cn(style.section, className)} {...props}>
      <div className={style.head}>
        <h2 className={style.title}>{title}</h2>
        <p className={style.subtitle}>{subtitle}</p>
      </div>
      <div className={style.main}>{children}</div>
    </div>
  );
};
