import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    PieChart,
    TrendingUp,
    Calendar,
    Download,
    ArrowUpRight,
    IndianRupee,
    Users,
    Globe,
    Filter,
    ChevronDown,
    Activity
} from 'lucide-react';
import mockAnalytics from '../data/mockAnalytics.json';
import { cn } from '@/lib/utils';

export default function AnalyticsScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const { revenueGrowth, regionalPerformance, categoryDistribution } = mockAnalytics;

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 700);
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
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Intelligence Hub</h1>
                    <p className="text-slate-500 font-medium">Data-driven performance insights and regional market analysis.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button className="bg-white border border-slate-100 px-6 py-3 rounded-2xl font-black text-xs text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                        <Calendar size={16} className="text-primary" />
                        Last 30 Days
                        <ChevronDown size={14} />
                    </button>
                    <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                        <Download size={16} />
                        Export Intelligence
                    </button>
                </div>
            </div>

            {/* Top Level Trends */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm overflow-hidden relative group">
                    <div className="flex items-center justify-between mb-8">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                            <IndianRupee size={24} />
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-lg">+18.2%</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Growth Index</p>
                        <h3 className="text-3xl font-black text-slate-900">₹4.2M</h3>
                        <p className="text-xs font-bold text-slate-400 mt-2">Aggregate revenue across all nodes.</p>
                    </div>
                    {/* Visual Curve Placeholder */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-emerald-50/50 to-transparent flex items-end px-2">
                        <div className="flex gap-1 items-end w-full">
                            {[30, 45, 35, 60, 50, 80, 70].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    className="flex-1 bg-emerald-100 rounded-t-sm"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative group overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                            <Users size={24} />
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-lg">High Scalability</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Network Density</p>
                        <h3 className="text-3xl font-black text-slate-900">1,248 Nodes</h3>
                        <p className="text-xs font-bold text-slate-400 mt-2">Vendors, Franchises & Kiosks combined.</p>
                    </div>
                    {/* Pulse Effect */}
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl shadow-slate-200 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary">
                            <TrendingUp size={24} />
                        </div>
                        <Activity className="text-emerald-500 animate-pulse" size={20} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black tracking-tight leading-tight">Elite Performance <br />Tier Unlocked</h3>
                        <p className="text-slate-400 text-xs font-medium mt-4">98.2% Platform uptime maintainted for the last 180 continuous days.</p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Breakdown */}
                <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <BarChart3 className="text-primary" size={20} />
                            Revenue Momentum
                        </h3>
                        <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-300 transition-all">
                            <Filter size={18} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {revenueGrowth.map((item, index) => (
                            <div key={item.month} className="space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <span>{item.month}</span>
                                    <span className="text-slate-900">₹{item.amount.toLocaleString()}</span>
                                </div>
                                <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(item.amount / 65000) * 100}%` }}
                                        transition={{ duration: 1.5, delay: index * 0.1 }}
                                        className={cn(
                                            "h-full rounded-full relative group",
                                            index === revenueGrowth.length - 1 ? "bg-primary shadow-[0_0_15px_rgba(22,163,74,0.4)]" : "bg-slate-200"
                                        )}
                                    >
                                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Regional Performance */}
                <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <Globe className="text-blue-500" size={20} />
                            Regional Dominance
                        </h3>
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-400 uppercase">
                                    R{i}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {regionalPerformance.map((item, index) => (
                                <motion.div
                                    key={item.region}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    className="flex items-center justify-between p-4 rounded-3xl bg-slate-50 border border-slate-100/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100/50 transition-all cursor-pointer group"
                                >
                                    <div>
                                        <p className="text-xs font-black text-slate-900 tracking-tight uppercase">{item.region}</p>
                                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">{item.efficiency}% Efficiency</p>
                                    </div>
                                    <ArrowUpRight size={16} className="text-slate-200 group-hover:text-primary transition-colors" />
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex items-center justify-center relative">
                            {/* SVG Donut Chart Mock */}
                            <svg viewBox="0 0 100 100" className="w-40 h-40 transform -rotate-90">
                                <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                                <motion.circle
                                    cx="50" cy="50" r="40" stroke="#16a34a" strokeWidth="12" fill="none"
                                    strokeDasharray="251.2"
                                    initial={{ strokeDashoffset: 251.2 }}
                                    animate={{ strokeDashoffset: 251.2 * (1 - 0.75) }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xl font-black text-slate-900">75%</span>
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Market</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Performance */}
            <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #16a34a 0%, transparent 50%)' }} />

                <div className="flex items-center gap-3 mb-10 relative z-10">
                    <PieChart className="text-primary" size={24} />
                    <h3 className="text-xl font-black tracking-tight">Category Distribution</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                    {categoryDistribution.map((cat, index) => (
                        <motion.div
                            key={cat.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            className="space-y-4"
                        >
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{cat.category}</p>
                                    <p className="text-3xl font-black tracking-tighter">{cat.share}%</p>
                                </div>
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    index === 0 ? "bg-primary/20 text-primary" : "bg-white/5 text-white/40"
                                )}>
                                    <BarChart3 size={18} />
                                </div>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${cat.share}%` }}
                                    className={cn("h-full rounded-full", index === 0 ? "bg-primary" : "bg-white/20")}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
