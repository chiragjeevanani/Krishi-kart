import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Store,
    Truck,
    Monitor,
    BarChart3,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ShieldCheck,
    UserCheck,
    UserCircle,
    Shield,
    Zap,
    Bell,
    Server,
    CreditCard,
    BookOpen,
    Percent,
    ClipboardCheck,
    Briefcase
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [expandedMenu, setExpandedMenu] = useState(null);

    const navItems = [
        {
            group: 'Operations', items: [
                { icon: LayoutDashboard, label: 'Overview', path: '/masteradmin/dashboard' },
                { icon: ShoppingBag, label: 'Order Hub', path: '/masteradmin/orders' },
                { icon: UserCheck, label: 'Vendor Assignment', path: '/masteradmin/assignment' },
                { icon: Truck, label: 'Delivery Radar', path: '/masteradmin/delivery' },
            ]
        },
        {
            group: 'Finance & Ledger', items: [
                { icon: CreditCard, label: 'Credit Control', path: '/masteradmin/credit' },
                { icon: BookOpen, label: 'Financial Ledgers', path: '/masteradmin/ledger' },
                { icon: Percent, label: 'Commissions', path: '/masteradmin/commission' },
            ]
        },
        {
            group: 'Network & Supply', items: [
                { icon: Store, label: 'Franchise Network', path: '/masteradmin/franchises' },
                { icon: Users, label: 'Vendor Pool', path: '/masteradmin/vendors' },
                { icon: Monitor, label: 'Stock Monitoring', path: '/masteradmin/stock-monitoring' },
                { icon: Briefcase, label: 'Purchase Manager', path: '/masteradmin/purchase' },
            ]
        },
        {
            group: 'Admin Controls', items: [
                { icon: ClipboardCheck, label: 'Approval Desk', path: '/masteradmin/approvals' },
                { icon: BarChart3, label: 'Business Insights', path: '/masteradmin/analytics' },
                {
                    icon: Settings,
                    label: 'Platform Settings',
                    path: '/masteradmin/settings',
                    submenu: [
                        { label: 'Admin Profile', path: '/masteradmin/settings?section=profile', icon: UserCircle },
                        { label: 'Security Protocols', path: '/masteradmin/settings?section=security', icon: Shield },
                        { label: 'Platform Config', path: '/masteradmin/settings?section=platform', icon: Zap },
                        { label: 'Alert Center', path: '/masteradmin/settings?section=notifications', icon: Bell },
                        { label: 'API & Webhooks', path: '/masteradmin/settings?section=api', icon: Server }
                    ]
                }
            ]
        }
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
                            <span className="text-white font-black text-xl">M</span>
                        </div>
                        <span className="font-black text-xl tracking-tight text-slate-900 uppercase">Admin</span>
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
            <nav className="flex-1 px-4 space-y-6 mt-4 overflow-y-auto no-scrollbar pb-10">
                {navItems.map((group) => (
                    <div key={group.group} className="space-y-1">
                        {!isCollapsed && (
                            <div className="px-4 py-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                                    {group.group}
                                </span>
                            </div>
                        )}
                        {group.items.map((item) => {
                            const isActive = location.pathname === item.path || (item.submenu && location.pathname === item.path);
                            const isExpanded = expandedMenu === item.label;

                            return (
                                <div key={item.label}>
                                    <button
                                        onClick={() => {
                                            if (item.submenu) {
                                                setExpandedMenu(isExpanded ? null : item.label);
                                                if (isCollapsed) setIsCollapsed(false);
                                            } else {
                                                navigate(item.path);
                                            }
                                        }}
                                        className={cn(
                                            "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
                                            isActive && !item.submenu
                                                ? "bg-primary/10 text-primary"
                                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                        )}
                                    >
                                        <item.icon size={20} className={cn("shrink-0", isActive ? "scale-110" : "group-hover:scale-110 transition-transform")} />
                                        {!isCollapsed && (
                                            <>
                                                <span className={cn("font-semibold text-sm tracking-tight flex-1 text-left", isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100")}>
                                                    {item.label}
                                                </span>
                                                {item.submenu && (
                                                    <ChevronDown size={16} className={cn("transition-transform", isExpanded && "rotate-180")} />
                                                )}
                                            </>
                                        )}
                                        {isActive && !isCollapsed && !item.submenu && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                                            />
                                        )}
                                    </button>

                                    {/* Submenu */}
                                    <AnimatePresence>
                                        {item.submenu && isExpanded && !isCollapsed && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden ml-4 space-y-1 mt-1 border-l border-slate-100 pl-3"
                                            >
                                                {item.submenu.map((sub) => {
                                                    const isSubActive = location.search.includes(sub.path.split('?')[1]);
                                                    return (
                                                        <button
                                                            key={sub.path}
                                                            onClick={() => navigate(sub.path)}
                                                            className={cn(
                                                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium",
                                                                isSubActive
                                                                    ? "text-primary bg-primary/5"
                                                                    : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                                                            )}
                                                        >
                                                            <sub.icon size={16} />
                                                            <span>{sub.label}</span>
                                                        </button>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-50">
                <button
                    onClick={() => navigate('/masteradmin/login')}
                    className={cn(
                        "w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all group",
                        isCollapsed && "justify-center"
                    )}
                >
                    <LogOut size={20} className="group-hover:scale-110 transition-transform" />
                    {!isCollapsed && <span className="font-bold text-sm tracking-tight">System Logout</span>}
                </button>
            </div>
        </aside>
    );
}
