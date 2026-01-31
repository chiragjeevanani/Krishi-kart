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
    Activity,
    ChevronLeft,
    Users,
    MapPin,
    ArrowUpRight
} from 'lucide-react';
import StockAlertBadge from '../components/badges/StockAlertBadge';
import mockStock from '../data/mockFranchiseStock.json';
import { cn } from '@/lib/utils';

export default function FranchiseStockMonitoringScreen() {
    const [viewMode, setViewMode] = useState('network'); // 'network' or 'detail'
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFranchiseId, setSelectedFranchiseId] = useState(null);
    const [liveFranchiseInventory, setLiveFranchiseInventory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Load live inventory from localStorage (simulating central monitoring of franchise hubs)
    useEffect(() => {
        const loadLiveInventory = () => {
            const saved = localStorage.getItem('franchise_inventory');
            if (saved) {
                setLiveFranchiseInventory(JSON.parse(saved));
            }
        };

        loadLiveInventory();
        window.addEventListener('storage', loadLiveInventory);

        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => {
            window.removeEventListener('storage', loadLiveInventory);
            clearTimeout(timer);
        };
    }, [selectedFranchiseId, viewMode]);

    const handleFranchiseClick = (id) => {
        setIsLoading(true);
        setSelectedFranchiseId(id);
        setViewMode('detail');
    };

    // Combine mock franchises with live inventory for the specific "Koramangala" hub (F-003) 
    // since 'franchise_inventory' currently represents our active simulation hub.
    const franchises = mockStock.franchises.map(f => {
        if (f.franchiseId === 'F-003' && liveFranchiseInventory.length > 0) {
            return {
                ...f,
                stock: f.stock.map(s => {
                    const liveItem = liveFranchiseInventory.find(li => li.id === s.productId || li.productId === s.productId);
                    if (liveItem) {
                        return {
                            ...s,
                            currentStock: liveItem.currentStock,
                            alertStatus: liveItem.currentStock < s.mbq ? (liveItem.currentStock === 0 ? 'critical' : 'low') : 'ok'
                        };
                    }
                    return s;
                })
            };
        }
        return f;
    });

    const activeFranchise = selectedFranchiseId
        ? franchises.find(f => f.franchiseId === selectedFranchiseId)
        : null;

    const filteredStock = activeFranchise?.stock.filter(item =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Global Stats
    const globalStats = {
        totalFranchises: franchises.length,
        criticalAlerts: franchises.reduce((acc, f) =>
            acc + f.stock.filter(s => s.alertStatus === 'critical').length, 0),
        lowStockAlerts: franchises.reduce((acc, f) =>
            acc + f.stock.filter(s => s.alertStatus === 'low').length, 0),
        healthyFranchises: franchises.filter(f =>
            f.stock.every(s => s.alertStatus === 'ok')).length
    };

    const activeFranchiseMetrics = activeFranchise ? {
        totalItems: activeFranchise.stock.length,
        lowStockItems: activeFranchise.stock.filter(s => s.alertStatus !== 'ok').length,
        criticalItems: activeFranchise.stock.filter(s => s.alertStatus === 'critical').length
    } : null;

    return (
        <div className="space-y-8 pb-10">
            {/* Header Content */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        {viewMode === 'detail' && (
                            <button
                                onClick={() => setViewMode('network')}
                                className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-sm"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">
                            {viewMode === 'network' ? 'Network Intelligence' : activeFranchise?.franchiseName}
                        </h1>
                    </div>
                    <p className="text-slate-500 font-medium ml-1">
                        {viewMode === 'network'
                            ? 'Real-time inventory health across all regional franchise hubs.'
                            : `Detailed stock analysis for ${activeFranchise?.location} center.`}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {viewMode === 'detail' && (
                        <div className="relative">
                            <select
                                value={selectedFranchiseId}
                                onChange={(e) => {
                                    setIsLoading(true);
                                    setSelectedFranchiseId(e.target.value);
                                }}
                                className="appearance-none bg-white border border-slate-100 outline-none py-3.5 px-6 pr-12 rounded-2xl text-sm font-black text-slate-700 cursor-pointer shadow-sm hover:bg-slate-50 transition-all"
                            >
                                {franchises.map(f => (
                                    <option key={f.franchiseId} value={f.franchiseId}>{f.franchiseName}</option>
                                ))}
                            </select>
                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    )}
                    <button className="bg-white border border-slate-100 p-4 rounded-2xl text-slate-400 hover:text-primary transition-all shadow-sm">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Global Metrics for Network View */}
            <AnimatePresence mode="wait">
                {viewMode === 'network' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-4 gap-6"
                    >
                        <MetricCard
                            icon={Store}
                            label="Total Hubs"
                            value={globalStats.totalFranchises}
                            sub="Active Franchises"
                        />
                        <MetricCard
                            icon={AlertTriangle}
                            label="Critical Stock"
                            value={globalStats.criticalAlerts}
                            sub="Action Required"
                            variant="danger"
                        />
                        <MetricCard
                            icon={Activity}
                            label="Low Stock Alerts"
                            value={globalStats.lowStockAlerts}
                            sub="Refilling Required"
                            variant="warning"
                        />
                        <MetricCard
                            icon={Package}
                            label="Network Health"
                            value={`${Math.round((globalStats.healthyFranchises / globalStats.totalFranchises) * 100)}%`}
                            sub="Fully Stocked Hubs"
                            variant="success"
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <MetricCard
                            icon={Package}
                            label="Total SKUs"
                            value={activeFranchiseMetrics.totalItems}
                            sub="Monitored Items"
                        />
                        <MetricCard
                            icon={AlertTriangle}
                            label="Low Stock"
                            value={activeFranchiseMetrics.lowStockItems}
                            sub="Below Threshold"
                            variant="warning"
                        />
                        <MetricCard
                            icon={Activity}
                            label="Critical Risk"
                            value={activeFranchiseMetrics.criticalItems}
                            sub="Immediate Action"
                            variant="danger"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <div className="h-96 bg-white/50 border border-slate-100 rounded-[40px] flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : viewMode === 'network' ? (
                    <motion.div
                        key="network-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    >
                        {franchises.map((franchise) => {
                            const criticalCount = franchise.stock.filter(s => s.alertStatus === 'critical').length;
                            const totalItems = franchise.stock.length;
                            const healthyCount = franchise.stock.filter(s => s.alertStatus === 'ok').length;
                            const healthScore = Math.round((healthyCount / totalItems) * 100);

                            return (
                                <motion.div
                                    key={franchise.franchiseId}
                                    whileHover={{ y: -5 }}
                                    onClick={() => handleFranchiseClick(franchise.franchiseId)}
                                    className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer group relative overflow-hidden"
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                                <Store size={28} />
                                            </div>
                                            <div className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                                criticalCount > 0 ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500"
                                            )}>
                                                {criticalCount > 0 ? `${criticalCount} Critical` : 'Stable'}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors">{franchise.franchiseName}</h3>

                                        <div className="flex items-center gap-4 mt-2 text-slate-400">
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                                                <MapPin size={12} />
                                                {franchise.location}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                                                <Users size={12} />
                                                {franchise.manager}
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Health</span>
                                                <span className="text-sm font-black text-slate-900">{healthScore}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${healthScore}%` }}
                                                    className={cn(
                                                        "h-full rounded-full transition-all",
                                                        healthScore > 80 ? "bg-emerald-500" : healthScore > 50 ? "bg-amber-500" : "bg-red-500"
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between pt-6 border-t border-slate-50">
                                            <div className="flex gap-4">
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Alerts</p>
                                                    <p className="font-black text-slate-900">{franchise.stock.filter(s => s.alertStatus !== 'ok').length}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">SKUs</p>
                                                    <p className="font-black text-slate-900">{totalItems}</p>
                                                </div>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all">
                                                <ArrowUpRight size={20} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/5 transition-all" />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                ) : (
                    <motion.div
                        key="detail-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        {/* Detail View Toolbar */}
                        <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
                            <div className="relative flex-1 group w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search inventory in this hub..."
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

                        {/* Inventory Table */}
                        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
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
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function MetricCard({ icon: Icon, label, value, sub, variant = 'default' }) {
    const variants = {
        default: "bg-white text-slate-900",
        danger: "bg-red-600 text-white shadow-xl shadow-red-100",
        warning: "bg-amber-500 text-white shadow-xl shadow-amber-100",
        success: "bg-emerald-600 text-white shadow-xl shadow-emerald-100"
    };

    return (
        <div className={cn("p-8 rounded-[32px] border border-slate-100 shadow-sm transition-all group relative overflow-hidden", variants[variant])}>
            <div className="relative z-10 text-inherit">
                <div className="flex items-center justify-between mb-4">
                    <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                        variant === 'default' ? "bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary" : "bg-white/20 text-white"
                    )}>
                        <Icon size={24} />
                    </div>
                    <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        variant === 'default' ? "text-slate-400" : "text-white/60"
                    )}>
                        {label}
                    </span>
                </div>
                <div className="text-3xl font-black text-inherit">{value}</div>
                <p className={cn(
                    "text-xs mt-1 font-bold",
                    variant === 'default' ? "text-slate-400" : "text-white/60"
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
