'use client';

import React, { useEffect, useState } from 'react';

import type ITokenData from '@/interfaces/i-token-data';

import dynamic from 'next/dynamic';

import StakeList from '@/app/list/_components/stake-list';
import DynamicFallback from '@/components/dynamic-fallback';
import NavLink from '@/components/nav-link';
import UIStatus from '@/components/ui-status';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { refetchInterval } from '@/constants/misc';
import ERoutesName from '@/constants/routes';
import CTabsName from '@/constants/tabs';
import useGetTokensMetadata from '@/hooks/use-get-tokens-metadata';
import useGetTokensPrice from '@/hooks/use-get-tokens-price';
import useGetTokensSymbol from '@/hooks/use-get-tokens-symbol';
import usePurchaseStore from '@/store/use-purchase-store';
import useUserSettingsStore from '@/store/use-user-settings-store';

const PurchaseList = dynamic(() => import('@/app/list/_components/purchase-list'), {
  ssr: false,
  loading: () => <DynamicFallback className='rounded-t-md' />
});

interface IListPage {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function ListPage({ searchParams }: IListPage) {
  const selectedTab = (searchParams.tab ?? CTabsName.purchase) as string;

  const apiKey = useUserSettingsStore((store) => store.apiKey);
  const currency = useUserSettingsStore((store) => store.currency);
  const purchaseList = usePurchaseStore((store) => store.purchase);

  const [tokensData, setTokensData] = useState<ITokenData[]>([]);

  const {
    isLoading: isTokensSymbolLoading,
    error: tokensSymbolError,
    data: tokensSymbol
  } = useGetTokensSymbol(apiKey, purchaseList, purchaseList.length > 0);

  const {
    isLoading: isTokensMetadataLoading,
    error: tokensMetadataError,
    data: tokensMetadata
  } = useGetTokensMetadata(
    apiKey,
    tokensSymbol,
    tokensSymbol !== undefined && tokensSymbol.length > 0
  );

  const {
    isLoading: isTokensPriceLoading,
    error: tokensPriceError,
    data: tokensPrice
  } = useGetTokensPrice(
    apiKey,
    currency,
    tokensSymbol,
    refetchInterval,
    tokensSymbol !== undefined && tokensSymbol.length > 0
  );

  useEffect(() => {
    if (
      !isTokensMetadataLoading &&
      !tokensMetadataError &&
      tokensMetadata &&
      !isTokensPriceLoading &&
      !tokensPriceError &&
      tokensPrice
    ) {
      const _tokensData: ITokenData[] = tokensMetadata.map((tokenMetadata) => {
        const _tokensPrice = tokensPrice.find((token) => token.id === tokenMetadata.id);

        return {
          ...tokenMetadata,
          ..._tokensPrice!
        } satisfies ITokenData;
      });

      setTokensData(_tokensData);
    }
  }, [
    isTokensMetadataLoading,
    tokensMetadataError,
    tokensMetadata,
    isTokensPriceLoading,
    tokensPriceError,
    tokensPrice
  ]);

  if (tokensSymbolError) {
    return (
      <UIStatus status='error' statusTitle='Error' statusMessage={tokensSymbolError.message} />
    );
  }

  if (tokensMetadataError) {
    return (
      <UIStatus status='error' statusTitle='Error' statusMessage={tokensMetadataError.message} />
    );
  }

  if (tokensPriceError) {
    return <UIStatus status='error' statusTitle='Error' statusMessage={tokensPriceError.message} />;
  }

  return (
    <Tabs defaultValue={selectedTab} className='flex h-full w-full flex-col p-2.5'>
      <TabsList className='w-full'>
        <TabsTrigger value={CTabsName.purchase} className='w-1/2 p-0'>
          <NavLink href={ERoutesName.purchaseList} className='h-full w-full px-3 py-1.5'>
            Purchase
          </NavLink>
        </TabsTrigger>
        <TabsTrigger value={CTabsName.stake} className='w-1/2 p-0'>
          <NavLink href={ERoutesName.stakeList} className='h-full w-full px-3 py-1.5'>
            Stake
          </NavLink>
        </TabsTrigger>
      </TabsList>
      <TabsContent value={CTabsName.purchase} className='h-full w-full overflow-y-scroll p-4'>
        <PurchaseList
          isTokensDataLoading={
            isTokensSymbolLoading || isTokensMetadataLoading || isTokensPriceLoading
          }
          tokensData={tokensData}
        />
      </TabsContent>
      <TabsContent value={CTabsName.stake} className='h-full w-full overflow-y-scroll p-4'>
        <StakeList />
      </TabsContent>
    </Tabs>
  );
}
