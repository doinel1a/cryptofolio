'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import DynamicFallback from '@/components/dynamic-fallback';
import StakeList from '@/components/list/stake';
import NavLink from '@/components/nav-link';
import UIStatus from '@/components/ui-status';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { refetchInterval } from '@/constants/misc';
import ERoutesName from '@/constants/routes';
import CTabsName from '@/constants/tabs';
import useGetSupportedTokens from '@/hooks/use-get-supported-tokens';
import useGetTokensData from '@/hooks/use-get-tokens-data';
import usePurchaseStore from '@/store/use-purchase-store';

const PurchaseList = dynamic(() => import('@/components/list/purchase'), {
  ssr: false,
  loading: () => <DynamicFallback className='rounded-t-md' />
});

interface IListPage {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ListPage({ searchParams }: IListPage) {
  const selectedTab = (searchParams.tab || CTabsName.purchase) as string;

  const purchaseList = usePurchaseStore((state) => state.purchase);

  const { error: supportedTokensErrorMessage, data: supportedTokens } = useGetSupportedTokens(
    purchaseList,
    purchaseList.length > 0
  );
  const { isLoading: isTokensDataLoading, tokensData } = useGetTokensData(
    supportedTokens,
    refetchInterval
  );

  if (supportedTokensErrorMessage) {
    return (
      <UIStatus
        status='error'
        statusTitle='Error'
        statusMessage={supportedTokensErrorMessage.message}
      />
    );
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
          purchaseList={purchaseList}
          tokensData={tokensData}
          isTokensDataLoading={isTokensDataLoading}
        />
      </TabsContent>
      <TabsContent value={CTabsName.stake} className='h-full w-full overflow-y-scroll p-4'>
        <StakeList />
      </TabsContent>
    </Tabs>
  );
}
