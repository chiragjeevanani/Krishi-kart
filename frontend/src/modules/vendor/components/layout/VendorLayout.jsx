import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from '../navigation/BottomNav';
import Sidebar from '../navigation/Sidebar';

export default function VendorLayout() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/vendor/login';

    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-white">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#f8fafd] text-slate-900 font-sans selection:bg-emerald-100">
            {/* Desktop Sidebar (Only visible on lg screens) */}
            <div className="hidden lg:block lg:w-64 fixed inset-y-0 left-0">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col min-w-0 lg:ml-64 pb-20 lg:pb-0">
                <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full max-w-5xl mx-auto"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
                <BottomNav />
            </div>
        </div>
    );
}
