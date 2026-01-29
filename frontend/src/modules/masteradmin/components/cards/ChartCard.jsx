import { motion } from 'framer-motion';
import { Download, ChevronDown, Maximize2 } from 'lucide-react';

export default function ChartCard({
    title,
    subtitle,
    children,
    onTimeRangeChange,
    onExport,
    className = ""
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group ${className}`}
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
                    {subtitle && (
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {onTimeRangeChange && (
                        <div className="relative">
                            <select
                                onChange={(e) => onTimeRangeChange(e.target.value)}
                                className="appearance-none bg-slate-50 border-none outline-none text-xs font-bold text-slate-500 pl-4 pr-10 py-2.5 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
                            >
                                <option value="7d">Last 7 Days</option>
                                <option value="30d">Last 30 Days</option>
                                <option value="90d">Last 3 months</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    )}

                    <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl">
                        <button
                            onClick={onExport}
                            className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all"
                            title="Export Data"
                        >
                            <Download size={16} />
                        </button>
                        <button
                            className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all"
                            title="Expand View"
                        >
                            <Maximize2 size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="h-[300px] w-full relative">
                {children}
            </div>
        </motion.div>
    );
}
