import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Clock,
    ArrowLeft,
    TrendingUp,
    CheckCircle2,
    Calendar,
    ChevronRight,
    Search,
    IndianRupee,
    BarChart3,
    TrendingDown,
    Loader2
} from 'lucide-react';
import mockOrders from '../data/mockVendorOrders.json';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function HistoryScreen() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const completedOrders = mockOrders.filter(o => o.status === 'completed');

    if (isLoading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="space-y-6 pb-20">
            <header className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-xl transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">Archive & Intel</h1>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">Historical Performance</p>
                </div>
            </header>

            {/* Performance Snapshot */}
            <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary">
                            <BarChart3 size={24} />
                        </div>
                        <div className="text-right">
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Fulfillment Avg</p>
                            <h3 className="text-3xl font-black">98.4%</h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingUp size={12} className="text-emerald-400" />
                                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Growth</p>
                            </div>
                            <p className="text-lg font-black">+14.2%</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Clock size={12} className="text-blue-400" />
                                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Turnaround</p>
                            </div>
                            <p className="text-lg font-black">42m Avg</p>
                        </div>
                    </div>
                </div>
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -mr-32 -mt-32" />
            </div>

            {/* Past Deliveries */}
            <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Recent Archives</h3>

                {completedOrders.map((order, index) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-lg hover:shadow-slate-200/50 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-slate-900 tracking-tight">{order.franchiseName}</h4>
                                <p className="text-[8px] font-bold text-slate-400 uppercase mt-1">{new Date(order.timestamp).toLocaleDateString('en-GB')}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-sm font-black text-slate-900">
                                <IndianRupee size={10} className="text-slate-400" />
                                {order.total}
                            </div>
                            <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-tighter mt-1">Paid-Out</p>
                        </div>
                    </motion.div>
                ))}

                {completedOrders.length === 0 && (
                    <div className="py-20 text-center">
                        <Calendar size={48} className="text-slate-100 mx-auto mb-4" />
                        <h4 className="text-slate-300 font-black uppercase tracking-widest text-[10px]">No archives found</h4>
                    </div>
                )}
            </div>

            <button className="w-full bg-white border border-slate-100 py-5 rounded-[24px] font-black text-[10px] text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-all">
                Download Ledger (PDF)
            </button>
        </div>
    );
}
