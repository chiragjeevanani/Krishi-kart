import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { ROUTES } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const DeliveryPartnerLogin = () => {
    const [partnerId, setPartnerId] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!partnerId) return;
        setLoading(true);
        setTimeout(() => {
            navigate(ROUTES.DASHBOARD);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-8 overflow-hidden relative">
            {/* Decorative Background Elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.05, scale: 1 }}
                className="absolute -top-24 -right-24 w-80 h-80 bg-primary rounded-full blur-[80px]"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.03, scale: 1 }}
                className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500 rounded-full blur-[80px]"
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm mt-20"
            >
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.8, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-24 h-24 bg-primary rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/20"
                    >
                        <Navigation className="w-12 h-12 text-white" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-3xl font-black text-foreground tracking-tight">KrishiKart</h1>
                        <p className="text-primary font-bold tracking-widest uppercase text-[10px] mt-1">Delivery Logistics</p>
                    </motion.div>
                </div>

                <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onSubmit={handleLogin}
                    className="space-y-6"
                >
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Partner Access ID</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                value={partnerId}
                                onChange={(e) => setPartnerId(e.target.value)}
                                placeholder="Enter your ID (e.g. DP-8829)"
                                className="w-full pl-12 pr-4 py-5 rounded-3xl border border-border bg-muted/20 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-lg font-medium"
                            />
                        </div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        disabled={!partnerId || loading}
                        type="submit"
                        className={`w-full py-5 rounded-3xl font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-3 ${partnerId && !loading ? 'bg-primary text-white shadow-primary/30' : 'bg-muted text-muted-foreground cursor-not-allowed shadow-none'}`}
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Start Session <ArrowRight className="w-5 h-5 font-black" />
                            </>
                        )}
                    </motion.button>
                </motion.form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 flex flex-col items-center gap-6"
                >
                    <div className="flex items-center gap-2 text-primary">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="text-xs font-bold tracking-tighter uppercase italic">Secure Partner Portal</span>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    <p className="text-center text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest font-medium">
                        Contact your franchise manager if you<br />
                        are facing issues with your credentials.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default DeliveryPartnerLogin;
