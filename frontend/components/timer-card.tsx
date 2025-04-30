'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Gift, AlertTriangle } from 'lucide-react';
import { useWallet } from '@/hooks/use-wallet';
import { cn } from '@/lib/utils';
import { motion } from './ui/motion';
import { toast } from 'sonner';

const SECONDS_IN_DAY = 86400;
const REDEMPTION_PERIOD = 30 * SECONDS_IN_DAY; // 30 days in seconds

export function TimerCard() {
  const { connected, isVerified } = useWallet();
  const [timeLeft, setTimeLeft] = useState(REDEMPTION_PERIOD);
  const [days, setDays] = useState(30);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    // In a real app, you'd fetch the actual start time from your backend
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev > 0 ? prev - 1 : 0;
        
        // Calculate days, hours, minutes, seconds
        const d = Math.floor(newTime / SECONDS_IN_DAY);
        const h = Math.floor((newTime % SECONDS_IN_DAY) / 3600);
        const m = Math.floor((newTime % 3600) / 60);
        const s = Math.floor(newTime % 60);
        
        setDays(d);
        setHours(h);
        setMinutes(m);
        setSeconds(s);
        
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const progress = ((REDEMPTION_PERIOD - timeLeft) / REDEMPTION_PERIOD) * 100;
  const canRedeem = timeLeft === 0;
  
  const handleRedeem = () => {
    if (!connected) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    if (!isVerified) {
      toast.error('Please verify your wallet signature first');
      return;
    }
    
    if (!canRedeem) {
      toast.error('Redemption period is not over yet');
      return;
    }
    
    toast.success('Tokens successfully redeemed!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className={cn(
        "overflow-hidden border-2 bg-card/50 backdrop-blur-sm",
        canRedeem ? "border-green-500/20" : "border-primary/20",
        "transition-all duration-300"
      )}>
        <CardHeader className={cn(
          "pb-2",
          canRedeem && "bg-green-500/10"
        )}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Redemption Timer</CardTitle>
            <Badge 
              variant="outline" 
              className={cn(
                "px-2 py-1",
                canRedeem 
                  ? "bg-green-500/10 text-green-500 border-green-500/30" 
                  : "bg-primary/10 text-primary border-primary/30"
              )}
            >
              {canRedeem 
                ? <Gift className="mr-1 h-3 w-3" /> 
                : <Clock className="mr-1 h-3 w-3" />
              }
              {canRedeem ? 'Ready to Redeem' : 'Countdown'}
            </Badge>
          </div>
          <CardDescription>
            {canRedeem 
              ? 'Your tokens are now available for redemption' 
              : 'Time left until your tokens can be redeemed'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="flex flex-col rounded-md bg-background/50 p-2">
              <span className="text-2xl font-bold">{days}</span>
              <span className="text-xs text-muted-foreground">Days</span>
            </div>
            <div className="flex flex-col rounded-md bg-background/50 p-2">
              <span className="text-2xl font-bold">{hours}</span>
              <span className="text-xs text-muted-foreground">Hours</span>
            </div>
            <div className="flex flex-col rounded-md bg-background/50 p-2">
              <span className="text-2xl font-bold">{minutes}</span>
              <span className="text-xs text-muted-foreground">Minutes</span>
            </div>
            <div className="flex flex-col rounded-md bg-background/50 p-2">
              <span className="text-2xl font-bold">{seconds}</span>
              <span className="text-xs text-muted-foreground">Seconds</span>
            </div>
          </div>
          
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div 
              className={cn(
                "h-full transition-all duration-500",
                canRedeem ? "bg-green-500" : "bg-primary"
              )} 
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <Button 
            onClick={handleRedeem}
            disabled={!canRedeem || !connected || !isVerified}
            className={cn(
              "w-full",
              canRedeem 
                ? "bg-green-500 hover:bg-green-600" 
                : "bg-primary/50 cursor-not-allowed"
            )}
          >
            {!connected 
              ? 'Connect Wallet to Redeem' 
              : !isVerified 
                ? 'Verify Wallet to Redeem'
                : canRedeem 
                  ? 'Redeem Tokens Now' 
                  : 'Wait for Redemption Period'
            }
          </Button>
        </CardContent>
        <CardFooter className="border-t bg-muted/20 px-6 py-3">
          <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
            {!connected || !isVerified ? (
              <div className="flex items-center text-amber-500">
                <AlertTriangle className="mr-1 h-4 w-4" />
                <span>Wallet verification required</span>
              </div>
            ) : (
              <span>Token ID: GAME-7890</span>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}