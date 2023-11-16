import React from 'react';

import PurchasingList from '@/components/list/purchasing';
import StakingList from '@/components/list/staking';
import NavLink from '@/components/nav-link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ERoutesName from '@/constants/routes';
import CTabsName from '@/constants/tabs';

interface IListPage {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ListPage({ searchParams }: IListPage) {
  const selectedTab = (searchParams.tab || 'purchasing') as string;

  return (
    <Tabs defaultValue={selectedTab} className='flex h-full w-full flex-col p-2.5'>
      <TabsList className='w-full'>
        <TabsTrigger value={CTabsName.purchasing} className='w-1/2 p-0'>
          <NavLink href={ERoutesName.purchasingList} className='h-full w-full px-3 py-1.5'>
            Purchasing
          </NavLink>
        </TabsTrigger>
        <TabsTrigger value={CTabsName.staking} className='w-1/2 p-0'>
          <NavLink href={ERoutesName.stakingList} className='h-full w-full px-3 py-1.5'>
            Staking
          </NavLink>
        </TabsTrigger>
      </TabsList>
      <TabsContent value={CTabsName.purchasing} className='h-full w-full'>
        <PurchasingList />
      </TabsContent>
      <TabsContent value={CTabsName.staking} className='h-full w-full'>
        <StakingList />
      </TabsContent>
    </Tabs>
  );
}
