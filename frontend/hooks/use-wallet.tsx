'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { getProvider, getMessageBytes, PhantomProvider } from '@/lib/phantom';

const MESSAGE_TO_SIGN = 'Login to GameToken XP Dashboard';

export const useWallet = () => {
  const [provider, setProvider] = useState<PhantomProvider | undefined>(undefined);
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const provider = getProvider();
    setProvider(provider);

    if (provider) {
      provider.on('connect', (publicKey: { toString(): string }) => {
        setPublicKey(publicKey.toString());
        setConnected(true);
      });

      provider.on('disconnect', () => {
        setPublicKey(null);
        setConnected(false);
        setIsVerified(false);
      });

      provider.on('accountChanged', (publicKey: { toString(): string } | null) => {
        setPublicKey(publicKey ? publicKey.toString() : null);
        setConnected(!!publicKey);
        setIsVerified(false);
      });

      // Check if already connected
      if (provider.isConnected) {
        setConnected(true);
        setPublicKey(provider.publicKey?.toString() || null);
      }
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (!provider) {
      window.open('https://phantom.app/', '_blank');
      return;
    }

    try {
      setLoading(true);
      await provider.connect();
      toast.success('Wallet connected successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  }, [provider]);

  const disconnectWallet = useCallback(async () => {
    if (provider) {
      try {
        setLoading(true);
        await provider.disconnect();
        setIsVerified(false);
        toast.success('Wallet disconnected');
      } catch (error) {
        console.error(error);
        toast.error('Failed to disconnect wallet');
      } finally {
        setLoading(false);
      }
    }
  }, [provider]);

  const signMessage = useCallback(async () => {
    if (!provider || !publicKey) {
      toast.error('Wallet not connected');
      return;
    }

    try {
      setLoading(true);
      const message = getMessageBytes(MESSAGE_TO_SIGN);
      const { signature } = await provider.signMessage(message);
      setIsVerified(true);
      toast.success('Signature verified successfully');
      return signature;
    } catch (error) {
      console.error(error);
      toast.error('Failed to sign message');
      return null;
    } finally {
      setLoading(false);
    }
  }, [provider, publicKey]);

  return {
    connected,
    publicKey,
    isVerified,
    loading,
    connectWallet,
    disconnectWallet,
    signMessage
  };
};