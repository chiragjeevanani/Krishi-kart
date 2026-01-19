import { motion } from 'framer-motion';
import { Package, Truck, Check, X, AlertTriangle } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { cn } from '@/lib/utils';

export default function InventoryCard({ item, onConfirm }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[28px] p-5 border border-slate-100 shadow-sm"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                        <Package size={24} />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-slate-900 tracking-tight">{item.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</p>
                    </div>
                </div>
                <StatusBadge status={item.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-2xl p-4 mb-4">
                <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Expected</p>
                    <p className="text-sm font-black text-slate-900">{item.expectedQty} units</p>
                </div>
                <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Received</p>
                    <p className="text-sm font-black text-slate-900">{item.receivedQty} units</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-2">
                        <Truck size={14} /> From: {item.vendor}
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.receivedQty / item.expectedQty) * 100}%` }}
                            className="bg-primary h-full rounded-full"
                        />
                    </div>
                </div>
                {item.status === 'pending' && (
                    <button
                        onClick={() => onConfirm?.(item.id)}
                        className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-green-100 active:scale-95 transition-all"
                    >
                        <Check size={20} />
                    </button>
                )}
            </div>
        </motion.div>
    );
}
