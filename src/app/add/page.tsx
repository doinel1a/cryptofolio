import React from 'react';

import AddPurchasingForm from '@/components/add/purchasing-form';
import AddStakingForm from '@/components/add/staking-form';
import NavLink from '@/components/nav-link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ERoutesName from '@/constants/routes';
import CTabsName from '@/constants/tabs';

interface IAddPage {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function AddPage({ searchParams }: IAddPage) {
  const selectedTab = (searchParams.tab || 'purchasing') as string;

  return (
    <Tabs defaultValue={selectedTab} className='flex h-full w-full flex-col p-2.5'>
      <TabsList className='w-full'>
        <TabsTrigger value={CTabsName.purchasing} className='w-1/2 p-0'>
          <NavLink href={ERoutesName.addPurchasing} className='h-full w-full px-3 py-1.5'>
            Purchasing
          </NavLink>
        </TabsTrigger>
        <TabsTrigger value={CTabsName.staking} className='w-1/2 p-0'>
          <NavLink href={ERoutesName.addStaking} className='h-full w-full px-3 py-1.5'>
            Staking
          </NavLink>
        </TabsTrigger>
      </TabsList>
      <TabsContent value={CTabsName.purchasing} className='h-full w-full'>
        <AddPurchasingForm />
      </TabsContent>
      <TabsContent value={CTabsName.staking} className='h-full w-full'>
        <AddStakingForm />
      </TabsContent>
    </Tabs>
  );
}
