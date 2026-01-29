import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PackageCheck,
    ChevronLeft,
    Search,
    Truck,
    AlertTriangle,
    CheckCircle2,
    Plus,
    Minus,
    ClipboardCheck,
    X
} from 'lucide-react';
import { useGRN } from '../contexts/GRNContext';
import { useInventory } from '../contexts/InventoryContext';
import StatusBadge from '../components/common/StatusBadge';
import { cn } from '@/lib/utils';

export default function ReceivingScreen() {
    const { purchaseOrders, submitGRN } = useGRN();
    const { inventory } = useInventory();
    const [selectedPO, setSelectedPO] = useState(null);
    const [receivingData, setReceivingData] = useState({}); // { itemId: { received, damage, reason } }
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPOs = purchaseOrders.filter(po =>
        po.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        po.vendor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectPO = (po) => {
        setSelectedPO(po);
        const initialData = {};
        po.items.forEach(item => {
            initialData[item.id] = {
                received: item.expectedQty,
                damage: 0,
                reason: ''
            };
        });
        setReceivingData(initialData);
    };

    const updateItem = (itemId, field, value) => {
        setReceivingData(prev => ({
            ...prev,
            [itemId]: { ...prev[itemId], [field]: value }
        }));
    };

    const handleSubmit = () => {
        const processedItems = selectedPO.items.map(item => {
            const data = receivingData[item.id];
            return {
                ...item,
                receivedQty: data.received,
                damageQty: data.damage,
                damageReason: data.reason,
                status: data.received >= item.expectedQty ? 'received' : 'partially_received'
            };
        });

        submitGRN(selectedPO.id, processedItems);
        setSelectedPO(null);
    };

    return (
        <div className="pb-32 lg:pb-12 bg-slate-50/50 min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 pt-6">
                <div className="flex items-center gap-4 mb-4">
                    {selectedPO && (
                        <button onClick={() => setSelectedPO(null)} className="p-2 -ml-2 text-slate-400">
                            <ChevronLeft size={24} />
                        </button>
                    )}
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight">
                            {selectedPO ? `PO: ${selectedPO.poNumber}` : 'Vendor Receiving'}
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                            {selectedPO ? selectedPO.vendor : 'Inbound GRN Flow'}
                        </p>
                    </div>
                </div>

                {!selectedPO && (
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input
                            type="text"
                            placeholder="Search PO Number or Vendor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-slate-100 border border-slate-100 rounded-2xl text-xs font-bold transition-all outline-none focus:bg-white focus:ring-4 focus:ring-primary/5"
                        />
                    </div>
                )}
            </header>

            <div className="p-6">
                {!selectedPO ? (
                    /* PO List */
                    <div className="space-y-4">
                        {filteredPOs.map((po) => (
                            <motion.div
                                key={po.id}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSelectPO(po)}
                                className="bg-white rounded-[32px] p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                            <Truck size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-slate-900 tracking-tight">{po.poNumber}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{po.vendor}</p>
                                        </div>
                                    </div>
                                    <StatusBadge status={po.status} />
                                </div>
                                <div className="flex items-center justify-between bg-slate-50 rounded-2xl px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <ClipboardCheck size={14} className="text-slate-400" />
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            {po.items.length} Line Items
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        Due: {new Date(po.expectedDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button className="text-[10px] font-black uppercase text-primary tracking-[0.2em] flex items-center gap-1">
                                        Process Reception <Plus size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    /* GRN Workflow */
                    <div className="space-y-6">
                        <div className="bg-slate-900 rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl mb-6">
                            <div className="relative z-10 flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Active PO Session</p>
                                    <h2 className="text-xl font-black tracking-tight">{selectedPO.poNumber}</h2>
                                    <p className="text-xs text-slate-400 mt-1">Verify physical count vs system expected quantity</p>
                                </div>
                                <PackageCheck size={40} className="text-primary opacity-50" />
                            </div>
                            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-3xl" />
                        </div>

                        <div className="space-y-4">
                            {selectedPO.items.map((item) => {
                                const data = receivingData[item.id] || {};
                                return (
                                    <div key={item.id} className="bg-white rounded-[32px] p-5 border border-slate-100 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                                    <PackageCheck size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-slate-900 tracking-tight">{item.name}</h4>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Expected: {item.expectedQty} {item.unit}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-2">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Received {item.unit}</p>
                                                <div className="flex items-center bg-slate-50 rounded-xl border border-slate-100 p-1">
                                                    <button
                                                        onClick={() => updateItem(item.id, 'received', Math.max(0, data.received - 1))}
                                                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={data.received}
                                                        onChange={(e) => updateItem(item.id, 'received', parseInt(e.target.value) || 0)}
                                                        className="bg-transparent w-full text-center font-black text-xs outline-none"
                                                    />
                                                    <button
                                                        onClick={() => updateItem(item.id, 'received', data.received + 1)}
                                                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <p className="text-[9px] font-black text-red-400 uppercase tracking-widest px-1">Damaged/Short</p>
                                                <div className="flex items-center bg-red-50/30 rounded-xl border border-red-100 p-1">
                                                    <button
                                                        onClick={() => updateItem(item.id, 'damage', Math.max(0, data.damage - 1))}
                                                        className="w-8 h-8 rounded-lg bg-white border border-red-100 flex items-center justify-center text-red-400"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={data.damage}
                                                        onChange={(e) => updateItem(item.id, 'damage', parseInt(e.target.value) || 0)}
                                                        className="bg-transparent w-full text-center font-black text-xs text-red-500 outline-none"
                                                    />
                                                    <button
                                                        onClick={() => updateItem(item.id, 'damage', data.damage + 1)}
                                                        className="w-8 h-8 rounded-lg bg-white border border-red-100 flex items-center justify-center text-red-400"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {data.damage > 0 && (
                                            <div className="mt-3">
                                                <select
                                                    value={data.reason}
                                                    onChange={(e) => updateItem(item.id, 'reason', e.target.value)}
                                                    className="w-full h-10 bg-slate-50 border border-slate-100 rounded-xl px-3 text-[10px] font-bold text-slate-600 outline-none focus:ring-2 focus:ring-primary/10"
                                                >
                                                    <option value="">Select Reason for Damage</option>
                                                    <option value="Physical Damage">Physical Damage</option>
                                                    <option value="Poor Quality">Poor Quality</option>
                                                    <option value="Short Supply">Short Supply</option>
                                                    <option value="Expired/Old">Expired/Old</option>
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 p-6 lg:relative lg:bg-transparent lg:border-0 lg:p-0 mt-8">
                            <button
                                onClick={handleSubmit}
                                className="w-full h-14 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-green-200 flex items-center justify-center gap-3 hover:bg-primary/90 transition-all active:scale-95"
                            >
                                Generate GRN & Update Stock <CheckCircle2 size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
