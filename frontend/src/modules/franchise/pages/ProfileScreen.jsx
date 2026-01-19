import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Store,
    MapPin,
    Phone,
    Mail,
    Bell,
    Moon,
    Sun,
    ChevronRight,
    LogOut,
    ShieldCheck,
    CreditCard
} from 'lucide-react';
import { useFranchiseAuth } from '../contexts/FranchiseAuthContext';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../lib/utils';

export default function ProfileScreen() {
    const { franchise, logout } = useFranchiseAuth();
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    const menuItems = [
        { id: 'details', label: 'Franchise Details', icon: Store, sub: 'Operating hours & Location' },
        { id: 'radius', label: 'Delivery Radius', icon: MapPin, sub: 'Currently serving 5.0 km' },
        { id: 'payment', label: 'Payout Settings', icon: CreditCard, sub: 'Account: **** 4589' },
        { id: 'security', label: 'Security & Access', icon: ShieldCheck, sub: 'Manage staff credentials' }
    ];

    const handleLogout = () => {
        logout();
        navigate('/franchise/login');
    };

    return (
        <div className="min-h-screen bg-[#f8fafd] pb-32 lg:pb-12">
            {/* Profile Header */}
            <div className="bg-slate-900 pt-16 pb-24 px-8 relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 bg-primary rounded-[40px] flex items-center justify-center text-white border-4 border-white/10 shadow-2xl mb-6 relative group overflow-hidden">
                        <User size={40} />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-[10px] font-black uppercase tracking-widest">Edit</span>
                        </div>
                    </div>
                    <h2 className="text-white text-2xl font-black tracking-tight">{franchise?.name || 'Franchise Partner'}</h2>
                    <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Certified Operations Partner</p>
                </div>

                {/* Decorative background */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            <div className="px-6 -mt-10 relative z-20 space-y-4">
                {/* Quick Stats */}
                <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-xl shadow-slate-200/50 grid grid-cols-2 gap-4">
                    <div className="text-center p-2">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Partner Since</p>
                        <p className="text-sm font-black text-slate-900">Oct 2023</p>
                    </div>
                    <div className="text-center p-2 border-l border-slate-50">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Store Rating</p>
                        <p className="text-sm font-black text-emerald-500">4.9 ★</p>
                    </div>
                </div>

                {/* Settings Menu */}
                <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm">
                    {menuItems.map((item, idx) => (
                        <button
                            key={item.id}
                            className={cn(
                                "w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group",
                                idx !== menuItems.length - 1 && "border-b border-slate-50"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary/5 group-hover:text-primary transition-all">
                                    <item.icon size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-black text-slate-900 tracking-tight">{item.label}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{item.sub}</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </button>
                    ))}
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-[32px] p-2 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between p-4 px-5">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center">
                                <Bell size={20} />
                            </div>
                            <span className="text-sm font-black text-slate-900 uppercase tracking-tight">Large Audio Alerts</span>
                        </div>
                        <button className="w-11 h-6 rounded-full bg-emerald-500 relative p-1 shadow-inner shadow-green-900/10">
                            <div className="w-4 h-4 rounded-full bg-white absolute right-1 top-1 shadow-sm" />
                        </button>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full h-16 bg-red-50 text-red-500 rounded-[28px] flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest active:scale-[0.98] transition-all"
                >
                    <LogOut size={20} />
                    Terminate Session
                </button>

                <div className="pt-8 text-center">
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Franchise Version 2.0.4 r (stable)</p>
                </div>
            </div>
        </div>
    );
}
