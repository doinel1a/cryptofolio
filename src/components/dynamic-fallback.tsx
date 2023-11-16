import React from 'react';

import { cn } from '@/lib/utils';

interface IDynamicFallback extends React.HTMLAttributes<HTMLDivElement> {}

export default function DynamicFallback({ className, ...properties }: IDynamicFallback) {
  return (
    <div className={cn('h-full w-full animate-pulse bg-background', className)} {...properties} />
  );
}
