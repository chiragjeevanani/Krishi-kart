import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    ShieldCheck,
    CreditCard,
    Search,
    Filter,
    CheckCircle2,
    Clock,
    UserPlus,
    Building,
    FileText
} from 'lucide-react';
import ApprovalCard from '../components/cards/ApprovalCard';
import mockApprovals from '../data/mockApprovals.json';
import { cn } from '@/lib/utils';

export default function OnboardingApprovalScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('vendor');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, [activeTab]);

    const tabs = [
        { id: 'vendor', label: 'Vendor KYC', icon: Users, count: mockApprovals.vendorKYC.length },
        { id: 'franchise', label: 'Franchise Docs', icon: Building, count: mockApprovals.franchiseDocuments.length },
        { id: 'credit', label: 'Credit Requests', icon: CreditCard, count: mockApprovals.hotelCreditRequests.length }
    ];

    const getApprovalData = () => {
        switch (activeTab) {
            case 'vendor': return mockApprovals.vendorKYC;
            case 'franchise': return mockApprovals.franchiseDocuments;
            case 'credit': return mockApprovals.hotelCreditRequests;
            default: return [];
        }
    };

    const currentItems = getApprovalData().filter(item => {
        const name = item.vendorName || item.franchiseName || item.hotelName || '';
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="space-y-8 pb-10">
            {/* Header Content */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Onboarding Desk</h1>
                    <p className="text-slate-500 font-medium">Review and verify applications across the KrishiKart ecosystem.</p>
                </div>

                <div className="flex items-center gap-4 bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
                    <UserPlus size={20} className="text-emerald-500" />
                    <div>
                        <div className="text-sm font-black text-emerald-900 leading-none">Global Queue</div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1 inline-block">24 Pending Approvals</span>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-[32px] border border-slate-100 shadow-sm">
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
                                "flex items-center gap-3 px-6 py-4 rounded-[24px] text-sm font-black transition-all relative",
                                isActive
                                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            <Icon size={18} />
                            {tab.label}
                            {tab.count > 0 && (
                                <span className={cn(
                                    "px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest",
                                    isActive ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
                                )}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Search Hub */}
            <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search applications by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 outline-none text-sm font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                </div>
                <button className="bg-slate-50 p-4 rounded-2xl text-slate-400 hover:text-primary transition-all">
                    <Filter size={18} />
                </button>
            </div>

            {/* Grid of Results */}
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-80 bg-slate-50 rounded-[32px] animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {currentItems.map((item) => (
                            <ApprovalCard
                                key={item.id}
                                item={item}
                                type={activeTab}
                                onApprove={() => { }}
                                onReject={() => { }}
                                onViewDoc={() => { }}
                            />
                        ))}

                        {currentItems.length === 0 && (
                            <div className="col-span-full py-20 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h3 className="font-black text-slate-900">All caught up!</h3>
                                <p className="text-sm text-slate-400 font-medium">No pending approvals in this category.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
