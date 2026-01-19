import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    ChevronLeft,
    ShoppingBag,
    Truck,
    CheckCircle2,
    Clock,
    Store
} from 'lucide-react';
import { useFranchiseOrders } from '../contexts/FranchiseOrdersContext';
import OrderCard from '../components/cards/OrderCard';
import { cn } from '../../../lib/utils';

export default function OrdersScreen() {
    const { orders, updateOrderStatus } = useFranchiseOrders();
    const [activeTab, setActiveTab] = useState('incoming'); // incoming, assigned, takeaway, completed
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
        { id: 'incoming', label: 'New', icon: ShoppingBag },
        { id: 'assigned', label: 'Processing', icon: Truck },
        { id: 'takeaway', label: 'Takeaway', icon: Store },
        { id: 'completed', label: 'Records', icon: CheckCircle2 }
    ];

    const filteredOrders = orders.filter(order => {
        const matchesTab = order.status === activeTab;
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="pb-32 lg:pb-12 bg-[#f8fafd] min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white px-6 py-4 pt-6 border-b border-slate-100">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight">Order Queue</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Live Operational Feed</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-between bg-slate-50 p-1 rounded-2xl">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-[14px] transition-all relative overflow-hidden",
                                    isActive ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                <tab.icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-[10px] font-black uppercase tracking-tight">{tab.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="tabUnderline"
                                        className="absolute bottom-0 left-0 w-full h-[2px] bg-primary hidden"
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
                        placeholder="Search by ID or Name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                    />
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    onAction={updateOrderStatus}
                                />
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-20 flex flex-col items-center justify-center text-center px-10"
                            >
                                <div className="w-20 h-20 bg-white rounded-[32px] flex items-center justify-center text-slate-200 border border-slate-50 shadow-sm mb-6">
                                    <ShoppingBag size={32} />
                                </div>
                                <h3 className="text-lg font-black text-slate-900 tracking-tight">Queue Empty</h3>
                                <p className="text-xs text-slate-400 font-medium mt-2 leading-relaxed">
                                    No {activeTab} orders found. New incoming orders will appear here automatically.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
