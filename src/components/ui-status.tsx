import React, { PropsWithChildren } from 'react';

import { Loader2, ShieldAlert, ShieldX } from 'lucide-react';

import { cn } from '@/lib/utils';

interface IUIStatus extends PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
  status: 'loading' | 'error' | 'warning';
  statusTitle?: string;
  statusMessage?: string;
}

export default function UIStatus({
  status,
  statusTitle,
  statusMessage,
  className,
  children,
  ...properties
}: IUIStatus) {
  switch (status) {
    case 'loading': {
      return (
        <UIStatusContainer className={className} {...properties}>
          <Loader2 className='h-16 w-16 animate-spin' />

          {children}
        </UIStatusContainer>
      );
    }
    case 'warning': {
      return (
        <UIStatusContainer className={className} {...properties}>
          <ShieldAlert className='h-16 w-16 text-yellow-500 dark:text-yellow-400' />

          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center text-2xl'>{statusTitle}</h1>
            <h2 className='text-center text-lg'>{statusMessage}</h2>
          </div>

          {children}
        </UIStatusContainer>
      );
    }
    case 'error': {
      return (
        <UIStatusContainer className={className} {...properties}>
          <ShieldX className='h-16 w-16 text-destructive' />

          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center text-2xl'>{statusTitle}</h1>
            <h2 className='text-center text-lg'>{statusMessage}</h2>
          </div>

          {children}
        </UIStatusContainer>
      );
    }
    default: {
      return <></>;
    }
  }
}

interface IUIStatusContainer extends PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {}

function UIStatusContainer({ className, children, ...properties }: IUIStatusContainer) {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-center gap-y-5 rounded',
        className
      )}
      {...properties}
    >
      {children}
    </div>
  );
}
