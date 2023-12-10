import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ECurrency } from '@/constants/misc';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createDeepCopy<T>(object: T): T {
  return JSON.parse(JSON.stringify(object)) as T;
}

export function roundDecimal(value: number, decimalPlace?: number) {
  switch (decimalPlace) {
    case 1: {
      return Math.round((value + Number.EPSILON) * 10) / 10;
    }
    case 2: {
      return Math.round((value + Number.EPSILON) * 100) / 100;
    }
    case 3: {
      return Math.round((value + Number.EPSILON) * 1000) / 1000;
    }
    case 4: {
      return Math.round((value + Number.EPSILON) * 10_000) / 10_000;
    }
    case 5: {
      return Math.round((value + Number.EPSILON) * 100_000) / 100_000;
    }
    default: {
      return Math.round((value + Number.EPSILON) * 1) / 1;
    }
  }
}

export function formatNumber(value: number, currency: ECurrency) {
  if (currency === ECurrency.EUR) {
    return value.toLocaleString('it');
  }

  return value.toLocaleString('en');
}
