import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Search,
    CheckCircle2,
    Clock,
    AlertCircle,
    ChevronRight,
    Star,
    MapPin,
    ArrowRight,
    X
} from 'lucide-react';
import mockVendors from '../data/mockVendors.json';
import mockOrders from '../data/mockAdminOrders.json';
import { cn } from '@/lib/utils';

export default function VendorAssignmentScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isAssigning, setIsAssigning] = useState(false);
    const [assignmentSuccess, setAssignmentSuccess] = useState(false);

    const pendingOrders = mockOrders.filter(o => o.status === 'pending_assignment');

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 700);
        return () => clearTimeout(timer);
    }, []);

    const handleAssign = (vendor) => {
        setIsAssigning(true);
        setTimeout(() => {
            setIsAssigning(false);
            setAssignmentSuccess(true);
            setTimeout(() => {
                setAssignmentSuccess(false);
                setSelectedOrder(null);
            }, 2000);
        }, 1200);
    };

    if (isLoading) {
        return <div className="p-20 flex justify-center items-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
    }

    return (
        <div className="space-y-8 pb-10 relative">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Assignment Command</h1>
                <p className="text-slate-500 font-medium">Link pending orders with the most efficient vendors.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Pending Orders */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="font-black text-slate-900 flex items-center gap-2">
                                <Clock className="text-amber-500" size={20} />
                                Active Queue
                            </h3>
                            <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black rounded-full uppercase tracking-widest">
                                {pendingOrders.length} Pending
                            </span>
                        </div>

                        <div className="divide-y divide-slate-50">
                            {pendingOrders.map((order, index) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setSelectedOrder(order)}
                                    className={cn(
                                        "p-6 flex items-center justify-between cursor-pointer transition-all hover:bg-slate-50 group",
                                        selectedOrder?.id === order.id ? "bg-primary/5" : ""
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 font-black text-xs group-hover:bg-white transition-colors">
                                            {order.id.split('-')[1]}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900">{order.customer}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{order.franchise} • {order.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-sm font-black text-slate-900">₹{order.total}</p>
                                            <p className="text-[10px] text-slate-400 font-medium tracking-tighter">Ordered 12 min ago</p>
                                        </div>
                                        <ChevronRight size={20} className={cn("text-slate-200 transition-all", selectedOrder?.id === order.id ? "text-primary translate-x-1" : "group-hover:text-slate-400")} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Context/Instructions */}
                <div className="hidden lg:block">
                    <div className="bg-slate-900 rounded-[32px] p-8 text-white sticky top-24 shadow-xl shadow-slate-200">
                        <AlertCircle className="text-primary mb-6" size={32} />
                        <h3 className="text-xl font-black tracking-tight leading-tight">Operational <br />Protocols</h3>
                        <div className="mt-8 space-y-6">
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black shrink-0">1</div>
                                <p className="text-xs font-medium text-slate-400">Select a pending order from the left queue to initiate assignment.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black shrink-0">2</div>
                                <p className="text-xs font-medium text-slate-400">Review vendor capacity and proximity filters in the assignment drawer.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black shrink-0">3</div>
                                <p className="text-xs font-medium text-slate-400">Confirm the assignment to notify both the vendor and the franchise.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Assignment Drawer */}
            <AnimatePresence>
                {selectedOrder && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
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
                                    <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest">Assigning {selectedOrder.id}</div>
                                    <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Select Vendor</h2>
                                <p className="text-slate-500 font-medium text-sm mt-1">Recommended partners for {selectedOrder.franchise}.</p>

                                <div className="relative mt-6 group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Filter vendors by name..."
                                        className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 outline-none text-xs font-bold focus:ring-2 focus:ring-primary/10 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
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
                                                <span className="text-[10px] font-bold">2.4km from Pickup</span>
                                            </div>
                                            <button
                                                disabled={isAssigning}
                                                onClick={() => handleAssign(vendor)}
                                                className="bg-primary text-white text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-emerald-600 active:scale-95 transition-all shadow-lg shadow-emerald-50 flex items-center gap-2"
                                            >
                                                Assign Link
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

            {/* Success Overlay */}
            <AnimatePresence>
                {assignmentSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none"
                    >
                        <div className="bg-slate-900 text-white p-12 rounded-[40px] shadow-2xl flex flex-col items-center text-center max-w-xs border border-white/10 backdrop-blur-xl bg-slate-900/90">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/20 mb-6"
                            >
                                <CheckCircle2 size={40} className="text-white" />
                            </motion.div>
                            <h3 className="text-2xl font-black tracking-tight">Vendor Assigned</h3>
                            <p className="text-slate-400 font-medium text-sm mt-2 uppercase tracking-widest">Protocol Synchronized</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
