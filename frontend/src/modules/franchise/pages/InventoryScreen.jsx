import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PackageSearch,
    QrCode,
    Plus,
    Search,
    Filter,
    ArrowUpRight,
    AlertTriangle
} from 'lucide-react';
import { useInventory } from '../contexts/InventoryContext';
import InventoryCard from '../components/cards/InventoryCard';
import { cn } from '@/lib/utils';
import AnimatedCounter from '../components/common/AnimatedCounter';

export default function InventoryScreen() {
    const navigate = useNavigate();
    const { inventory, categories, getStockStats } = useInventory();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const stats = getStockStats();

    const filteredItems = inventory.filter(item => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="pb-32 lg:pb-12 bg-slate-50/50 min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 pt-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight">Warehouse Stock</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Live Inventory Control</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/franchise/procurement')}
                            className="h-10 px-4 rounded-xl bg-primary/10 text-primary flex items-center gap-2 hover:bg-primary/20 transition-all text-[10px] font-black uppercase tracking-widest"
                        >
                            <Plus size={14} />
                            Procure Stock
                        </button>
                        <button className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-200 active:scale-95 transition-all">
                            <QrCode size={20} />
                        </button>
                    </div>
                </div>

                {/* Sub-header Controls */}
                <div className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input
                            type="text"
                            placeholder="Find items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        {['All', ...categories].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all shrink-0",
                                    activeCategory === cat
                                        ? "bg-primary border-primary text-white shadow-lg shadow-green-100"
                                        : "bg-white border-slate-100 text-slate-400 hover:border-primary/20 hover:text-slate-600"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <div className="p-6">
                {/* Visual Stats Summary */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white rounded-[28px] p-5 border border-slate-100 shadow-sm relative overflow-hidden">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Health Score</p>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                            <AnimatedCounter value={stats.totalItems > 0 ? Math.round((stats.healthyCount / stats.totalItems) * 100) : 0} suffix="%" />
                        </h3>
                        <div className="w-full bg-slate-50 h-1.5 rounded-full mt-3 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(stats.healthyCount / stats.totalItems) * 100}%` }}
                                className="h-full bg-emerald-500"
                            />
                        </div>
                    </div>
                    <div className={cn(
                        "bg-white rounded-[28px] p-5 border shadow-sm relative overflow-hidden transition-colors",
                        stats.lowStockCount > 2 ? "border-red-100 bg-red-50/10" : "border-slate-100"
                    )}>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Low Stock</p>
                        <h3 className={cn("text-2xl font-black tracking-tight", stats.lowStockCount > 2 ? "text-red-500" : "text-slate-900")}>
                            <AnimatedCounter value={stats.lowStockCount} /> <span className="text-[10px] uppercase">SKUs</span>
                        </h3>
                        {stats.lowStockCount > 2 && (
                            <AlertTriangle className="absolute -right-2 -bottom-2 text-red-500/10" size={60} />
                        )}
                    </div>
                </div>

                {/* Inventory List */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <AnimatePresence>
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.05
                                }}
                            >
                                <InventoryCard item={item} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                        <PackageSearch size={48} className="mb-4 text-slate-300" />
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">No items found</p>
                    </div>
                )}
            </div>

            {/* Bulk Actions Fab */}
            <div className="fixed bottom-24 right-6 lg:bottom-12 z-40 flex flex-col gap-3">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200 flex items-center justify-center"
                >
                    <Plus size={24} />
                </motion.button>
            </div>
        </div>
    );
}
