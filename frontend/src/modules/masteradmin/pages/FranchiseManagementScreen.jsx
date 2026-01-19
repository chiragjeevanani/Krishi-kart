import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Store,
    Search,
    ChevronDown,
    ChevronUp,
    Globe,
    Activity,
    BarChart2,
    Power,
    ExternalLink,
    MapPin,
    Calendar
} from 'lucide-react';
import mockFranchises from '../data/mockFranchises.json';
import { cn } from '@/lib/utils';

export default function FranchiseManagementScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [expandedRow, setExpandedRow] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    const filteredFranchises = mockFranchises.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.region.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return <div className="p-20 flex justify-center items-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Franchise Network</h1>
                    <p className="text-slate-500 font-medium">Coordinate and monitor regional distribution centers.</p>
                </div>

                <div className="flex items-center gap-4 bg-white p-2 rounded-[24px] border border-slate-100 shadow-sm">
                    <div className="px-5 py-2 border-r border-slate-50 text-center">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Total</p>
                        <p className="text-sm font-black text-slate-900">24 Nodes</p>
                    </div>
                    <div className="px-5 py-2 text-center">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global Performance</p>
                        <p className="text-sm font-black text-primary">89.4% Avg</p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Filter by franchise name or region..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 outline-none text-sm font-bold placeholder:text-slate-400 focus:ring-2 focus:ring-primary/10 transition-all font-sans"
                    />
                </div>
                <button className="w-full md:w-auto bg-slate-50 px-6 py-3.5 rounded-2xl text-xs font-black text-slate-600 hover:text-primary transition-all flex items-center justify-center gap-2 border border-transparent hover:border-primary/10">
                    <Globe size={16} />
                    Region View
                </button>
            </div>

            {/* Franchise List Table */}
            <div className="bg-white/50 rounded-[32px] overflow-hidden">
                <table className="w-full text-left border-separate border-spacing-y-3 px-1">
                    <thead>
                        <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            <th className="px-8 py-4">Node Identity</th>
                            <th className="px-8 py-4 text-center">Efficiency</th>
                            <th className="px-8 py-4">Annual Volume</th>
                            <th className="px-8 py-4">Current Load</th>
                            <th className="px-8 py-4">Protocol</th>
                            <th className="px-8 py-4 text-right">Settings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFranchises.map((franchise, index) => (
                            <React.Fragment key={franchise.id}>
                                <motion.tr
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={cn(
                                        "bg-white group cursor-pointer hover:bg-slate-50 transition-all rounded-[28px] shadow-sm border border-slate-100",
                                        expandedRow === franchise.id ? "bg-slate-50 ring-2 ring-primary/20" : ""
                                    )}
                                    onClick={() => setExpandedRow(expandedRow === franchise.id ? null : franchise.id)}
                                >
                                    <td className="px-8 py-6 first:rounded-l-[28px]">
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm",
                                                franchise.status === 'active' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                                            )}>
                                                <Store size={22} />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 tracking-tight">{franchise.name}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{franchise.region}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${franchise.performance}%` }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                    className={cn(
                                                        "h-full rounded-full shadow-[0_0_10px_rgba(22,163,74,0.3)]",
                                                        franchise.performance > 90 ? "bg-emerald-500" :
                                                            franchise.performance > 80 ? "bg-primary" : "bg-amber-500"
                                                    )}
                                                />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-900">{franchise.performance}%</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-900 text-sm tracking-tight">₹{(franchise.orderVolume / 1000).toFixed(1)}k</span>
                                            <span className="text-[10px] text-slate-300 font-bold">Total Revenue</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-lg uppercase tracking-tight">
                                            {franchise.activeOrders} Orders
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={cn(
                                            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                                            franchise.status === 'active' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                                        )}>
                                            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", franchise.status === 'active' ? "bg-emerald-400" : "bg-red-400")} />
                                            {franchise.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 last:rounded-r-[28px] text-right">
                                        <button className="p-2 text-slate-400 hover:text-primary transition-all">
                                            {expandedRow === franchise.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                    </td>
                                </motion.tr>

                                <AnimatePresence>
                                    {expandedRow === franchise.id && (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-2">
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="bg-white m-2 rounded-[24px] overflow-hidden border border-slate-100"
                                                >
                                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-8">
                                                        <div className="space-y-4">
                                                            <div className="flex items-center gap-2 text-primary">
                                                                <MapPin size={16} />
                                                                <h5 className="text-[10px] font-black uppercase tracking-[0.2em]">Contact Details</h5>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <p className="text-sm font-bold text-slate-900 leading-tight">Chief Manager: Rajiv S.</p>
                                                                <p className="text-xs text-slate-500 font-medium">+91 98765 43210</p>
                                                                <p className="text-xs text-slate-500 font-medium">sector42.center@krishikart.com</p>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <div className="flex items-center gap-2 text-purple-600">
                                                                <Activity size={16} />
                                                                <h5 className="text-[10px] font-black uppercase tracking-[0.2em]">Live Status</h5>
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <div className="flex justify-between items-center text-xs font-medium text-slate-500">
                                                                    <span>Storage Capacity</span>
                                                                    <span className="font-bold text-slate-900">84%</span>
                                                                </div>
                                                                <div className="flex justify-between items-center text-xs font-medium text-slate-500">
                                                                    <span>Active Vendors</span>
                                                                    <span className="font-bold text-slate-900">12</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <div className="flex items-center gap-2 text-amber-600">
                                                                <Calendar size={16} />
                                                                <h5 className="text-[10px] font-black uppercase tracking-[0.2em]">Last 24h</h5>
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <div className="flex justify-between items-center text-xs font-medium text-slate-500">
                                                                    <span>New Bookings</span>
                                                                    <span className="font-bold text-slate-900">+42</span>
                                                                </div>
                                                                <div className="flex justify-between items-center text-xs font-medium text-slate-500">
                                                                    <span>Success Rate</span>
                                                                    <span className="font-bold text-emerald-600">98%</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col justify-center gap-3">
                                                            <button className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                                                                <ExternalLink size={14} />
                                                                System Portal
                                                            </button>
                                                            <button className="bg-white border border-slate-100 text-[10px] font-black uppercase tracking-widest py-3 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all flex items-center justify-center gap-2 group">
                                                                <Power size={14} className="text-slate-300 group-hover:text-red-500" />
                                                                Suspend Node
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                {filteredFranchises.length === 0 && (
                    <div className="py-20 text-center">
                        <BarChart2 size={48} className="mx-auto text-slate-100 mb-4" />
                        <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs">No Nodes Found</h4>
                    </div>
                )}
            </div>
        </div>
    );
}

// Simple React import fix for component use
import React from 'react';
