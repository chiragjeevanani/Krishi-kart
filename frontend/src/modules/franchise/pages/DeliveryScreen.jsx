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
    Package
} from 'lucide-react';
import { useFranchiseOrders } from '../contexts/FranchiseOrdersContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import StatusBadge from '../components/common/StatusBadge';

export default function DeliveryScreen() {
    const { orders, updateOrderStatus } = useFranchiseOrders();
    const [searchQuery, setSearchQuery] = useState('');

    // Orders ready for dispatch or currently out
    const deliveryOrders = orders.filter(o => o.type === 'delivery' && (o.status === 'assigned' || o.status === 'incoming'));

    const deliveryPartners = [
        { id: 'DP001', name: 'Amit Kumar', phone: '+91 98765 43210', avatar: 'AK' },
        { id: 'DP002', name: 'Suresh Singh', phone: '+91 98765 43211', avatar: 'SS' },
        { id: 'DP003', name: 'Vikram Phogat', phone: '+91 98765 43212', avatar: 'VP' }
    ];

    return (
        <div className="min-h-screen bg-[#f8fafd] pb-32 lg:pb-12">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white px-6 py-4 pt-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">Dispatch Hub</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Last-Mile Optimization</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                    <Navigation size={20} />
                </div>
            </header>

            <div className="p-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Ready to Dispatch</p>
                        <h3 className="text-xl font-black text-slate-900">{deliveryOrders.filter(o => o.status === 'incoming').length}</h3>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">On the Road</p>
                        <h3 className="text-xl font-black text-slate-900">{deliveryOrders.filter(o => o.status === 'assigned').length}</h3>
                    </div>
                </div>

                {/* Dispatch List */}
                <div className="space-y-4">
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Orders Awaiting Courier</h2>

                    <AnimatePresence mode="popLayout">
                        {deliveryOrders.map((order) => (
                            <motion.div
                                key={order.id}
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 transition-colors">
                                            <Package size={22} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-slate-900 tracking-tight">{order.id}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.customer}</p>
                                        </div>
                                    </div>
                                    <StatusBadge status={order.status} />
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start gap-2">
                                        <MapPin size={14} className="text-slate-300 mt-0.5" />
                                        <p className="text-xs font-bold text-slate-600 leading-snug">{order.address}</p>
                                    </div>
                                </div>

                                {order.status === 'incoming' ? (
                                    <div className="space-y-4">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Assign Delivery Partner</p>
                                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                                            {deliveryPartners.map((dp) => (
                                                <button
                                                    key={dp.id}
                                                    onClick={() => updateOrderStatus(order.id, 'assigned')}
                                                    className="shrink-0 flex items-center gap-3 bg-slate-50 hover:bg-emerald-50 hover:text-primary p-3 pr-5 rounded-2xl transition-all border border-transparent hover:border-emerald-100 active:scale-95"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[10px] font-black text-slate-400 border border-slate-100 uppercase">
                                                        {dp.avatar}
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-tight">{dp.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/50 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-green-100">
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Assigned Courier</p>
                                                <p className="text-xs font-black text-slate-900">Amit Kumar</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => updateOrderStatus(order.id, 'completed')}
                                            className="h-10 px-4 bg-emerald-500 text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-green-100 active:scale-95 transition-all"
                                        >
                                            Mark Delivered
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {deliveryOrders.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-white rounded-[32px] flex items-center justify-center text-slate-100 border border-slate-50 shadow-sm mb-6">
                                <Truck size={32} />
                            </div>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">No Active Dispatches</h3>
                            <p className="text-xs text-slate-400 font-medium mt-2">All delivery orders have been successfully assigned or completed.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
