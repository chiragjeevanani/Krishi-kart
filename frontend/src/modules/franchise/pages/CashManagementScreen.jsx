import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wallet,
    Landmark,
    ArrowUpRight,
    Search,
    ChevronLeft,
    CheckCircle2,
    Calendar,
    ArrowRight,
    TrendingUp,
    History,
    FileText,
    Banknote
} from 'lucide-react';
import { useCOD } from '../contexts/CODContext';
import StatusBadge from '../components/common/StatusBadge';
import { cn } from '@/lib/utils';
import AnimatedCounter from '../components/common/AnimatedCounter';

export default function CashManagementScreen() {
    const { transactions, summary, markAsDeposited } = useCOD();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTx, setSelectedTx] = useState(null);
    const [referenceId, setReferenceId] = useState('');

    const filteredTransactions = transactions.filter(tx =>
        tx.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.hotelName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDeposit = (txId) => {
        if (!referenceId) return;
        markAsDeposited(txId, referenceId);
        setSelectedTx(null);
        setReferenceId('');
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pb-32 lg:pb-12">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 pt-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight">Cash Management</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">COD Reconciliation</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50">
                        <Wallet size={22} strokeWidth={2.5} />
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                        type="text"
                        placeholder="Search Order ID or Hotel..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 bg-slate-100 border border-slate-100 rounded-2xl text-xs font-bold transition-all outline-none focus:bg-white focus:ring-4 focus:ring-primary/5"
                    />
                </div>
            </header>

            <div className="p-6">
                {/* Visual Stats Summary */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-900 rounded-[32px] p-6 text-white col-span-2 relative overflow-hidden shadow-xl shadow-slate-200">
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-1">Cash to Deposit</p>
                                <h2 className="text-3xl font-black tracking-tighter">
                                    ₹<AnimatedCounter value={summary.totalToDeposit} />
                                </h2>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-widest border border-emerald-500/30">
                                        Terminal A1
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Reconciliation Due Today</span>
                                </div>
                            </div>
                            <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 backdrop-blur-md">
                                <TrendingUp size={28} />
                            </div>
                        </div>
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
                    </div>

                    <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Already Deposited</p>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">₹<AnimatedCounter value={summary.totalDeposited} /></h3>
                    </div>
                    <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Tx</p>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">{summary.pendingTxCount} <span className="text-[10px] uppercase text-red-500">Pending</span></h3>
                    </div>
                </div>

                {/* Transaction List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Recent Collections</h2>
                        <button className="text-[9px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                            Deposit All <ArrowRight size={12} />
                        </button>
                    </div>

                    <AnimatePresence mode="popLayout">
                        {filteredTransactions.map((tx) => (
                            <motion.div
                                key={tx.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[32px] p-5 border border-slate-100 shadow-sm group hover:border-emerald-100 transition-all cursor-pointer"
                                onClick={() => tx.status === 'pending' && setSelectedTx(tx)}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-4">
                                        <div className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                                            tx.status === 'pending' ? "bg-slate-50 text-slate-400" : "bg-emerald-50 text-emerald-500"
                                        )}>
                                            <Banknote size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-slate-900 tracking-tight">{tx.hotelName}</h4>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Order: {tx.orderId}</p>
                                        </div>
                                    </div>
                                    <StatusBadge status={tx.status === 'pending' ? 'pending deposit' : 'deposited'} />
                                </div>

                                <div className="flex items-center justify-between mt-4 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={12} className="text-slate-400" />
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            {new Date(tx.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base font-black text-slate-900 tracking-tight">₹{tx.amount.toLocaleString()}</span>
                                    </div>
                                </div>

                                {tx.status === 'deposited' && tx.bankReference && (
                                    <div className="mt-2 flex items-center gap-2 px-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Ref: {tx.bankReference}</p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredTransactions.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
                            <History size={48} strokeWidth={1} className="mb-4 text-slate-300" />
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400">No transactions found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Deposit Verification Modal/Drawer */}
            <AnimatePresence>
                {selectedTx && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedTx(null)}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 w-full bg-white rounded-t-[40px] z-[60] shadow-2xl p-8 pb-12"
                        >
                            <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-[24px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <Landmark size={32} />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Confirm Bank Deposit</p>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Verify ₹{selectedTx.amount.toLocaleString()}</h3>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 space-y-4">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-slate-400 uppercase">Order Identity</span>
                                        <span className="font-black text-slate-900 uppercase">{selectedTx.orderId}</span>
                                    </div>
                                    <div className="w-full h-px bg-slate-100" />
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-slate-400 uppercase">Collection Hub</span>
                                        <span className="font-black text-slate-900 uppercase">Warehouse Terminal 1</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="px-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Bank Reference ID (UTR)</label>
                                    <input
                                        type="text"
                                        placeholder="Enter 12-digit UTR Number"
                                        value={referenceId}
                                        onChange={(e) => setReferenceId(e.target.value)}
                                        className="w-full h-16 px-6 bg-slate-100 border border-slate-100 rounded-2xl text-sm font-black focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none uppercase placeholder:text-slate-300"
                                    />
                                </div>

                                <button
                                    disabled={!referenceId}
                                    onClick={() => handleDeposit(selectedTx.id)}
                                    className={cn(
                                        "w-full h-16 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3",
                                        referenceId
                                            ? "bg-primary text-white shadow-green-200 hover:bg-primary/90"
                                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                    )}
                                >
                                    Confirm Deposit Successful <CheckCircle2 size={20} />
                                </button>

                                <button
                                    onClick={() => setSelectedTx(null)}
                                    className="w-full h-12 text-slate-400 font-black uppercase text-[10px] tracking-widest"
                                >
                                    Cancel & Close
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
