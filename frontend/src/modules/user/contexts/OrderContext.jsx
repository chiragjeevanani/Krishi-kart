import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([
        {
            id: 'ORD-9921',
            date: 'Oct 12, 2024',
            status: 'Delivered',
            total: 4500,
            items: [
                { name: 'Shimla Apples', qty: '10kg', price: 1650 },
                { name: 'Organic Spinach', qty: '5kg', price: 425 }
            ],
            address: 'Flat 402, Galaxy Apartments, Kothrud, Pune'
        },
        {
            id: 'ORD-8812',
            date: 'Oct 15, 2024',
            status: 'Shipped',
            total: 12500,
            items: [
                { name: 'Alphonso Mango', qty: '50kg', price: 12000 }
            ],
            address: 'Building Q1, IT Park, Hinjewadi, Pune'
        }
    ]);

    const placeOrder = (orderDetails) => {
        const newOrder = {
            id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: 'Processing',
            ...orderDetails
        };
        setOrders(prev => [newOrder, ...prev]);
        return newOrder;
    };

    return (
        <OrderContext.Provider value={{ orders, placeOrder }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
}
