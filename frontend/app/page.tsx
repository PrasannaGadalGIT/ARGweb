import { Suspense } from 'react';
import { XPCard } from '@/components/xp-card';
import { TimerCard } from '@/components/timer-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  // Mock data - in a real app, you'd fetch this from an API
  const userData = {
    totalXP: 2850,
    level: 12,
    nextLevelXP: 500,
    currentLevelXP: 350,
  };

  return (
    <div className="container max-w-7xl py-6 md:py-10">
      <h1 className="mb-4 text-3xl font-bold md:text-4xl">GameToken Dashboard</h1>
      <p className="mb-8 text-muted-foreground">Track your XP progress and token redemption status</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
          <XPCard {...userData} />
        </Suspense>
        
        <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
          <TimerCard />
        </Suspense>
        
      
      </div>
    </div>
  );
}