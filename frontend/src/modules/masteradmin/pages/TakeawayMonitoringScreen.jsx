import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Monitor,
    ShoppingBag,
    Clock,
    Wifi,
    WifiOff,
    Zap,
    CheckCircle2,
    Search,
    IndianRupee,
    Store,
    ArrowRight
} from 'lucide-react';
import mockOrders from '../data/mockAdminOrders.json';
import { cn } from '@/lib/utils';

export default function TakeawayMonitoringScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const takeawayOrders = mockOrders.filter(o => o.type === 'takeaway' || o.type === 'Takeaway');

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const kiosks = [
        { id: 'K-01', name: 'West Wing Station', status: 'online', load: 12, uptime: '99.8%' },
        { id: 'K-02', name: 'Central Plaza', status: 'online', load: 45, uptime: '98.2%' },
        { id: 'K-03', name: 'North Gate Kiosk', status: 'offline', load: 0, uptime: '92.4%' },
        { id: 'K-04', name: 'South Transit Hub', status: 'online', load: 28, uptime: '99.9%' }
    ];

    if (isLoading) {
        return <div className="p-20 flex justify-center items-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kiosk Operations</h1>
                    <p className="text-slate-500 font-medium">Monitoring rapid-fulfillment takeaway stations and self-pickup nodes.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">3 Systems Active</span>
                    </div>
                </div>
            </div>

            {/* Kiosk Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kiosks.map((kiosk, index) => (
                    <motion.div
                        key={kiosk.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm overflow-hidden relative group"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110",
                                kiosk.status === 'online' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                            )}>
                                <Monitor size={22} />
                            </div>
                            <div className={cn(
                                "px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest",
                                kiosk.status === 'online' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                            )}>
                                {kiosk.status}
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">{kiosk.id}</p>
                            <h4 className="text-lg font-black text-slate-900 tracking-tight mb-4">{kiosk.name}</h4>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-slate-400">Current Load</span>
                                    <span className="text-[10px] font-black text-slate-900">{kiosk.load}%</span>
                                </div>
                                <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${kiosk.load}%` }}
                                        className={cn(
                                            "h-full rounded-full",
                                            kiosk.load > 40 ? "bg-amber-500" : "bg-primary"
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-slate-400">
                                {kiosk.status === 'online' ? <Wifi size={12} /> : <WifiOff size={12} />}
                                <span className="text-[8px] font-black">{kiosk.uptime} Uptime</span>
                            </div>
                            <Zap size={14} className={cn(kiosk.status === 'online' ? "text-amber-400 animate-pulse" : "text-slate-100")} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Rapid Queue Section */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <div>
                        <h3 className="font-black text-slate-900 text-xl tracking-tight flex items-center gap-3">
                            <ShoppingBag className="text-primary" size={24} />
                            Rapid Fulfillment Queue
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-widest">Self-pickup & Kiosk Direct Orders</p>
                    </div>
                    <div className="relative group flex-1 max-w-sm ml-8 hidden md:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Track rapid order..."
                            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 outline-none text-xs font-bold focus:ring-2 focus:ring-primary/10 transition-all font-sans"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                <th className="px-8 py-4">Station</th>
                                <th className="px-8 py-4">Customer</th>
                                <th className="px-8 py-4 text-center">Protocol</th>
                                <th className="px-8 py-4 text-center">Fulfillment</th>
                                <th className="px-8 py-4">Value</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {takeawayOrders.map((order, index) => (
                                <motion.tr
                                    key={order.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-slate-50/80 transition-all group"
                                >
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                                <Store size={18} />
                                            </div>
                                            <span className="text-xs font-black text-slate-900 group-hover:translate-x-1 transition-transform">{order.franchise}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-800">{order.customer}</span>
                                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">ID: {order.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                                            Rapid Loop
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="flex-1 max-w-[100px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '100%' }}
                                                    transition={{ duration: 15, repeat: Infinity }}
                                                    className="h-full bg-primary"
                                                />
                                            </div>
                                            <Clock size={12} className="text-slate-300" />
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-1 font-black text-slate-900 text-sm">
                                            <IndianRupee size={12} className="text-slate-400" />
                                            {order.total}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 ml-auto">
                                            Complete
                                            <CheckCircle2 size={14} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {takeawayOrders.length === 0 && (
                    <div className="py-20 text-center flex flex-col items-center border-t border-slate-50">
                        <ShoppingBag size={48} className="text-slate-100 mb-4" />
                        <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">No active rapid orders</h4>
                        <button className="mt-4 text-[10px] font-black text-primary hover:underline uppercase tracking-widest flex items-center gap-2">
                            Manual Push
                            <ArrowRight size={12} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
