import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PackageSearch,
    QrCode,
    ChevronLeft,
    Plus,
    ArrowRightLeft,
    CheckCircle2,
    Calendar,
    Filter
} from 'lucide-react';
import mockInventory from '../data/mockInventory.json';
import InventoryCard from '../components/cards/InventoryCard';
import { Button } from '@/components/ui/button';

export default function InventoryScreen() {
    const [items, setItems] = useState(mockInventory);
    const [activeFilter, setActiveFilter] = useState('all'); // all, pending, received

    const handleConfirm = (id) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, status: 'received', receivedQty: item.expectedQty } : item
        ));
    };

    const filteredItems = items.filter(item => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'pending') return item.status === 'pending' || item.status === 'partially_received';
        if (activeFilter === 'received') return item.status === 'received';
        return true;
    });

    return (
        <div className="pb-32 lg:pb-12 bg-[#f8fafd] min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white px-6 py-4 pt-6 border-b border-slate-100">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight">Inventory</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Stock Management</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-200 active:scale-95 transition-all">
                            <QrCode size={20} />
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {['all', 'pending', 'received'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${activeFilter === filter
                                    ? 'bg-primary border-primary text-white shadow-lg shadow-green-100'
                                    : 'bg-white border-slate-100 text-slate-400'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </header>

            <div className="p-6">
                {/* Stats Summary */}
                <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm mb-8 flex items-center justify-between overflow-hidden relative">
                    <div className="relative z-10">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stock Health</p>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">85% <span className="text-emerald-500">↑</span></h3>
                        <p className="text-[9px] font-bold text-slate-400 uppercase mt-2">12 Items arriving today</p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center relative z-10">
                        <Calendar size={28} />
                    </div>
                    <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                </div>

                {/* Inventory List */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <InventoryCard
                                key={item.id}
                                item={item}
                                onConfirm={handleConfirm}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Float Scan CTA */}
            <div className="fixed bottom-24 right-6 lg:bottom-12 z-40">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-2xl bg-primary text-white shadow-xl shadow-green-200 flex items-center justify-center"
                >
                    <Plus size={24} />
                </motion.button>
            </div>
        </div>
    );
}
