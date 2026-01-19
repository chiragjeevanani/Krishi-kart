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
    ClipboardList
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import mockOrders from '../data/mockVendorOrders.json';
import { cn } from '@/lib/utils';

export default function OrderDetailScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const foundOrder = mockOrders.find(o => o.id === id);
            setOrder(foundOrder);
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [id]);

    if (isLoading) return <div className="flex items-center justify-center h-96"><Loader2 className="animate-spin text-primary" /></div>;
    if (!order) return <div className="text-center p-20 font-black">Order Not Found</div>;

    const steps = [
        { id: 'new', label: 'Received', icon: Calendar },
        { id: 'preparing', label: 'Packing', icon: Package },
        { id: 'ready', label: 'Ready', icon: Shield },
        { id: 'completed', label: 'Dispatched', icon: Truck }
    ];

    const currentStepIndex = steps.findIndex(s => s.id === (order.status === 'completed' ? 'completed' : order.status));

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
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Settlement</p>
                            <div className="flex items-center gap-2">
                                <IndianRupee size={16} className="text-slate-900" />
                                <span className="text-2xl font-black text-slate-900 tracking-tight">{order.total}</span>
                            </div>
                        </div>
                        <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                            Authorized
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 lg:left-64 flex gap-4">
                <button
                    onClick={() => navigate(`/vendor/dispatch?order=${order.id}`)}
                    className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-slate-200 active:scale-95 transition-all"
                >
                    Begin Packing Checklist
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}
