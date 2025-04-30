'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Trophy, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from './ui/motion';

interface XPCardProps {
  totalXP: number;
  level: number;
  nextLevelXP: number;
  currentLevelXP: number;
}

export function XPCard({ totalXP, level, nextLevelXP, currentLevelXP }: XPCardProps) {
  const [progress, setProgress] = useState(0);


  const xpProgress = Math.floor((currentLevelXP / nextLevelXP) * 100);
  
 
  useEffect(() => {
    const timer = setTimeout(() => setProgress(xpProgress), 500);
    return () => clearTimeout(timer);
  }, [xpProgress]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-2 border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">XP Progress</CardTitle>
           
          </div>
          <CardDescription>Track your game token experience points</CardDescription>
        </CardHeader>


        <CardContent className="space-y-6">
         
          
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
        </CardContent>
        <CardFooter className="border-t bg-primary/5 px-6 py-3">
          <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
            <span>Last activity: 2 hours ago</span>
            <Badge variant="secondary" className="bg-primary/20">+45 XP Today</Badge>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}