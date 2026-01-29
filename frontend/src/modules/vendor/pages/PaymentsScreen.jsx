import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    IndianRupee,
    TrendingUp,
    Percent,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    ChevronRight,
    Search,
    Calendar,
    Download,
    PieChart,
    BarChart3,
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mockPayments from '../data/mockPayments.json';
import { cn } from '@/lib/utils';

export default function PaymentsScreen() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { currentMonth, history, transactions } = mockPayments;

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="h-10 w-48 bg-slate-100 rounded-xl" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-40 bg-slate-100 rounded-[32px]" />)}
                </div>
                <div className="h-64 bg-slate-100 rounded-[40px]" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-32">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Earnings Intel</h1>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Settlement Cycle: 15-30 OCT</p>
                </div>
                <button className="w-12 h-12 bg-white border border-slate-100 text-slate-900 rounded-2xl flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all">
                    <Download size={20} />
                </button>
            </header>

            {/* Primary Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900 p-8 rounded-[40px] text-white relative overflow-hidden"
                >
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Net Payout (OCT)</p>
                    <h3 className="text-4xl font-black tracking-tighter">₹{currentMonth.netPayout.toLocaleString()}</h3>
                    <div className="mt-6 flex items-center gap-2">
                        <span className="flex items-center gap-1 text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg uppercase">
                            <ArrowUpRight size={10} /> +12%
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Vs Last Month</span>
                    </div>
                </motion.div>

                <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <BarChart3 size={20} />
                        </div>
                        <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Gross Earnings</p>
                        <h4 className="text-2xl font-black text-slate-900">₹{currentMonth.grossEarnings.toLocaleString()}</h4>
                    </div>
                    <div className="pt-4 border-t border-slate-50 mt-4">
                        <p className="text-[8px] font-bold text-slate-400 uppercase">Total Volume: 1,420 KG</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                            <Percent size={20} />
                        </div>
                        <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Platform Commission</p>
                        <h4 className="text-2xl font-black text-slate-900">₹{currentMonth.commission.toLocaleString()}</h4>
                    </div>
                    <div className="pt-4 border-t border-slate-50 mt-4">
                        <p className="text-[8px] font-bold text-slate-400 uppercase">Standard Rate: {currentMonth.commissionPercentage}%</p>
                    </div>
                </div>
            </div>

            {/* P&L Visual & Ledger */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visual P&L Preview */}
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">P&L Breakdown</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Operational Margins</p>
                        </div>
                        <PieChart size={20} className="text-slate-200" />
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase">
                                <span>Core Profit</span>
                                <span className="text-emerald-500">87.5%</span>
                            </div>
                            <div className="h-4 bg-slate-50 rounded-full overflow-hidden flex">
                                <div className="h-full bg-slate-900" style={{ width: '87.5%' }} />
                                <div className="h-full bg-primary/20" style={{ width: '12.5%' }} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Logistics Deducts</p>
                                <p className="text-sm font-black text-slate-900">₹0.00</p>
                                <p className="text-[8px] text-emerald-500 font-bold uppercase mt-1">Waived (Promo)</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Quality Penalties</p>
                                <p className="text-sm font-black text-slate-900">₹0.00</p>
                                <p className="text-[8px] text-emerald-500 font-bold uppercase mt-1">100% Score</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Transitions Ledger */}
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">Settlement Logs</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction History</p>
                        </div>
                        <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 group">
                            Full Ledger <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {transactions.map((txn, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                        <CreditCard size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-slate-900">{txn.id}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{txn.franchise} • {txn.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-slate-900">₹{txn.amount}</p>
                                    <span className="text-[8px] font-black uppercase text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">Settled</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Historical Payouts */}
            <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-2">Historical Payouts</h3>
                <div className="grid grid-cols-1 gap-3">
                    {history.map((pay, i) => (
                        <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-900 tracking-tight">{pay.period}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {pay.id}</p>
                                </div>
                            </div>
                            <div className="text-right flex items-center gap-6">
                                <div className="hidden md:block">
                                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1 text-right">Commission</p>
                                    <p className="text-xs font-bold text-red-400">₹{pay.commission.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1 text-right">Net Payout</p>
                                    <p className="text-sm font-black text-slate-900">₹{pay.net.toLocaleString()}</p>
                                </div>
                                <div className={cn(
                                    "px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                    pay.status === 'Paid' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                                )}>
                                    {pay.status}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
