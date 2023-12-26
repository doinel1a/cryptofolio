'use client';

import React, { useState } from 'react';

import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProviders extends PropsWithChildren {}

export default function Providers({ children }: IProviders) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnMount: false,
            refetchOnReconnect: 'always',
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false
          }
        }
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
