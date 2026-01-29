import { motion } from 'framer-motion';
import {
    ShoppingBag,
    Truck,
    TrendingUp,
    PackageCheck,
    Bell,
    ChevronRight,
    Zap,
    Wallet,
    AlertTriangle,
    ArrowUpRight
} from 'lucide-react';
import { useFranchiseOrders } from '../contexts/FranchiseOrdersContext';
import { useInventory } from '../contexts/InventoryContext';
import { useGRN } from '../contexts/GRNContext';
import { useCOD } from '../contexts/CODContext';
import MetricCard from '../components/cards/MetricCard';
import StatusBadge from '../components/common/StatusBadge';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function DashboardScreen() {
    const navigate = useNavigate();
    const { stats, orders } = useFranchiseOrders();
    const { getStockStats } = useInventory();
    const { purchaseOrders } = useGRN();
    const { summary: codSummary } = useCOD();

    const inventoryStats = getStockStats();
    const recentOrders = orders.slice(0, 5);

    return (
        <div className="pb-32 lg:pb-12 bg-slate-50/50 min-h-screen">
            {/* Sticky Header */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">Ops Dashboard</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Warehouse Live Control</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                    </button>
                    <div className="hidden lg:flex px-3 h-10 rounded-xl bg-primary/10 items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-white font-black text-[10px]">WH</div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-wider">Franchise-042</span>
                    </div>
                </div>
            </header>

            <div className="p-6 space-y-8">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    <MetricCard
                        title="New Orders"
                        value={stats.newOrders}
                        icon={ShoppingBag}
                        color="blue"
                    />
                    <MetricCard
                        title="Out for Delivery"
                        value={stats.outForDelivery}
                        icon={Truck}
                        color="orange"
                    />
                    <MetricCard
                        title="Low Stock"
                        value={inventoryStats.lowStockCount}
                        icon={AlertTriangle}
                        color="red"
                        suffix={inventoryStats.lowStockCount > 10 ? '+' : ''}
                    />
                    <MetricCard
                        title="COD to Deposit"
                        value={codSummary.pendingDeposit}
                        icon={Wallet}
                        color="indigo"
                        prefix="₹"
                    />
                    <MetricCard
                        title="Vendor POs"
                        value={purchaseOrders.length}
                        icon={PackageCheck}
                        color="purple"
                    />
                    <MetricCard
                        title="Total Revenue"
                        value={stats.revenue}
                        icon={TrendingUp}
                        color="emerald"
                        prefix="₹"
                    />
                </div>

                {/* Quick Shortcuts */}
                <div className="space-y-4">
                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Quick Operations</h2>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                        {[
                            { label: 'Receive PO', icon: PackageCheck, color: 'emerald', path: '/franchise/receiving' },
                            { label: 'Update Stock', icon: Zap, color: 'blue', path: '/franchise/inventory' },
                            { label: 'Dispatch', icon: Truck, color: 'orange', path: '/franchise/dispatch' },
                            { label: 'Cash Entry', icon: Wallet, color: 'indigo', path: '/franchise/cash' },
                            { label: 'POS Terminal', icon: ArrowUpRight, color: 'slate', path: '/franchise/pos' }
                        ].map((btn) => (
                            <motion.button
                                key={btn.label}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate(btn.path)}
                                className="shrink-0 flex items-center gap-3 bg-white border border-slate-100 p-3 pr-5 rounded-[20px] shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className={cn(
                                    "w-10 h-10 rounded-2xl flex items-center justify-center text-white",
                                    btn.color === 'emerald' ? "bg-emerald-500 shadow-emerald-200" :
                                        btn.color === 'blue' ? "bg-blue-500 shadow-blue-200" :
                                            btn.color === 'orange' ? "bg-orange-500 shadow-orange-200" :
                                                btn.color === 'indigo' ? "bg-indigo-500 shadow-indigo-200" : "bg-slate-700 shadow-slate-200",
                                    "shadow-lg"
                                )}>
                                    <btn.icon size={18} strokeWidth={2.5} />
                                </div>
                                <span className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{btn.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mt-8">
                    {/* Recent Hotel Orders */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Hotel Orders</h2>
                            <button
                                onClick={() => navigate('/franchise/orders')}
                                className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:translate-x-1 transition-transform"
                            >
                                See All <ChevronRight size={14} />
                            </button>
                        </div>
                        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="divide-y divide-slate-50">
                                {recentOrders.map((order) => (
                                    <motion.div
                                        key={order.id}
                                        whileHover={{ backgroundColor: 'rgba(248, 250, 252, 0.5)' }}
                                        onClick={() => navigate(`/franchise/orders/${order.id}`)}
                                        className="p-5 flex items-center justify-between group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                <ShoppingBag size={20} className="text-slate-400 group-hover:text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-slate-900 tracking-tight">{order.hotelName}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.id}</span>
                                                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.deliverySlot}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <p className="text-sm font-black text-slate-900 tracking-tight">₹{order.total.toLocaleString()}</p>
                                            <StatusBadge status={order.status} />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Operational Alerts & Inventory Health */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl shadow-slate-200">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-primary mb-3">
                                    <Zap size={18} fill="currentColor" strokeWidth={0} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Efficiency boost</span>
                                </div>
                                <h3 className="text-xl font-black tracking-tight mb-2 leading-tight">Batch receiving active!</h3>
                                <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">
                                    There are {purchaseOrders.length} vendor deliveries expected today. Start early receiving to optimize storage.
                                </p>
                                <button
                                    onClick={() => navigate('/franchise/receiving')}
                                    className="w-full h-12 bg-primary text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.1em] hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                                >
                                    Start Vendor Receiving
                                </button>
                            </div>
                            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-3xl opacity-50" />
                        </div>

                        {/* Inventory Health Widget */}
                        <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm space-y-4">
                            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory Health</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-slate-600">Low Stock Items</span>
                                    <span className="font-black text-red-500">{inventoryStats.lowStockCount} items</span>
                                </div>
                                <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(inventoryStats.lowStockCount / inventoryStats.totalItems) * 100}%` }}
                                        className="h-full bg-red-500"
                                    />
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-slate-600">Total Catalog</span>
                                    <span className="font-black text-slate-900">{inventoryStats.totalItems} SKUs</span>
                                </div>
                                <button
                                    onClick={() => navigate('/franchise/inventory')}
                                    className="w-full mt-2 py-3 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-colors"
                                >
                                    Manage Inventory
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
