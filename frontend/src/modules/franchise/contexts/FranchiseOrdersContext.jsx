import { createContext, useContext, useState, useEffect } from 'react';
import mockOrders from '../data/mockOrders.json';

const FranchiseOrdersContext = createContext();

export function FranchiseOrdersProvider({ children }) {
    const [orders, setOrders] = useState(mockOrders);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedOrders = localStorage.getItem('franchise_hotel_orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('franchise_hotel_orders', JSON.stringify(orders));
    }, [orders]);

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                const newTimeline = [
                    ...order.timeline,
                    { status: newStatus, time: new Date().toISOString(), completed: true }
                ];
                return { ...order, status: newStatus, timeline: newTimeline };
            }
            return order;
        }));
    };

    const stats = {
        todayOrders: orders.length,
        newOrders: orders.filter(o => o.status === 'new').length,
        preparing: orders.filter(o => o.status === 'preparing').length,
        outForDelivery: orders.filter(o => o.status === 'out_for_delivery').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        revenue: orders.filter(o => o.status === 'delivered').reduce((acc, curr) => acc + curr.total, 0),
        pendingCOD: orders.filter(o => o.status === 'delivered' && o.paymentMode === 'COD').reduce((acc, curr) => acc + curr.total, 0)
    };

    return (
        <FranchiseOrdersContext.Provider value={{ orders, updateOrderStatus, stats, loading }}>
            {children}
        </FranchiseOrdersContext.Provider>
    );
}

export function useFranchiseOrders() {
    const context = useContext(FranchiseOrdersContext);
    if (!context) throw new Error('useFranchiseOrders must be used within FranchiseOrdersProvider');
    return context;
}
