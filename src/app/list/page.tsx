import React from 'react';

import PurchaseList from '@/components/list/purchase';
import StakeList from '@/components/list/stake';
import NavLink from '@/components/nav-link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ERoutesName from '@/constants/routes';
import CTabsName from '@/constants/tabs';

interface IListPage {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ListPage({ searchParams }: IListPage) {
  const selectedTab = (searchParams.tab || CTabsName.purchase) as string;

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
      <TabsContent value={CTabsName.purchase} className='h-full w-full'>
        <PurchaseList />
      </TabsContent>
      <TabsContent value={CTabsName.stake} className='h-full w-full'>
        <StakeList />
      </TabsContent>
    </Tabs>
  );
}
