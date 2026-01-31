import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    ShoppingBag,
    Truck,
    CheckCircle2,
    Clock,
    Zap,
    History
} from 'lucide-react';
import { useFranchiseOrders } from '../contexts/FranchiseOrdersContext';
import OrderCard from '../components/cards/OrderCard';
import { cn } from '@/lib/utils';
import { useInventory } from '../contexts/InventoryContext';

const tabs = [
    { id: 'new', label: 'Incoming', icon: ShoppingBag },
    { id: 'preparing', label: 'Preparing', icon: Clock },
    { id: 'out_for_delivery', label: 'Dispatch', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle2 }
];

export default function OrdersScreen() {
    const { orders: allOrders, updateOrderStatus } = useFranchiseOrders();
    const { inventory, deductStock } = useInventory();
    const [activeTab, setActiveTab] = useState('new');
    const [searchQuery, setSearchQuery] = useState('');

    const handleAction = (orderId, newStatus) => {
        const order = allOrders.find(o => o.id === orderId);
        if (!order) return;

        // Stock Validation Logic
        if (newStatus === 'preparing' || newStatus === 'out_for_delivery') {
            const itemsToValidate = order.items.map(i => ({
                id: i.id || i.productId,
                qty: i.quantity || i.qty,
                name: i.name
            }));

            // Check if stock exists
            const insufficient = itemsToValidate.filter(i => {
                const stockItem = inventory.find(s => s.id === i.id);
                return !stockItem || stockItem.currentStock < i.qty;
            });

            if (insufficient.length > 0) {
                alert(`Cannot proceed! Insufficient stock for: ${insufficient.map(i => i.name).join(', ')}`);
                return;
            }
        }

        // Stock Deduction Logic (Deduct on Dispatch)
        if (newStatus === 'out_for_delivery') {
            deductStock(order.items.map(i => ({
                id: i.id || i.productId,
                qty: i.quantity || i.qty
            })));
        }

        const isLiveOrder = userLiveOrders.some(o => o.id === orderId);
        if (isLiveOrder) {
            updateLiveOrder(orderId, newStatus);
        } else {
            updateOrderStatus(orderId, newStatus);
        }
    };

    const tabs = [
        { id: 'new', label: 'New', icon: ShoppingBag },
        { id: 'preparing', label: 'Preparing', icon: Zap },
        { id: 'ready', label: 'Dispatch', icon: Truck },
        { id: 'delivered', label: 'History', icon: History }
    ];

    const filteredOrders = allOrders.filter(order => {
        let matchesTab = false;
        const status = order.status.toLowerCase();
        if (activeTab === 'new') matchesTab = status === 'new' || status === 'processing';
        else if (activeTab === 'preparing') matchesTab = status === 'preparing';
        else if (activeTab === 'ready') matchesTab = status === 'ready' || status === 'out_for_delivery';
        else if (activeTab === 'delivered') matchesTab = status === 'delivered';

        const hotelName = order.hotelName || 'Unknown';
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hotelName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="pb-32 lg:pb-12 bg-slate-50/50 min-h-screen font-sans">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 pt-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight">Hotel Orders</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Fulfillment Pipeline</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-between bg-slate-100 p-1.5 rounded-[22px] border border-slate-200/50 shadow-inner">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex-1 flex flex-col lg:flex-row items-center justify-center gap-1.5 py-2.5 rounded-[18px] transition-all relative overflow-hidden",
                                    isActive ? "bg-white text-primary shadow-sm ring-1 ring-slate-200/50" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                <tab.icon size={14} strokeWidth={isActive ? 3 : 2} />
                                <span className="text-[10px] font-black uppercase tracking-tight">{tab.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabPill"
                                        className="absolute inset-0 bg-primary/5 rounded-[18px]"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </header>

            <div className="p-6">
                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                        type="text"
                        placeholder="Search Hotel or Order ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-14 pl-12 pr-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none shadow-sm"
                    />
                </div>

                {/* Orders List */}
                <div className="grid grid-cols-1 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    onAction={handleAction}
                                />
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-20 flex flex-col items-center justify-center text-center px-10"
                            >
                                <div className="w-24 h-24 bg-white rounded-[40px] flex items-center justify-center text-slate-100 border border-slate-50 shadow-sm mb-6 relative">
                                    <ShoppingBag size={40} />
                                    <div className="absolute top-5 right-5 w-3 h-3 bg-slate-50 rounded-full border border-slate-100" />
                                </div>
                                <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">No Orders Found</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 leading-relaxed">
                                    The {activeTab} queue is currently clear
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
