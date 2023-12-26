'use client';

import React from 'react';

import type ITokenData from '@/interfaces/i-token-data';

import usePurchaseStore from '@/store/use-purchase-store';

import UIStatus from '../ui-status';
import PurchaseListRow from './shared/purchase-list-row';

interface IPurchaseList {
  isTokensDataLoading: boolean;
  tokensData: ITokenData[];
}

export default function PurchaseList({ tokensData, isTokensDataLoading }: IPurchaseList) {
  const purchaseList = usePurchaseStore((store) => store.purchase);

  if (purchaseList.length === 0) {
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
        {purchaseList.map((purchase) => (
          <div key={purchase.id} className='flex w-full flex-col'>
            <div className='h-24 w-full animate-pulse rounded-md bg-background' />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='flex h-full w-full flex-col gap-y-5 rounded-t-md'>
      {purchaseList.map(
        (purchase) =>
          tokensData?.map(
            (token) =>
              purchase.tokenName === token?.name && (
                <PurchaseListRow
                  key={purchase.id}
                  purchaseID={purchase.id}
                  transactions={purchase.transactions}
                  tokenName={token.name}
                  tokenSymbol={token.symbol}
                  tokenLogoURL={token.logoURL}
                  tokenCurrentPrice={token.currentPrice}
                />
              )
          )
      )}
    </div>
  );
}
