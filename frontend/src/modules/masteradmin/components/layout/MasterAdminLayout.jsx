import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../navigation/Sidebar';
import TopBar from '../navigation/TopBar';
import { useState } from 'react';

export default function MasterAdminLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const isLoginPage = location.pathname === '/masteradmin/login';

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
            {/* Desktop Sidebar */}
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${!isLoginPage ? (isCollapsed ? 'lg:ml-20' : 'lg:ml-64') : ''}`}>
                <TopBar />

                <main className="flex-1 overflow-x-hidden p-6">
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
                </main>
            </div>
        </div>
    );
}
