import { motion } from 'framer-motion';
import {
    ShoppingBag,
    Clock,
    Users,
    Store,
    Truck,
    IndianRupee,
    ArrowRight,
    TrendingUp,
    Activity
} from 'lucide-react';
import MetricCard from '../components/cards/MetricCard';
import mockData from '../data/mockDashboard.json';
import { useState, useEffect } from 'react';

export default function DashboardScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const { metrics } = mockData;

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const iconMap = {
        totalOrders: ShoppingBag,
        pendingAssignments: Clock,
        activeVendors: Users,
        activeFranchises: Store,
        deliveriesInProgress: Truck,
        revenueSummary: IndianRupee
    };

    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-8 w-48 bg-slate-200 rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-48 bg-slate-100 rounded-[24px]" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Overview</h1>
                    <p className="text-slate-500 font-medium">Real-time platform performance and operational metrics.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                AD
                            </div>
                        ))}
                    </div>
                    <button className="bg-white border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
                        <Activity size={14} className="text-primary" />
                        System Logs
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(metrics).map(([key, data], index) => (
                    <MetricCard
                        key={key}
                        index={index}
                        label={data.label}
                        value={data.value}
                        change={data.change}
                        trend={data.trend}
                        currency={data.currency}
                        icon={iconMap[key]}
                    />
                ))}
            </div>

            {/* Operational Insights Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Placeholder 1 */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Performance Analytics</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Orders vs Fulfillment</p>
                        </div>
                        <select className="bg-slate-50 border-none outline-none text-xs font-bold text-slate-500 px-3 py-2 rounded-lg cursor-pointer">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>

                    <div className="h-64 bg-slate-50 rounded-2xl flex items-end justify-between p-6 overflow-hidden relative group">
                        {/* Mock Bar Chart */}
                        {[40, 65, 45, 85, 55, 95, 75].map((height, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className="w-[10%] bg-primary/20 rounded-t-lg relative group/bar"
                            >
                                <div className="absolute inset-0 bg-primary opacity-0 group-hover/bar:opacity-100 transition-opacity rounded-t-lg" />
                            </motion.div>
                        ))}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-[2px]">
                            <p className="text-xs font-black text-primary bg-white px-4 py-2 rounded-full shadow-lg border border-primary/10">Detailed Graph View</p>
                        </div>
                    </div>
                </div>

                {/* Status Overview Card */}
                <div className="bg-slate-900 p-8 rounded-[32px] text-white flex flex-col justify-between shadow-xl shadow-slate-200">
                    <div>
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                            <TrendingUp size={24} className="text-primary" />
                        </div>
                        <h3 className="text-2xl font-black tracking-tight leading-tight">Growth <br />Accelerating</h3>
                        <p className="text-slate-400 text-sm mt-4 font-medium">Your platform expanded by 12% in regional coverage this week.</p>
                    </div>

                    <div className="mt-10 space-y-4">
                        <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                            <span className="text-xs font-bold text-slate-400">Node Efficiency</span>
                            <span className="text-sm font-black text-primary">94.2%</span>
                        </div>
                        <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all active:scale-[0.98]">
                            View Network Map
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
