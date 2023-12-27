import React from 'react';

import { cn, formatNumber, roundDecimal } from '@/lib/utils';
import useUserSettingsStore from '@/store/use-user-settings-store';

import CurrencyIcon from './currency-icon';

interface IColumn extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  isCurrency?: boolean;
  titleCSS?: string;
  contentCSS?: string;
}

export default function Column({
  title,
  value,
  isCurrency = false,
  titleCSS,
  contentCSS,
  className: columnCSS,
  ...properties
}: IColumn) {
  const currency = useUserSettingsStore((store) => store.currency);

  const _value = typeof value === 'number' ? formatNumber(roundDecimal(value, 2), currency) : value;

  return (
    <div
      className={cn('flex w-1/4 flex-col items-center justify-center gap-y-1.5', columnCSS)}
      {...properties}
    >
      <p className={cn('text-xs', titleCSS)}>{title}</p>
      <p className={cn('flex items-center gap-x-1 text-sm', contentCSS)}>
        {isCurrency ? <CurrencyIcon className='h-3 w-3' /> : <></>}
        {_value}
      </p>
    </div>
  );
}
