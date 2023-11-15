'use client';

import React from 'react';

import { Home, List, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';

import ERoutesName from '@/constants/routes';

import NavLink from '../nav-link';

interface IRoutes {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationRoutes: Record<string, IRoutes> = {
  Home: {
    path: ERoutesName.home,
    icon: Home
  },
  Add: {
    path: ERoutesName.addPurchasing,
    icon: ShoppingCart
  },
  List: {
    path: ERoutesName.purchasingList,
    icon: List
  }
};

const routesKey = Object.keys(navigationRoutes) as (keyof typeof navigationRoutes)[];

const regex = /\/(.*?)\//;

export default function BottomNavigation() {
  const currentPath = usePathname();

  const match = currentPath.match(regex);
  const currentFolder = match ? match[1] : '/';

  return (
    <nav className='mb-5 flex h-24 items-center justify-between px-2.5'>
      {routesKey.map((key) => {
        const { path, icon: Icon } = navigationRoutes[key];

        const isActive = currentPath === '/' ? path === '/' : path.includes(currentFolder);

        return (
          <NavLink
            key={key}
            href={path}
            className={`flex h-full w-1/3 flex-col items-center justify-center rounded-b-md text-sm capitalize ${
              isActive
                ? 'border-b border-l border-r bg-background-secondary text-accent-secondary shadow-md'
                : 'border-t'
            } `}
          >
            <Icon className='mb-1 h-6 w-6 transition-colors' />
            <span className='transition-colors'>{key}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
