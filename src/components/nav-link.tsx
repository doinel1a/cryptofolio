import React, { PropsWithChildren } from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

interface INavLink extends PropsWithChildren, React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export default function NavLink({ href, className, children, ...properties }: INavLink) {
  return (
    <Link href={href!} className={cn('', className)} {...properties}>
      {children}
    </Link>
  );
}
