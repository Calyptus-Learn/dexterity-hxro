import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import {
    UnsafeBurnerWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { Cluster, clusterApiUrl } from '@solana/web3.js';
import { FC, ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { AutoConnectProvider, useAutoConnect } from './AutoConnectProvider';
import { notify } from "../utils/notifications";
import { NetworkConfigurationProvider, useNetworkConfiguration } from './NetworkConfigurationProvider';
import dynamic from "next/dynamic";
import dexterityTs, { DexterityWallet } from '@hxronetwork/dexterity-ts';
import { ManifestProvider, useManifest, TraderProvider, ProductProvider } from './DexterityProviders';
export const dexterity = dexterityTs
import { SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'

const ReactUIWalletModalProviderDynamic = dynamic(
    async () =>
        (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
    { ssr: false }
);

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { autoConnect } = useAutoConnect();
    const { networkConfiguration } = useNetworkConfiguration();
    const network = networkConfiguration as WalletAdapterNetwork;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new SolflareWalletAdapter(),
            new UnsafeBurnerWalletAdapter(),
        ],
        [network]
    );


    const onError = useCallback(
        (error: WalletError) => {
            notify({ type: 'error', message: error.message ? `${error.name}: ${error.message}` : error.name });
            console.error(error);
        },
        []
    );

    return (
        // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
                <ReactUIWalletModalProviderDynamic>
                    {children}
                </ReactUIWalletModalProviderDynamic>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <>
            <NetworkConfigurationProvider>
                <AutoConnectProvider>
                    <ManifestProvider>
                        <TraderProvider>
                            <ProductProvider>
                            <WalletContextProvider>
                                {children}
                            </WalletContextProvider>
                            </ProductProvider>
                        </TraderProvider>
                    </ManifestProvider>
                </AutoConnectProvider>
            </NetworkConfigurationProvider>
        </>
    );
};
