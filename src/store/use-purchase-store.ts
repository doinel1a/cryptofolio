import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import EStorageKeys from '@/constants/keys';
import { IPurchase } from '@/interfaces/i-purchase';
import { createDeepCopy, roundDecimal } from '@/lib/utils';
import { TPurchase } from '@/schemas/s-purchase';

const initialState: IPurchase[] = [
  {
    id: uuid(),
    tokenName: 'Cardano',
    transactions: [
      {
        id: uuid(),
        unitPrice: 0.331_518_66,
        quantity: 100,
        date: {
          day: '15',
          month: '11',
          year: '2022'
        }
      },
      {
        id: uuid(),
        unitPrice: 0.451_57,
        quantity: 70,
        date: {
          day: '6',
          month: '2',
          year: '2021'
        }
      },
      {
        id: uuid(),
        unitPrice: 0.928_14,
        quantity: 70,
        date: {
          day: '21',
          month: '2',
          year: '2021'
        }
      },
      {
        id: uuid(),
        unitPrice: 1.052_67,
        quantity: 45,
        date: {
          day: '2',
          month: '3',
          year: '2021'
        }
      },
      {
        id: uuid(),
        unitPrice: 1.001_23,
        quantity: 65,
        date: {
          day: '2',
          month: '3',
          year: '2021'
        }
      },
      {
        id: uuid(),
        unitPrice: 0.9724,
        quantity: 25,
        date: {
          day: '13',
          month: '3',
          year: '2021'
        }
      },
      {
        id: uuid(),
        unitPrice: 1.1684,
        quantity: 25,
        date: {
          day: '12',
          month: '6',
          year: '2021'
        }
      },
      {
        id: uuid(),
        unitPrice: 1.9956,
        quantity: 25,
        date: {
          day: '8',
          month: '9',
          year: '2021'
        }
      }
    ]
  },
  {
    id: uuid(),
    tokenName: 'Polkadot',
    transactions: [
      {
        id: uuid(),
        unitPrice: 5.836_932,
        quantity: 10,
        date: {
          day: '15',
          month: '11',
          year: '2022'
        }
      },
      {
        id: uuid(),
        unitPrice: 8.7884,
        quantity: 5.689_316_38,
        date: {
          day: '5',
          month: '11',
          year: '2022'
        }
      },
      {
        id: uuid(),
        unitPrice: 40,
        quantity: 5,
        date: {
          day: '12',
          month: '11',
          year: '2021'
        }
      },
      {
        id: uuid(),
        unitPrice: 37.312_72,
        quantity: 3.3573,
        date: {
          day: '16',
          month: '11',
          year: '2021'
        }
      },
      {
        id: uuid(),
        unitPrice: 36.447_06,
        quantity: 1.7,
        date: {
          day: '18',
          month: '11',
          year: '2021'
        }
      },
      {
        id: uuid(),
        unitPrice: 19.556,
        quantity: 5,
        date: {
          day: '21',
          month: '1',
          year: '2022'
        }
      }
    ]
  },
  {
    id: uuid(),
    tokenName: 'MultiversX',
    transactions: [
      {
        id: uuid(),
        unitPrice: 83.24,
        quantity: 2,
        date: {
          day: '23',
          month: '2',
          year: '2021'
        }
      },
      {
        id: uuid(),
        unitPrice: 68.126_67,
        quantity: 3,
        date: {
          day: '12',
          month: '6',
          year: '2021'
        }
      },
      {
        id: uuid(),
        unitPrice: 66.576_19,
        quantity: 2.1,
        date: {
          day: '12',
          month: '6',
          year: '2021'
        }
      },
      {
        id: uuid(),
        unitPrice: 218.364_130_4,
        quantity: 1.84,
        date: {
          day: '13',
          month: '12',
          year: '2021'
        }
      },
      {
        id: uuid(),
        unitPrice: 32.573_29,
        quantity: 1.535,
        date: {
          day: '8',
          month: '1',
          year: '2021'
        }
      },
      {
        id: uuid(),
        unitPrice: 30.026_61,
        quantity: 2.631,
        date: {
          day: '8',
          month: '1',
          year: '2021'
        }
      },
      {
        id: uuid(),
        unitPrice: 29.432_55,
        quantity: 8.494,
        date: {
          day: '9',
          month: '1',
          year: '2021'
        }
      },
      {
        id: uuid(),
        unitPrice: 96.9644,
        quantity: 1.031_306_22,
        date: {
          day: '11',
          month: '5',
          year: '2022'
        }
      },
      {
        id: uuid(),
        unitPrice: 85.764,
        quantity: 0.582_99,
        date: {
          day: '21',
          month: '5',
          year: '2022'
        }
      },
      {
        id: uuid(),
        unitPrice: 82.4994,
        quantity: 0.4,
        date: {
          day: '25',
          month: '5',
          year: '2022'
        }
      },
      {
        id: uuid(),
        unitPrice: 63.44,
        quantity: 1,
        date: {
          day: '6',
          month: '6',
          year: '2022'
        }
      },
      {
        id: uuid(),
        unitPrice: 43.19,
        quantity: 1,
        date: {
          day: '19',
          month: '6',
          year: '2022'
        }
      }
    ]
  },
  {
    id: uuid(),
    tokenName: 'Itheum',
    transactions: [
      {
        id: uuid(),
        unitPrice: 0.04,
        quantity: 5000,
        date: {
          day: '28',
          month: '3',
          year: '2022'
        }
      }
    ]
  }
  // {
  //   id: uuid(),
  //   tokenName: 'Theta Network',
  //   transactions: [
  //     {
  //       id: uuid(),
  //       unitPrice: 2.191_76,
  //       quantity: 17,
  //       date: {
  //         day: '8',
  //         month: '2',
  //         year: '2021'
  //       }
  //     },
  //     {
  //       id: uuid(),
  //       unitPrice: 9.19,
  //       quantity: 3,
  //       date: {
  //         day: '18',
  //         month: '4',
  //         year: '2021'
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: uuid(),
  //   tokenName: 'VeChain',
  //   transactions: [
  //     {
  //       id: uuid(),
  //       unitPrice: 0.148_83,
  //       quantity: 666,
  //       date: {
  //         day: '16',
  //         month: '4',
  //         year: '2021'
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: uuid(),
  //   tokenName: 'Stellar',
  //   transactions: [
  //     {
  //       id: uuid(),
  //       unitPrice: 0.294_043_887_1,
  //       quantity: 31.9,
  //       date: {
  //         day: '19',
  //         month: '8',
  //         year: '2021'
  //       }
  //     },
  //     {
  //       id: uuid(),
  //       unitPrice: 0.305_33,
  //       quantity: 120,
  //       date: {
  //         day: '8',
  //         month: '10',
  //         year: '2021'
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: uuid(),
  //   tokenName: 'Sandbox',
  //   transactions: [
  //     {
  //       id: uuid(),
  //       unitPrice: 5.309,
  //       quantity: 10,
  //       date: {
  //         day: '4',
  //         month: '12',
  //         year: '2021'
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: uuid(),
  //   tokenName: 'Enjin Coin',
  //   transactions: [
  //     {
  //       id: uuid(),
  //       unitPrice: 2.588,
  //       quantity: 10,
  //       date: {
  //         day: '4',
  //         month: '12',
  //         year: '2021'
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: uuid(),
  //   tokenName: 'Siacoin',
  //   transactions: [
  //     {
  //       id: uuid(),
  //       unitPrice: 0.039_451_311_1,
  //       quantity: 2534.77,
  //       date: {
  //         day: '1',
  //         month: '3',
  //         year: '2022'
  //       }
  //     }
  //   ]
  // }
]
  .sort((a, b) => a.tokenName.localeCompare(b.tokenName))
  .map((purchase) => {
    purchase.transactions.sort((a, b) => {
      const dateA = new Date(`${a.date.year}-${a.date.month}-${a.date.day}`).getTime();
      const dateB = new Date(`${b.date.year}-${b.date.month}-${b.date.day}`).getTime();

      return dateA - dateB;
    });

    return purchase;
  });

