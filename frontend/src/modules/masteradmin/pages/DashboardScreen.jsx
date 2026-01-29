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
    Activity,
    CreditCard,
    Wallet,
    Building2,
    Banknote
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from 'recharts';
import MetricCard from '../components/cards/MetricCard';
import ChartCard from '../components/cards/ChartCard';
import mockData from '../data/mockDashboard.json';
import { useState, useEffect } from 'react';

export default function DashboardScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const { metrics, orderFlow, revenueFlow } = mockData;

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
        revenueSummary: IndianRupee,
        creditOutstanding: CreditCard,
        vendorPayable: Wallet,
        franchisePayable: Building2,
        cashPendingDeposit: Banknote
    };

    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-8 w-48 bg-slate-200 rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                        <div key={i} className="h-40 bg-slate-100 rounded-[24px]" />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-80 bg-slate-100 rounded-[32px]" />
                    <div className="h-80 bg-slate-100 rounded-[32px]" />
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
                    <button className="bg-white border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
                        <Activity size={14} className="text-primary" />
                        System Logs
                    </button>
                    <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-xs font-black hover:bg-emerald-600 transition-all shadow-lg shadow-primary/20">
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Metrics Grid - 10 Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartCard
                    title="Order Fulfillment"
                    subtitle="Daily Order vs Fulfillment Trend"
                    onTimeRangeChange={(val) => console.log(val)}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={orderFlow}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                cursor={{ fill: '#f8fafc' }}
                            />
                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="orders" name="Incoming" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                            <Bar dataKey="fulfillment" name="Fulfilled" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard
                    title="Revenue Flow"
                    subtitle="Platform Revenue Growth"
                    onTimeRangeChange={(val) => console.log(val)}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueFlow}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#10b981"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorRevenue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* Bottom Insights Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-900 p-8 rounded-[32px] text-white overflow-hidden relative group">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="space-y-4 flex-1">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                <TrendingUp size={24} className="text-primary" />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight leading-tight">Operational <br />Intelligence Boost</h3>
                            <p className="text-slate-400 text-sm font-medium">Auto-dispatch algorithms improved delivery times by 14% across urban hubs.</p>
                            <button className="bg-primary text-white px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 hover:bg-emerald-600 transition-all">
                                Optimization Logs
                                <ArrowRight size={14} />
                            </button>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Efficiency</span>
                                <div className="text-2xl font-black mt-1">98.2%</div>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Network</span>
                                <div className="text-2xl font-black mt-1">1,240 Nodes</div>
                            </div>
                        </div>
                    </div>
                    {/* Abstract background element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-slate-100 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center relative">
                        <Activity size={32} className="text-primary" />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute inset-0 bg-primary/10 rounded-full"
                        />
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-slate-900">Platform Health</h4>
                        <p className="text-xs text-slate-400 font-bold mt-1">All systems operational</p>
                    </div>
                    <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-primary" />
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">Last synced: Just now</p>
                </div>
            </div>
        </div>
    );
}
