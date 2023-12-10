import React from 'react';

import { DollarSign, Euro } from 'lucide-react';

import { ECurrency } from '@/constants/misc';
import { cn } from '@/lib/utils';
import useUserSettingsStore from '@/store/use-user-settings-store';

interface ICurrencyIcon extends React.SVGAttributes<HTMLOrSVGElement> {}

export default function CurrencyIcon({ className, ...properties }: ICurrencyIcon) {
  const currency = useUserSettingsStore((store) => store.currency);

  if (currency === ECurrency.EUR) {
    return <Euro className={cn('h-4 w-4', className)} {...properties} />;
  }

  return <DollarSign className={cn('h-4 w-4', className)} {...properties} />;
}
