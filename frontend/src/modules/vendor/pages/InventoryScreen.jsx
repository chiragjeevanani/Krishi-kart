import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    Plus,
    Edit2,
    Trash2,
    CheckCircle2,
    XCircle,
    ChevronRight,
    IndianRupee,
    Loader2,
    Image as ImageIcon,
    MoreVertical
} from 'lucide-react';
import mockProduce from '../data/mockProduce.json';
import { cn } from '@/lib/utils';

export default function InventoryScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [inventory, setInventory] = useState(mockProduce);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    const categories = ['All', 'Vegetables', 'Fruits', 'Seasonal'];

    const filteredInventory = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleAvailability = (id) => {
        setInventory(prev => prev.map(item =>
            item.id === id ? { ...item, available: !item.available } : item
        ));
    };

    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-10 w-48 bg-slate-100 rounded-xl" />
                <div className="h-14 w-full bg-slate-100 rounded-2xl" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-slate-100 rounded-[24px]" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Produce Stock</h1>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{inventory.length} Items Indexed</p>
                </div>
                <button className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    <Plus size={24} />
                </button>
            </header>

            {/* Search and Filters */}
            <div className="space-y-4">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search produce..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm font-bold focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border",
                                activeCategory === cat
                                    ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200"
                                    : "bg-white text-slate-400 border-slate-100 hover:border-slate-200"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Inventory List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                    {filteredInventory.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={cn(
                                "bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm flex gap-4 transition-all group relative overflow-hidden",
                                !item.available && "opacity-75 grayscale-[0.5]"
                            )}
                        >
                            {/* Product Image */}
                            <div className="w-24 h-24 rounded-2xl bg-slate-50 flex-shrink-0 relative overflow-hidden group-hover:rotate-1 transition-transform">
                                <img
                                    src={item.image}
                                    className="w-full h-full object-cover"
                                    alt={item.name}
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                                />
                                {!item.available && (
                                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
                                        <XCircle className="text-white" size={24} />
                                    </div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mb-1">{item.category}</p>
                                            <h4 className="text-lg font-black text-slate-900 tracking-tight leading-none">{item.name}</h4>
                                        </div>
                                        <button className="text-slate-300 hover:text-slate-600 transition-colors">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 mt-3 text-slate-900">
                                        <IndianRupee size={12} className="text-slate-400" />
                                        <span className="text-sm font-black">{item.price}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">PER {item.unit}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                            item.quantity > 20 ? "bg-emerald-50 text-emerald-600" :
                                                item.quantity > 0 ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                                        )}>
                                            {item.quantity} {item.unit} Left
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => toggleAvailability(item.id)}
                                        className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm",
                                            item.available ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                                        )}
                                    >
                                        {item.available ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Hover Action Overlay */}
                            <div className="absolute inset-y-0 right-0 w-12 bg-slate-900/5 translate-x-12 group-hover:translate-x-0 transition-transform flex flex-col items-center justify-center gap-4 border-l border-white/20">
                                <button className="text-slate-600 hover:text-primary transition-colors">
                                    <Edit2 size={16} />
                                </button>
                                <button className="text-slate-600 hover:text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredInventory.length === 0 && (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4 border border-dashed border-slate-200">
                            <ImageIcon size={32} />
                        </div>
                        <h4 className="text-slate-900 font-black tracking-tight">No Produce Found</h4>
                        <p className="text-slate-400 text-xs mt-1">Try adjusting your filters or search terms</p>
                        <button
                            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                            className="text-primary text-[10px] font-black uppercase tracking-widest mt-4 hover:underline"
                        >
                            Reset Search
                        </button>
                    </div>
                )}
            </div>

            {/* Quick Add Sticky Button (Mobile Only) */}
            <div className="fixed bottom-24 right-6 lg:hidden">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl shadow-slate-900/20 active:bg-primary transition-colors"
                >
                    <Plus size={28} />
                </motion.button>
            </div>
        </div>
    );
}
