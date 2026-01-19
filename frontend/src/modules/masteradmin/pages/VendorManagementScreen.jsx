import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Search,
    MoreVertical,
    Star,
    Package,
    Activity,
    TrendingUp,
    ShieldCheck,
    Filter,
    Plus
} from 'lucide-react';
import mockVendors from '../data/mockVendors.json';
import { cn } from '@/lib/utils';

export default function VendorManagementScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const filteredVendors = mockVendors.filter(v =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return <div className="p-20 flex justify-center items-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Vendor Directory</h1>
                    <p className="text-slate-500 font-medium">Manage and monitor platform supply-side performance.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-50">
                        <Plus size={18} />
                        Onboard Vendor
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-6 rounded-[32px] text-white">
                    <div className="flex items-center gap-3 mb-4 text-emerald-400">
                        <ShieldCheck size={20} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Partners</span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tight">142</h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">94% Retention Rate</p>
                </div>
                <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4 text-primary">
                        <TrendingUp size={20} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Compliance Score</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">4.82</h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Industry Standard: 4.20</p>
                </div>
                <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4 text-blue-600">
                        <Activity size={20} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Fulfillment Rate</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">98.4%</h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Avg Lead Time: 2.4 Hrs</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search vendors by name, category or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 outline-none text-sm font-bold placeholder:text-slate-400 focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-50 px-6 py-3.5 rounded-2xl text-xs font-black text-slate-600 hover:text-primary transition-all border border-transparent hover:border-primary/10">
                        <Filter size={16} />
                        Advanced
                    </button>
                </div>
            </div>

            {/* Vendor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVendors.map((vendor, index) => (
                    <motion.div
                        key={vendor.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                    >
                        {/* Status Light */}
                        <div className={cn(
                            "absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-10 blur-2xl transition-all group-hover:opacity-20",
                            vendor.status === 'active' ? "bg-emerald-500" : "bg-red-500"
                        )} />

                        <div className="flex items-start justify-between relative z-10">
                            <div className="flex gap-5">
                                <div className="w-16 h-16 rounded-[20px] bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors duration-500">
                                    <Users size={28} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-slate-900 tracking-tight">{vendor.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex items-center gap-1 text-amber-500 font-black text-[10px]">
                                            <Star size={12} fill="currentColor" /> {vendor.rating}
                                        </div>
                                        <span className="text-[10px] text-slate-200 font-black">•</span>
                                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{vendor.category}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="p-2 text-slate-300 hover:text-slate-600 rounded-xl hover:bg-slate-50 transition-all">
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                                    <Package size={8} /> Orders Fulfilled
                                </p>
                                <p className="text-lg font-black text-slate-900">{vendor.ordersFulfilled.toLocaleString()}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                                    <Activity size={8} /> Active Load
                                </p>
                                <div className="flex items-center gap-2">
                                    <p className="text-lg font-black text-slate-900">{vendor.pendingWorkload}</p>
                                    <div className={cn(
                                        "px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase",
                                        vendor.pendingWorkload > 10 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                                    )}>
                                        {vendor.pendingWorkload > 10 ? 'High' : 'Optimal'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-2">
                                <div className={cn(
                                    "w-2 h-2 rounded-full",
                                    vendor.status === 'active' ? "bg-emerald-400 animate-pulse" : "bg-red-400"
                                )} />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{vendor.status}</span>
                            </div>
                            <button className="text-[10px] font-black text-primary px-4 py-2 hover:bg-primary/5 rounded-xl transition-all uppercase tracking-widest border border-transparent hover:border-primary/20">
                                View Profile
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredVendors.length === 0 && (
                <div className="py-20 text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                        <Users size={40} />
                    </div>
                    <h3 className="font-bold text-slate-900">No vendors matching search</h3>
                    <p className="text-xs text-slate-400 mt-1 font-medium">Verify your query and try again.</p>
                </div>
            )}
        </div>
    );
}
