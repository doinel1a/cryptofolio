'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { StakingSchema, TStaking } from '@/schemas/s-staking';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form/form';
import { Input } from '../ui/form/input';

export default function AddStakingForm() {
  const form = useForm<TStaking>({
    resolver: zodResolver(StakingSchema)
  });

  // eslint-disable-next-line unicorn/consistent-function-scoping
  function onSubmit(values: TStaking) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center'>
                <FormLabel>Name</FormLabel>
                &nbsp;
                <FormMessage />
              </div>

              <FormControl>
                <Input type='text' placeholder='Token name' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='provider'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center'>
                <FormLabel>Provider</FormLabel>
                &nbsp;
                <FormMessage />
              </div>

              <FormControl>
                <Input type='text' placeholder='Provider name' {...field} />
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
                <Input type='text' inputMode='decimal' placeholder='Token quantity' {...field} />
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
                    <Input type='text' inputMode='decimal' placeholder='APR value' {...field} />
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
                    <Input type='text' inputMode='decimal' placeholder='APY value' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type='submit' className='w-full'>
          Add staking
        </Button>
      </form>
    </Form>
  );
}
