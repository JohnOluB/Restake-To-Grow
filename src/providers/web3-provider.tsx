'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: 'RestakeToGrow',
  projectId: 'a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7', // Replace with your WalletConnect project ID
  wallets: [
    ...wallets,
  ],
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
            theme={darkTheme({
                accentColor: 'hsl(var(--primary))',
                accentColorForeground: 'hsl(var(--primary-foreground))',
                borderRadius: 'medium',
            })}
        >
            {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
