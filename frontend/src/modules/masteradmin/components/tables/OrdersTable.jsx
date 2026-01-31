import { motion } from 'framer-motion';
import StatusBadge from '../common/StatusBadge';
import { MoreVertical, ExternalLink, IndianRupee, CreditCard, Wallet, Banknote, ShoppingBag } from 'lucide-react';

const PaymentBadge = ({ method }) => {
    const config = {
        'Prepaid': { icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
        'COD': { icon: Banknote, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
        'Credit': { icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' }
    };

    const { icon: Icon, color, bg, border } = config[method] || config['COD'];

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border ${bg} ${color} ${border}`}>
            <Icon size={12} />
            {method}
        </span>
    );
};

export default function OrdersTable({ orders, onAction }) {
    return (
        <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                    <tr className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                        <th className="px-6 py-4 font-black">Order ID</th>
                        <th className="px-6 py-4 font-black">Customer</th>
                        <th className="px-6 py-4 font-black">Payment</th>
                        <th className="px-6 py-4 font-black">Status</th>
                        <th className="px-6 py-4 font-black">Fulfilment</th>
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
                                    <span className="text-[10px] text-slate-400 font-medium">{order.franchise}</span>
                                </div>
                            </td>
                            <td className="px-6 py-5 border-y border-slate-100 group-hover:border-primary/20 transition-colors">
                                <PaymentBadge method={order.paymentMethod || 'COD'} />
                            </td>
                            <td className="px-6 py-5 border-y border-slate-100 group-hover:border-primary/20 transition-colors">
                                <StatusBadge status={order.status} />
                            </td>
                            <td className="px-6 py-5 border-y border-slate-100 group-hover:border-primary/20 transition-colors">
                                <div className="flex flex-col gap-1">
                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg w-fit ${order.fulfillmentType === 'franchise_stock' ? 'bg-emerald-100 text-emerald-700' :
                                        order.fulfillmentType === 'requires_procurement' ? 'bg-indigo-100 text-indigo-700' :
                                            'bg-slate-100 text-slate-700'
                                        }`}>
                                        {order.fulfillmentType ? order.fulfillmentType.replace('_', ' ') : 'Pending Routing'}
                                    </span>
                                    {order.stockStatus && (
                                        <span className="text-[8px] font-bold text-slate-400 px-1 italic">
                                            {order.stockStatus}
                                        </span>
                                    )}
                                    {order.assignedVendor && (
                                        <div className="flex flex-col gap-1 mt-1">
                                            <span className="text-[8px] font-black text-indigo-500 px-1 uppercase tracking-tighter">
                                                Via: {order.assignedVendor}
                                            </span>
                                            {['accepted', 'preparing', 'ready'].includes(order.status) && (
                                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50/50 rounded-md w-fit border border-indigo-100/50">
                                                    <div className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse" />
                                                    <span className="text-[7px] font-black text-indigo-600 uppercase">
                                                        {order.status === 'accepted' ? 'PO Accepted' :
                                                            order.status === 'preparing' ? 'Being Packed' :
                                                                order.status === 'ready' ? 'Ready for Pickup' : order.status}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-5 border-y border-slate-100 group-hover:border-primary/20 transition-colors text-right">
                                <div className="flex flex-col items-end gap-1 font-black text-slate-900">
                                    <div className="flex items-center gap-1">
                                        <IndianRupee size={12} className="text-slate-400" />
                                        {order.total}
                                    </div>
                                    {order.procurementTotal && (
                                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                                            Cost: ₹{order.procurementTotal}
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-5 last:rounded-r-2xl border-y border-r border-slate-100 group-hover:border-primary/20 transition-colors">
                                <div className="flex items-center gap-2">
                                    {(order.fulfillmentType === 'requires_procurement' && order.status === 'new') && (
                                        <button
                                            onClick={() => onAction?.(order.id, 'initiate_procurement')}
                                            className="px-3 py-1.5 bg-indigo-500 text-white text-[10px] font-black rounded-lg hover:bg-indigo-600 transition-all shadow-md shadow-indigo-100 flex items-center gap-1.5 whitespace-nowrap"
                                        >
                                            <ShoppingBag size={12} />
                                            Procure
                                        </button>
                                    )}
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
