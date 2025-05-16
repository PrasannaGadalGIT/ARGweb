// This file contains utility functions for interacting with the Phantom wallet

export type PhantomEvent = 'connect' | 'disconnect' | 'accountChanged';

export interface ConnectOpts {
  onlyIfTrusted: boolean;
}

export type PhantomEventCallback = (args: unknown) => void;
export type PhantomRequestMethod = string;
export type PhantomRequestParams = unknown;

export interface PhantomProvider {
  publicKey: { toString(): string } | null;
  isPhantom?: boolean;
  isConnected: boolean;
  signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: { toString(): string } }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, callback: PhantomEventCallback) => void;
  request: (method: PhantomRequestMethod, params?: PhantomRequestParams) => Promise<unknown>;
}

export const getProvider = (): PhantomProvider | undefined => {
  if (typeof window !== 'undefined') {
    const provider = (window as { solana?: PhantomProvider }).solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  return undefined;
};

export const verifySignature = async (
  message: string,
  signature: Uint8Array,
  publicKey: string
): Promise<boolean> => {
  // TODO: Implement actual signature verification logic
  console.log({ message, signature, publicKey });
  return true;
};

export const getMessageBytes = (message: string): Uint8Array => {
  return new TextEncoder().encode(message);
};