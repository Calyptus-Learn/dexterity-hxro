import React, { FC, useState, useCallback, useEffect, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useManifest, useTrader, useProduct } from 'contexts/DexterityProviders';
import { notify } from '../../utils/notifications';
import { PublicKey } from '@solana/web3.js';
import Button from '../Button';
import { useNetworkConfiguration } from 'contexts/NetworkConfigurationProvider';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { dexterity } from 'utils/dexterityTypes';

export const PlaceLimitOrder: FC = () => {
    const { publicKey } = useWallet();
    const { manifest } = useManifest();
    const { trader } = useTrader();
    const { selectedProduct } = useProduct()
    const [price, setPrice] = useState<number | null>(null);
    const [size, setSize] = useState<number | null>(null);
    const [orderType, setOrderType] = useState<'Long' | 'Short' | 'None'>('None');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const { networkConfiguration } = useNetworkConfiguration();
    const network = networkConfiguration as WalletAdapterNetwork;

    const callbacks = {
        onGettingBlockHashFn: () => {},
        onGotBlockHashFn: () => {},
        onConfirm: (txn: string) => notify({ type: 'success', message: 'Order Placed Successfully!', txid: txn })
    }

    const handlePlaceOrder = useCallback(async () => {
        if (!price || !size || !publicKey || !manifest || !selectedProduct) return;

        // Placing order logic goes here

    }, [price, size, orderType, publicKey, manifest, trader, selectedProduct]);

    const isFormValid = useMemo(() => price !== null && size !== null && orderType !== 'None', [price, size, orderType]);

    return (
        <div className="flex flex-col justify-center items-center border border-white rounded-lg p-4 mt-4">
            <h1 className='text-2xl mb-4'>Place a Limit Order</h1>

            <div className="w-full flex flex-col items-center">
                <label htmlFor="priceInput" className="text-xl font-semibold mb-1">Price</label>
                <input
                    id="priceInput"
                    type="number"
                    placeholder="Price"
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    className="w-full mb-4 p-2 rounded-md text-xl text-black border border-gray-300"
                    aria-label="Enter the price for the order"
                />
            </div>

            <div className="w-full flex flex-col items-center">
                <label htmlFor="sizeInput" className="text-xl font-semibold mb-1">Size</label>
                <input
                    id="sizeInput"
                    type="number"
                    placeholder="Size"
                    onChange={(e) => setSize(parseFloat(e.target.value))}
                    className="w-full mb-4 p-2 rounded-md text-xl text-black border border-gray-300"
                    aria-label="Enter the size for the order"
                />
            </div>

            <div className="flex items-center space-x-4">
                <div className={`p-2 pr-8 pl-8 ${orderType === 'Long' ? 'bg-[#80ff7d]' : 'bg-gray-200'}`}>
                    <label className="text-xl font-semibold text-white" htmlFor="isLongCheckbox">
                        <input
                            id="isLongCheckbox"
                            type="checkbox"
                            className="hidden"
                            checked={orderType === 'Long'}
                            onChange={() => setOrderType(orderType === 'Long' ? 'None' : 'Long')}
                        />
                        Long
                    </label>
                </div>
                <div className={`p-2 pr-8 pl-8 ${orderType === 'Short' ? 'bg-[#ff80f2]' : 'bg-gray-200'}`}>
                    <label className="text-xl font-semibold text-white" htmlFor="isShortCheckbox">
                        <input
                            id="isShortCheckbox"
                            type="checkbox"
                            className="hidden"
                            checked={orderType === 'Short'}
                            onChange={() => setOrderType(orderType === 'Short' ? 'None' : 'Short')}
                        />
                        Short
                    </label>
                </div>
            </div>

            <Button
                text="🛒 Place Limit Order"
                onClick={handlePlaceOrder}
                disabled={!isFormValid}
                className={isFormValid ? 'mt-4 bg-gradient-to-br from-[#80ff7d] to-[#80ff7d] hover:from-white hover:to-purple-300 text-black' : ''}
                status={isSuccess ? 'success' : 'failed'}
            />
        </div>
    );

};
