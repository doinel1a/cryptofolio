import React from 'react';

import ERoutesName from '@/constants/routes';

import NavLink from '../nav-link';
import { ThemeToggle } from '../ui/theme/toggle';

export default function TopNavigation() {
  return (
    <header className='flex h-20 items-center justify-between px-2.5'>
      <NavLink
        href={ERoutesName.home}
        className='text-xl font-bold transition-colors hover:text-accent-secondary focus:text-accent-secondary'
      >
        CRYPTOFOLIO
      </NavLink>

      <ThemeToggle />
    </header>
  );
}
