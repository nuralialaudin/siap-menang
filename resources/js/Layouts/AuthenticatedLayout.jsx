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
                <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
                    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            
                            {/* Logo & Subtitle */}
                            <div className="flex items-center gap-2 shrink-0">
                                <Link href={route('dashboard')} className="flex items-center gap-2 group">
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm tracking-widest shadow-xs">
                                        👑
                                    </div>
                                    <div className="hidden xs:block">
                                        <div className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 leading-none">SIAP MENANG</div>
                                        <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-widest">PILKADES</span>
                                    </div>
                                </Link>
                            </div>

                            {/* Navigasi / Role Switcher & Refresh (Desktop & Tablet View) */}
                            <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
                                <button 
                                    onClick={() => isAdmin && onSwitchView && onSwitchView('admin')}
                                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                                        (currentView || userRole) === 'admin' 
                                            ? 'bg-slate-900 text-white shadow-xs' 
                                            : 'text-slate-600 hover:bg-white'
                                    } ${!isAdmin && userRole !== 'admin' ? 'opacity-75 cursor-default' : ''}`}
                                >
                                    👑 Admin
                                </button>

                                <button 
                                    onClick={() => isAdmin && onSwitchView && onSwitchView('tim_utama')}
                                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                                        (currentView || userRole) === 'tim_utama' 
                                            ? 'bg-white text-blue-700 shadow-xs' 
                                            : 'text-slate-600 hover:bg-white'
                                    } ${!isAdmin && userRole !== 'tim_utama' ? 'opacity-75 cursor-default' : ''}`}
                                >
                                    🗂️ Utama
                                </button>

                                <button 
                                    onClick={() => isAdmin && onSwitchView && onSwitchView('relawan')}
                                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                                        (currentView || userRole) === 'relawan' 
                                            ? 'bg-white text-emerald-700 shadow-xs' 
                                            : 'text-slate-600 hover:bg-white'
                                    } ${!isAdmin && userRole !== 'relawan' ? 'opacity-75 cursor-default' : ''}`}
                                >
                                    👥 Relawan
                                </button>

                                <button 
                                    onClick={() => isAdmin && onSwitchView && onSwitchView('surveyor')}
                                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                                        (currentView || userRole) === 'surveyor' 
                                            ? 'bg-white text-amber-700 shadow-xs' 
                                            : 'text-slate-600 hover:bg-white'
                                    } ${!isAdmin && userRole !== 'surveyor' ? 'opacity-75 cursor-default' : ''}`}
                                >
                                    📋 Survei
                                </button>

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

                            {/* Dropdown Akun & Logout (Desktop) */}
                            <div className="hidden md:flex items-center relative pl-3 border-l border-slate-200" ref={userDropdownRef}>
                                <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="flex items-center gap-2 text-left">
                                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                </button>
                                {userDropdownOpen && (
                                    <div className="absolute right-0 top-10 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-xs font-semibold text-slate-700">
                                        <div className="px-4 py-2 border-b border-slate-100">
                                            <div className="font-bold text-slate-900 truncate">{user?.name}</div>
                                            <div className="text-[10px] text-slate-400 truncate">{user?.email}</div>
                                        </div>
                                        <Link href={route('profile.edit')} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 block">⚙️ Pengaturan Profil</Link>
                                        <Link href={route('logout')} method="post" as="button" className="w-full text-left px-4 py-2.5 hover:bg-rose-50 text-rose-600 font-bold block">🚪 Keluar Sistem</Link>
                                    </div>
                                )}
                            </div>

                            {/* Tombol Refresh & Hamburger Mobile (Di luar menu utama) */}
                            <div className="flex sm:hidden items-center gap-1.5">
                                <button 
                                    onClick={handleRefreshData} 
                                    className={`p-2 text-slate-600 hover:text-blue-600 rounded-lg bg-slate-100 border border-slate-200 transition ${isRefreshing ? 'animate-spin text-blue-600' : ''}`}
                                    title="Segarkan Data"
                                    type="button"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                    </svg>
                                </button>
                                <button onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)} className="p-2 text-slate-600 bg-slate-100 border border-slate-200 rounded-lg">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Baris Khusus Role Switcher untuk Tampilan Mobile (Tampil di Luar Menu Hamburger) */}
                    <div className="flex sm:hidden items-center gap-1 px-3 py-2 bg-slate-50 border-t border-slate-200 overflow-x-auto">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">View:</span>
                        <button 
                            onClick={() => isAdmin && onSwitchView && onSwitchView('admin')}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition shrink-0 ${
                                (currentView || userRole) === 'admin' 
                                    ? 'bg-slate-900 text-white shadow-xs' 
                                    : 'bg-white text-slate-700 border border-slate-200'
                            } ${!isAdmin && userRole !== 'admin' ? 'opacity-75 cursor-default' : ''}`}
                        >
                            👑 Admin
                        </button>

                        <button 
                            onClick={() => isAdmin && onSwitchView && onSwitchView('tim_utama')}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition shrink-0 ${
                                (currentView || userRole) === 'tim_utama' 
                                    ? 'bg-blue-600 text-white shadow-xs' 
                                    : 'bg-white text-slate-700 border border-slate-200'
                            } ${!isAdmin && userRole !== 'tim_utama' ? 'opacity-75 cursor-default' : ''}`}
                        >
                            🗂️ Utama
                        </button>

                        <button 
                            onClick={() => isAdmin && onSwitchView && onSwitchView('relawan')}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition shrink-0 ${
                                (currentView || userRole) === 'relawan' 
                                    ? 'bg-emerald-600 text-white shadow-xs' 
                                    : 'bg-white text-slate-700 border border-slate-200'
                            } ${!isAdmin && userRole !== 'relawan' ? 'opacity-75 cursor-default' : ''}`}
                        >
                            👥 Relawan
                        </button>

                        <button 
                            onClick={() => isAdmin && onSwitchView && onSwitchView('surveyor')}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition shrink-0 ${
                                (currentView || userRole) === 'surveyor' 
                                    ? 'bg-amber-600 text-white shadow-xs' 
                                    : 'bg-white text-slate-700 border border-slate-200'
                            } ${!isAdmin && userRole !== 'surveyor' ? 'opacity-75 cursor-default' : ''}`}
                        >
                            📋 Survei
                        </button>
                    </div>

                    {/* Mobile Dropdown (Menu Navigasi Halaman & Akun) */}
                    {showingNavigationDropdown && (
                        <div className="sm:hidden px-4 pt-3 pb-5 border-t border-slate-200 bg-white space-y-3 shadow-lg">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Akun: {user?.name} ({userRole})</div>
                            
                            <div className="grid grid-cols-1 gap-1 pt-1 border-t border-slate-100 text-sm">
                                <Link href={route('dashboard')} className="py-2 text-slate-700 font-semibold block">📊 Dashboard Utama</Link>
                                {(isAdmin || userRole === 'tim_utama') && (
                                    <Link href={route('zones.index')} className="py-2 text-slate-700 font-semibold block">🗺️ Master Zona</Link>
                                )}
                                {(isAdmin || userRole === 'tim_utama') && (
                                    <Link href={route('users.index')} className="py-2 text-slate-700 font-semibold block">👥 Manajemen User</Link>
                                )}
                                <Link href={route('voters.index')} className="py-2 text-slate-700 font-semibold block">🗳️ Data Pemilih</Link>
                                <Link href={route('field-reports.index')} className="py-2 text-slate-700 font-semibold block">📋 Laporan Lapangan</Link>
                            </div>

                            <div className="pt-2 border-t border-slate-100 space-y-1">
                                <Link href={route('profile.edit')} className="block py-2 text-slate-700 font-semibold">⚙️ Pengaturan Profil</Link>
                                <Link href={route('logout')} method="post" as="button" className="w-full text-left py-2 text-rose-600 font-semibold block">🚪 Keluar Sistem</Link>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Sub Menu / Navigasi Modul Utama (Desktop) */}
                <div className="hidden md:block bg-white border-b border-slate-200 shadow-xs">
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

                        {(isAdmin || userRole === 'tim_utama') && (
                            <Link 
                                href={route('users.index')} 
                                className={`py-3 border-b-2 text-sm font-semibold transition ${
                                    route().current('users.*') 
                                        ? 'border-blue-600 text-blue-700' 
                                        : 'border-transparent text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Manajemen User
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