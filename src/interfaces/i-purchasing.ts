/* eslint-disable semi */
/* eslint-disable unicorn/prevent-abbreviations */

import { TPurchasing } from '@/schemas/s-purchasing';

export default interface IPurchasing {
  id: string;
  name: string;
  transactions: TPurchasing[];
  totalQuantity: number;
  totalInvestment: number;
}
