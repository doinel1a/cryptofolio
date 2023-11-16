'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { PurchaseSchema, TPurchase } from '@/schemas/s-purchase';
import usePurchaseStore from '@/store/use-purchase-store';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form/form';
import { Input } from '../ui/form/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export default function AddPurchaseForm() {
  const addNewPurchase = usePurchaseStore((state) => state.addNewPurchase);

  const form = useForm<TPurchase>({
    resolver: zodResolver(PurchaseSchema),
    defaultValues: {
      tokenName: '',
      unitPrice: '',
      quantity: '',
      date: new Date()
    }
  });

  function onSubmit(values: TPurchase) {
    addNewPurchase(values);
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
                <Input type='text' placeholder='Bitcoin' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='unitPrice'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center'>
                <FormLabel>Unit price</FormLabel>
                &nbsp;
                <FormMessage />
              </div>

              <FormControl>
                <Input type='text' inputMode='decimal' placeholder='20.000' {...field} />
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
                <Input type='text' inputMode='decimal' placeholder='100' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <div className='flex items-center'>
                <FormLabel>Date</FormLabel>
                &nbsp;
                <FormMessage />
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? format(field.value, 'PPP') : <span>Purchase date</span>}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full'>
          Add purchase
        </Button>
      </form>
    </Form>
  );
}
