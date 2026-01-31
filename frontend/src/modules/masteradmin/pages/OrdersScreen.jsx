import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download, Plus, ChevronDown, X, Users, Star, MapPin, ArrowRight, ShoppingBag } from 'lucide-react';
import OrdersTable from '../components/tables/OrdersTable';
import mockOrders from '../data/mockAdminOrders.json';
import mockVendors from '../data/mockVendors.json';
import { useOrders } from '@/modules/user/contexts/OrderContext';
import { cn } from '@/lib/utils';

export default function OrdersScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const { orders: contextOrders, updateOrderStatus } = useOrders();

    // Combine context orders with mock orders, avoiding duplicates if any
    const allOrders = [...contextOrders, ...mockOrders.filter(m => !contextOrders.find(c => c.id === m.id))];

    const [selectedOrderForProcurement, setSelectedOrderForProcurement] = useState(null);

    const handleOrderAction = (orderId, newStatus, additionalData = {}) => {
        if (newStatus === 'initiate_procurement') {
            const order = allOrders.find(o => o.id === orderId);
            setSelectedOrderForProcurement(order);
            return;
        }

        // If it's a context order, update it
        if (contextOrders.find(o => o.id === orderId)) {
            updateOrderStatus(orderId, newStatus, additionalData);
        } else {
            // For mock orders, we just show an alert or simulate
            alert(`Mock Order ${orderId} updated to ${newStatus}`);
        }
    };

    const handleFinalizeProcurement = (vendor) => {
        if (selectedOrderForProcurement) {
            handleOrderAction(selectedOrderForProcurement.id, 'assigned', {
                assignedVendor: vendor.name
            });
            setSelectedOrderForProcurement(null);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    const filteredOrders = allOrders.filter(order => {
        const customerName = order.customer || 'Unknown';
        const matchesSearch = customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === 'all' || order.status.toLowerCase() === activeFilter.toLowerCase();
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
                <OrdersTable orders={filteredOrders} onAction={handleOrderAction} />

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

            {/* Vendor Picker Drawer */}
            <AnimatePresence>
                {selectedOrderForProcurement && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrderForProcurement(null)}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#f8fafd] shadow-2xl z-[70] overflow-hidden flex flex-col"
                        >
                            <div className="bg-white p-8 border-b border-slate-100">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest">Procurement Workflow</div>
                                    <button onClick={() => setSelectedOrderForProcurement(null)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-3 mb-2">
                                    <ShoppingBag className="text-primary" size={24} />
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selectedOrderForProcurement.id}</h2>
                                </div>
                                <p className="text-slate-500 font-medium text-sm">Assign a vendor to fulfill items for {selectedOrderForProcurement.customer}.</p>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Recommended Vendors</h3>
                                {mockVendors.map((vendor, index) => (
                                    <motion.div
                                        key={vendor.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                                    <Users size={22} />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-slate-900 tracking-tight">{vendor.name}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="flex items-center gap-0.5 text-amber-500 font-black text-[10px]">
                                                            <Star size={10} fill="currentColor" /> {vendor.rating}
                                                        </div>
                                                        <span className="text-[10px] text-slate-300 font-black uppercase">•</span>
                                                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{vendor.category}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none">Capacity</div>
                                                <div className="text-sm font-black text-slate-900 mt-1">{vendor.capacity}%</div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <MapPin size={12} />
                                                <span className="text-[10px] font-bold">Primary Region</span>
                                            </div>
                                            <button
                                                onClick={() => handleFinalizeProcurement(vendor)}
                                                className="bg-primary text-white text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-emerald-600 active:scale-95 transition-all shadow-lg shadow-emerald-50 flex items-center gap-2"
                                            >
                                                Assign Vendor
                                                <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
