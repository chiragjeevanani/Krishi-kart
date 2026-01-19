import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Shield,
    Bell,
    Lock,
    Zap,
    Server,
    Save,
    UserCircle,
    Mail,
    Phone,
    Key
} from 'lucide-react';

export default function SettingsScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('profile');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const section = params.get('section');
        if (section) {
            setActiveSection(section);
        }
    }, [location.search]);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <div className="p-20 flex justify-center items-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Configuration</h1>
                <p className="text-slate-500 font-medium">Fine-tune platform protocols and administrative security.</p>
            </div>

            <div className="w-full">
                {/* Content Area */}
                <div>
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-10"
                    >
                        {activeSection === 'profile' && (
                            <div className="space-y-10">
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center border border-slate-100 relative group overflow-hidden">
                                        <UserCircle size={48} className="text-slate-200" />
                                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Update</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Main Administrator</h2>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Super Admin Tier Access</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Identity Label</label>
                                        <div className="relative group">
                                            <input type="text" defaultValue="KrishiKart Root" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 outline-none text-sm font-bold focus:ring-2 focus:ring-primary/10 transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Protocol Email</label>
                                        <div className="flex items-center gap-3 bg-slate-50 rounded-2xl py-4 px-6">
                                            <Mail size={16} className="text-slate-300" />
                                            <span className="text-sm font-bold text-slate-900">root@krishikart.com</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Emergency Phone</label>
                                        <div className="flex items-center gap-3 bg-slate-50 rounded-2xl py-4 px-6">
                                            <Phone size={16} className="text-slate-300" />
                                            <span className="text-sm font-bold text-slate-900">+91 99999 88888</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Security Level</label>
                                        <div className="flex items-center gap-3 bg-emerald-50 rounded-2xl py-4 px-6 border border-emerald-100/50">
                                            <Shield size={16} className="text-emerald-500" />
                                            <span className="text-sm font-black text-emerald-600">Level 10 (Maximum)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'security' && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Security Hardening</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Multi-factor & Key Rotation</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-primary/20 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                                <Key size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900">Change Master Password</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Last rotated 42 days ago</p>
                                            </div>
                                        </div>
                                        <button className="bg-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border border-slate-100">Rotate</button>
                                    </div>

                                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500">
                                                <Lock size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900">Two-Factor Auth (2FA)</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight text-emerald-500">Active & Verified</p>
                                            </div>
                                        </div>
                                        <div className="w-12 h-6 bg-primary rounded-full relative flex items-center px-1 cursor-pointer">
                                            <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'platform' && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Platform Configuration</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Global System Parameters</p>
                                </div>
                                <div className="p-10 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-4">
                                        <Zap size={32} />
                                    </div>
                                    <h4 className="text-lg font-black text-slate-900">Configuration Panel</h4>
                                    <p className="text-slate-400 font-medium mt-2 max-w-xs">System-wide settings and parameters are currently under maintenance.</p>
                                </div>
                            </div>
                        )}

                        {activeSection === 'notifications' && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Alert Center</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Notification & Alerts</p>
                                </div>
                                <div className="p-10 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-4">
                                        <Bell size={32} />
                                    </div>
                                    <h4 className="text-lg font-black text-slate-900">Notification Rules</h4>
                                    <p className="text-slate-400 font-medium mt-2 max-w-xs">Configure system alerts and notification delivery channels.</p>
                                </div>
                            </div>
                        )}

                        {activeSection === 'api' && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">API & Webhooks</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Developer Access & Integration</p>
                                </div>
                                <div className="p-10 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 mb-4">
                                        <Server size={32} />
                                    </div>
                                    <h4 className="text-lg font-black text-slate-900">API Configuration</h4>
                                    <p className="text-slate-400 font-medium mt-2 max-w-xs">Manage API keys, webhooks, and third-party integrations.</p>
                                </div>
                            </div>
                        )}

                        <div className="mt-12 pt-10 border-t border-slate-50 flex items-center justify-between">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Modified: Oct 24, 2023 - 14:22</p>
                            <button className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-50 active:scale-95">
                                <Save size={18} />
                                Synchronize Protocol
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
