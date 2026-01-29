import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Monitor,
    Search,
    ShoppingBasket,
    Scale,
    Trash2,
    Plus,
    Minus,
    QrCode,
    Banknote,
    Printer,
    CheckCircle2,
    X,
    ShoppingCart,
    Package,
    ArrowRight
} from 'lucide-react';
import { useInventory } from '../contexts/InventoryContext';
import { useFranchiseOrders } from '../contexts/FranchiseOrdersContext';
import { cn } from '@/lib/utils';

export default function POSScreen() {
    const { inventory } = useInventory();
    const { addOrder } = useFranchiseOrders();
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);
    const [isReceiptShown, setIsReceiptShown] = useState(false);
    const [weight, setWeight] = useState(0); // Mock scale weight
    const [selectedItemForScale, setSelectedItemForScale] = useState(null);

    const filteredItems = inventory.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const addToCart = (item, qty = 1) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + qty } : i);
            }
            return [...prev, { ...item, qty }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(i => i.id !== id));
    };

    const updateQty = (id, delta) => {
        setCart(prev => prev.map(i => {
            if (i.id === id) {
                const newQty = Math.max(1, i.qty + delta);
                return { ...i, qty: newQty };
            }
            return i;
        }));
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const handleCheckout = (paymentMode) => {
        const orderId = `POS-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        addOrder({
            id: orderId,
            hotelName: 'POS Counter Sale',
            items: cart,
            total,
            status: 'delivered',
            paymentMode,
            type: 'counter',
            date: new Date().toISOString()
        });
        setShowCheckout(false);
        setIsReceiptShown(true);
    };

    const handleScaleComplete = () => {
        if (weight > 0 && selectedItemForScale) {
            addToCart(selectedItemForScale, weight);
            setSelectedItemForScale(null);
            setWeight(0);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col lg:flex-row h-screen overflow-hidden">
            {/* Left: Terminal Items */}
            <div className="flex-1 flex flex-col h-full bg-slate-50 relative">
                <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                            <Monitor size={20} />
                        </div>
                        <div>
                            <h1 className="text-sm font-black text-slate-900 uppercase tracking-tight">Main Terminal</h1>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Operator: Admin</p>
                        </div>
                    </div>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input
                            type="text"
                            placeholder="Search Products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold transition-all outline-none focus:bg-white focus:ring-4 focus:ring-primary/5"
                        />
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 no-scrollbar">
                    {filteredItems.map((item) => (
                        <motion.div
                            key={item.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => item.unit === 'Kg' ? setSelectedItemForScale(item) : addToCart(item)}
                            className="bg-white p-4 rounded-[24px] border border-slate-200 shadow-sm hover:border-primary transition-all cursor-pointer flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-4 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                                <Package size={32} />
                            </div>
                            <h4 className="text-xs font-black text-slate-900 tracking-tight mb-1">{item.name}</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-3">₹{item.price}/{item.unit}</p>
                            <div className="w-full h-8 flex items-center justify-center bg-slate-50 rounded-lg text-[10px] font-black text-primary uppercase tracking-widest group-hover:bg-primary group-hover:text-white">
                                {item.unit === 'Kg' ? <><Scale size={14} className="mr-1" /> Weigh</> : 'Add'}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Right: Cart & Summary */}
            <div className="w-full lg:w-[400px] bg-white border-l border-slate-200 flex flex-col h-full shadow-2xl relative z-20">
                <header className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShoppingBasket className="text-primary" size={20} />
                        <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">Active Basket</h2>
                    </div>
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black">{cart.length} Items</span>
                </header>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                                <Package size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-black text-slate-900 truncate">{item.name}</h4>
                                <p className="text-[10px] font-bold text-slate-400">₹{item.price} × {item.qty} {item.unit}</p>
                            </div>
                            <div className="flex items-center bg-slate-50 rounded-lg p-1">
                                <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-slate-400">
                                    <Minus size={12} strokeWidth={3} />
                                </button>
                                <span className="w-8 text-center text-[11px] font-black">{item.qty}</span>
                                <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-slate-400">
                                    <Plus size={12} strokeWidth={3} />
                                </button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-400">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}

                    {cart.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-center opacity-20">
                            <ShoppingCart size={48} strokeWidth={1} className="mb-4" />
                            <p className="text-[10px] font-black uppercase tracking-widest">Cart is Empty</p>
                        </div>
                    )}
                </div>

                <div className="p-6 bg-slate-50/50 border-t border-slate-100">
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400 uppercase">Subtotal</span>
                            <span className="text-xs font-black text-slate-900 uppercase">₹{total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400 uppercase">Tax (0%)</span>
                            <span className="text-xs font-black text-slate-900 uppercase">₹0</span>
                        </div>
                        <div className="w-full h-px border-t border-dashed border-slate-200 my-1" />
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Total Pay</span>
                            <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{total.toLocaleString()}</span>
                        </div>
                    </div>

                    <button
                        disabled={cart.length === 0}
                        onClick={() => setShowCheckout(true)}
                        className={cn(
                            "w-full h-14 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3",
                            cart.length > 0 ? "bg-primary text-white shadow-green-200" : "bg-slate-100 text-slate-300"
                        )}
                    >
                        Proceed to Checkout <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            {/* Weighing Scale Simulator Modal */}
            <AnimatePresence>
                {selectedItemForScale && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
                            onClick={() => setSelectedItemForScale(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl relative z-10 text-center"
                        >
                            <Scale size={48} className="mx-auto text-primary mb-6" />
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Electronic Weighing</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-8">Item: {selectedItemForScale.name}</p>

                            <div className="bg-slate-900 rounded-[32px] p-8 mb-8">
                                <div className="text-5xl font-black text-primary tracking-tighter mb-2">
                                    {weight.toFixed(3)} <span className="text-xl">Kg</span>
                                </div>
                                <div className="text-white text-xs font-black uppercase tracking-[0.2em] opacity-50">Stable Reading</div>
                            </div>

                            <input
                                type="range" min="0" max="10" step="0.05" value={weight}
                                onChange={(e) => setWeight(parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary mb-8"
                            />

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setSelectedItemForScale(null)}
                                    className="flex-1 h-16 rounded-2xl bg-slate-50 text-slate-400 font-black uppercase text-xs tracking-widest"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleScaleComplete}
                                    className="flex-2 h-16 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-[0.2em] shadow-lg shadow-green-200 px-8"
                                >
                                    Confirm Weight
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Checkout Interface */}
            <AnimatePresence>
                {showCheckout && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
                            onClick={() => setShowCheckout(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-lg rounded-[40px] p-10 shadow-2xl relative z-10"
                        >
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-10 text-center">Select Payment Mode</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleCheckout('Cash')}
                                    className="p-8 rounded-[32px] border-2 border-slate-100 flex flex-col items-center gap-4 hover:border-primary hover:bg-emerald-50/50 transition-all text-slate-600 hover:text-primary"
                                >
                                    <Banknote size={48} />
                                    <span className="font-black uppercase text-xs tracking-widest">Cash Payment</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleCheckout('QR Scan')}
                                    className="p-8 rounded-[32px] border-2 border-slate-100 flex flex-col items-center gap-4 hover:border-primary hover:bg-emerald-50/50 transition-all text-slate-600 hover:text-primary"
                                >
                                    <QrCode size={48} />
                                    <span className="font-black uppercase text-xs tracking-widest">Speed QR Scan</span>
                                </motion.button>
                            </div>

                            <button onClick={() => setShowCheckout(false)} className="w-full text-[10px] font-black uppercase tracking-widest text-slate-400">Back to Cart</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Receipt Modal */}
            <AnimatePresence>
                {isReceiptShown && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-emerald-500/90 backdrop-blur-xl" />
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}
                            className="bg-white w-[350px] rounded-3xl p-8 shadow-2xl relative z-10 flex flex-col items-center"
                        >
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-green-200">
                                <CheckCircle2 size={32} />
                            </div>
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-1">Transaction Success</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">POS #KT8927</p>

                            <div className="w-full space-y-4 mb-8">
                                <div className="flex justify-between text-[11px] font-black uppercase text-slate-900">
                                    <span>Total Amount Paid</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                                <div className="border-t border-dashed border-slate-200 w-full" />
                                <div className="flex justify-between text-[9px] font-bold uppercase text-slate-400">
                                    <span>Payment Method</span>
                                    <span>Cash Terminal 1</span>
                                </div>
                            </div>

                            <button
                                onClick={() => { setIsReceiptShown(false); setCart([]); }}
                                className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2"
                            >
                                <Printer size={18} /> Print & Next Sale
                            </button>
                            <button onClick={() => { setIsReceiptShown(false); setCart([]); }} className="mt-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Close Receipt</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
