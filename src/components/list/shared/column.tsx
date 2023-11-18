import React from 'react';

import { cn, roundDecimal } from '@/lib/utils';

interface IColumn extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  currency?: boolean;
  titleCSS?: string;
  contentCSS?: string;
}

export default function Column({
  title,
  value,
  currency = false,
  titleCSS,
  contentCSS,
  className: columnCSS,
  ...properties
}: IColumn) {
  const _value =
    typeof value === 'number'
      ? `${currency ? '€' : ''} ${roundDecimal(value, 2).toLocaleString('it')}`
      : value;

  return (
    <div
      className={cn('flex w-1/4 flex-col items-center justify-center gap-y-1.5', columnCSS)}
      {...properties}
    >
      <p className={cn('text-xs', titleCSS)}>{title}</p>
      <p className={cn('text-sm', contentCSS)}>{_value}</p>
    </div>
  );
}
