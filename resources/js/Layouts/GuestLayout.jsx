import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-100 font-sans antialiased">
            {/* Logo Utama / Judul di atas Card Login */}
            <div className="mb-6">
                <Link href="/" className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-xl shadow-lg transition-transform group-hover:scale-105">
                        👑
                    </div>
                    <div className="text-center">
                        <span className="font-black text-lg tracking-tight text-slate-900">SIAP MENANG</span>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pilkades Command Center</div>
                    </div>
                </Link>
            </div>

            {/* Kotak Card Form */}
            <div className="w-full sm:max-w-md mt-2 px-6 py-8 bg-white shadow-xl shadow-slate-200/50 border border-slate-200/80 sm:rounded-3xl">
                {children}
            </div>

            {/* Footer Kecil */}
            <div className="mt-6 text-center text-xs text-slate-400 font-medium">
                &copy; {new Date().getFullYear()} Siap Menang. All rights reserved.
            </div>
        </div>
    );
}