import { useState, useRef, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children, currentView, onSwitchView }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    const userDropdownRef = useRef(null);
    
    const { auth } = usePage().props;
    const userRole = auth?.role || user?.role || 'user';
    const isAdmin = userRole === 'admin';

    useEffect(() => {
        function handleClickOutside(event) {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRefreshData = () => {
        setIsRefreshing(true);
        router.reload({
            onFinish: () => setIsRefreshing(false),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased flex flex-col justify-between">
            <div>
                {/* Top Navbar Horizontal */}
                <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-2xs">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            
                            {/* Logo & Subtitle */}
                            <div className="flex items-center gap-3">
                                <Link href={route('dashboard')} className="flex items-center gap-2.5 group">
                                    <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm tracking-widest shadow-sm">
                                        👑
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-base tracking-tight text-slate-900 leading-none">SIAP MENANG</div>
                                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">DEMO SIMULATOR • PILKADES</span>
                                    </div>
                                </Link>
                            </div>

                            {/* Navigasi Kanan Atas: Role Switcher / Simulator */}
                            <div className="hidden md:flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
                                
                                {/* Tombol Calon Kades / Admin */}
                                <button 
                                    onClick={() => isAdmin && onSwitchView && onSwitchView('admin')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                        (currentView || userRole) === 'admin' 
                                            ? 'bg-slate-900 text-white shadow-xs' 
                                            : 'text-slate-600 hover:bg-white'
                                    } ${!isAdmin && userRole !== 'admin' ? 'opacity-75 cursor-default' : ''}`}
                                >
                                    👑 Calon Kades
                                </button>

                                {/* Tombol Tim Utama */}
                                <button 
                                    onClick={() => isAdmin && onSwitchView && onSwitchView('tim_utama')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                        (currentView || userRole) === 'tim_utama' 
                                            ? 'bg-white text-blue-700 shadow-xs' 
                                            : 'text-slate-600 hover:bg-white'
                                    } ${!isAdmin && userRole !== 'tim_utama' ? 'opacity-75 cursor-default' : ''}`}
                                >
                                    🗂️ Tim Utama
                                </button>

                                {/* Tombol Tim Relawan */}
                                <button 
                                    onClick={() => isAdmin && onSwitchView && onSwitchView('relawan')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                        (currentView || userRole) === 'relawan' 
                                            ? 'bg-white text-emerald-700 shadow-xs' 
                                            : 'text-slate-600 hover:bg-white'
                                    } ${!isAdmin && userRole !== 'relawan' ? 'opacity-75 cursor-default' : ''}`}
                                >
                                    👥 Tim Relawan
                                </button>

                                {/* Tombol Tim Survei */}
                                <button 
                                    onClick={() => isAdmin && onSwitchView && onSwitchView('surveyor')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                        (currentView || userRole) === 'surveyor' 
                                            ? 'bg-white text-amber-700 shadow-xs' 
                                            : 'text-slate-600 hover:bg-white'
                                    } ${!isAdmin && userRole !== 'surveyor' ? 'opacity-75 cursor-default' : ''}`}
                                >
                                    📋 Tim Survei
                                </button>

                                {/* Tombol Refresh Data */}
                                <button 
                                    onClick={handleRefreshData} 
                                    className={`p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-white transition ml-1 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`}
                                    title="Segarkan Data"
                                    type="button"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                    </svg>
                                </button>
                            </div>

                            {/* Dropdown Akun & Logout */}
                            <div className="hidden md:flex items-center relative pl-3 border-l border-slate-200" ref={userDropdownRef}>
                                <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="flex items-center gap-2 text-left">
                                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                </button>
                                {userDropdownOpen && (
                                    <div className="absolute right-0 top-10 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-xs font-semibold text-slate-700">
                                        <div className="px-4 py-2 border-b border-slate-100">
                                            <div className="font-bold text-slate-900 truncate">{user.name}</div>
                                            <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                                        </div>
                                        <Link href={route('profile.edit')} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 block">⚙️ Pengaturan Profil</Link>
                                        <Link href={route('logout')} method="post" as="button" className="w-full text-left px-4 py-2.5 hover:bg-rose-50 text-rose-600 font-bold block">🚪 Keluar Sistem</Link>
                                    </div>
                                )}
                            </div>

                            {/* Hamburger Mobile */}
                            <div className="flex sm:hidden">
                                <button onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)} className="p-2 text-slate-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Dropdown */}
                    {showingNavigationDropdown && (
                        <div className="sm:hidden px-4 pt-2 pb-4 border-t border-slate-200 bg-white space-y-2">
                            <div className="text-xs font-bold text-slate-400 uppercase">Akun: {user.name} ({userRole})</div>
                            <button onClick={handleRefreshData} className="w-full text-left py-2 text-blue-600 font-semibold">🔄 Segarkan Data</button>
                            <Link href={route('profile.edit')} className="block py-2 text-slate-700 font-semibold">⚙️ Pengaturan Profil</Link>
                            <Link href={route('logout')} method="post" as="button" className="w-full text-left py-2 text-rose-600 font-semibold">🚪 Keluar Sistem</Link>
                        </div>
                    )}
                </nav>

                {/* Sub Menu / Navigasi Modul Utama (Dinamis Berdasarkan Route) */}
                <div className="bg-white border-b border-slate-200 shadow-2xs">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-8 overflow-x-auto">
                        <Link 
                            href={route('dashboard')} 
                            className={`py-3 border-b-2 text-sm font-semibold transition ${
                                route().current('dashboard') 
                                    ? 'border-blue-600 text-blue-700' 
                                    : 'border-transparent text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            Dashboard Utama
                        </Link>
                        
                        {(isAdmin || userRole === 'tim_utama') && (
                            <Link 
                                href={route('zones.index')} 
                                className={`py-3 border-b-2 text-sm font-semibold transition ${
                                    route().current('zones.*') 
                                        ? 'border-blue-600 text-blue-700' 
                                        : 'border-transparent text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Master Zona
                            </Link>
                        )}

                        <Link 
                            href={route('voters.index')} 
                            className={`py-3 border-b-2 text-sm font-semibold transition ${
                                route().current('voters.*') 
                                    ? 'border-blue-600 text-blue-700' 
                                    : 'border-transparent text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            Data Pemilih
                        </Link>

                        <Link 
                            href={route('field-reports.index')} 
                            className={`py-3 border-b-2 text-sm font-semibold transition ${
                                route().current('field-reports.*') 
                                    ? 'border-blue-600 text-blue-700' 
                                    : 'border-transparent text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            Laporan Lapangan
                        </Link>
                    </div>
                </div>

                {/* Main Content Area */}
                <main className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-500 text-center flex justify-between px-8">
                <span>SIAP MENANG &copy; {new Date().getFullYear()} — Enterprise Campaign Command Center. All rights reserved.</span>
                <Link href={route('logout')} method="post" as="button" className="text-rose-600 hover:underline font-semibold">🚪 Keluar Sistem (Logout)</Link>
            </footer>
        </div>
    );
}