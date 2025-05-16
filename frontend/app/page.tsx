import { Suspense } from 'react';
import { XPCard } from '@/components/xp-card';
import { TimerCard } from '@/components/timer-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {

  const userData = {
    totalXP: 2850,
    level: 12,
    nextLevelXP: 500,
    currentLevelXP: 350,
  };

  return (
    <div className="container py-6 md:py-10 text-center w-full">
      <h1 className="mb-4 text-3xl font-bold md:text-4xl ">GameToken Dashboard</h1>
      <p className="mb-8 text-muted-foreground">Track your XP progress and token redemption status</p>
      
      <div className=" flex flex-col gap-4 md:flex-row md:gap-8">
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