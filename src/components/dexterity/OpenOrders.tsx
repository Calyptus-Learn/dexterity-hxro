import { useProduct, useTrader } from "contexts/DexterityProviders";
import { FC, useCallback, useEffect, useState } from "react";
import Button from "../Button";
import { timeSince } from "utils/util";
import { notify } from "utils/notifications";

export const OpenOrders: FC = () => {
    const {
        orderData, // ordeData: OrderData[]
        lastUpdated,
        updated,
        trader
    } = useTrader()
    const { selectedProduct } = useProduct()
    const [requested, setRequested] = useState(false)

    const cancelOrders = useCallback(async() => {
        setRequested(true)
        let response: any[]
        try {
            response = await trader.cancelAllOrders([selectedProduct.name])
        } catch (error) {
            notify({type: 'error', message: `Error canceling all orders, ${error}`})
        } finally {
            notify({type: 'success', message: `Canceled all orders` })
        }
        setRequested(false)
    }, [])

    return (
        <>
                <div className="border border-white rounded-lg p-4">
                    <h1 className="text-2xl mb-4">Orders Info</h1>
                    <Button text={!requested? `Cancel All Orders` : `Cancelling all orders...`} className="bg-red-500 text-white text-sm" onClick={cancelOrders} disabled={requested}></Button>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderData && orderData.length > 0 && orderData.map((order, index) => (
                                        <tr key={index}>
                                            <td>{order.productName}</td>
                                            <td>{parseFloat(order.price.m) * Math.pow(10, parseInt(order.price.exp))}</td>
                                            <td>{parseFloat(order.qty.m) / Math.pow(10, parseInt(order.qty.exp))}</td>
                                            <td>{order.isBid ? 'Bid' : 'Ask'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="font-semibold">Last Updated:</div>
                        <div>{timeSince(lastUpdated)}</div>
                    </div>
                </div>
        </>
    );
}



