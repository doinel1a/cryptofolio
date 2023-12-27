import React from 'react';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IDeleteButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'secondary' | 'ghost';
}

export default function DeleteButton({
  variant,
  className,
  onClick,
  ...properties
}: IDeleteButton) {
  return (
    <Button
      variant={variant}
      className={cn('h-6 w-6 p-[2px]', className)}
      onClick={onClick}
      {...properties}
    >
      <X className='h-4 w-4' />
    </Button>
  );
}
