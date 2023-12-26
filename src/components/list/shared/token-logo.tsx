import React, { useState } from 'react';

import type { ImageProps } from 'next/image';

import Image from 'next/image';

import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITokenLogo extends ImageProps {}

export default function TokenLogo({ alt, ...properties }: ITokenLogo) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Image
      alt={alt}
      width={50}
      height={50}
      className={cn('rounded-full', { 'animate-pulse bg-background': !isLoaded })}
      onLoad={() => setIsLoaded(true)}
      {...properties}
    />
  );
}
