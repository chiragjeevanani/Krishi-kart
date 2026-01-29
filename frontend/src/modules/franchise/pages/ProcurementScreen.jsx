import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingBasket,
    Search,
    ChevronRight,
    Plus,
    Minus,
    Truck,
    CheckCircle2,
    Loader2,
    Package,
    IndianRupee
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import products from '../../user/data/products.json';
import { cn } from '@/lib/utils';

export default function ProcurementScreen() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cart, setCart] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const updateQty = (productId, delta) => {
        setCart(prev => {
            const current = prev[productId] || 0;
            const next = current + delta;
            if (next <= 0) {
                const { [productId]: removed, ...rest } = prev;
                return rest;
            }
            return { ...prev, [productId]: next };
        });
    };

    const cartItems = Object.entries(cart).map(([id, qty]) => {
        const product = products.find(p => p.id === id);
        return { ...product, qty };
    });

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const handlePlaceOrder = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setOrderSuccess(true);
            setCart({});
        }, 2000);
    };

    if (orderSuccess) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white min-h-[80vh]">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-100"
                >
                    <CheckCircle2 color="white" size={48} />
                </motion.div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">PROCUREMENT ORDER PLACED</h2>
                <p className="text-slate-500 mt-4 max-w-xs font-medium">Your restock request <b>#PO-{Math.floor(Math.random() * 90000) + 10000}</b> has been sent to the logistics hub.</p>
                <div className="mt-10 flex flex-col gap-3 w-full max-w-xs">
                    <button
                        onClick={() => navigate('/franchise/dashboard')}
                        className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-sm shadow-xl hover:scale-[1.02] transition-all"
                    >
                        Back to Dashboard
                    </button>
                    <button
                        onClick={() => setOrderSuccess(false)}
                        className="w-full bg-slate-100 text-slate-600 py-5 rounded-[24px] font-black text-sm hover:bg-slate-200 transition-all font-black uppercase tracking-widest text-[10px]"
                    >
                        Order More
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#f8fafd] overflow-hidden">
            {/* Products Main Section */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-white border-b border-slate-100 p-6 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight">Procurement Portal</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Order Warehouse Stock</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative group hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search catalog..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64 h-11 pl-11 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all"
                            />
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                    {/* Categories */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap",
                                    selectedCategory === cat
                                        ? "bg-primary border-primary text-white shadow-lg shadow-green-100"
                                        : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Products Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20"
                    >
                        <AnimatePresence>
                            {filteredProducts.map((p, idx) => (
                                <motion.div
                                    key={p.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                                    className="bg-white rounded-[32px] border border-slate-100 p-4 shadow-sm group hover:border-primary/20 transition-all"
                                >
                                    <div className="aspect-square rounded-2xl bg-slate-50 overflow-hidden mb-4 relative">
                                        <img src={p.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={p.name} />
                                        <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg shadow-sm">
                                            <p className="text-[9px] font-black text-primary uppercase tracking-widest">{p.category}</p>
                                        </div>
                                    </div>
                                    <div className="px-2">
                                        <h4 className="font-black text-slate-900 tracking-tight truncate">{p.name}</h4>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-1.5">
                                                <IndianRupee size={12} className="text-slate-400" />
                                                <span className="text-sm font-black text-slate-900">{p.price}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">/ {p.unit}</span>
                                            </div>
                                            {cart[p.id] ? (
                                                <div className="flex items-center gap-3 bg-slate-900 text-white rounded-xl px-2 py-1.5">
                                                    <button onClick={() => updateQty(p.id, -1)} className="w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors">
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-xs font-black w-4 text-center">{cart[p.id]}</span>
                                                    <button onClick={() => updateQty(p.id, 1)} className="w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors">
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => updateQty(p.id, 1)}
                                                    className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm group-hover:shadow-lg shadow-primary/5"
                                                >
                                                    <Plus size={20} />
                                                </button>
                                            )}
                                        </div>
                                        {p.bulkPricing && (
                                            <div className="mt-3 flex gap-2">
                                                {p.bulkPricing.slice(0, 1).map((bulk, i) => (
                                                    <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black uppercase">
                                                        <Package size={10} />
                                                        {bulk.minQty}+: ₹{bulk.price}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* Order Sidebar (Desktop Only) */}
            <div className="hidden xl:flex w-[400px] bg-white border-l border-slate-100 flex-col">
                <div className="p-8 border-b border-slate-50">
                    <div className="flex items-center gap-3 mb-2">
                        <ShoppingBasket className="text-primary" size={24} />
                        <h3 className="text-xl font-black text-slate-900 tracking-tight italic">PROCUREMENT CART</h3>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Bulk Business Rates Applied</p>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                    {cartItems.length > 0 ? (
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex gap-4 p-4 rounded-3xl bg-slate-50/50 border border-slate-100 group">
                                    <div className="w-16 h-16 rounded-2xl bg-white overflow-hidden border border-slate-100">
                                        <img src={item.image} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs font-black text-slate-900 truncate tracking-tight">{item.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{item.qty} {item.unit} × ₹{item.price}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                                                    <Minus size={10} />
                                                </button>
                                                <span className="text-[10px] font-black text-slate-900">{item.qty}</span>
                                                <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                                                    <Plus size={10} />
                                                </button>
                                            </div>
                                            <span className="text-[11px] font-black text-slate-900">₹{(item.qty * item.price).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-20">
                            <ShoppingBasket size={64} strokeWidth={1} />
                            <p className="text-[10px] font-black uppercase mt-4 tracking-widest">Cart is Empty</p>
                            <p className="text-[8px] font-bold mt-1">Select products to begin</p>
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-8 border-t border-slate-100 bg-slate-50/30 space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <span>Subtotal</span>
                                <span className="text-slate-900">₹{totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <span>Handling & GST</span>
                                <span className="text-slate-900">₹0 (Consolidated)</span>
                            </div>
                            <div className="pt-3 border-t border-slate-200/60 flex justify-between items-center">
                                <span className="text-xs font-black text-slate-900 uppercase tracking-widest italic">Total Payable</span>
                                <span className="text-2xl font-black text-slate-900 tracking-tighter italic">₹{totalAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={isSubmitting}
                            className="w-full bg-primary text-white py-5 rounded-[24px] font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-green-100 active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (
                                <>
                                    Confirm Procurement
                                    <ChevronRight size={18} />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Cart Sheet (Trigger) */}
            <AnimatePresence>
                {cartItems.length > 0 && (
                    <div className="xl:hidden fixed bottom-24 left-6 right-6 z-40">
                        <motion.button
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            onClick={handlePlaceOrder}
                            className="w-full bg-slate-900 text-white p-5 rounded-3xl flex items-center justify-between shadow-2xl active:scale-95 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                    <ShoppingBasket size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase text-slate-400">Total payable</p>
                                    <p className="text-lg font-black tracking-tight leading-none italic">₹{totalAmount.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 font-black text-sm italic">
                                Order Now <ChevronRight size={18} />
                            </div>
                        </motion.button>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
