import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import EStorageKeys from '@/constants/keys';
import { IPurchase } from '@/interfaces/i-purchase';
import { createDeepCopy, roundDecimal } from '@/lib/utils';
import { TPurchase } from '@/schemas/s-purchase';

interface IState {
  purchased: IPurchase[];
}

interface IActions {
  addNewPurchase: (newPurchase: TPurchase) => void;
  deletePurchase: (id: string) => void;
  deletePurchaseTransaction: (id: string) => void;
}

interface IAction {
  type: keyof IActions;
  payload: string | TPurchase;
}

function purchaseReducer(state: IState, action: IAction) {
  const { purchased: currentPurchases } = state;
  const { type } = action;

  switch (type) {
    case 'addNewPurchase': {
      const { payload: newPurchase } = action;
      const { tokenName, unitPrice, quantity, date } = newPurchase as TPurchase;
      const newTransactionIndex = currentPurchases.findIndex(
        (purchase) => purchase.tokenName === tokenName
      );
      const deepCurrentPurchases = createDeepCopy(currentPurchases);

      if (newTransactionIndex === -1) {
        deepCurrentPurchases.push({
          id: uuid(),
          tokenName,
          transactions: [
            {
              id: uuid(),
              unitPrice: roundDecimal(Number(unitPrice), 5),
              quantity: roundDecimal(Number(quantity), 5),
              totalCost: roundDecimal(Number(unitPrice) * Number(quantity), 5),
              date: {
                day: `${date.getDay()}`,
                month: `${date.getMonth()}`,
                year: `${date.getFullYear()}`
              }
            }
          ],
          totalQuantity: Number(quantity),
          totalInvestment: Number(unitPrice) * Number(quantity)
        });

        return {
          purchased: deepCurrentPurchases
        };
      }

      deepCurrentPurchases[newTransactionIndex].transactions.push({
        id: uuid(),
        unitPrice: roundDecimal(Number(unitPrice), 5),
        quantity: roundDecimal(Number(quantity), 5),
        totalCost: roundDecimal(Number(unitPrice) * Number(quantity), 5),
        date: {
          day: `${date.getDay()}`,
          month: `${date.getMonth()}`,
          year: `${date.getFullYear()}`
        }
      });
      deepCurrentPurchases[newTransactionIndex].totalQuantity = roundDecimal(
        deepCurrentPurchases[newTransactionIndex].totalQuantity + Number(quantity),
        5
      );
      deepCurrentPurchases[newTransactionIndex].totalInvestment = roundDecimal(
        deepCurrentPurchases[newTransactionIndex].totalInvestment +
          Number(unitPrice) * Number(quantity),
        5
      );

      return {
        purchased: deepCurrentPurchases
      };
    }
    case 'deletePurchase': {
      const idToRemove = action.payload as string;
      let deepCurrentPurchases = createDeepCopy(currentPurchases);
      deepCurrentPurchases = deepCurrentPurchases.filter((purchase) => purchase.id !== idToRemove);

      return {
        purchased: deepCurrentPurchases
      };
    }
    case 'deletePurchaseTransaction': {
      const idToRemove = action.payload as string;
      let deepCurrentPurchases = createDeepCopy(currentPurchases);

      let purchaseIdToRemove = '';

      for (const purchase of deepCurrentPurchases) {
        const transactionToRemoveIndex = purchase.transactions.findIndex(
          (transaction) => transaction.id === idToRemove
        );

        if (transactionToRemoveIndex !== -1) {
          if (purchase.transactions.length === 1) {
            purchaseIdToRemove = purchase.id;

            break;
          }

          const transactionQuantity = purchase.transactions[transactionToRemoveIndex].quantity;
          const transactionTotalCost = purchase.transactions[transactionToRemoveIndex].totalCost;

          purchase.transactions = purchase.transactions.filter(
            (transaction) => transaction.id !== idToRemove
          );

          purchase.totalQuantity = roundDecimal(purchase.totalQuantity - transactionQuantity, 5);
          purchase.totalInvestment = roundDecimal(
            purchase.totalInvestment - transactionTotalCost,
            5
          );

          break;
        }
      }

      if (purchaseIdToRemove !== '') {
        deepCurrentPurchases = deepCurrentPurchases.filter(
          (purchase) => purchase.id !== purchaseIdToRemove
        );
      }

      return {
        purchased: deepCurrentPurchases
      };
    }
    default: {
      return state;
    }
  }
}

const usePurchaseStore = create(
  persist<IState & IActions>(
    (set) => ({
      purchased: [] as IPurchase[],
      addNewPurchase: (newPurchase: TPurchase) =>
        set((state) => purchaseReducer(state, { type: 'addNewPurchase', payload: newPurchase })),
      deletePurchase: (id: string) =>
        set((state) => purchaseReducer(state, { type: 'deletePurchase', payload: id })),
      deletePurchaseTransaction: (id: string) =>
        set((state) => purchaseReducer(state, { type: 'deletePurchaseTransaction', payload: id }))
    }),
    {
      name: EStorageKeys.purchase
    }
  )
);

export default usePurchaseStore;
