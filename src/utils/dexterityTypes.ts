import { PublicKey } from "@solana/web3.js";
import dexterityTs from "@hxronetwork/dexterity-ts";
export const dexterity = dexterityTs;

export type TraderAccount = {
  pubkey: PublicKey;
  trg: any;
};

export interface TraderAccountDropdownProps {
  accounts: TraderAccount[];
  onSelect: (value: string) => void;
}

export interface ManifestContextProps {
  manifest: InstanceType<typeof dexterity.Manifest>;
  setManifest: React.Dispatch<
    React.SetStateAction<InstanceType<typeof dexterity.Manifest>>
  >;
}

export type BigNumber = {
  m: string;
  exp: string;
  _isNan: boolean;
};

export type OrderData = {
  id: string;
  productName: string;
  productIndex: number;
  price: BigNumber;
  qty: BigNumber;
  isBid: boolean;
};

export interface TraderContextProps {
  trader: InstanceType<typeof dexterity.Trader>;
  setTrader: React.Dispatch<
    React.SetStateAction<InstanceType<typeof dexterity.Trader>>
  >;
  cashBalance: number;
  setCashBalance: React.Dispatch<React.SetStateAction<number>>;
  openPositionsValue: number;
  setOpenPositionsValue: React.Dispatch<React.SetStateAction<number>>;
  portfolioValue: number;
  setPortfolioValue: React.Dispatch<React.SetStateAction<number>>;
  initialMarginReq: number;
  setInitialMarginReq: React.Dispatch<React.SetStateAction<number>>;
  maintananceMarginReq: number;
  setMaintananceMarginReq: React.Dispatch<React.SetStateAction<number>>;
  accountLeverage: number;
  setAccountLeverage: React.Dispatch<React.SetStateAction<number>>;
  accountHealth: string;
  setAccountHealth: React.Dispatch<React.SetStateAction<string>>;
  allTimePnl: number;
  setAllTimePnl: React.Dispatch<React.SetStateAction<number>>;
  updated: boolean;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  lastUpdated: number;
  setLastUpdated: React.Dispatch<React.SetStateAction<number>>;
  orderData: OrderData[];
  setOrderData: React.Dispatch<React.SetStateAction<OrderData[]>>;
  positionsData: any[];
  setPositionsData: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface Product {
  index: number;
  name: string;
  minSize: number;
  exponent: number;
}

export interface ProductContextProps {
  mpgPubkey: string;
  setMpgPubkey: React.Dispatch<React.SetStateAction<string>>;
  selectedProduct: Product;
  setSelectedProductIndex: React.Dispatch<React.SetStateAction<Product>>;
  indexPrice: number;
  setIndexPrice: React.Dispatch<React.SetStateAction<number>>;
  markPrice: number;
  setMarkPrice: React.Dispatch<React.SetStateAction<number>>;
}
