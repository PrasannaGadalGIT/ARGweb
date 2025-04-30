'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Simple motion component that simulates framer-motion behavior
// This avoids having to install framer-motion as an additional dependency

interface MotionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  exit?: Record<string, any>;
  transition?: Record<string, any>;
}

export const motion = {
  div: forwardRef<HTMLDivElement, MotionProps>(
    ({ className, children, initial, animate, transition, ...props }, ref) => {
      return (
        <div 
          ref={ref}
          className={cn(
            "transition-all duration-300 ease-in-out",
            animate?.opacity === 0 && "opacity-0",
            animate?.opacity === 1 && "opacity-100",
            className
          )} 
          {...props}
        >
          {children}
        </div>
      );
    }
  )
};