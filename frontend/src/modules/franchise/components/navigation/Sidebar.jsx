import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ShoppingBasket, Package, User, LogOut, ChevronLeft, ChevronRight, PackageCheck, Truck, Wallet, Monitor } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/franchise/dashboard' },
        { icon: ShoppingBag, label: 'Hotel Orders', path: '/franchise/orders' },
        { icon: ShoppingBasket, label: 'Order Inventory', path: '/franchise/procurement' },
        { icon: Package, label: 'Inventory stock', path: '/franchise/inventory' },
        { icon: PackageCheck, label: 'Vendor Receiving', path: '/franchise/receiving' },
        { icon: Truck, label: 'Delivery Dispatch', path: '/franchise/dispatch' },
        { icon: Wallet, label: 'COD Cash', path: '/franchise/cash' },
        { icon: Monitor, label: 'POS & Weighing', path: '/franchise/pos' },
        { icon: User, label: 'Profile Settings', path: '/franchise/profile' }
    ];

    return (
        <aside className={cn(
            "fixed left-0 top-0 h-full bg-white border-r border-slate-100 z-50 hidden lg:flex flex-col transition-all duration-300",
            isCollapsed ? "w-20" : "w-64"
        )}>
            {/* Header */}
            <div className="p-6 flex items-center justify-between">
                {!isCollapsed && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                            <span className="text-white font-black text-xl">K</span>
                        </div>
                        <span className="font-black text-xl tracking-tight text-slate-900">KrishiKart</span>
                    </div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={cn(
                                "w-full flex items-center gap-4 px-4 py-3.5 rounded-[20px] transition-all duration-300 group",
                                isActive ? "bg-primary text-white shadow-lg shadow-green-100" : "text-slate-500 hover:bg-slate-50"
                            )}
                        >
                            <item.icon size={22} className={cn("shrink-0", isActive ? "scale-110" : "group-hover:scale-110 transition-transform")} />
                            {!isCollapsed && (
                                <span className="font-bold text-sm tracking-tight">{item.label}</span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-50">
                <button
                    onClick={() => navigate('/franchise/login')}
                    className={cn(
                        "w-full flex items-center gap-4 px-4 py-3.5 rounded-[20px] text-red-500 hover:bg-red-50 transition-all",
                        isCollapsed && "justify-center"
                    )}
                >
                    <LogOut size={22} />
                    {!isCollapsed && <span className="font-bold text-sm tracking-tight">Logout</span>}
                </button>
            </div>
        </aside>
    );
}
