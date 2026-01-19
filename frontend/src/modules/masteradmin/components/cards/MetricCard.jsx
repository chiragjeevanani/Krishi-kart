import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MetricCard({ label, value, change, trend, icon: Icon, currency, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
        >
            <div className="flex items-start justify-between">
                <div className={cn(
                    "p-3 rounded-2xl group-hover:scale-110 transition-transform",
                    label.includes('Revenue') ? "bg-emerald-50 text-emerald-600" :
                        label.includes('Pending') ? "bg-amber-50 text-amber-600" :
                            label.includes('Active') ? "bg-blue-50 text-blue-600" :
                                "bg-slate-50 text-slate-600"
                )}>
                    <Icon size={24} />
                </div>

                {trend !== 'neutral' && (
                    <div className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                    )}>
                        {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {Math.abs(change)}%
                    </div>
                )}
                {trend === 'neutral' && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-50 text-slate-400">
                        <Minus size={12} />
                        STABLE
                    </div>
                )}
            </div>

            <div className="mt-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
                    {currency}{value.toLocaleString()}
                </h3>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">Live Updates</span>
                <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-slate-100" />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
