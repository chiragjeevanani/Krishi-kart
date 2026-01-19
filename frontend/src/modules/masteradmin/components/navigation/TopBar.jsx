import { Bell, Search, UserCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function TopBar() {
    const location = useLocation();

    const getBreadcrumb = () => {
        const path = location.pathname.split('/').pop();
        if (path === 'dashboard') return 'Overview';
        return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    };

    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-slate-400">Master Admin</span>
                    <span className="text-slate-200">/</span>
                    <span className="text-slate-900">{getBreadcrumb()}</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg group focus-within:border-primary/50 transition-all">
                    <Search size={16} className="text-slate-400 group-focus-within:text-primary" />
                    <input
                        type="text"
                        placeholder="Search orders, vendors..."
                        className="bg-transparent border-none outline-none text-xs w-48 font-medium placeholder:text-slate-400"
                    />
                </div>

                <button className="relative p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-900">Chief Administrator</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Super Control</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400">
                        <UserCircle size={28} />
                    </div>
                </div>
            </div>
        </header>
    );
}
