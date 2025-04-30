// This file contains utility functions for interacting with the Phantom wallet

export type PhantomEvent = 'connect' | 'disconnect' | 'accountChanged';

export interface ConnectOpts {
  onlyIfTrusted: boolean;
}

export interface PhantomProvider {
  publicKey: { toString(): string } | null;
  isPhantom?: boolean;
  isConnected: boolean;
  signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: { toString(): string } }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, callback: (args: any) => void) => void;
  request: (method: any, params: any) => Promise<any>;
}

export const getProvider = (): PhantomProvider | undefined => {
  if (typeof window !== 'undefined') {
    const provider = (window as any).solana;

    if (provider?.isPhantom) {
      return provider as PhantomProvider;
    }
  }

  return undefined;
};


export const verifySignature = async (message: string, signature: Uint8Array, publicKey: string): Promise<boolean> => {

  return true;
};


export const getMessageBytes = (message: string): Uint8Array => {
  return new TextEncoder().encode(message);
};