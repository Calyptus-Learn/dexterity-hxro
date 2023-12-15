import { useProduct, useTrader } from "contexts/DexterityProviders";
import { FC, useEffect } from "react";
import { formatPubKey, handleCopy } from 'utils/util';
import { notify } from "utils/notifications";

export const DefaultInfo: FC = () => {
    const { mpgPubkey, selectedProduct } = useProduct()

    useEffect(() => {}, [mpgPubkey, selectedProduct])
;

    return (
        <div className="flex flex-col justify-center items-center border border-white rounded-lg p-6 mt-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Default Values</h2>
            <div className="flex flex-col space-y-3 w-full md:flex-row md:justify-between md:items-center md:space-y-0 md:space-x-6">
                <div className="flex flex-row items-center space-x-2">
                    <span className="font-semibold text-lg">Mpg PubKey:</span>
                    <div><span className="text-base text-gray-600">{formatPubKey(mpgPubkey)}</span>
                    <span className='ml-5 cursor-pointer' onClick={() => {handleCopy(mpgPubkey, 'Mpg Pubkey')}}>📋</span></div>
                </div>
                <div className="flex flex-row items-center space-x-2">
                    <span className="font-semibold text-lg">Product:</span>
                    <span className="text-base text-gray-600">{selectedProduct.name}</span>
                </div>
                <div className="flex flex-row items-center space-x-2">
                    <span className="font-semibold text-lg">Min. Trade Size:</span>
                    <span className="text-base text-gray-600">{selectedProduct.minSize}</span>
                </div>
            </div>
        </div>
    );
    
    
    
    
}