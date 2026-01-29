import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    FileText,
    Truck,
    Clock,
    Filter,
    Download,
    CheckCircle2,
    IndianRupee,
    ChevronRight,
    MapPin,
    Building,
    Store
} from 'lucide-react';
import POCreationDrawer from '../components/drawers/POCreationDrawer';
import StatusBadge from '../components/common/StatusBadge';
import mockPOs from '../data/mockPurchaseOrders.json';
import { cn } from '@/lib/utils';

export default function PurchaseManagerScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const filteredPOs = mockPOs.purchaseOrders.filter(po => {
        const matchesSearch = po.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            po.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === 'all' || po.status === activeFilter;
        return matchesSearch && matchesFilter;
    });

    if (isLoading) {
        return <div className="h-96 w-full bg-slate-50/50 animate-pulse rounded-[32px]" />;
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header Content */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Purchase Workspace</h1>
                    <p className="text-slate-500 font-medium">Manage vendor procurement, PO approvals and logistics.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100"
                    >
                        <Plus size={18} />
                        New Purchase Order
                    </button>
                    <button className="bg-white border border-slate-100 p-3 rounded-2xl text-slate-400 hover:text-primary hover:bg-slate-50 transition-all">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Status Tracking Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Pending Approval', count: 12, color: 'emerald', icon: Clock },
                    { label: 'Awaiting Dispatch', count: 8, color: 'blue', icon: Truck },
                    { label: 'In Transit', count: 4, color: 'amber', icon: MapPin },
                    { label: 'Completed Today', count: 42, color: 'slate', icon: CheckCircle2 }
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className={`w-10 h-10 bg-${stat.color}-50 text-${stat.color}-500 rounded-xl flex items-center justify-center`}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <div className="text-xl font-black text-slate-900 leading-none">{stat.count}</div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1 inline-block">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Hub */}
            <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search PO by ID or Vendor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 outline-none text-sm font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                </div>
                <div className="flex items-center gap-2">
                    {['all', 'pending_approval', 'approved', 'draft'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={cn(
                                "px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                activeFilter === filter ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                            )}
                        >
                            {filter.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* PO List */}
            <div className="grid grid-cols-1 gap-4">
                {filteredPOs.map((po) => (
                    <motion.div
                        key={po.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100/50 transition-all group cursor-pointer"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-slate-50 rounded-[20px] flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-black text-slate-900 text-lg uppercase tracking-tight">{po.id}</span>
                                        <StatusBadge status={po.status} />
                                    </div>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                            <Building size={14} className="text-slate-300" />
                                            {po.vendorName}
                                        </div>
                                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                            <Store size={14} className="text-slate-300" />
                                            {po.franchiseName}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 lg:px-10 lg:border-x border-slate-100">
                                <div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Order Value</span>
                                    <div className="flex items-center gap-1 mt-1 font-black text-slate-900">
                                        <IndianRupee size={14} className="text-slate-400" />
                                        {po.totalAmount.toLocaleString()}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Items</span>
                                    <div className="font-black text-slate-900 mt-1">{po.items.length} SKUs</div>
                                </div>
                                <div className="hidden lg:block">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Created</span>
                                    <div className="font-black text-slate-900 mt-1">{new Date(po.createdAt).toLocaleDateString('en-IN')}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {po.status === 'pending_approval' ? (
                                    <button className="bg-primary text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100">
                                        Approve PO
                                    </button>
                                ) : (
                                    <button className="bg-slate-50 text-slate-400 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 hover:text-slate-600 transition-all border border-slate-100">
                                        View Details
                                    </button>
                                )}
                                <button className="p-3 text-slate-300 hover:text-primary transition-colors">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <POCreationDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onSave={() => setIsDrawerOpen(false)}
            />
        </div>
    );
}
