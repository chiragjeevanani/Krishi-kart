import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Truck,
    Navigation,
    Map as MapIcon,
    Clock,
    CheckSquare,
    AlertTriangle,
    Search,
    ChevronRight,
    ArrowUpRight,
    Activity,
    IndianRupee
} from 'lucide-react';
import mockOrders from '../data/mockAdminOrders.json';
import { cn } from '@/lib/utils';

export default function DeliveryMonitoringScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active');

    const inTransitOrders = mockOrders.filter(o => o.status === 'in_transit');
    const deliveredOrders = mockOrders.filter(o => o.status === 'delivered');

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <div className="p-20 flex justify-center items-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Logistics Monitor</h1>
                    <p className="text-slate-500 font-medium">Real-time surveillance of network fulfillment and transit status.</p>
                </div>

                <div className="flex items-center gap-2 bg-white p-1.5 rounded-[20px] border border-slate-100 shadow-sm">
                    <button
                        onClick={() => setActiveTab('active')}
                        className={cn(
                            "px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                            activeTab === 'active' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        Active Transit
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={cn(
                            "px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                            activeTab === 'history' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        Fulfillment Log
                    </button>
                </div>
            </div>

            {/* Live Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm col-span-1 md:col-span-2 flex items-center justify-between overflow-hidden relative">
                    <div className="relative z-10">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Network Health</p>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Optimal Throughput</h3>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                <span className="text-xs font-bold text-slate-600">98% Success</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-slate-400">Avg Lead: 14m 22s</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-50/50 flex items-center justify-center">
                        <Activity size={48} className="text-emerald-200" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Transit Count</p>
                    <div className="flex items-center justify-between">
                        <h3 className="text-3xl font-black text-slate-900">{inTransitOrders.length}</h3>
                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                            <Navigation size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Completed</p>
                    <div className="flex items-center justify-between">
                        <h3 className="text-3xl font-black text-slate-900">{deliveredOrders.length}</h3>
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                            <CheckSquare size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Shipments List */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="font-black text-slate-900 tracking-tight flex items-center gap-2">
                                <Truck size={18} className="text-primary" />
                                In-Transit Queue
                            </h4>
                            <Search size={16} className="text-slate-300 cursor-pointer hover:text-primary transition-colors" />
                        </div>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
                            {(activeTab === 'active' ? inTransitOrders : deliveredOrders).map((order, index) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-slate-100/50 transition-all group cursor-pointer"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mb-1">{order.id}</p>
                                            <p className="font-bold text-slate-900 text-sm">{order.customer}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 text-[10px] font-black text-slate-900 justify-end">
                                                <IndianRupee size={10} /> {order.total}
                                            </div>
                                            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter">ETA: 12 MIN</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center gap-3">
                                        <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                                            <div className={cn(
                                                "h-full rounded-full transition-all duration-1000",
                                                activeTab === 'active' ? "w-2/3 bg-blue-500 animate-pulse" : "w-full bg-emerald-500"
                                            )} />
                                        </div>
                                        <ArrowUpRight size={14} className="text-slate-200 group-hover:text-primary transition-colors" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tracking Visualization Placeholder */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-900 rounded-[32px] h-full min-h-[500px] relative overflow-hidden flex items-center justify-center p-12 border border-white/5 shadow-2xl shadow-slate-200">
                        {/* Grid Pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                        {/* Center Hub */}
                        <div className="relative z-10 w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(22,163,74,0.4)] animate-pulse">
                                <MapIcon className="text-white" size={24} />
                            </div>

                            {/* Radial Waves */}
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 1, opacity: 0.3 }}
                                    animate={{ scale: 3, opacity: 0 }}
                                    transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                                    className="absolute inset-0 rounded-full border border-primary/40"
                                />
                            ))}
                        </div>

                        {/* Node Points */}
                        {[
                            { top: '20%', left: '30%' },
                            { top: '40%', left: '70%' },
                            { top: '70%', left: '25%' },
                            { top: '80%', left: '60%' },
                            { top: '15%', left: '80%' }
                        ].map((pos, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.5 }}
                                style={pos}
                                className="absolute z-10 group"
                            >
                                <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md cursor-pointer group-hover:bg-white/40 transition-all">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                </div>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    <span className="bg-white/10 backdrop-blur-md text-[8px] font-black text-white px-2 py-1 rounded-lg border border-white/10">NODE {i + 1} ACTIVE</span>
                                </div>
                            </motion.div>
                        ))}

                        <div className="absolute bottom-8 left-8 right-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                    <Clock className="text-primary" size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Live Refresh</p>
                                    <p className="text-xs font-bold text-white tracking-tight underline cursor-pointer hover:text-primary transition-colors">Satellite Optimization Mode</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[14px] font-black text-white">42 Active Signals</p>
                                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">System synchronized</p>
                            </div>
                        </div>

                        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
                            <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black rounded-full flex items-center gap-1.5 uppercase tracking-widest">
                                <AlertTriangle size={10} />
                                1 Traffic Alert
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
