import type { ImageProps } from 'next/image';

import React, { useState } from 'react';

import Image from 'next/image';

interface ITokenLogo extends ImageProps {}

export default function TokenLogo({ alt, ...properties }: ITokenLogo) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Image
      alt={alt}
      width={50}
      height={50}
      className={`rounded-full ${isLoaded ? '' : 'animate-pulse bg-background'}`}
      onLoad={() => setIsLoaded(true)}
      {...properties}
    />
  );
}
