import { motion } from 'framer-motion';
import StatusBadge from '../common/StatusBadge';
import { MoreVertical, ExternalLink, IndianRupee } from 'lucide-react';

export default function OrdersTable({ orders }) {
    return (
        <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                    <tr className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                        <th className="px-6 py-4 font-black">Order ID</th>
                        <th className="px-6 py-4 font-black">Customer</th>
                        <th className="px-6 py-4 font-black">Type</th>
                        <th className="px-6 py-4 font-black">Status</th>
                        <th className="px-6 py-4 font-black">Franchise</th>
                        <th className="px-6 py-4 font-black">Amount</th>
                        <th className="px-6 py-4 font-black">Actions</th>
                    </tr>
                </thead>
                <tbody className="space-y-4">
                    {orders.map((order, index) => (
                        <motion.tr
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            key={order.id}
                            className="bg-white group cursor-pointer hover:bg-slate-50 transition-all rounded-2xl shadow-sm border border-slate-100"
                        >
                            <td className="px-6 py-5 first:rounded-l-2xl border-y border-l border-slate-100 group-hover:border-primary/20 transition-colors">
                                <span className="font-black text-slate-900 text-sm tracking-tight">{order.id}</span>
                            </td>
                            <td className="px-6 py-5 border-y border-slate-100 group-hover:border-primary/20 transition-colors">
                                <div className="flex flex-col">
                                    <span className="font-bold text-slate-800 text-sm">{order.customer}</span>
                                    <span className="text-[10px] text-slate-400 font-medium">Verified User</span>
                                </div>
                            </td>
                            <td className="px-6 py-5 border-y border-slate-100 group-hover:border-primary/20 transition-colors">
                                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg uppercase tracking-wider">{order.type}</span>
                            </td>
                            <td className="px-6 py-5 border-y border-slate-100 group-hover:border-primary/20 transition-colors">
                                <StatusBadge status={order.status} />
                            </td>
                            <td className="px-6 py-5 border-y border-slate-100 group-hover:border-primary/20 transition-colors">
                                <span className="text-xs font-bold text-slate-500">{order.franchise}</span>
                            </td>
                            <td className="px-6 py-5 border-y border-slate-100 group-hover:border-primary/20 transition-colors">
                                <div className="flex items-center gap-1 font-black text-slate-900 text-sm">
                                    <IndianRupee size={12} className="text-slate-400" />
                                    {order.total}
                                </div>
                            </td>
                            <td className="px-6 py-5 last:rounded-r-2xl border-y border-r border-slate-100 group-hover:border-primary/20 transition-colors">
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all">
                                        <ExternalLink size={16} />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
