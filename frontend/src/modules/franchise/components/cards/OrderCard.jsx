import { motion } from 'framer-motion';
import { ShoppingBag, MapPin, Clock, ChevronRight, CheckCircle2, XCircle, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OrderCard({ order, onAction }) {
    const statusConfig = {
        incoming: { icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50', label: 'New Order' },
        assigned: { icon: Truck, color: 'text-orange-500', bg: 'bg-orange-50', label: 'In Transit' },
        completed: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', label: 'Delivered' },
        takeaway: { icon: CheckCircle2, color: 'text-purple-500', bg: 'bg-purple-50', label: 'Takeaway' },
        cancelled: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Cancelled' }
    };

    const config = statusConfig[order.status] || statusConfig.incoming;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[28px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all group"
        >
            <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", config.bg)}>
                            <config.icon size={20} className={config.color} />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-slate-900 tracking-tight">{order.id}</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.timestamp ? new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}</p>
                        </div>
                    </div>
                    <div className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tight", config.bg, config.color)}>
                        {config.label}
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <div className="flex items-start gap-2">
                        <MapPin size={14} className="text-slate-300 mt-0.5" />
                        <p className="text-xs font-bold text-slate-600 leading-tight">{order.address}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock size={14} className="text-slate-300" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {order.items.length} Items • Total Value: <span className="text-slate-900 font-black">₹{order.total}</span>
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-2">
                    {order.status === 'incoming' && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); onAction?.(order.id, 'assigned'); }}
                                className="flex-1 h-11 bg-primary text-white rounded-xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all shadow-lg shadow-green-100"
                            >
                                Accept Order
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onAction?.(order.id, 'cancelled'); }}
                                className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center active:scale-95 transition-all"
                            >
                                <XCircle size={18} />
                            </button>
                        </>
                    )}
                    {order.status === 'assigned' && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onAction?.(order.id, 'completed'); }}
                            className="flex-1 h-11 bg-orange-500 text-white rounded-xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all shadow-lg shadow-orange-100"
                        >
                            Mark Picked Up
                        </button>
                    )}
                    {(order.status === 'completed' || order.status === 'takeaway') && (
                        <button className="flex-1 h-11 bg-slate-50 text-slate-400 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
                            Order closed <CheckCircle2 size={16} />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
