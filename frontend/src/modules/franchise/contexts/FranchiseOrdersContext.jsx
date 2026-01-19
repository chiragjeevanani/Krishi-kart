import { createContext, useContext, useState, useEffect } from 'react';
import mockOrders from '../data/mockOrders.json';

const FranchiseOrdersContext = createContext();

export function FranchiseOrdersProvider({ children }) {
    const [orders, setOrders] = useState(mockOrders);
    const [loading, setLoading] = useState(false);

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const stats = {
        todayOrders: orders.length,
        pendingDeliveries: orders.filter(o => o.status === 'incoming' || o.status === 'assigned').length,
        revenue: orders.reduce((acc, curr) => acc + curr.total, 0),
        takeaway: orders.filter(o => o.type === 'kiosk').length
    };

    return (
        <FranchiseOrdersContext.Provider value={{ orders, updateOrderStatus, stats, loading }}>
            {children}
        </FranchiseOrdersContext.Provider>
    );
}

export function useFranchiseOrders() {
    return useContext(FranchiseOrdersContext);
}