interface IState {
  purchase: IPurchase[];
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
  const { purchase: currentPurchaseList } = state;
  const { type } = action;

  switch (type) {
    case 'addNewPurchase': {
      const { payload: newPurchase } = action;
      const { tokenName, unitPrice, quantity, date } = newPurchase as TPurchase;

      const deepCurrentPurchaseList = createDeepCopy(currentPurchaseList);
      const newTransactionIndex = deepCurrentPurchaseList.findIndex(
        (purchase) => purchase.tokenName === tokenName
      );

      if (newTransactionIndex === -1) {
        deepCurrentPurchaseList.push({
          id: uuid(),
          tokenName,
          transactions: [
            {
              id: uuid(),
              unitPrice: roundDecimal(Number(unitPrice), 5),
              quantity: roundDecimal(Number(quantity), 5),
              date: {
                day: `${date.getDate()}`,
                month: `${date.getMonth() + 1}`,
                year: `${date.getFullYear()}`
              }
            }
          ]
        });

        return {
          purchase: deepCurrentPurchaseList
        };
      }

      deepCurrentPurchaseList[newTransactionIndex].transactions.push({
        id: uuid(),
        unitPrice: roundDecimal(Number(unitPrice), 5),
        quantity: roundDecimal(Number(quantity), 5),
        date: {
          day: `${date.getDate()}`,
          month: `${date.getMonth() + 1}`,
          year: `${date.getFullYear()}`
        }
      });

      return {
        purchase: deepCurrentPurchaseList
      };
    }
    case 'deletePurchase': {
      const idToRemove = action.payload as string;

      let deepCurrentPurchaseList = createDeepCopy(currentPurchaseList);
      deepCurrentPurchaseList = deepCurrentPurchaseList.filter(
        (purchase) => purchase.id !== idToRemove
      );

      return {
        purchase: deepCurrentPurchaseList
      };
    }
    case 'deletePurchaseTransaction': {
      const idToRemove = action.payload as string;

      let deepCurrentPurchaseList = createDeepCopy(currentPurchaseList);

      let purchaseIdToRemove = '';

      for (const purchase of deepCurrentPurchaseList) {
        const transactionToRemoveIndex = purchase.transactions.findIndex(
          (transaction) => transaction.id === idToRemove
        );

        if (transactionToRemoveIndex !== -1) {
          if (purchase.transactions.length === 1) {
            purchaseIdToRemove = purchase.id;

            break;
          }

          purchase.transactions = purchase.transactions.filter(
            (transaction) => transaction.id !== idToRemove
          );

          break;
        }
      }

      if (purchaseIdToRemove !== '') {
        deepCurrentPurchaseList = deepCurrentPurchaseList.filter(
          (purchase) => purchase.id !== purchaseIdToRemove
        );
      }

      return {
        purchase: deepCurrentPurchaseList
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
      purchase: initialState,
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
