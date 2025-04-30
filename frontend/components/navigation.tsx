'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletConnect } from '@/components/wallet-connect';
import { Button } from '@/components/ui/button';
import { TowerControl as GameController } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const NavLinks = [
  { path: '/', label: 'Dashboard' },

];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <GameController className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">GameToken XP</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-1 sm:space-x-2">
          {NavLinks.map((link) => (
            <Button
              key={link.path}
              variant="ghost"
              asChild
              className={cn(
                'text-muted-foreground',
                pathname === link.path && 'text-foreground font-medium'
              )}
            >
              <Link href={link.path}>{link.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <WalletConnect />
        </div>
      </div>
    </header>
  );
}