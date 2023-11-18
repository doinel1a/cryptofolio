'use client';

import React from 'react';

import { AlertTriangle } from 'lucide-react';

import useGetSupportedTokens from '@/hooks/use-get-supported-tokens';
import useGetTokensData from '@/hooks/use-get-tokens-data';
import usePurchaseStore from '@/store/use-purchase-store';

import PurchaseListRow from './shared/purchase-list-row';

const oneHour = 1;
const minsIn1Hour = 60;
const secsIn1Min = 60;
const msIn1Sec = 1000;
const refetchInterval = oneHour * minsIn1Hour * secsIn1Min * msIn1Sec;

export default function PurchaseList() {
  const purchasedList = usePurchaseStore((state) => state.purchased);

  const { data: supportedTokens } = useGetSupportedTokens(
    purchasedList,
    purchasedList.length > 0,
    refetchInterval
  );
  const { isLoading: isTokensDataLoading, tokensData } = useGetTokensData(
    supportedTokens,
    refetchInterval
  );

  if (purchasedList.length === 0) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center gap-y-2.5'>
        <AlertTriangle className='h-16 w-16 text-yellow-400' />
        <p className='text-center text-lg'>
          Nothing to show! <br />
          Add some token purchases
        </p>
      </div>
    );
  }

  if (isTokensDataLoading) {
    return (
      <div className='flex h-full w-full flex-col gap-y-5 p-4'>
        {purchasedList.map((purchased) => (
          <div key={purchased.id} className='h-16 w-full animate-pulse rounded-md bg-background' />
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
