import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Download,
    ShieldAlert,
    ArrowUpRight,
    CreditCard,
    DollarSign,
    AlertCircle,
    TrendingUp,
    Filter
} from 'lucide-react';
import CreditLimitCard from '../components/cards/CreditLimitCard';
import CreditOverrideModal from '../components/modals/CreditOverrideModal';
import mockData from '../data/mockCreditLimits.json';
import { cn } from '@/lib/utils';

export default function CreditManagementScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const filteredHotels = mockData.hotelCredits.filter(hotel =>
        hotel.hotelName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOverride = (hotel) => {
        setSelectedHotel(hotel);
        setIsModalOpen(true);
    };

    const handleSaveOverride = (data) => {
        console.log('Saving override:', data, 'for hotel:', selectedHotel.hotelId);
        setIsModalOpen(false);
        // In a real app, this would update state/backend
    };

    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-10 w-full bg-slate-100 rounded-2xl" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-64 bg-slate-100 rounded-[32px]" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header Secion */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Credit Control</h1>
                    <p className="text-slate-500 font-medium">Manage hotel credit limits and financial exposure.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                        Global Freeze
                        <ShieldAlert size={18} />
                    </button>
                    <button className="bg-white border border-slate-100 p-3 rounded-2xl text-slate-400 hover:text-primary hover:bg-slate-50 transition-all">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-500 p-8 rounded-[32px] text-white shadow-xl shadow-emerald-100">
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <CreditCard size={20} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-2 py-1 rounded-lg">Healthy</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-100 uppercase tracking-widest">Total Credit Exposure</span>
                    <div className="text-3xl font-black mt-1">₹4.2M</div>
                    <div className="flex items-center gap-2 mt-4 text-[10px] font-bold">
                        <TrendingUp size={12} />
                        <span>12% from last month</span>
                    </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-xl shadow-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <DollarSign size={20} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-red-500 px-2 py-1 rounded-lg">Action Required</span>
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending Collections</span>
                    <div className="text-3xl font-black mt-1">₹125K</div>
                    <div className="flex items-center gap-2 mt-4 text-[10px] font-bold text-red-400">
                        <AlertCircle size={12} />
                        <span>3 hotels over limit</span>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Status</span>
                        <div className="flex items-center gap-3 mt-4">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-lg font-black text-slate-900">Auto-Credit Active</span>
                        </div>
                    </div>
                    <button className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform mt-6">
                        View Audit Logs
                        <ArrowUpRight size={14} />
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search hotel by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 outline-none text-sm font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                </div>
                <button className="bg-slate-50 p-4 rounded-2xl text-slate-400 hover:text-primary transition-all">
                    <Filter size={18} />
                </button>
            </div>

            {/* Grid of Credit Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHotels.map((hotel) => (
                    <CreditLimitCard
                        key={hotel.hotelId}
                        hotel={hotel}
                        onOverride={handleOverride}
                        onViewHistory={() => { }}
                        onToggleFreeze={() => { }}
                    />
                ))}
            </div>

            <CreditOverrideModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                hotel={selectedHotel}
                onSave={handleSaveOverride}
            />
        </div>
    );
}
