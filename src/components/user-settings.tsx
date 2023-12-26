'use client';

import React, { useState } from 'react';

import type { TUserSettings } from '@/schemas/s-user-settings';

import { zodResolver } from '@hookform/resolvers/zod';
import { CircleUserRound, DollarSign, Euro } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { ECurrency } from '@/constants/misc';
import { UserSettingsSchema } from '@/schemas/s-user-settings';
import useUserSettingsStore from '@/store/use-user-settings-store';

import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form/form';
import { Input } from './ui/form/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { useToast } from './ui/use-toast';

export default function UserSettings() {
  const apiKey = useUserSettingsStore((store) => store.apiKey);
  const currency = useUserSettingsStore((store) => store.currency);

  const setAPIKey = useUserSettingsStore((store) => store.setAPIKey);
  const setCurrency = useUserSettingsStore((store) => store.setCurrency);

  const { toast } = useToast();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [previousState, setPreviousState] = useState({
    apiKey: apiKey,
    currency: currency
  });

  const form = useForm<TUserSettings>({
    resolver: zodResolver(UserSettingsSchema),
    defaultValues: {
      apiKey: apiKey,
      currency: currency
    }
  });

  function onSubmit(values: TUserSettings) {
    if (
      values.apiKey.toString() !== previousState.apiKey.toString() ||
      values.currency.toString() !== previousState.currency.toString()
    ) {
      setAPIKey(values.apiKey);
      setCurrency(values.currency);
      setPreviousState({
        apiKey: values.apiKey,
        currency: values.currency
      });

      toast({
        title: 'Success',
        description: (
          <>
            <p>User settings updated!</p>
            <span className='absolute bottom-0 left-0 h-2 w-full bg-green-400' />
          </>
        )
      });
    }

    setIsPopoverOpen((previousState) => !previousState);
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon'>
          <CircleUserRound className='h-[1.25rem] w-[1.25rem]' />
          <span className='sr-only'>Users settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[20.5rem]'>
        <div className='flex flex-col'>
          <h4 className='mb-8 font-medium leading-none'>User settings</h4>

          <Separator className='absolute left-0 mt-8 w-full' />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
              <FormField
                control={form.control}
                name='currency'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center'>
                      <FormLabel>Currency</FormLabel>
                      &nbsp;
                      <FormMessage />
                    </div>

                    <FormControl>
                      <RadioGroup
                        defaultValue={currency}
                        onValueChange={field.onChange}
                        className='flex flex-col space-y-1'
                      >
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value={ECurrency.EUR} />
                          </FormControl>
                          <FormLabel className='flex items-center gap-x-1'>
                            <Euro className='h-[1.25rem] w-[1.25rem]' />
                            {ECurrency.EUR}
                          </FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value={ECurrency.USD} />
                          </FormControl>
                          <FormLabel className='flex items-center gap-x-1'>
                            <DollarSign className='h-[1.25rem] w-[1.25rem]' />
                            {ECurrency.USD}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='apiKey'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center'>
                      <FormLabel>API Key</FormLabel>
                      &nbsp;
                      <FormMessage />
                    </div>

                    <FormControl>
                      <Input
                        type='text'
                        placeholder='********-****-****-****-************'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button variant='secondary' type='submit'>
                Update
              </Button>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
