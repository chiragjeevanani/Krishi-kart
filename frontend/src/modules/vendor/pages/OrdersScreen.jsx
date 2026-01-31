import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ClipboardList,
    Clock,
    CheckCircle2,
    Truck,
    Search,
    ChevronRight,
    AlertCircle,
    Package,
    IndianRupee,
    ArrowRight
} from 'lucide-react';
import mockOrders from '../data/mockVendorOrders.json';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '@/modules/user/contexts/OrderContext';

const tabs = [
    { id: 'new', label: 'New Orders', icon: ClipboardList },
    { id: 'preparing', label: 'Preparing', icon: Clock },
    { id: 'ready', label: 'Ready', icon: CheckCircle2 },
    { id: 'completed', label: 'Completed', icon: Truck }
];

export default function OrdersScreen() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('new');
    const [searchTerm, setSearchTerm] = useState('');
    const { orders: contextOrders } = useOrders();

    // Map context orders that require procurement into the vendor format
    const liveVendorOrders = contextOrders
        .filter(o => o.fulfillmentType === 'requires_procurement')
        .map(o => ({
            id: o.id,
            franchiseName: o.franchise || 'Main Center',
            total: o.procurementTotal || o.total,
            procurementTotal: o.procurementTotal,
            status: (o.status === 'assigned' || !o.status) ? 'new' : o.status,
            items: o.items,
            priority: 'normal',
            deadline: new Date(Date.now() + 3600000).toISOString() // 1 hour from now
        }));

    const allOrders = [...liveVendorOrders, ...mockOrders.filter(m => !liveVendorOrders.find(l => l.id === m.id))];

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    const filteredOrders = allOrders.filter(order => {
        const matchesTab = activeTab === 'completed'
            ? order.status === 'completed'
            : activeTab === 'new'
                ? order.status === 'new'
                : order.status === activeTab;
        const matchesSearch = (order.franchiseName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    if (isLoading) return <div className="p-10 flex justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

    return (
        <div className="space-y-6 pb-20">
            <header>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Assigned Orders</h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Fulfillment Pipeline</p>
            </header>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border",
                            activeTab === tab.id
                                ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200"
                                : "bg-white text-slate-400 border-slate-100"
                        )}
                    >
                        <tab.icon size={14} />
                        {tab.label}
                        <span className={cn(
                            "ml-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px]",
                            activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-50 text-slate-400"
                        )}>
                            {mockOrders.filter(o => (tab.id === 'completed' ? o.status === 'completed' : (tab.id === 'new' ? o.status === 'new' : o.status === tab.id))).length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search order ID or franchise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm font-bold focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
                />
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {filteredOrders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => navigate(`/vendor/orders/${order.id}`)}
                            className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-all cursor-pointer group relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{order.id}</span>
                                        {order.priority === 'high' && (
                                            <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                                <AlertCircle size={8} /> High Priority
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-lg font-black text-slate-900 tracking-tight leading-none group-hover:text-primary transition-colors">{order.franchiseName}</h4>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-sm font-black text-slate-900 justify-end">
                                        <IndianRupee size={12} className="text-slate-400" />
                                        {order.total}
                                    </div>
                                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter mt-1">
                                        {order.items.length} Items Indexed
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                                {order.items.map((item, idx) => (
                                    <span key={idx} className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-xl text-[9px] font-bold text-slate-500 whitespace-nowrap">
                                        {item.name} ({item.quantity}{item.unit})
                                    </span>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Clock size={14} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">
                                        Deadline: {new Date(order.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                                    <ArrowRight size={16} />
                                </div>
                            </div>

                            {/* Status Indicator Bar */}
                            <div className={cn(
                                "absolute bottom-0 left-0 h-1 transition-all duration-500",
                                order.status === 'new' ? "bg-blue-500 w-1/4" :
                                    order.status === 'preparing' ? "bg-amber-500 w-2/4" :
                                        order.status === 'ready' ? "bg-emerald-500 w-3/4" : "bg-slate-400 w-full"
                            )} />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredOrders.length === 0 && (
                    <div className="py-20 text-center flex flex-col items-center">
                        <ClipboardList size={48} className="text-slate-100 mb-4" />
                        <h4 className="font-black text-slate-900 tracking-tight">No Active Orders</h4>
                        <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest">Queue is currently empty</p>
                    </div>
                )}
            </div>
        </div>
    );
}
