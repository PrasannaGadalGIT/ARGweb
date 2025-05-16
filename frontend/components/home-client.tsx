'use client';

import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { XPCard } from '@/components/xp-card';
import { TimerCard } from '@/components/timer-card';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function HomeClient() {
  const router = useRouter();

  const userData = {
    totalXP: 2850,
    level: 12,
    nextLevelXP: 500,
    currentLevelXP: 350,
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      toast.success('Logged out');
      router.push('/login');
    } catch (err) {
      toast.error(`Logout failed: ${err}`);	
    }
  };

  return (
    <div className="container py-6 md:py-10 text-center w-full">
      <h1 className="mb-4 text-3xl font-bold md:text-4xl">GameToken Dashboard</h1>
      <p className="mb-8 text-muted-foreground">Track your XP progress and token redemption status</p>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
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
