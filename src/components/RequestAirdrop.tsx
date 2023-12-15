import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore';

export const RequestAirdrop: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const { getUserSOLBalance } = useUserSOLBalanceStore();

    const onClickSol = useCallback(async () => {
        if (!publicKey) {
            console.log('error', 'Wallet not connected!');
            notify({ type: 'error', message: 'error', description: 'Wallet not connected!' });
            return;
        }

        let signature: TransactionSignature = '';

        try {
            signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);

            // Get the lates block hash to use on our transaction and confirmation
            let latestBlockhash = await connection.getLatestBlockhash()
            await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed');

            notify({ type: 'success', message: 'Airdrop successful!', txid: signature });

            getUserSOLBalance(publicKey, connection);
        } catch (error: any) {
            notify({ type: 'error', message: `Airdrop failed!`, description: error?.message, txid: signature });
            console.log('error', `Airdrop failed! ${error?.message}`, signature);
        }
    }, [publicKey, connection, getUserSOLBalance]);

    const onClickUxdc = () => {
        window.open('https://uxdc-faucet-api-1srh.vercel.app/', '_blank')
    }

    return (

        <div className="flex flex-row justify-center">
                <div className="relative group items-center">
                    <div className="m-1 absolute -inset-0.5 bg-gradient-to-r  from-[#80ff7d] to-[#80ff7d] 
                    rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            
                        <button
                            className="px-8 m-2 btn animate-pulse bg-gradient-to-br  from-[#80ff7d] to-[#80ff7d] hover:from-white hover:to-purple-300 text-black"
                            onClick={onClickSol}
                            >
                                <span>Airdrop SOL</span>
                
                        </button>
            
                        <button
                            className="px-8 m-2 btn animate-pulse bg-gradient-to-br  from-[#80ff7d] to-[#80ff7d] hover:from-white hover:to-purple-300 text-black"
                            onClick={onClickUxdc}
                            >
                                <span>Airdrop UXDC</span>
                
                        </button>
                </div>
        </div>

        
    );
};

