import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    MapPin,
    Phone,
    Clock,
    Package,
    User,
    CheckCircle2,
    ArrowRightCircle,
    Copy,
    Share2,
    Truck,
    FileText,
    Shield
} from 'lucide-react';
import { useFranchiseOrders } from '../contexts/FranchiseOrdersContext';
import StatusBadge from '../components/common/StatusBadge';
import { cn } from '@/lib/utils';
import { useOrders } from '@/modules/user/contexts/OrderContext';
import DocumentViewer from '../../vendor/components/documents/DocumentViewer';

export default function OrderDetailScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { orders: localOrders, updateOrderStatus: updateLocalStatus } = useFranchiseOrders();
    const { orders: liveOrders, updateOrderStatus: updateLiveStatus } = useOrders();
    const [isDocOpen, setIsDocOpen] = useState(false);
    const [docType, setDocType] = useState('GRN');

    // Find in local context first, then live context
    let order = localOrders.find(o => o.id === id);
    if (!order) {
        const liveOrder = liveOrders.find(o => o.id === id);
        if (liveOrder) {
            order = {
                id: liveOrder.id,
                customer: liveOrder.customer || 'Unknown Customer',
                address: liveOrder.address || 'Standard Delivery Zone',
                total: liveOrder.total,
                status: liveOrder.status === 'processing' ? 'incoming' : liveOrder.status,
                items: liveOrder.items.map(i => ({
                    name: i.name,
                    quantity: i.quantity || parseInt(i.qty) || 1,
                    price: i.price || 0
                })),
                deliveryChallan: liveOrder.deliveryChallan,
                grn: liveOrder.grn,
                type: 'direct',
                timeline: liveOrder.timeline || []
            };
        }
    }

    if (!order) {
        return <div className="p-10 text-center">Order not found</div>;
    }

    const timeline = [
        { status: 'Received', time: '10:30 AM', desc: 'Order placed by customer', active: true },
        { status: 'Processed', time: '10:35 AM', desc: 'Franchise accepted order', active: order.status !== 'incoming' },
        { status: 'Assigned', time: '10:45 AM', desc: 'Courier assigned to order', active: order.status === 'assigned' || order.status === 'completed' },
        { status: 'Delivered', time: '--:--', desc: 'Order reaching destination', active: order.status === 'completed' }
    ];

    return (
        <div className="min-h-screen bg-[#f8fafd] pb-32">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-sm font-black text-slate-900 tracking-tight uppercase">{order.id}</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.type} order</p>
                    </div>
                </div>
                <StatusBadge status={order.status} />
            </header>

            <div className="p-6 space-y-6">
                {/* Customer Card */}
                <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                                <User size={24} />
                            </div>
                            <div>
                                <h3 className="text-base font-black text-slate-900 tracking-tight">{order.customer}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">+91 98765 43210</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                <Phone size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 pt-6 border-t border-slate-50">
                        <MapPin size={18} className="text-slate-300 shrink-0 mt-0.5" />
                        <p className="text-xs font-bold text-slate-600 leading-relaxed">{order.address}</p>
                    </div>
                </div>

                {/* Supply Chain Documents */}
                {(order.deliveryChallan || order.grn) && (
                    <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm space-y-4">
                        <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            <FileText size={16} className="text-primary" /> Supply Chain Documents
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {order.deliveryChallan && (
                                <button
                                    onClick={() => { setDocType('DC'); setIsDocOpen(true); }}
                                    className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 hover:bg-indigo-50 transition-all text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <Truck className="text-indigo-600" size={18} />
                                        <div>
                                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest leading-none mb-1">Delivery Challan</p>
                                            <p className="text-[9px] font-bold text-slate-400">{order.deliveryChallan.id}</p>
                                        </div>
                                    </div>
                                    <ChevronLeft className="text-indigo-300 rotate-180" size={14} />
                                </button>
                            )}
                            {order.grn && (
                                <button
                                    onClick={() => { setDocType('GRN'); setIsDocOpen(true); }}
                                    className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 hover:bg-emerald-50 transition-all text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <Shield size={18} className="text-emerald-600" />
                                        <div>
                                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Audit Receipt (GRN)</p>
                                            <p className="text-[9px] font-bold text-slate-400">{order.grn.id}</p>
                                        </div>
                                    </div>
                                    <ChevronLeft className="text-emerald-300 rotate-180" size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Items List */}
                <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            <Package size={16} /> Order Content
                        </h2>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{order.items.length} Items</span>
                    </div>
                    <div className="p-4 space-y-1">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 text-[10px] font-black text-slate-400 flex items-center justify-center border border-slate-100">
                                        {item.quantity}x
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{item.name}</span>
                                </div>
                                <span className="text-sm font-black text-slate-900">₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="bg-slate-50 p-6 flex items-center justify-between">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Payable</span>
                        <span className="text-xl font-black text-slate-900 tracking-tighter">₹{order.total}</span>
                    </div>
                </div>

                {/* Tracking Timeline */}
                <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                    <h2 className="text-xs font-black text-slate-900 tracking-widest uppercase mb-8 flex items-center gap-2">
                        <Clock size={16} /> Activity Log
                    </h2>
                    <div className="space-y-8 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-slate-100" />

                        {timeline.map((step, idx) => (
                            <div key={idx} className="flex gap-6 relative z-10">
                                <div className={cn(
                                    "w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center transition-colors",
                                    step.active ? "bg-primary" : "bg-slate-200"
                                )}>
                                    {step.active && <CheckCircle2 size={12} className="text-white" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className={cn("text-xs font-black uppercase tracking-tight", step.active ? "text-slate-900" : "text-slate-400")}>{step.status}</h4>
                                        <span className="text-[10px] font-bold text-slate-400">{step.time}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium leading-normal">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Actions */}
            <div className="fixed bottom-0 left-0 w-full p-6 lg:p-8 bg-white/80 backdrop-blur-xl border-t border-slate-100 z-40">
                <button className="w-full h-14 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-green-100 flex items-center justify-center gap-3 active:scale-95 transition-all">
                    Update Progress <ArrowRightCircle size={18} />
                </button>
            </div>

            {/* Document Viewer Overlay */}
            <DocumentViewer
                isOpen={isDocOpen}
                onClose={() => setIsDocOpen(false)}
                type={docType}
                data={docType === 'DC' ? order.deliveryChallan : order.grn}
            />
        </div>
    );
}
