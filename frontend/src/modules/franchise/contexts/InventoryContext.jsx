import React, { createContext, useContext, useState, useEffect } from 'react';
import mockInventory from '../data/mockInventory.json';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize from mock data or localStorage
        const savedInventory = localStorage.getItem('franchise_inventory');
        if (savedInventory) {
            setInventory(JSON.parse(savedInventory));
        } else {
            setInventory(mockInventory);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (inventory.length > 0) {
            localStorage.setItem('franchise_inventory', JSON.stringify(inventory));
        }
    }, [inventory]);

    const updateStock = (productId, newQty) => {
        setInventory(prev => prev.map(item =>
            item.id === productId
                ? { ...item, currentStock: Math.max(0, newQty), lastUpdated: new Date().toISOString() }
                : item
        ));
    };

    const addStock = (itemsToAdd) => {
        // itemsToAdd: Array of { productId, qty }
        setInventory(prev => prev.map(item => {
            const added = itemsToAdd.find(i => i.productId === item.id);
            if (added) {
                return {
                    ...item,
                    currentStock: item.currentStock + added.qty,
                    lastUpdated: new Date().toISOString()
                };
            }
            return item;
        }));
    };

    const getLowStockItems = () => {
        return inventory.filter(item => item.currentStock <= item.mbq);
    };

    const getStockStats = () => {
        const totalItems = inventory.length;
        const healthyCount = inventory.filter(item => item.currentStock > item.mbq).length;
        const lowStockCount = getLowStockItems().length;
        const outOfStockCount = inventory.filter(item => item.currentStock === 0).length;

        return { totalItems, healthyCount, lowStockCount, outOfStockCount };
    };

    const categories = Array.from(new Set(inventory.map(item => item.category)));

    return (
        <InventoryContext.Provider value={{
            inventory,
            categories,
            loading,
            updateStock,
            addStock,
            getLowStockItems,
            getStockStats
        }}>
            {children}
        </InventoryContext.Provider>
    );
};

export const useInventory = () => {
    const context = useContext(InventoryContext);
    if (!context) throw new Error('useInventory must be used within InventoryProvider');
    return context;
};
