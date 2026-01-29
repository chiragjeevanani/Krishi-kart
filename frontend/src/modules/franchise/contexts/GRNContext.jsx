import React, { createContext, useContext, useState, useEffect } from 'react';
import mockPurchaseOrders from '../data/mockPurchaseOrders.json';
import { useInventory } from './InventoryContext';

const GRNContext = createContext();

export const GRNProvider = ({ children }) => {
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [completedGRNs, setCompletedGRNs] = useState([]);
    const { addStock } = useInventory();

    useEffect(() => {
        const savedPOs = localStorage.getItem('franchise_pos');
        const savedGRNs = localStorage.getItem('franchise_grns');

        if (savedPOs) setPurchaseOrders(JSON.parse(savedPOs));
        else setPurchaseOrders(mockPurchaseOrders);

        if (savedGRNs) setCompletedGRNs(JSON.parse(savedGRNs));
    }, []);

    useEffect(() => {
        localStorage.setItem('franchise_pos', JSON.stringify(purchaseOrders));
        localStorage.setItem('franchise_grns', JSON.stringify(completedGRNs));
    }, [purchaseOrders, completedGRNs]);

    const receiveGoods = (poNumber, receivedItems) => {
        // receivedItems: Array of { productId, acceptedQty, rejectedQty, damageReason }

        // 1. Mark PO as completed or update status
        setPurchaseOrders(prev => prev.filter(po => po.poNumber !== poNumber));

        // 2. Add to completed GRNs
        const po = purchaseOrders.find(p => p.poNumber === poNumber);
        const newGRN = {
            id: `GRN-${Date.now()}`,
            poNumber,
            vendor: po.vendor,
            receivedDate: new Date().toISOString(),
            items: receivedItems
        };
        setCompletedGRNs(prev => [newGRN, ...prev]);

        // 3. Update Inventory
        const inventoryUpdates = receivedItems.map(item => ({
            productId: item.productId,
            qty: item.acceptedQty
        }));
        addStock(inventoryUpdates);
    };

    return (
        <GRNContext.Provider value={{
            purchaseOrders,
            completedGRNs,
            receiveGoods
        }}>
            {children}
        </GRNContext.Provider>
    );
};

export const useGRN = () => {
    const context = useContext(GRNContext);
    if (!context) throw new Error('useGRN must be used within GRNProvider');
    return context;
};
