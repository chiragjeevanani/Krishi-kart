import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Truck,
    User,
    Phone,
    Navigation,
    CheckCircle2,
    Search,
    MapPin,
    Package,
    Clock,
    UserPlus,
    Ghost
} from 'lucide-react';
import { useFranchiseOrders } from '../contexts/FranchiseOrdersContext';
import { cn } from '@/lib/utils';
import StatusBadge from '../components/common/StatusBadge';

export default function DeliveryScreen() {
    const { orders, updateOrderStatus } = useFranchiseOrders();
    const [searchQuery, setSearchQuery] = useState('');

    // Filter orders that are ready to go or currently out
    const dispatchOrders = orders.filter(o =>
        (o.status === 'ready' || o.status === 'out_for_delivery') &&
        (o.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) || o.id.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const readyCount = orders.filter(o => o.status === 'ready').length;
    const outCount = orders.filter(o => o.status === 'out_for_delivery').length;

    const deliveryPartners = [
        { id: 'DP001', name: 'Amit Kumar', phone: '+91 98765 43210', avatar: 'AK' },
        { id: 'DP002', name: 'Suresh Singh', phone: '+91 98765 43211', avatar: 'SS' },
        { id: 'DP003', name: 'Vikram Phogat', phone: '+91 98765 43212', avatar: 'VP' },
        { id: 'DP004', name: 'Rahul Dev', phone: '+91 98765 43213', avatar: 'RD' }
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 pb-32 lg:pb-12 font-sans">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 pt-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight">Dispatch Hub</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Last-Mile Operations</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center border border-orange-100/50">
                        <Navigation size={22} strokeWidth={2.5} />
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                        type="text"
                        placeholder="Search Hotel or Order..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 bg-slate-100 border border-slate-100 rounded-2xl text-xs font-bold transition-all outline-none focus:bg-white focus:ring-4 focus:ring-primary/5"
                    />
                </div>
            </header>

            <div className="p-6">
                {/* Visual Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Awaiting Dispatch</p>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{readyCount} <span className="text-orange-500 uppercase text-[10px]">Queue</span></h3>
                    </div>
                    <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm text-primary">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">On the Road</p>
                        <h3 className="text-2xl font-black tracking-tight">{outCount} <span className="text-primary/50 uppercase text-[10px]">Active</span></h3>
                    </div>
                </div>

                {/* Dispatch List */}
                <div className="space-y-6">
                    <AnimatePresence mode="popLayout">
                        {dispatchOrders.length > 0 ? (
                            dispatchOrders.map((order) => (
                                <motion.div
                                    key={order.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm group hover:shadow-xl hover:shadow-green-900/5 transition-all overflow-hidden relative"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 transition-colors border border-slate-100">
                                                <Package size={24} />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-black text-slate-900 tracking-tight">{order.hotelName}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.id}</span>
                                                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-tight">{order.deliverySlot}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <StatusBadge status={order.status} />
                                    </div>

                                    <div className="space-y-3 mb-6 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                                        <div className="flex items-start gap-2">
                                            <MapPin size={14} className="text-slate-300 mt-0.5" />
                                            <p className="text-xs font-bold text-slate-600 leading-snug">{order.address}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Clock size={12} /> Value: ₹{order.total.toLocaleString()}
                                        </div>
                                    </div>

                                    {order.status === 'ready' ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between px-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    <UserPlus size={14} className="text-primary" /> Assign Courier Partner
                                                </p>
                                            </div>
                                            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                                                {deliveryPartners.map((dp) => (
                                                    <motion.button
                                                        key={dp.id}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => updateOrderStatus(order.id, 'out_for_delivery')}
                                                        className="shrink-0 flex items-center gap-3 bg-white border border-slate-100 p-3 pr-5 rounded-2xl transition-all hover:border-primary hover:shadow-lg shadow-green-100 group/dp"
                                                    >
                                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xs font-black text-slate-500 border border-slate-100 uppercase group-hover/dp:bg-primary group-hover/dp:text-white transition-colors">
                                                            {dp.avatar}
                                                        </div>
                                                        <div className="text-left">
                                                            <span className="block text-[11px] font-black text-slate-900 uppercase tracking-tight">{dp.name.split(' ')[0]}</span>
                                                            <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active</span>
                                                        </div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between gap-4 p-1">
                                            <div className="flex items-center gap-4 bg-primary/5 p-3 rounded-2xl border border-primary/10 flex-1">
                                                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-green-100">
                                                    <User size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black text-primary uppercase tracking-widest">Courier Dispatch In-Progress</p>
                                                    <h4 className="text-sm font-black text-slate-900">Amit Kumar</h4>
                                                    <p className="text-[9px] font-bold text-slate-400">+91 98765 43210</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => updateOrderStatus(order.id, 'delivered')}
                                                className="h-14 px-6 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-slate-200 active:scale-95 transition-all hover:bg-slate-800"
                                            >
                                                Delivered
                                            </button>
                                        </div>
                                    )}

                                    {/* Decoration */}
                                    <div className="absolute -right-4 -bottom-4 opacity-[0.03] pointer-events-none group-hover:rotate-12 transition-transform duration-700">
                                        <Truck size={120} />
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-24 flex flex-col items-center justify-center text-center opacity-40"
                            >
                                <Ghost size={64} strokeWidth={1} className="mb-4 text-slate-300" />
                                <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">No Active Shipments</h3>
                                <p className="text-[10px] font-bold text-slate-400 mt-2">Check the orders queue to prepare new shipments</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
