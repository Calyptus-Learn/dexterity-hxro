
import { FC, useEffect, useMemo } from "react";
import { SelectTraderAccounts } from '../../components/dexterity/SelectTraderAccounts';
import { DexterityWallet } from "@hxronetwork/dexterity-ts";
import { useWallet } from "@solana/wallet-adapter-react";
import { useManifest, useProduct, useTrader } from "contexts/DexterityProviders";
import { DefaultInfo } from "components/DefaultInfo";
import { PlaceLimitOrder } from "components/dexterity/LimitOrder";
import { FundingTrader } from "components/dexterity/FundingTrg";
import { clusterApiUrl } from "@solana/web3.js";
import { AccountInfo } from "components/dexterity/AccountInfo";
import { OpenOrders } from "components/dexterity/OpenOrders";
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { dexterity } from "utils/dexterityTypes";

export const BasicsView: FC = ({ }) => {
  const { publicKey, signTransaction, signAllTransactions } = useWallet()
  const { setManifest } = useManifest()
  const { trader } = useTrader()
  const { setIndexPrice, setMarkPrice } = useProduct()
  const { networkConfiguration } = useNetworkConfiguration();
  const network = networkConfiguration as WalletAdapterNetwork;

  useMemo(async () => {
    if (!publicKey) return
    const rpc =
      network == 'devnet' ? process.env.NEXT_PUBLIC_DEVNET_RPC! :
        network == 'mainnet-beta' ? process.env.NEXT_PUBLIC_MAINNET_RPC! :
          clusterApiUrl(network)

    // Fetch for the Manifest

  }, [publicKey, network]);

  useEffect(() => { }, [trader, setIndexPrice, setMarkPrice])

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br  from-[#80ff7d] to-[#80ff7d] mt-10 mb-8">
          Basics
        </h1>
        <div className="text-center">
          <DefaultInfo />
          <SelectTraderAccounts />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <PlaceLimitOrder />
                  </div>
                  <div>
                  <FundingTrader />
                  </div>
                </div>
                <div className="mt-4"><OpenOrders /></div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
                <div className="mt-4"><AccountInfo /></div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
