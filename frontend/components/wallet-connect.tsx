'use client';

import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/use-wallet';
import { Loader2, Wallet } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function WalletConnect() {
  const { connected, publicKey, isVerified, loading, connectWallet, disconnectWallet, signMessage } = useWallet();

  if (!connected) {
    return (
      <Button 
        onClick={connectWallet} 
        disabled={loading}
        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition-all"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </>
        )}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={`border-2 ${isVerified ? 'border-green-500' : 'border-amber-500'} bg-card/50 backdrop-blur-sm transition-all`}
        >
          {isVerified ? (
            <>
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              {publicKey?.slice(0, 4)}...{publicKey?.slice(-4)}
            </>
          ) : (
            <>
              <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
              {publicKey?.slice(0, 4)}...{publicKey?.slice(-4)}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Wallet Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={signMessage}
          disabled={loading || isVerified}
          className={isVerified ? 'text-green-500' : ''}
        >
          {isVerified ? '✓ Verified' : 'Verify Signature'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={disconnectWallet} disabled={loading}>
          Disconnect Wallet
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}