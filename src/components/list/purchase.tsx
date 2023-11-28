'use client';

import React from 'react';

import IAPITokenData from '@/interfaces/i-api-token-data';
import { IPurchase } from '@/interfaces/i-purchase';

import UIStatus from '../ui-status';
import PurchaseListRow from './shared/purchase-list-row';

interface IPurchaseList {
  purchasedList: IPurchase[];
  tokensData: (IAPITokenData | undefined)[] | undefined;
  isTokensDataLoading: boolean;
}

export default function PurchaseList({
  purchasedList,
  tokensData,
  isTokensDataLoading
}: IPurchaseList) {
  if (purchasedList.length === 0) {
    return (
      <UIStatus
        status='warning'
        statusTitle='Nothing to show!'
        statusMessage='Add some token purchases'
      />
    );
  }

  if (isTokensDataLoading) {
    return (
      <div className='flex h-full w-full flex-col gap-y-5 rounded-t-md'>
        {purchasedList.map((purchased) => (
          <div key={purchased.id} className='flex w-full flex-col'>
            <div className='h-24 w-full animate-pulse rounded-md bg-background' />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='flex h-full w-full flex-col gap-y-5 rounded-t-md'>
      {purchasedList.map(
        (purchased) =>
          tokensData?.map(
            (token) =>
              purchased.tokenName === token?.name && (
                <PurchaseListRow
                  key={purchased.id}
                  purchaseID={purchased.id}
                  tokenName={token.name}
                  tokenSymbol={token.symbol}
                  tokenLogoURL={token.logoURL}
                  tokenCurrentPrice={token.currentPrice}
                  transactions={purchased.transactions}
                />
              )
          )
      )}
    </div>
  );
}
