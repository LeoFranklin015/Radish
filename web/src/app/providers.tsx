'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { optimismSepolia, neoxT4, neoxMainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultConfig, darkTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

const config = getDefaultConfig({
    appName: 'Radish',
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '', // Get one at https://cloud.walletconnect.com
    chains: [optimismSepolia, neoxT4, neoxMainnet],
    transports: {
        [optimismSepolia.id]: http(),
        [neoxT4.id]: http(),
        [neoxMainnet.id]: http(),
    }
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme({
                    accentColor: "#111111",
                    accentColorForeground: "white",
                    borderRadius: "medium",
                    fontStack: "system",
                    overlayBlur: "small",
                })} initialChain={neoxMainnet}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
} 