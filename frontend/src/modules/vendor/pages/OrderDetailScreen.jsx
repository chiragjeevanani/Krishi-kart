import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Clock,
    CheckCircle2,
    Package,
    Truck,
    AlertCircle,
    MapPin,
    IndianRupee,
    ChevronRight,
    Loader2,
    Calendar,
    Phone,
    Shield,
    ClipboardList,
    XCircle,
    ThumbsUp,
    ThumbsDown,
    FileText
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import mockOrders from '../data/mockVendorOrders.json';
import { cn } from '@/lib/utils';
import { useOrders } from '@/modules/user/contexts/OrderContext';
import DocumentViewer from '../components/documents/DocumentViewer';

export default function OrderDetailScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState(null);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [isDocOpen, setIsDocOpen] = useState(false);
    const [docType, setDocType] = useState('DC');
    const { orders: contextOrders, updateOrderStatus } = useOrders();

    useEffect(() => {
        const timer = setTimeout(() => {
            // Find in mock data first
            let foundOrder = mockOrders.find(o => o.id === id);

            // If not found in mock, check live orders
            if (!foundOrder) {
                const liveOrder = contextOrders.find(o => o.id === id);
                if (liveOrder) {
                    foundOrder = {
                        id: liveOrder.id,
                        franchiseName: liveOrder.franchise || 'Main Center',
                        total: liveOrder.procurementTotal || liveOrder.total,
                        procurementTotal: liveOrder.procurementTotal,
                        status: liveOrder.status,
                        items: liveOrder.items,
                        deliveryChallan: liveOrder.deliveryChallan,
                        grn: liveOrder.grn,
                        priority: 'normal',
                        deadline: new Date(Date.now() + 3600000).toISOString()
                    };
                }
            }

            setOrder(foundOrder);
            setStatus(foundOrder?.status?.toLowerCase()); // Normalize to lowercase
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [id, contextOrders]);

    const handleAction = (newStatus, callback) => {
        setIsActionLoading(true);
        setTimeout(() => {
            // Update live order if it exists
            if (contextOrders.find(o => o.id === id)) {
                updateOrderStatus(id, newStatus);
            }

            setStatus(newStatus);
            setIsActionLoading(false);
            if (callback) callback();
        }, 1000);
    };

    if (isLoading) return <div className="flex items-center justify-center h-96"><Loader2 className="animate-spin text-primary" /></div>;
    if (!order) return <div className="text-center p-20 font-black">Order Not Found</div>;

    const steps = [
        { id: 'new', label: 'Received', icon: Calendar },
        { id: 'preparing', label: 'Packing', icon: Package },
        { id: 'ready', label: 'Ready', icon: Shield },
        { id: 'completed', label: 'Dispatched', icon: Truck }
    ];

    // Helper to map assigned/new to the first step
    const getActiveStepId = (s) => {
        if (s === 'assigned' || s === 'new' || s === 'accepted') return 'new';
        return s;
    };

    const currentStepIndex = steps.findIndex(s => s.id === getActiveStepId(order.status === 'completed' ? 'completed' : order.status));

    return (
        <div className="space-y-6 pb-32">
            <header className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-slate-100">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">Fulfillment Order</h1>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">{order.id}</p>
                </div>
            </header>

            {/* Progress Stepper */}
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="flex justify-between relative z-10">
                    {steps.map((step, idx) => {
                        const isCompleted = idx < currentStepIndex;
                        const isCurrent = idx === currentStepIndex;
                        return (
                            <div key={idx} className="flex flex-col items-center gap-2 flex-1 relative">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 relative z-10",
                                    isCompleted ? "bg-primary text-white" :
                                        isCurrent ? "bg-slate-900 text-white shadow-lg" : "bg-slate-50 text-slate-300"
                                )}>
                                    <step.icon size={18} />
                                    {isCompleted && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center text-primary shadow-sm border border-primary/20">
                                            <CheckCircle2 size={10} />
                                        </motion.div>
                                    )}
                                </div>
                                <span className={cn(
                                    "text-[8px] font-black uppercase tracking-tighter text-center",
                                    isCurrent ? "text-slate-900" : "text-slate-400"
                                )}>
                                    {step.label}
                                </span>
                                {/* Background Line */}
                                {idx < steps.length - 1 && (
                                    <div className="absolute top-5 left-[60%] w-[80%] h-0.5 bg-slate-50 -z-0">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: isCompleted ? '100%' : '0%' }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Document Log */}
            {(order.deliveryChallan || order.grn) && (
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-4">
                    <h3 className="font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <FileText size={20} className="text-primary" />
                        Consignment Documents
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {order.deliveryChallan && (
                            <button
                                onClick={() => { setDocType('DC'); setIsDocOpen(true); }}
                                className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 hover:bg-indigo-50 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="text-indigo-600" size={18} />
                                    <div className="text-left">
                                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Delivery Challan</p>
                                        <p className="text-[9px] font-bold text-slate-400">{order.deliveryChallan.id}</p>
                                    </div>
                                </div>
                                <ChevronRight className="text-indigo-300" size={14} />
                            </button>
                        )}
                        {order.grn && (
                            <button
                                onClick={() => { setDocType('GRN'); setIsDocOpen(true); }}
                                className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 hover:bg-emerald-50 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <Shield size={18} className="text-emerald-600" />
                                    <div className="text-left">
                                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Audit Receipt (GRN)</p>
                                        <p className="text-[9px] font-bold text-slate-400">{order.grn.id}</p>
                                    </div>
                                </div>
                                <ChevronRight className="text-emerald-300" size={14} />
                            </button>
                        )}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Items Checklist */}
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <ClipboardList size={20} className="text-primary" />
                            Produce Checklist
                        </h3>
                        <span className="text-[10px] font-black bg-slate-50 px-3 py-1 rounded-full text-slate-500 border border-slate-100">
                            {order.items.length} SKUs
                        </span>
                    </div>

                    <div className="space-y-4">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50 group hover:bg-white hover:shadow-xl hover:shadow-slate-100/50 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900 text-sm">{item.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.quantity} {item.unit} Requested</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <CheckCircle2 size={20} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Destination Hub */}
                <div className="space-y-6">
                    <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl shadow-slate-200">
                        <div className="flex items-start justify-between mb-8">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary">
                                <MapPin size={24} />
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destination Node</p>
                                <h4 className="text-xl font-black tracking-tight">{order.franchiseName}</h4>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                <Phone size={18} className="text-slate-400" />
                                <div>
                                    <p className="text-[8px] font-black text-slate-500 uppercase">Node Liaison</p>
                                    <p className="text-xs font-bold">+91 90000 12345</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                <Clock size={18} className="text-slate-400" />
                                <div>
                                    <p className="text-[8px] font-black text-slate-500 uppercase">Target Handover</p>
                                    <p className="text-xs font-bold">{new Date(order.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Today</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Procurement Value</p>
                            <div className="flex items-center gap-2">
                                <IndianRupee size={16} className="text-slate-900" />
                                <span className="text-2xl font-black text-slate-900 tracking-tight">
                                    {order.procurementTotal || order.total}
                                </span>
                            </div>
                        </div>
                        <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                            Authorized per PO
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-2xl border-t border-slate-100 lg:left-64 flex gap-4 z-[100]">
                {(status === 'new' || status === 'assigned' || status === 'pending_assignment') && (
                    <>
                        <button
                            onClick={() => handleAction('accepted')}
                            disabled={isActionLoading}
                            className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-100 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isActionLoading ? <Loader2 className="animate-spin" size={18} /> : <><ThumbsUp size={18} /> Accept PO</>}
                        </button>
                        <button
                            onClick={() => handleAction('rejected', () => navigate('/vendor/orders'))}
                            disabled={isActionLoading}
                            className="flex-1 bg-white border-2 border-red-100 text-red-500 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
                        >
                            <ThumbsDown size={18} /> Reject PO
                        </button>
                    </>
                )}

                {status === 'accepted' && (
                    <button
                        onClick={() => handleAction('preparing', () => navigate(`/vendor/dispatch?order=${order.id}`))}
                        disabled={isActionLoading}
                        className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-slate-200 active:scale-95 transition-all disabled:opacity-50"
                    >
                        {isActionLoading ? <Loader2 className="animate-spin" size={18} /> : <>Start Packing Order <ChevronRight size={18} /></>}
                    </button>
                )}

                {(status === 'preparing' || status === 'ready') && (
                    <button
                        onClick={() => navigate(`/vendor/dispatch?order=${order.id}`)}
                        className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-slate-200 active:scale-95 transition-all"
                    >
                        Continue Packing Checklist
                        <ChevronRight size={18} />
                    </button>
                )}

                {status === 'completed' && (
                    <div className="flex-1 bg-emerald-50 text-emerald-600 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2">
                        <CheckCircle2 size={18} /> Order Dispatched Successfully
                    </div>
                )}

                {status === 'rejected' && (
                    <div className="flex-1 bg-red-50 text-red-600 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2">
                        <XCircle size={18} /> Order Rejected
                    </div>
                )}
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
