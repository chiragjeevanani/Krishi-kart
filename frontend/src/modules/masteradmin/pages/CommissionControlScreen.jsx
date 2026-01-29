import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Percent,
    ArrowRight,
    TrendingUp,
    PieChart as PieIcon,
    History,
    IndianRupee,
    ArrowUpRight,
    Zap
} from 'lucide-react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip as RechartsTooltip
} from 'recharts';
import CommissionForm from '../components/forms/CommissionForm';
import mockData from '../data/mockCommissions.json';
import { cn } from '@/lib/utils';

export default function CommissionControlScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const { currentRates, preview, history } = mockData;

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const chartData = [
        { name: 'Vendor', value: preview.vendorEarning, color: '#10b981' },
        { name: 'Franchise', value: preview.franchiseEarning, color: '#3b82f6' },
        { name: 'Company', value: preview.companyMargin, color: '#0f172a' }
    ];

    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-10 w-64 bg-slate-100 rounded-2xl" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="h-80 bg-slate-100 rounded-[32px]" />
                    <div className="h-80 bg-slate-100 rounded-[32px]" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header Area */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Commission Strategy</h1>
                    <p className="text-slate-500 font-medium">Define payout structures and preview P&L impacts.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                        <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Live Strategy Active</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Commission Controls */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CommissionForm
                            label="Vendor Commission"
                            initialRate={currentRates.vendorCommission}
                            onSave={(rate) => console.log('Vendor rate:', rate)}
                        />
                        <CommissionForm
                            label="Franchise Commission"
                            initialRate={currentRates.franchiseCommission}
                            onSave={(rate) => console.log('Franchise rate:', rate)}
                        />
                    </div>

                    <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-xl shadow-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <Zap size={20} className="text-primary" />
                            <h3 className="text-lg font-black tracking-tight">Strategy Impact</h3>
                        </div>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed">
                            Adjusting these rates directly affects your unit economics. Current strategy prioritizes company margin (95%) while maintaining competitive vendor payouts (3%).
                        </p>
                        <div className="mt-8 flex items-center gap-8">
                            <div>
                                <div className="text-2xl font-black text-white">₹1.2M</div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Monthly Commissions</span>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div>
                                <div className="text-2xl font-black text-primary">+12.4%</div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Volume Growth</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* P&L Preview Container */}
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Auto P&L Preview</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Based on ₹{preview.sampleOrderAmount.toLocaleString()} order</p>
                        </div>
                        <PieIcon size={20} className="text-slate-300" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center flex-1">
                        <div className="h-64 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Margin</span>
                                <span className="text-xl font-black text-slate-900">95%</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {chartData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-sm font-black text-slate-700">{item.name}</span>
                                    </div>
                                    <div className="text-sm font-black text-slate-900">
                                        ₹{item.value.toLocaleString()}
                                    </div>
                                </div>
                            ))}
                            <div className="pt-4 mt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between px-2">
                                    <span className="text-xs font-bold text-slate-400">Total Net</span>
                                    <span className="text-lg font-black text-slate-900">₹{preview.sampleOrderAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change History Section */}
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <History size={20} className="text-slate-400" />
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">Adjustment History</h3>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-emerald-50 px-4 py-2 rounded-xl transition-all">
                        Full Audit Trail
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Entity</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Previous</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">New Rate</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Modified By</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {history.map((item) => (
                                <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-5 text-sm font-black text-slate-900">
                                        {new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-slate-100 text-slate-600 rounded-lg">
                                            {item.entityType}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-bold text-slate-400">{item.previousRate}%</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-emerald-600 font-black">
                                            <TrendingUp size={14} />
                                            <span>{item.newRate}%</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-700">{item.modifiedBy}</span>
                                            <span className="text-[10px] text-slate-400 font-medium">{item.reason}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
