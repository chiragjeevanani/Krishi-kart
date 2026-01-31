import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from '../navigation/BottomNav';
import Sidebar from '../navigation/Sidebar';
import { Suspense } from 'react';

export default function VendorLayout() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/vendor/login';

    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-white">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="h-full"
                    >
                        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
                            <Outlet />
                        </Suspense>
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#f8fafd] text-slate-900 font-sans selection:bg-emerald-100">
            {/* Desktop Sidebar (Only visible on lg screens) */}
            <div className="hidden lg:block lg:w-64 fixed inset-y-0 left-0 z-50">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col min-w-0 lg:ml-64 pb-20 lg:pb-0">
                <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="h-full max-w-5xl mx-auto"
                        >
                            <Suspense fallback={<div className="h-full w-full flex items-center justify-center p-20"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
                                <Outlet />
                            </Suspense>
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            {!location.pathname.includes('/orders/') && !location.pathname.includes('/dispatch') && (
                <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
                    <BottomNav />
                </div>
            )}
        </div>
    );
}
