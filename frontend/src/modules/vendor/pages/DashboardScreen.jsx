import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Package,
    ClipboardList,
    Truck,
    TrendingUp,
    Clock,
    PlusCircle,
    ChevronRight,
    ArrowUpRight,
    IndianRupee
} from 'lucide-react';
import mockData from '../data/mockVendorStats.json';
import { cn } from '@/lib/utils';

const StatCard = ({ label, value, icon: Icon, color, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-all group"
    >
        <div className="flex items-start justify-between mb-4">
            <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm",
                color === 'emerald' ? "bg-emerald-50 text-emerald-600 shadow-emerald-100" :
                    color === 'blue' ? "bg-blue-50 text-blue-600 shadow-blue-100" :
                        color === 'amber' ? "bg-amber-50 text-amber-600 shadow-amber-100" :
                            "bg-slate-50 text-slate-600 shadow-slate-100"
            )}>
                <Icon size={24} />
            </div>
            <div className="p-1 px-2 rounded-lg bg-slate-50 group-hover:bg-primary/5 transition-colors">
                <ChevronRight size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
            </div>
        </div>
        <div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">{label}</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
        </div>
    </motion.div>
);

export default function DashboardScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const { stats, performance } = mockData;

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="h-10 w-48 bg-slate-100 rounded-xl" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-40 bg-slate-100 rounded-[32px]" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Today's Pulse</h1>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Status: Operational (Ready)</p>
                </div>
                <button className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                    <PlusCircle size={24} />
                </button>
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Active Stock"
                    value={stats.availableProduce}
                    icon={Package}
                    color="emerald"
                    index={0}
                />
                <StatCard
                    label="New Orders"
                    value={stats.ordersAssigned}
                    icon={ClipboardList}
                    color="blue"
                    index={1}
                />
                <StatCard
                    label="Pending Dispatch"
                    value={stats.pendingDispatch}
                    icon={Clock}
                    color="amber"
                    index={2}
                />
                <StatCard
                    label="Revenue Today"
                    value={`₹${performance.revenue.toLocaleString()}`}
                    icon={TrendingUp}
                    color="slate"
                    index={3}
                />
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h3 className="text-xl font-black tracking-tight mb-2">Operations Efficiency</h3>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Global Network Standards</p>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-black uppercase">Tier 1 Elite</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-8">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Fulfillment</p>
                                <p className="text-3xl font-black">{performance.fulfillmentRate}%</p>
                                <div className="mt-2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: `${performance.fulfillmentRate}%` }} />
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg Prep</p>
                                <p className="text-3xl font-black">{performance.avgPrepTime}</p>
                                <div className="mt-2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-3/4" />
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Completed</p>
                                <p className="text-3xl font-black">{stats.completedDeliveries}</p>
                                <p className="text-[8px] text-emerald-400 font-bold mt-1 uppercase">+12 This Week</p>
                            </div>
                        </div>
                    </div>

                    {/* Abstract background element */}
                    <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex flex-col justify-between"
                >
                    <div>
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-6">
                            <Truck size={24} />
                        </div>
                        <h4 className="text-lg font-black text-slate-900 tracking-tight leading-tight">Next Dispatch <br /> Scheduled</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">Window Closes in 22m</p>
                    </div>

                    <button className="mt-8 group w-full bg-slate-50 hover:bg-slate-900 hover:text-white rounded-2xl py-4 flex items-center justify-center gap-2 transition-all">
                        <span className="text-[10px] font-black uppercase tracking-widest">Go to Fleet</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
