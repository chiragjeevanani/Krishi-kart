import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Package,
    ClipboardList,
    IndianRupee,
    UserCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { id: 'dashboard', path: '/vendor/dashboard', icon: LayoutDashboard, label: 'Home' },
    { id: 'orders', path: '/vendor/orders', icon: ClipboardList, label: 'Orders' },
    { id: 'inventory', path: '/vendor/inventory', icon: Package, label: 'Stock' },
    { id: 'payments', path: '/vendor/payments', icon: IndianRupee, label: 'Payout' },
    { id: 'profile', path: '/vendor/profile', icon: UserCircle, label: 'Profile' }
];

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[28px] p-2 flex items-center justify-between">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <button
                        key={item.id}
                        onClick={() => navigate(item.path)}
                        className={cn(
                            "relative flex flex-col items-center justify-center py-2 px-1 flex-1 transition-all duration-300",
                            isActive ? "text-primary" : "text-slate-400"
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="nav-pill"
                                className="absolute inset-0 bg-primary/5 rounded-2xl"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <item.icon
                            size={20}
                            className={cn(
                                "relative z-10 transition-transform duration-300",
                                isActive ? "scale-110" : "scale-100"
                            )}
                        />
                        <span className={cn(
                            "text-[8px] font-black uppercase tracking-widest mt-1 relative z-10 transition-all duration-300",
                            isActive ? "opacity-100" : "opacity-0 translate-y-1"
                        )}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}
