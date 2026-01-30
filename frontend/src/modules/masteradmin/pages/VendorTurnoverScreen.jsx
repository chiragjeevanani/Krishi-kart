import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp,
    Search,
    ChevronDown,
    ChevronLeft,
    IndianRupee,
    ArrowUpRight,
    ArrowDownRight,
    BarChart3,
    Calendar,
    Download,
    Users,
    Briefcase,
    Info
} from 'lucide-react';
import mockVendors from '../data/mockVendors.json';
import { cn } from '@/lib/utils';

export default function VendorTurnoverScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVendorId, setSelectedVendorId] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'detail'

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, [selectedVendorId, viewMode]);

    const filteredVendors = mockVendors.filter(v =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeVendor = selectedVendorId
        ? mockVendors.find(v => v.id === selectedVendorId)
        : null;

    const aggregateStats = {
        totalTurnover: mockVendors.reduce((acc, v) => acc + v.totalTurnover, 0),
        avgGrowth: 12.5, // Mock growth rate
        activeVendors: mockVendors.filter(v => v.status === 'active').length,
        highestEarner: mockVendors.reduce((prev, current) => (prev.totalTurnover > current.totalTurnover) ? prev : current)
    };

    const handleVendorClick = (id) => {
        setIsLoading(true);
        setSelectedVendorId(id);
        setViewMode('detail');
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        {viewMode === 'detail' && (
                            <button
                                onClick={() => setViewMode('grid')}
                                className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-sm"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">
                            {viewMode === 'grid' ? 'Vendor Economics' : activeVendor?.name}
                        </h1>
                    </div>
                    <p className="text-slate-500 font-medium ml-1">
                        {viewMode === 'grid'
                            ? 'Consolidated turnover analytics for the entire supply network.'
                            : `Financial performance and revenue breakdown for ${activeVendor?.id}.`}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button className="bg-white border border-slate-100 p-4 rounded-2xl text-slate-400 hover:text-primary transition-all shadow-sm">
                        <Download size={18} />
                    </button>
                    <button className="bg-primary text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100">
                        <Calendar size={16} />
                        Financial Year 2026
                    </button>
                </div>
            </div>

            {/* Top Level Summary Cards */}
            <AnimatePresence mode="wait">
                {viewMode === 'grid' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-4 gap-6"
                    >
                        <SummaryCard
                            icon={IndianRupee}
                            label="Network Turnover"
                            value={`₹${(aggregateStats.totalTurnover / 1000000).toFixed(1)}M`}
                            sub="Consolidated Revenue"
                            variant="primary"
                            viewMode={viewMode}
                        />
                        <SummaryCard
                            icon={TrendingUp}
                            label="Avg. Growth"
                            value={`${aggregateStats.avgGrowth}%`}
                            sub="Month-on-Month"
                            variant="success"
                            viewMode={viewMode}
                        />
                        <SummaryCard
                            icon={Users}
                            label="Active Partners"
                            value={aggregateStats.activeVendors}
                            sub="Generating Volume"
                            viewMode={viewMode}
                        />
                        <SummaryCard
                            icon={Briefcase}
                            label="Peak Partner"
                            value={aggregateStats.highestEarner.name.split(' ')[0]}
                            sub="Top Revenue Node"
                            viewMode={viewMode}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <SummaryCard
                            icon={IndianRupee}
                            label="Total Earned"
                            value={`₹${(activeVendor.totalTurnover / 1000).toFixed(0)}K`}
                            sub="Cumulative Turnover"
                            variant="primary"
                            viewMode={viewMode}
                        />
                        <SummaryCard
                            icon={BarChart3}
                            label="Avg. Monthly"
                            value={`₹${((activeVendor.totalTurnover / activeVendor.monthlyTurnover.length) / 1000).toFixed(0)}K`}
                            sub="Operational Mean"
                            viewMode={viewMode}
                        />
                        <SummaryCard
                            icon={TrendingUp}
                            label="Growth Trend"
                            value="+12%"
                            sub="Vs Previous Month"
                            variant="success"
                            viewMode={viewMode}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <div className="h-96 bg-white border border-slate-100 rounded-[40px] flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : viewMode === 'grid' ? (
                    <motion.div
                        key="grid-view"
                        className="space-y-6"
                    >
                        {/* Search Bar */}
                        <div className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm">
                            <div className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-all" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search vendor financials by ID or Name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-16 pr-6 outline-none text-sm font-black text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-primary/5 transition-all"
                                />
                            </div>
                        </div>

                        {/* Vendors Table */}
                        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Vendor Node</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Monthly Peak</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Current Run Rate</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total Turnover</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {filteredVendors.map((vendor) => {
                                            const monthlyMax = Math.max(...vendor.monthlyTurnover.map(m => m.amount));
                                            const currentMonth = vendor.monthlyTurnover[vendor.monthlyTurnover.length - 1].amount;

                                            return (
                                                <tr key={vendor.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => handleVendorClick(vendor.id)}>
                                                    <td className="px-8 py-6">
                                                        <div className="flex flex-col">
                                                            <span className="font-black text-slate-900 text-lg tracking-tight group-hover:text-primary transition-colors">{vendor.name}</span>
                                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{vendor.id} | {vendor.category}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 font-black text-slate-600">₹{monthlyMax.toLocaleString()}</td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-black text-slate-900">₹{currentMonth.toLocaleString()}</span>
                                                            <div className="flex items-center text-[10px] font-black text-emerald-500">
                                                                <ArrowUpRight size={12} /> 8%
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="font-black text-primary text-xl tracking-tighter">₹{vendor.totalTurnover.toLocaleString()}</span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all shadow-sm">
                                                            Full Analysis
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="detail-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        {/* Monthly Bar Chart View */}
                        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight italic uppercase">Monthly Turnover Velocity</h3>
                                    <p className="text-xs text-slate-400 font-bold uppercase mt-1">Fiscal Year Analysis</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Peak Volume</p>
                                        <p className="text-lg font-black text-slate-900">₹{Math.max(...activeVendor.monthlyTurnover.map(m => m.amount)).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-end justify-between h-64 gap-4 px-4">
                                {activeVendor.monthlyTurnover.map((item, idx) => {
                                    const maxAmount = Math.max(...activeVendor.monthlyTurnover.map(m => m.amount));
                                    const height = (item.amount / maxAmount) * 100;

                                    return (
                                        <div key={item.month} className="flex-1 flex flex-col items-center gap-4 group">
                                            <div className="relative w-full flex justify-center">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${height}%` }}
                                                    className={cn(
                                                        "w-full max-w-[60px] rounded-t-2xl transition-all duration-500",
                                                        idx === activeVendor.monthlyTurnover.length - 1 ? "bg-primary shadow-[0_0_20px_rgba(22,163,74,0.3)]" : "bg-slate-100 group-hover:bg-slate-200"
                                                    )}
                                                />
                                                <div className="absolute -top-8 bg-slate-900 text-white text-[10px] font-black py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                    ₹{(item.amount / 1000).toFixed(0)}K
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase">{item.month}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Additional Insights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2">
                                    <TrendingUp size={16} className="text-emerald-500" />
                                    Growth Forecasting
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <span className="text-xs font-bold text-slate-600">Expected Next Month</span>
                                        <span className="font-black text-slate-900">₹2.1L</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <span className="text-xs font-bold text-slate-600">Projected Annual</span>
                                        <span className="font-black text-slate-900">₹24.8L</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900 p-8 rounded-[40px] text-white overflow-hidden relative">
                                <div className="relative z-10">
                                    <h4 className="text-sm font-black uppercase tracking-tight mb-6">Tax & Compliance Status</h4>
                                    <div className="flex items-center gap-4 p-5 bg-white/5 rounded-3xl border border-white/10">
                                        <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center">
                                            <IndianRupee size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">GST Settlement</p>
                                            <p className="text-base font-black text-white">Fully Compliant</p>
                                        </div>
                                        <div className="ml-auto w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                                            <ArrowUpRight size={16} />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function SummaryCard({ icon: Icon, label, value, sub, variant = 'default', viewMode }) {
    const variants = {
        default: "bg-white text-slate-900 border-slate-100",
        primary: "bg-slate-900 text-white border-transparent shadow-xl shadow-slate-200",
        success: "bg-emerald-600 text-white border-transparent shadow-xl shadow-emerald-100",
    };

    return (
        <div className={cn("p-8 rounded-[40px] border shadow-sm transition-all group relative overflow-hidden", variants[viewMode === 'detail' && variant === 'primary' ? 'default' : variant])}>
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                        variant === 'default' ? "bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary" : "bg-white/20 text-white"
                    )}>
                        <Icon size={24} />
                    </div>
                    <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest opacity-60",
                        variant === 'default' ? "text-slate-400" : "text-white"
                    )}>
                        {label}
                    </span>
                </div>
                <div className="text-3xl font-black italic uppercase tracking-tighter">{value}</div>
                <p className={cn(
                    "text-[10px] mt-1 font-bold uppercase tracking-widest opacity-60",
                    variant === 'default' ? "text-slate-400" : "text-white"
                )}>
                    {sub}
                </p>
            </div>
            {variant !== 'default' && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
            )}
        </div>
    );
}
