import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download, Plus, ChevronDown } from 'lucide-react';
import OrdersTable from '../components/tables/OrdersTable';
import mockOrders from '../data/mockAdminOrders.json';

export default function OrdersScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    const filteredOrders = mockOrders.filter(order => {
        const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === 'all' || order.status === activeFilter;
        return matchesSearch && matchesFilter;
    });

    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-10 w-full bg-slate-100 rounded-2xl" />
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-20 bg-slate-100 rounded-2xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header Area */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order Hub</h1>
                    <p className="text-slate-500 font-medium">Centralized management for all platform transactions.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                        <Plus size={18} />
                        Create Order
                    </button>
                    <button className="bg-white border border-slate-100 p-3 rounded-2xl text-slate-400 hover:text-primary hover:bg-slate-50 transition-all">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Order ID, Customer Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 outline-none text-sm font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-auto">
                        <select
                            value={activeFilter}
                            onChange={(e) => setActiveFilter(e.target.value)}
                            className="appearance-none bg-slate-50 border-none outline-none py-3.5 px-6 pr-12 rounded-2xl text-sm font-bold text-slate-600 cursor-pointer w-full focus:ring-2 focus:ring-primary/10 transition-all"
                        >
                            <option value="all">All Status</option>
                            <option value="pending_assignment">Pending</option>
                            <option value="assigned">Assigned</option>
                            <option value="in_transit">In Transit</option>
                            <option value="delivered">Delivered</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>

                    <button className="bg-slate-50 p-3.5 rounded-2xl text-slate-400 hover:text-primary transition-all">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Bulk Actions */}
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-4 px-6 py-3 bg-primary/5 rounded-2xl border border-primary/10"
                >
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Bulk Actions</span>
                    <div className="flex gap-2">
                        <button className="text-[10px] font-black text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-100 hover:border-primary/30 transition-all uppercase tracking-tight">Export Selected</button>
                        <button className="text-[10px] font-black text-red-600 bg-white px-3 py-1.5 rounded-lg border border-slate-100 hover:border-red-100 transition-all uppercase tracking-tight">Hold Orders</button>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Orders Table */}
            <div className="bg-white/50 rounded-[32px] overflow-hidden border border-slate-50/50">
                <OrdersTable orders={filteredOrders} />

                {filteredOrders.length === 0 && (
                    <div className="py-20 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                            <Search size={32} />
                        </div>
                        <h3 className="font-bold text-slate-900">No matching orders found</h3>
                        <p className="text-xs text-slate-400 mt-1 font-medium">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
