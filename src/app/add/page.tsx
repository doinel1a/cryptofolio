'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import DynamicFallback from '@/components/dynamic-fallback';
import NavLink from '@/components/nav-link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ERoutesName from '@/constants/routes';
import CTabsName from '@/constants/tabs';

const AddPurchasingForm = dynamic(() => import('@/components/add/purchasing-form'), {
  ssr: false,
  loading: () => <DynamicFallback className='rounded-t-md' />
});
const AddStakingForm = dynamic(() => import('@/components/add/staking-form'), {
  ssr: false,
  loading: () => <DynamicFallback className='rounded-t-md' />
});

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
