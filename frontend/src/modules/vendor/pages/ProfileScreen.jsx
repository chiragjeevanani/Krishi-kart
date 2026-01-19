import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Settings,
    Bell,
    Shield,
    Moon,
    LogOut,
    ChevronRight,
    Camera,
    Globe,
    ExternalLink,
    Store,
    Smartphone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const SettingItem = ({ icon: Icon, label, value, color, onClick }) => (
    <button
        onClick={onClick}
        className="w-full bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-lg hover:shadow-slate-200/50 transition-all"
    >
        <div className="flex items-center gap-4">
            <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110",
                color === 'blue' ? "bg-blue-50 text-blue-600" :
                    color === 'primary' ? "bg-emerald-50 text-emerald-600" :
                        color === 'amber' ? "bg-amber-50 text-amber-600" :
                            color === 'purple' ? "bg-purple-50 text-purple-600" :
                                "bg-slate-50 text-slate-500"
            )}>
                <Icon size={20} />
            </div>
            <div>
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">{label}</p>
                <p className="text-sm font-black text-slate-900 tracking-tight">{value}</p>
            </div>
        </div>
        <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
    </button>
);

export default function ProfileScreen() {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <div className="space-y-8 pb-32">
            <header>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Identity Suite</h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Vendor ID: KRISHI-V-882</p>
            </header>

            {/* Profile Card */}
            <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="relative mb-6">
                        <div className="w-24 h-24 rounded-[32px] bg-white p-1 overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&auto=format&fit=crop&q=60"
                                className="w-full h-full object-cover rounded-[28px]"
                                alt="Profile"
                            />
                        </div>
                        <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-2xl flex items-center justify-center border-4 border-slate-900 shadow-lg">
                            <Camera size={18} />
                        </button>
                    </div>
                    <h2 className="text-2xl font-black tracking-tight">Green Valley Farms</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Tier 1 Premium Vendor</p>

                    <div className="grid grid-cols-2 gap-4 w-full mt-10">
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Status</p>
                            <p className="text-xs font-bold text-emerald-400">Verfied Partner</p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Joined</p>
                            <p className="text-xs font-bold">Oct 2023</p>
                        </div>
                    </div>
                </div>
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full" />
            </div>

            {/* Settings Sections */}
            <div className="space-y-8">
                <section className="space-y-3">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Business Operations</h3>
                    <SettingItem icon={Store} label="Entity" value="Business Details & KYC" color="blue" />
                    <SettingItem icon={Globe} label="Market" value="Marketplace Visibility" color="primary" onClick={() => navigate('/vendor/preview')} />
                    <SettingItem icon={Smartphone} label="Network" value="Mobile Device Sync" color="purple" />
                </section>

                <section className="space-y-3">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">System Preferences</h3>
                    <SettingItem icon={Bell} label="Notifications" value="Operational Alerts" color="amber" />
                    <div className="w-full bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center">
                                <Moon size={20} />
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Interface</p>
                                <p className="text-sm font-black text-slate-900 tracking-tight">Dark Mode Simulation</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={cn(
                                "w-12 h-6 rounded-full transition-all duration-300 relative",
                                isDarkMode ? "bg-primary shadow-[0_0_10px_rgba(22,163,74,0.3)]" : "bg-slate-200"
                            )}
                        >
                            <div className={cn(
                                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
                                isDarkMode ? "left-7" : "left-1"
                            )} />
                        </button>
                    </div>
                    <SettingItem icon={Shield} label="Security" value="Access Keys & Privacy" color="slate" />
                </section>

                <button
                    onClick={() => navigate('/vendor/login')}
                    className="w-full bg-red-50 text-red-600 py-5 rounded-[28px] font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-red-900/5 active:scale-95 transition-all mt-6"
                >
                    System Logout
                    <LogOut size={18} />
                </button>
            </div>

            <div className="text-center">
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none">Powered by KrishiKart Intelligence</p>
                <p className="text-[8px] font-bold text-slate-200 mt-2">BUILD_VERSION: 1.0.42-STABLE</p>
            </div>
        </div>
    );
}
