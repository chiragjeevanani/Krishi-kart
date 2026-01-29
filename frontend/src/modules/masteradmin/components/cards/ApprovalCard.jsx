import { motion } from 'framer-motion';
import { FileCheck, ShieldCheck, XCircle, ExternalLink, Calendar, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ApprovalCard({ item, type, onApprove, onReject, onViewDoc }) {
    const isVendor = type === 'vendor';
    const isFranchise = type === 'franchise';
    const isCredit = type === 'credit';

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50"
        >
            <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center",
                        isVendor ? "bg-emerald-50 text-emerald-500" :
                            isFranchise ? "bg-blue-50 text-blue-500" : "bg-purple-50 text-purple-500"
                    )}>
                        {isVendor ? <UserCheck size={28} /> :
                            isFranchise ? <ShieldCheck size={28} /> : <FileCheck size={28} />}
                    </div>
                    <div>
                        <h4 className="font-black text-slate-900 text-lg leading-tight">
                            {item.vendorName || item.franchiseName || item.hotelName}
                        </h4>
                        <div className="flex items-center gap-2 mt-1.5">
                            <Calendar size={12} className="text-slate-300" />
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                Submitted {new Date(item.submittedAt || item.requestedAt).toLocaleDateString('en-IN')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Requirements Summary</span>
                    <div className="space-y-3">
                        {isVendor && item.documents.map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between group">
                                <span className="text-xs font-bold text-slate-600">{doc.type.replace('_', ' ')}</span>
                                <button
                                    onClick={() => onViewDoc(doc)}
                                    className="text-[10px] font-black text-primary uppercase flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    Verify <ExternalLink size={10} />
                                </button>
                            </div>
                        ))}
                        {isFranchise && Object.entries(item.checklist).map(([key, val], idx) => (
                            <div key={key} className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-600">{key.replace(/([A-Z])/g, ' $1')}</span>
                                <span className={cn(
                                    "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tight",
                                    val.submitted ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"
                                )}>
                                    {val.submitted ? 'Received' : 'Pending'}
                                </span>
                            </div>
                        ))}
                        {isCredit && (
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-600">Requested Limit</span>
                                <span className="text-sm font-black text-slate-900">₹{item.requestedLimit.toLocaleString()}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => onReject(item)}
                        className="py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center gap-2 border border-transparent hover:border-red-100"
                    >
                        <XCircle size={16} />
                        Reject Application
                    </button>
                    <button
                        onClick={() => onApprove(item)}
                        className="py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
                    >
                        <ShieldCheck size={16} />
                        Approve Now
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
