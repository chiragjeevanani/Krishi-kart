import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Truck,
    ChevronRight,
    IndianRupee,
    Scale,
    ShieldCheck,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import mockOrders from '../data/mockVendorOrders.json';
import { cn } from '@/lib/utils';

export default function PackingScreen() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order');
    const [isDispatching, setIsDispatching] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [step, setStep] = useState(1); // 1: Packing, 2: Weight, 3: Dispatch, 4: Success

    const order = mockOrders.find(o => o.id === orderId) || mockOrders[0];

    useEffect(() => {
        // Init checklist
        const init = {};
        order.items.forEach(item => {
            init[item.name] = false;
        });
        setCheckedItems(init);
    }, [order]);

    const handleToggleCheck = (name) => {
        setCheckedItems(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const isPackingComplete = Object.values(checkedItems).every(v => v);

    const handleFinalDispatch = () => {
        setIsDispatching(true);
        setTimeout(() => {
            setIsDispatching(false);
            setStep(4);
        }, 2000);
    };

    return (
        <div className="space-y-6 pb-20">
            {step < 4 && (
                <header className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-slate-100">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight">Packing & Dispatch</h1>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">{order.id} Compliance</p>
                    </div>
                </header>
            )}

            {/* Stepper info */}
            {step < 4 && (
                <div className="flex gap-4 mb-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={cn(
                            "flex-1 h-1.5 rounded-full transition-all duration-500",
                            step >= i ? "bg-primary shadow-[0_0_10px_rgba(22,163,74,0.3)]" : "bg-slate-100"
                        )} />
                    ))}
                </div>
            )}

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Package className="text-primary" size={24} />
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">Packing Verification</h3>
                            </div>

                            <p className="text-xs text-slate-400 font-medium leading-relaxed">Please verify and pack each item according to the quality protocol. Tag each crate before checking.</p>

                            <div className="space-y-3">
                                {order.items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleToggleCheck(item.name)}
                                        className={cn(
                                            "flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer",
                                            checkedItems[item.name]
                                                ? "bg-emerald-50 border-emerald-100"
                                                : "bg-slate-50 border-slate-100"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all",
                                                checkedItems[item.name] ? "bg-primary border-primary text-white" : "bg-white border-slate-200"
                                            )}>
                                                {checkedItems[item.name] && <CheckCircle2 size={14} />}
                                            </div>
                                            <span className={cn(
                                                "font-black text-sm",
                                                checkedItems[item.name] ? "text-emerald-900" : "text-slate-600"
                                            )}>{item.name}</span>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase">{item.quantity} {item.unit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            disabled={!isPackingComplete}
                            onClick={() => setStep(2)}
                            className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-sm flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
                        >
                            Next: Logistics Weights
                            <ChevronRight size={18} />
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                            <div className="flex items-center gap-3 mb-2">
                                <Scale className="text-blue-500" size={24} />
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">Logistics Weight Entry</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Total Consignment Weight (Gross)</label>
                                    <div className="flex items-center gap-4 mt-2">
                                        <input type="number" defaultValue="42.5" className="bg-white border-none rounded-2xl py-4 px-6 outline-none text-2xl font-black text-slate-900 flex-1 shadow-inner" />
                                        <span className="text-xl font-black text-slate-400 uppercase">KG</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                                    <ShieldCheck size={18} className="text-blue-500 shrink-0 mt-0.5" />
                                    <p className="text-[10px] font-bold text-blue-600 leading-relaxed uppercase">Weight confirmation is required to generate the consignment manifest for the hub.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setStep(1)} className="flex-1 bg-white border border-slate-100 py-5 rounded-[24px] font-black text-sm text-slate-400 active:scale-95 transition-all">Back</button>
                            <button onClick={() => setStep(3)} className="flex-[2] bg-slate-900 text-white py-5 rounded-[24px] font-black text-sm flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
                                Final Dispatch
                                <Truck size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-2xl text-center space-y-8"
                    >
                        <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                            <Truck size={48} className="animate-bounce" />
                        </div>

                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Authorize Node Handover?</h3>
                            <p className="text-slate-400 text-xs mt-3 px-10">This will initiate the logistics leg to <b>{order.franchiseName}</b> hub. Ensure all items are sealed.</p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-3xl space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <span>Gross WT</span>
                                <span className="text-slate-900">42.5 KG</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <span>Security Seal</span>
                                <span className="text-emerald-500">VERIFIED</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={handleFinalDispatch}
                                disabled={isDispatching}
                                className="w-full bg-primary text-white py-5 rounded-[24px] font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-emerald-100 active:scale-95 transition-all disabled:opacity-50"
                            >
                                {isDispatching ? <Loader2 size={18} className="animate-spin" /> : <>Handoff to Dispatch <ArrowRight size={18} /></>}
                            </button>
                            <button onClick={() => setStep(2)} className="w-full text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors py-2">Re-calibrate Scale</button>
                        </div>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-2xl text-center space-y-8"
                    >
                        <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-100">
                            <CheckCircle2 size={48} />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic">SUCCESSFULLY DISPATCHED</h3>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Consignment ID: GC-{Math.floor(Math.random() * 90000) + 10000}</p>
                        </div>

                        <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 text-left space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recipient Hub</span>
                                <span className="text-sm font-black text-slate-900">{order.franchiseName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Weight</span>
                                <span className="text-sm font-black text-slate-900">42.5 KG</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-md text-[9px] font-black uppercase">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    In Transit
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/vendor/dashboard')}
                                className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-sm flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
                            >
                                Back to Dashboard
                            </button>
                            <button
                                onClick={() => navigate('/vendor/dispatch-history')}
                                className="w-full text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:text-emerald-700 transition-colors py-2 flex items-center justify-center gap-2"
                            >
                                View Dispatch History <ChevronRight size={14} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
