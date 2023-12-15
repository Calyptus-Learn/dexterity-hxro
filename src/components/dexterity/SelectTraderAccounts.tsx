import React, { FC, useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useManifest, useTrader, useProduct } from 'contexts/DexterityProviders';
import { PublicKey } from '@solana/web3.js';
import { notify } from "../../utils/notifications";
import { formatPubKey, handleCopy } from 'utils/util';
import Button from '../Button';
import { dexterity, TraderAccount, TraderAccountDropdownProps } from '../../utils/dexterityTypes';

export const SelectTraderAccounts: FC = () => {
    const { publicKey } = useWallet();
    const { manifest } = useManifest();
    const [trgsArr, setTrgsArr] = useState<TraderAccount[]>([]);
    const [selectedTrg, setSelectedTrg] = useState<string>('');
    const { setTrader } = useTrader()
    const { mpgPubkey } = useProduct()

    useEffect(() => {
        fetchTraderAccounts();
    }, [publicKey, manifest]);

    const fetchTraderAccounts = useCallback(async () => {
        if (!publicKey) {console.log('publicKey error');return};
        if (!manifest) {console.log('manifest error');return};
        if (!manifest.fields) {console.log('manifest.fields error');return};
        if (!manifest.fields.wallet.publicKey) {console.log('manifest.fields.wallet.publicKey error');return};

        try {

            // TRG Fetching

        } catch (error: any) {
            notify({ type: 'error', message: `Selecting Trader Account failed!`, description: error?.message });
        }

    }, [publicKey, manifest]);

    const handleCreateTRG = useCallback(async () => {
        try {

            // TRG Creation

            fetchTraderAccounts();
        } catch (error: any) {
            notify({ type: 'error', message: `Creating Trader Account failed!`, description: error?.message });
        }
    }, [fetchTraderAccounts, manifest]);

    const handleSelection = useCallback(async (selectedValue: string) => {

            // TRG Selection & Initiation

    }, [manifest, setTrader]);

    return (
        <div className="flex flex-col items-center justify-center border border-white rounded-lg p-4 mt-4">
            <h1 className="text-2xl mb-4">Select or Create a Trader Account</h1>
    
            {trgsArr.length > 0 ? (
                <div className="w-full flex flex-col items-center space-y-4">
                    <div><TraderAccountDropdown accounts={trgsArr} onSelect={handleSelection} />
                    <span className='ml-5 cursor-pointer' onClick={() => {handleCopy(selectedTrg, 'Trg Pubkey')}}>📋</span></div>
                    <Button
                        text="🔄 Load Trader Accounts"
                        onClick={fetchTraderAccounts}
                        disabled={!publicKey}
                        className={`w-full text-md rounded-md ${publicKey ? 'bg-gradient-to-br from-[#80ff7d] to-[#80ff7d] hover:from-white hover:to-purple-300 text-black' : 'bg-gray-300 cursor-not-allowed'}`}
                    />
                </div>
            ) : (
                <div className="w-full flex flex-col items-center space-y-4">
                    <Button
                        text="🔄 Load Trader Accounts"
                        onClick={fetchTraderAccounts}
                        disabled={!publicKey}
                        className={`w-full text-md rounded-md ${publicKey ? 'bg-gradient-to-br from-[#80ff7d] to-[#80ff7d] hover:from-white hover:to-purple-300 text-black' : 'bg-gray-300 cursor-not-allowed'}`}
                    />
                    <Button
                        text="➕ Create New Trader Account"
                        onClick={handleCreateTRG}
                        disabled={!publicKey}
                        className={`w-full text-md rounded-md ${publicKey ? 'bg-gradient-to-br from-[#80ff7d] to-[#80ff7d] hover:from-white hover:to-purple-300 text-black' : 'bg-gray-300 cursor-not-allowed'}`}
                    />
                </div>
            )}
        </div>
    );
};

const TraderAccountDropdown: FC<TraderAccountDropdownProps> = ({ accounts, onSelect }) => {
    return (
        <select onChange={(e) => onSelect(e.target.value)} className='text-black text-xl'>
            <option value="default">Select a Trader Account</option>
            {accounts.map((trg, index) => (
                <option key={index} value={trg.pubkey.toBase58()}>{formatPubKey(trg.pubkey.toBase58())}</option>
            ))}
        </select>
    );
};
