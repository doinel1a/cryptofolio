/* eslint-disable semi */
/* eslint-disable unicorn/prevent-abbreviations */

export interface IPurchase {
  id: string;
  tokenName: string;
  transactions: IPurchaseTransaction[];
}

export interface IPurchaseTransaction {
  id: string;
  unitPrice: number;
  quantity: number;
  date: {
    day: string;
    month: string;
    year: string;
  };
}
