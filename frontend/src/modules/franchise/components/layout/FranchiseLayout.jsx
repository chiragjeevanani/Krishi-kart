import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from '../navigation/BottomNav';
import Sidebar from '../navigation/Sidebar';
import { FranchiseOrdersProvider } from '../../contexts/FranchiseOrdersContext';

export default function FranchiseLayout() {
    const location = useLocation();

    // Pages where we might want to hide navigation (e.g., login)
    const hideNav = location.pathname.includes('/login');

    return (
        <FranchiseOrdersProvider>
            <div className="flex min-h-screen bg-[#f8fafd] text-slate-900 font-sans selection:bg-emerald-100">
                {/* Desktop Sidebar */}
                {!hideNav && <Sidebar />}

                <main className={`flex-1 flex flex-col min-w-0 ${!hideNav ? 'lg:ml-64' : ''}`}>
                    <div className="flex-1 overflow-x-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="h-full"
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Mobile Bottom Nav */}
                    {!hideNav && (
                        <div className="lg:hidden sticky bottom-0 z-50">
                            <BottomNav />
                        </div>
                    )}
                </main>
            </div>
        </FranchiseOrdersProvider>
    );
}
