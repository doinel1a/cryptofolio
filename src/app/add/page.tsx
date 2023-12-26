'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import DynamicFallback from '@/components/dynamic-fallback';
import NavLink from '@/components/nav-link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ERoutesName from '@/constants/routes';
import CTabsName from '@/constants/tabs';

const AddPurchaseForm = dynamic(() => import('@/components/forms/purchase'), {
  ssr: false,
  loading: () => <DynamicFallback className='rounded-t-md' />
});
const AddStakeForm = dynamic(() => import('@/components/forms/stake'), {
  ssr: false,
  loading: () => <DynamicFallback className='rounded-t-md' />
});

interface IAddPage {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function AddPage({ searchParams }: IAddPage) {
  const selectedTab = (searchParams.tab ?? CTabsName.purchase) as string;

  return (
    <Tabs defaultValue={selectedTab} className='flex h-full w-full flex-col p-2.5'>
      <TabsList className='w-full'>
        <TabsTrigger value={CTabsName.purchase} className='w-1/2 p-0'>
          <NavLink href={ERoutesName.addPurchase} className='h-full w-full px-3 py-1.5'>
            Purchase
          </NavLink>
        </TabsTrigger>
        <TabsTrigger value={CTabsName.stake} className='w-1/2 p-0'>
          <NavLink href={ERoutesName.addStake} className='h-full w-full px-3 py-1.5'>
            Stake
          </NavLink>
        </TabsTrigger>
      </TabsList>
      <TabsContent value={CTabsName.purchase} className='h-full w-full p-4'>
        <AddPurchaseForm />
      </TabsContent>
      <TabsContent value={CTabsName.stake} className='h-full w-full p-4'>
        <AddStakeForm />
      </TabsContent>
    </Tabs>
  );
}
