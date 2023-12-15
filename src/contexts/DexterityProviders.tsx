import React, { ReactNode, createContext, useContext, useState } from "react";
import { useNetworkConfiguration } from "./NetworkConfigurationProvider";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ManifestContextProps, Product, ProductContextProps, TraderContextProps } from "utils/dexterityTypes";

const ManifestContext = createContext<ManifestContextProps | undefined>(undefined);

export const ManifestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [manifest, setManifest] = useState(null);

  return (
    <ManifestContext.Provider value={{ manifest, setManifest }}>
      {children}
    </ManifestContext.Provider>
  );
};

export const useManifest = () => {
  const context = useContext(ManifestContext);
  if (!context) {
    throw new Error("useManifest must be used within a ManifestProvider");
  }
  return context;
};

const TraderContext = createContext<TraderContextProps | undefined>(undefined);

export const TraderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [trader, setTrader] = useState(null);
  const [cashBalance, setCashBalance] = useState(null);
  const [openPositionsValue, setOpenPositionsValue] = useState(null);
  const [portfolioValue, setPortfolioValue] = useState(null);  
  const [initialMarginReq, setInitialMarginReq] = useState(null); 
  const [maintananceMarginReq, setMaintananceMarginReq] = useState(null); 
  const [accountHealth, setAccountHealth] = useState(null);
  const [accountLeverage, setAccountLeverage] = useState(null);  
  const [allTimePnl, setAllTimePnl] = useState(null); 
  const [updated, setUpdated] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [positionsData, setPositionsData] = useState(null);

  return (
    <TraderContext.Provider value={
      {
        trader,
        setTrader,
        cashBalance,
        setCashBalance,
        openPositionsValue,
        setOpenPositionsValue,
        portfolioValue,
        setPortfolioValue,
        initialMarginReq,
        setInitialMarginReq,
        maintananceMarginReq,
        setMaintananceMarginReq,
        accountHealth,
        setAccountHealth,
        accountLeverage,
        setAccountLeverage,
        allTimePnl,
        setAllTimePnl,
        updated,
        setUpdated,
        lastUpdated,
        setLastUpdated,
        orderData,
        setOrderData,
        positionsData,
        setPositionsData
      }
    }>
      {children}
    </TraderContext.Provider>
  );
};

export const useTrader = () => {
  const context = useContext(TraderContext);
  if (!context) {
    throw new Error("useTrader must be used within a TraderProvider");
  }
  return context;
};

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const { networkConfiguration } = useNetworkConfiguration();
  const network = networkConfiguration as WalletAdapterNetwork;

  let defaultMpg =
    network == 'devnet' ? process.env.NEXT_PUBLIC_DEVNET_MPG :
      network == 'mainnet-beta' ? process.env.NEXT_PUBLIC_MAINNET_MPG : null;

  let defaultProduct: Product = {
    index: 0,
    name: 'SOLUSD-PERP',
    minSize: 0.1,
    exponent: 1,
  }

  const [mpgPubkey, setMpgPubkey] = useState(defaultMpg)
  const [selectedProduct, setSelectedProductIndex] = useState(defaultProduct)
  const [indexPrice, setIndexPrice] = useState(0)
  const [markPrice, setMarkPrice] = useState(0)

  return (
    <ProductContext.Provider value={{ mpgPubkey, setMpgPubkey, selectedProduct, setSelectedProductIndex, indexPrice, setIndexPrice, markPrice, setMarkPrice }}>
      {children}
    </ProductContext.Provider>
  );

}

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
