'use client';

import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface XPCardProps {
  totalXP: number;
  nextLevelXP: number;
  currentLevelXP: number;
}

export function XPCard({ totalXP }: XPCardProps) {
  return (
    <div className="overflow-hidden border-2 border-primary/20 bg-card/50 backdrop-blur-sm rounded-lg">
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">XP Progress</h2>
        </div>
        <p className="text-sm text-muted-foreground">Track your game token experience points</p>
      </div>

      <div className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className={cn(
            "flex flex-col items-center justify-center rounded-lg border p-4",
            "bg-gradient-to-br from-primary/5 to-primary/10",
            "border-primary/20"
          )}>
            <TrendingUp className="mb-2 h-8 w-8 text-primary/80" />
            <span className="text-lg font-bold">{totalXP.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">Total XP</span>
          </div>
        </div>
      </div>

      <div className="border-t bg-primary/5 px-6 py-3 flex w-full items-center justify-between text-sm text-muted-foreground">
        <span>Last activity: 2 hours ago</span>
        <span className="bg-primary/20 text-primary-foreground px-2 py-1 rounded-md text-xs">+45 XP Today</span>
      </div>
    </div>
  );
}