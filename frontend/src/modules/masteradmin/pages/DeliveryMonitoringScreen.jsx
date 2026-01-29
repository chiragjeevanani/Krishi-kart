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
    IndianRupee,
    BarChart3,
    Timer
} from 'lucide-react';
import mockOrders from '../data/mockAdminOrders.json';
import { cn } from '@/lib/utils';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

export default function DeliveryMonitoringScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active');

    const inTransitOrders = mockOrders.filter(o => o.status === 'in_transit');
    const deliveredOrders = mockOrders.filter(o => o.status === 'delivered');

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    const slotPerformance = [
        { slot: '6AM-9AM', success: 98, volume: 145 },
        { slot: '9AM-12PM', success: 94, volume: 220 },
        { slot: '12PM-3PM', success: 88, volume: 180 },
        { slot: '3PM-6PM', success: 91, volume: 195 },
        { slot: '6PM-9PM', success: 96, volume: 110 }
    ];

    if (isLoading) {
        return <div className="p-20 flex justify-center items-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header Area */}
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
                    <div className="relative z-10 p-2">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Network Health</p>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight text-white">Optimal Throughput</h3>
                        <div className="flex items-center gap-4 mt-6">
                            <div className="flex items-center gap-2 bg-emerald-500 px-3 py-1.5 rounded-xl border border-emerald-400/20 text-white">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest">98% Success Rate</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-400">
                                <Timer size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Avg Lead: 14m</span>
                            </div>
                        </div>
                    </div>
                    {/* Dark Background Overlay for health card */}
                    <div className="absolute inset-0 bg-slate-900 -z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-primary/20 flex items-center justify-center backdrop-blur-3xl">
                        <Activity size={48} className="text-primary animate-pulse" />
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Active Ships</p>
                        <h3 className="text-4xl font-black text-slate-900">{inTransitOrders.length}</h3>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                            <Navigation size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">On-road units</span>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Today Yield</p>
                        <h3 className="text-4xl font-black text-slate-900">{deliveredOrders.length}</h3>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                            <CheckSquare size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Successful Drops</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Slot Performance Chart */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                                    <BarChart3 className="text-primary" />
                                    Slot Performance Analytics
                                </h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Completion Efficiency by Time Window</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-2xl flex items-center gap-4">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort: By Volume</span>
                                <ChevronRight size={14} className="text-slate-300" />
                            </div>
                        </div>

                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={slotPerformance}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="slot"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
                                        dy={10}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="success" radius={[10, 10, 0, 0]} barSize={40}>
                                        {slotPerformance.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.success > 95 ? '#10b981' : entry.success > 90 ? '#3b82f6' : '#f59e0b'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Active Grid Visualization (Simplified) */}
                    <div className="bg-slate-900 rounded-[32px] p-8 border border-white/5 shadow-2xl relative overflow-hidden h-72">
                        <div className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="flex items-center justify-between">
                                <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/20 text-[10px] font-black rounded-full uppercase tracking-widest">Live Node Map</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Active Survey</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center scale-150">
                                <div className="relative w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                                    <div className="w-6 h-6 bg-primary rounded-full animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                    <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Bandwidth</span>
                                    <span className="text-xs font-black text-white">124 Gbps</span>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                    <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Latency</span>
                                    <span className="text-xs font-black text-white">12ms</span>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                    <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Signals</span>
                                    <span className="text-xs font-black text-white">442</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tracking Detailed List */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm h-full flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="font-black text-slate-900 tracking-tight flex items-center gap-2">
                                <Truck size={18} className="text-primary" />
                                Tracking Units
                            </h4>
                            <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">LIVE</span>
                        </div>

                        <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar pr-1">
                            {(activeTab === 'active' ? inTransitOrders : deliveredOrders).map((order, index) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-5 bg-slate-50/50 border border-slate-100 rounded-[24px] hover:bg-white hover:shadow-xl hover:shadow-slate-100/50 transition-all group"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                                <Navigation size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-primary uppercase tracking-widest leading-none mb-1">{order.id}</p>
                                                <p className="font-bold text-slate-900 text-xs">{order.customer}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 text-[10px] font-black text-slate-900 justify-end">
                                                <IndianRupee size={10} /> {order.total}
                                            </div>
                                            <p className="text-[8px] text-slate-400 font-bold uppercase mt-1">Slot: {order.deliverySlot}</p>
                                        </div>
                                    </div>
                                    <div className="mt-5 flex items-center gap-3">
                                        <div className="flex-1 h-1.5 bg-slate-100 border border-slate-200/50 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: activeTab === 'active' ? '65%' : '100%' }}
                                                className={cn(
                                                    "h-full rounded-full shadow-[0_0_10px_rgba(22,163,74,0.2)]",
                                                    activeTab === 'active' ? "bg-amber-400" : "bg-emerald-500"
                                                )}
                                            />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400">{activeTab === 'active' ? '65%' : 'Delivered'}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <button className="w-full bg-slate-900 text-white mt-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group">
                            Expand Network Log
                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
