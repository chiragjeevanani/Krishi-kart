import { motion } from 'framer-motion';
import {
    ShoppingBag,
    Truck,
    TrendingUp,
    Store,
    Bell,
    ChevronRight,
    ArrowUpRight,
    RefreshCcw,
    Zap
} from 'lucide-react';
import { useFranchiseOrders } from '../contexts/FranchiseOrdersContext';
import MetricCard from '../components/cards/MetricCard';
import { cn } from '../../../lib/utils';

export default function DashboardScreen() {
    const { stats, orders } = useFranchiseOrders();

    const recentOrders = orders.slice(0, 3);

    return (
        <div className="pb-32 lg:pb-12">
            {/* Sticky Header */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">Ops Dashboard</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Franchise Live Status</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                    </button>
                    <div className="hidden lg:flex w-10 h-10 rounded-full bg-emerald-100 items-center justify-center text-emerald-600 font-black text-xs">
                        RK
                    </div>
                </div>
            </header>

            <div className="p-6 space-y-8">
                {/* Insights Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard
                        title="Today's Orders"
                        value={stats.todayOrders}
                        icon={ShoppingBag}
                        trend={{ value: 12, isUp: true }}
                        color="blue"
                    />
                    <MetricCard
                        title="Pending"
                        value={stats.pendingDeliveries}
                        icon={Truck}
                        color="orange"
                    />
                    <MetricCard
                        title="Takeaway"
                        value={stats.takeaway}
                        icon={Store}
                        color="purple"
                    />
                    <MetricCard
                        title="Revenue"
                        value={`₹${stats.revenue.toLocaleString()}`}
                        icon={TrendingUp}
                        trend={{ value: 8, isUp: true }}
                        color="emerald"
                    />
                </div>

                {/* Quick Actions / Shortcuts */}
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    {[
                        { label: 'Receive Stock', icon: Zap, color: 'bg-emerald-500' },
                        { label: 'Inventory', icon: RefreshCcw, color: 'bg-blue-500' },
                        { label: 'Dispatch', icon: Truck, color: 'bg-orange-500' }
                    ].map((btn, idx) => (
                        <motion.button
                            key={btn.label}
                            whileTap={{ scale: 0.95 }}
                            className="shrink-0 flex items-center gap-3 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm"
                        >
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", btn.color)}>
                                <btn.icon size={20} />
                            </div>
                            <span className="text-xs font-black text-slate-900 uppercase tracking-tight pr-4">{btn.label}</span>
                        </motion.button>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mt-8">
                    {/* Recent Orders Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Recent Orders</h2>
                            <button className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                                See All <ChevronRight size={14} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {recentOrders.map((order) => (
                                <motion.div
                                    key={order.id}
                                    whileHover={{ x: 5 }}
                                    className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                                            <ShoppingBag size={20} className="text-slate-400 group-hover:text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-slate-900 tracking-tight">{order.id}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.customer}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-900 leading-none">₹{order.total}</p>
                                        <span className={cn(
                                            "text-[8px] font-black uppercase px-2 py-1 rounded-full mt-2 inline-block tracking-tighter",
                                            order.status === 'incoming' ? "bg-blue-50 text-blue-500" :
                                                order.status === 'assigned' ? "bg-orange-50 text-orange-500" :
                                                    "bg-emerald-50 text-emerald-500"
                                        )}>
                                            {order.status}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Operational Alerts / Notifications */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">System Alerts</h2>
                        <div className="bg-slate-900 rounded-[24px] p-6 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                                    <Zap size={16} fill="currentColor" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Quick Tip</span>
                                </div>
                                <h3 className="text-lg font-black tracking-tight mb-2">Dispatch ready orders faster!</h3>
                                <p className="text-slate-400 text-xs font-medium leading-relaxed">
                                    There are 5 orders currently in "Assigned" status that can be marked for delivery now.
                                </p>
                                <button className="mt-6 w-full h-11 bg-white text-slate-900 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-400 transition-all active:scale-95">
                                    View Assigned Orders
                                </button>
                            </div>
                            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-3xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
