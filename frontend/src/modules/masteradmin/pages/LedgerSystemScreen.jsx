import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Download,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    BookOpen,
    Building2,
    Users,
    Briefcase
} from 'lucide-react';
import LedgerTable from '../components/tables/LedgerTable';
import mockLedgers from '../data/mockLedgers.json';
import { cn } from '@/lib/utils';

export default function LedgerSystemScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('hotel');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, [activeTab]);

    const tabs = [
        { id: 'hotel', label: 'Hotel Ledger', icon: Building2 },
        { id: 'vendor', label: 'Vendor Ledger', icon: Users },
        { id: 'franchise', label: 'Franchise Ledger', icon: Briefcase },
        { id: 'company', label: 'Company Ledger', icon: BookOpen }
    ];

    const getLedgerData = () => {
        switch (activeTab) {
            case 'hotel': return mockLedgers.hotelLedger;
            case 'vendor': return mockLedgers.vendorLedger;
            case 'franchise': return mockLedgers.franchiseLedger;
            case 'company': return mockLedgers.companyLedger;
            default: return [];
        }
    };

    const currentTransactions = getLedgerData().filter(txn => {
        const name = txn.hotelName || txn.vendorName || txn.franchiseName || txn.source || '';
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="space-y-8 pb-10">
            {/* Header Content */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Financial Ledgers</h1>
                    <p className="text-slate-500 font-medium">End-to-end transaction tracking and reconciliation.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button className="bg-white border border-slate-100 px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-slate-50 transition-all text-slate-600">
                        <Calendar size={18} />
                        Jan 2026
                    </button>
                    <button className="bg-slate-900 text-white p-3 rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-[28px] border border-slate-100 shadow-sm">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setIsLoading(true);
                                setActiveTab(tab.id);
                            }}
                            className={cn(
                                "flex items-center gap-3 px-6 py-3.5 rounded-2xl text-sm font-black transition-all",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-emerald-100"
                                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            <Icon size={18} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Analysis Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Outstanding</span>
                    <div className="flex items-center justify-between mt-2">
                        <div className="text-3xl font-black text-slate-900">₹40,250</div>
                        <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-tighter">Needs collection in 12 days</p>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Settled</span>
                    <div className="flex items-center justify-between mt-2">
                        <div className="text-3xl font-black text-emerald-600">₹1,24,500</div>
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                            <ArrowDownRight size={20} />
                        </div>
                    </div>
                    <p className="text-[10px] text-emerald-500 font-bold mt-4 uppercase tracking-tighter px-2 py-0.5 bg-emerald-50 self-start inline-block rounded-md">+5.2% this week</p>
                </div>

                <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-xl shadow-slate-200 flex flex-col justify-between">
                    <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Company Balance</span>
                        <div className="text-3xl font-black mt-2">₹2.5M</div>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 hover:translate-x-1 transition-transform mt-6">
                        Reconcile Accounts
                        <ArrowUpRight size={14} />
                    </button>
                </div>
            </div>

            {/* Ledger Table Section */}
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1 group w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 outline-none text-sm font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-primary/10 transition-all"
                        />
                    </div>
                    <button className="bg-slate-50 p-4 rounded-2xl text-slate-400 hover:text-primary transition-all">
                        <Filter size={18} />
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-80 bg-slate-50 rounded-[32px] animate-pulse"
                        />
                    ) : (
                        <motion.div
                            key="table"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <LedgerTable transactions={currentTransactions} type={activeTab} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
