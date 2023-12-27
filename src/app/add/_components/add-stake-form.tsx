'use client';

import React from 'react';

import type { TStake } from '@/schemas/s-stake';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { StakeSchema } from '@/schemas/s-stake';

import { Button } from '../../../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../../components/ui/form/form';
import { Input } from '../../../components/ui/form/input';

export default function AddStakeForm() {
  const form = useForm<TStake>({
    resolver: zodResolver(StakeSchema)
  });

  // eslint-disable-next-line unicorn/consistent-function-scoping
  function onSubmit(values: TStake) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <FormField
          control={form.control}
          name='tokenName'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center'>
                <FormLabel>Token name</FormLabel>
                &nbsp;
                <FormMessage />
              </div>

              <FormControl>
                <Input type='text' placeholder='Ethereum' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='providerName'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center'>
                <FormLabel>Provider name</FormLabel>
                &nbsp;
                <FormMessage />
              </div>

              <FormControl>
                <Input type='text' placeholder='Binance' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='quantity'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center'>
                <FormLabel>Quantity</FormLabel>
                &nbsp;
                <FormMessage />
              </div>

              <FormControl>
                <Input type='text' inputMode='decimal' placeholder='1.000' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className='flex w-full gap-x-2.5'>
          <div className='w-1/2'>
            <FormField
              control={form.control}
              name='apr'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center'>
                    <FormLabel>APR %</FormLabel>
                    &nbsp;
                    <FormMessage />
                  </div>

                  <FormControl>
                    <Input type='text' inputMode='decimal' placeholder='10' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className='w-1/2'>
            <FormField
              control={form.control}
              name='apy'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center'>
                    <FormLabel>APY %</FormLabel>
                    &nbsp;
                    <FormMessage />
                  </div>

                  <FormControl>
                    <Input type='text' inputMode='decimal' placeholder='15' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type='submit' className='w-full'>
          Add stake
        </Button>
      </form>
    </Form>
  );
}
