import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock,
    Bell,
    Volume2,
    VolumeX,
    LayoutGrid,
    StretchHorizontal,
    Timer,
    CheckCircle2
} from 'lucide-react';
import { useFranchiseOrders } from '../contexts/FranchiseOrdersContext';
import TakeawayCard from '../components/cards/TakeawayCard';
import { cn } from '@/lib/utils';

export default function TakeawayScreen() {
    const { orders, updateOrderStatus } = useFranchiseOrders();
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // grid, list

    // Filter for takeaway orders in different active states
    const activeTakeawayOrders = orders.filter(o =>
        (o.type === 'kiosk' || o.status === 'preparing' || o.status === 'ready') &&
        o.status !== 'completed' && o.status !== 'cancelled'
    );

    const stats = {
        preparing: activeTakeawayOrders.filter(o => o.status === 'preparing').length,
        ready: activeTakeawayOrders.filter(o => o.status === 'ready').length,
        avgTime: '8.5 min'
    };

    return (
        <div className="min-h-screen bg-[#f8fafd] pb-32 lg:pb-12">
            {/* High Impact Header */}
            <header className="bg-slate-900 text-white p-6 lg:px-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-emerald-400 mb-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Kiosk Live Stream</p>
                        </div>
                        <h1 className="text-2xl font-black tracking-tight">Processing Orders</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                        >
                            {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'Preparing', value: stats.preparing, color: 'text-orange-400' },
                        { label: 'Ready', value: stats.ready, color: 'text-emerald-400' },
                        { label: 'Avg Time', value: stats.avgTime, color: 'text-slate-400' }
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className={cn("text-xl font-black tracking-tighter", stat.color)}>{stat.value}</p>
                        </div>
                    ))}
                </div>
            </header>

            <div className="p-6 lg:p-8">
                {activeTakeawayOrders.length > 0 ? (
                    <div className={cn(
                        "grid gap-6",
                        viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                    )}>
                        <AnimatePresence mode="popLayout">
                            {activeTakeawayOrders.map((order) => (
                                <TakeawayCard
                                    key={order.id}
                                    order={order}
                                    onStatusChange={updateOrderStatus}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-white rounded-[40px] flex items-center justify-center text-slate-100 shadow-sm border border-slate-50 mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Queue All Clear</h2>
                        <p className="text-sm text-slate-400 font-medium mt-2 max-w-xs leading-relaxed">
                            Excellent work! All kiosk orders have been processed. New orders will pop up here with a visual alert.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
