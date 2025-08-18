import { FC } from 'react';
import cn from 'classnames';
import style from './Stats.module.css';
import { Props } from './Stats.props';
import React from 'react';

export const Stats: FC<Props> = ({ stats, separator = '|', className, ...props }) => {
  return (
    <div {...props} className={cn(style.stats, className)}>
      {stats.map((stat, index) => (
        <React.Fragment key={`stat-${index}`}>
          <span className={style.counter}>
            {stat.text}: {stat.count}
            {stat.total !== undefined && ` из ${stat.total}`}
            {stat.unit && ` ${stat.unit}`}
          </span>

          {index < stats.length - 1 && <span className={style.divider}>{separator}</span>}
        </React.Fragment>
      ))}
    </div>
  );
};
