import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFranchiseAuth } from '../contexts/FranchiseAuthContext';
import { cn } from '@/lib/utils';

export default function LoginScreen() {
    const navigate = useNavigate();
    const { login } = useFranchiseAuth();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState('franchise_id'); // 'franchise_id' or 'credentials'

    const handleNext = (e) => {
        e.preventDefault();
        if (id.length >= 4) {
            setMode('credentials');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            const success = login(id, password);
            if (success) {
                navigate('/franchise/dashboard');
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#f8fafd] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl shadow-green-900/5 border border-slate-50 relative z-10"
            >
                {/* Header */}
                <div className="flex flex-col items-center mb-10">
                    <motion.div
                        initial={{ rotate: -10, scale: 0.8 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-green-100 mb-6"
                    >
                        <ShieldCheck className="text-white" size={32} />
                    </motion.div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Franchise Portal</h1>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">Operational Access Control</p>
                </div>

                <form onSubmit={mode === 'franchise_id' ? handleNext : handleLogin} className="space-y-6">
                    <AnimatePresence mode="wait">
                        {mode === 'franchise_id' ? (
                            <motion.div
                                key="id-input"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Franchise ID</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">
                                            <User size={18} />
                                        </div>
                                        <Input
                                            autoFocus
                                            value={id}
                                            onChange={(e) => setId(e.target.value)}
                                            placeholder="Enter your Franchise ID"
                                            className="h-14 pl-12 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary transition-all text-sm font-bold"
                                        />
                                    </div>
                                </div>
                                <Button
                                    disabled={id.length < 4}
                                    className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-lg shadow-green-100 active:scale-95 transition-all"
                                >
                                    Continue <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="credentials-input"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Password</label>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">
                                                <KeyRound size={18} />
                                            </div>
                                            <Input
                                                autoFocus
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="h-14 pl-12 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary transition-all text-sm font-bold"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button
                                        className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-lg shadow-green-100 active:scale-95 transition-all flex items-center justify-center gap-2"
                                        disabled={isLoading}
                                    >
                                        {isLoading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                                        Authorise Access
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={() => setMode('franchise_id')}
                                        className="text-[10px] font-black text-slate-400 uppercase tracking-widest py-2 hover:text-primary transition-colors"
                                    >
                                        Back to ID
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>

                {/* Footer Info */}
                <div className="mt-12 flex flex-col items-center gap-4">
                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                    <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest text-center leading-relaxed">
                        Secure Enterprise Access<br />
                        Authorized Personal Only
                    </p>
                </div>
            </motion.div>

            {/* Bottom Credit */}
            <div className="absolute bottom-8 left-0 w-full text-center">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">Powered by KrishiKart Operations Engine v2.0</span>
            </div>
        </div>
    );
}
