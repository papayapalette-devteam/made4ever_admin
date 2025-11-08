import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ variant = 'default', size = 'md', className }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14'
  };

  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src="/Made4Ever New Logo (600 x 300 px).png"
        alt="Made4Ever - India's First Earning & Matchmaking Portal"
        width={200}
        height={100}
        className={cn('object-contain', sizeClasses[size])}
        priority
      />
    </div>
  );
}