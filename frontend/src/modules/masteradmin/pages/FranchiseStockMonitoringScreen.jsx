import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Download,
    Filter,
    Store,
    AlertTriangle,
    Package,
    ArrowRight,
    ShoppingCart,
    ChevronDown,
    Activity
} from 'lucide-react';
import StockAlertBadge from '../components/badges/StockAlertBadge';
import mockStock from '../data/mockFranchiseStock.json';
import { cn } from '@/lib/utils';

export default function FranchiseStockMonitoringScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFranchiseId, setSelectedFranchiseId] = useState(mockStock.franchises[0].franchiseId);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, [selectedFranchiseId]);

    const activeFranchise = mockStock.franchises.find(f => f.franchiseId === selectedFranchiseId);

    const filteredStock = activeFranchise.stock.filter(item =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const metrics = {
        totalItems: activeFranchise.stock.length,
        lowStockItems: activeFranchise.stock.filter(s => s.alertStatus !== 'ok').length,
        criticalItems: activeFranchise.stock.filter(s => s.alertStatus === 'critical').length
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header Content */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Stock Intelligence</h1>
                    <p className="text-slate-500 font-medium">Real-time inventory levels across regional franchise hubs.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <select
                            value={selectedFranchiseId}
                            onChange={(e) => {
                                setIsLoading(true);
                                setSelectedFranchiseId(e.target.value);
                            }}
                            className="appearance-none bg-white border border-slate-100 outline-none py-3.5 px-6 pr-12 rounded-2xl text-sm font-black text-slate-700 cursor-pointer shadow-sm hover:bg-slate-50 transition-all"
                        >
                            {mockStock.franchises.map(f => (
                                <option key={f.franchiseId} value={f.franchiseId}>{f.franchiseName}</option>
                            ))}
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                            <Package size={24} />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">In Stock</span>
                    </div>
                    <div className="text-3xl font-black text-slate-900">{metrics.totalItems}</div>
                    <p className="text-slate-400 text-xs mt-1 font-bold">Monitored SKU Items</p>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                            <AlertTriangle size={24} />
                        </div>
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Alerts</span>
                    </div>
                    <div className="text-3xl font-black text-slate-900">{metrics.lowStockItems}</div>
                    <p className="text-slate-400 text-xs mt-1 font-bold">Items below MBQ threshold</p>
                </div>

                <div className="bg-red-600 p-8 rounded-[32px] text-white shadow-xl shadow-red-100 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                <Activity size={24} />
                            </div>
                            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Critical</span>
                        </div>
                        <div className="text-3xl font-black">{metrics.criticalItems}</div>
                        <p className="text-white/60 text-xs mt-1 font-bold">Shut-off Risk Detectected</p>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1 group w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search inventory by item name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 outline-none text-sm font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-primary/10 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <button className="bg-slate-50 p-4 rounded-2xl text-slate-400 hover:text-primary transition-all">
                            <Filter size={18} />
                        </button>
                        <button className="bg-primary text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex-1 md:flex-none">
                            <ShoppingCart size={16} />
                            Auto-Generate POs
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <div className="h-96 bg-slate-50 rounded-[32px] animate-pulse" />
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden"
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Product Details</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Current Stock</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">MBQ Threshold</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Procurement</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {filteredStock.map((item) => (
                                            <tr key={item.productId} className="group hover:bg-slate-50/50 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-extrabold text-slate-900 text-lg tracking-tight">{item.productName}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">ID: {item.productId}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <div className="inline-flex flex-col">
                                                        <span className={cn(
                                                            "text-2xl font-black",
                                                            item.currentStock < item.mbq ? "text-red-500" : "text-slate-900"
                                                        )}>
                                                            {item.currentStock} {item.unit}
                                                        </span>
                                                        <div className="w-16 h-1 mt-2 bg-slate-100 rounded-full overflow-hidden">
                                                            <div
                                                                className={cn(
                                                                    "h-full rounded-full",
                                                                    item.currentStock < item.mbq ? "bg-red-500" : "bg-emerald-500"
                                                                )}
                                                                style={{ width: `${Math.min((item.currentStock / item.mbq) * 100, 100)}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <span className="text-sm font-black text-slate-400">{item.mbq} {item.unit}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <StockAlertBadge status={item.alertStatus} />
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    {item.alertStatus !== 'ok' ? (
                                                        <button className="bg-primary/10 text-primary px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center gap-2 ml-auto shadow-sm group/btn">
                                                            Create PO
                                                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                                        </button>
                                                    ) : (
                                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Optimized</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
