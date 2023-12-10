'use client';

import React, { useState } from 'react';

import { ChevronUp } from 'lucide-react';

import { IPurchaseTransaction } from '@/interfaces/i-purchase';
import { cn, formatNumber, roundDecimal } from '@/lib/utils';
import usePurchaseStore from '@/store/use-purchase-store';
import useUserSettingsStore from '@/store/use-user-settings-store';

import Column from './column';
import CurrencyIcon from './currency-icon';
import DeleteButton from './delete-button';
import TokenLogo from './token-logo';

interface IPurchaseListRow extends React.HTMLAttributes<HTMLDivElement> {
  purchaseID: string;
  transactions: IPurchaseTransaction[];
  tokenName: string;
  tokenSymbol: string;
  tokenLogoURL: string;
  tokenCurrentPrice: number;
}

export default function PurchaseListRow({
  purchaseID,
  transactions,
  tokenName,
  tokenSymbol,
  tokenLogoURL,
  tokenCurrentPrice,
  className,
  ...properties
}: IPurchaseListRow) {
  const currency = useUserSettingsStore((store) => store.currency);

  const deletePurchase = usePurchaseStore((store) => store.deletePurchase);
  const deletePurchaseTransaction = usePurchaseStore((store) => store.deletePurchaseTransaction);

  const [isTransactionsListExpanded, setIsTransactionsListExpanded] = useState(false);

  const currentInvestmentValue = transactions.reduce(
    (accumulator, currentTx) => accumulator + currentTx.quantity * tokenCurrentPrice,
    0
  );
  const totalInvested = transactions.reduce(
    (accumulator, currentTx) => accumulator + currentTx.unitPrice * currentTx.quantity,
    0
  );
  const totalPurchaseQuantity = transactions.reduce(
    (accumulator, currentTx) => accumulator + currentTx.quantity,
    0
  );
  const investmentOutcome = Math.abs(currentInvestmentValue - totalInvested);
  const averagePurchasePrice = totalInvested / totalPurchaseQuantity;

  return (
    <div className='flex w-full flex-col'>
      <div
        tabIndex={0}
        role='button'
        className={cn(
          `relative flex h-24 w-full items-center justify-center border 
          ${isTransactionsListExpanded ? 'rounded-t-md' : 'rounded-md'}`,
          className
        )}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === 'Space') {
            setIsTransactionsListExpanded((previousState) => !previousState);
          }
        }}
        onClick={() => setIsTransactionsListExpanded((previousState) => !previousState)}
        {...properties}
      >
        <DeleteButton
          variant='secondary'
          className='absolute -right-3 -top-3 rounded-full'
          onClick={(event) => {
            event.stopPropagation();

            deletePurchase(purchaseID);
          }}
        />

        <div className='flex w-full items-center py-2.5'>
          <div className='mr-2.5 h-16 w-1 rounded-r-md bg-accent-secondary' />

          <TokenLogo alt={`${tokenName}'s logo`} src={tokenLogoURL} />

          <div className='mx-2.5 flex w-full flex-col'>
            <div className='flex h-1/2 w-full items-center justify-between'>
              <p className='text-base font-bold'>{tokenName}</p>
              <p className='text-xs'>Market value</p>
            </div>

            <div className='flex h-1/2 w-full items-center justify-between'>
              <p className='text-sm'>
                {formatNumber(roundDecimal(totalPurchaseQuantity), currency)} {tokenSymbol}
              </p>
              <p
                className={`flex items-center gap-x-1 ${
                  currentInvestmentValue > totalInvested ? 'text-green-500' : 'text-destructive'
                }`}
              >
                <CurrencyIcon /> {formatNumber(roundDecimal(currentInvestmentValue, 2), currency)}
              </p>
            </div>
          </div>
        </div>

        <span className='absolute bottom-[0.5px] flex items-center'>
          <ChevronUp
            className={`h-5 w-5 transition-transform ${
              isTransactionsListExpanded ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </span>
      </div>

      {isTransactionsListExpanded && (
        <div className='flex w-full flex-col gap-y-2.5 rounded-b-md border px-2.5 pt-3.5'>
          <div className='flex w-full flex-col gap-2.5'>
            <div className='flex gap-2.5'>
              <Column
                title='Current price'
                value={tokenCurrentPrice}
                className='w-1/2 rounded-md border p-1.5'
                isCurrency
              />

              <Column
                title='Average price'
                value={averagePurchasePrice}
                className='w-1/2 rounded-md border p-1.5'
                isCurrency
              />
            </div>

            <div className='flex gap-2.5'>
              <Column
                title={currentInvestmentValue > totalInvested ? 'Gain' : 'Loss'}
                value={investmentOutcome}
                className='w-1/2 rounded-md border p-1.5'
                isCurrency
              />

              <Column
                title='Investment'
                value={totalInvested}
                className='w-1/2 rounded-md border p-1.5'
                isCurrency
              />
            </div>
          </div>

          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`flex h-16 w-full items-center justify-between ${
                index === transactions.length - 1 ? '' : 'border-b-2'
              }`}
            >
              <Column title='Price' value={transaction.unitPrice} isCurrency />
              <Column title='Qty' value={transaction.quantity} />
              <Column
                title='Cost'
                value={transaction.unitPrice * transaction.quantity}
                isCurrency
              />
              <Column
                title='Date'
                value={`
                  ${transaction.date.day}/
                  ${transaction.date.month}/
                  ${transaction.date.year.slice(2)}
                `}
              />

              <DeleteButton
                variant='ghost'
                className='flex h-full items-start'
                onClick={() => deletePurchaseTransaction(transaction.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
