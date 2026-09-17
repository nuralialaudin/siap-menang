import React from 'react';
import { Head, router } from '@inertiajs/react';

export default function RelawanDashboard({ stats, filters }) {
    const dataStats = stats || { voters: [] };
    const search = filters?.search || '';

    const handleSearchChange = (e) => {
        router.get(route('dashboard'), { search: e.target.value }, { preserveState: true, preserveScroll: true, replace: true });
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <Head title="Progress Lapangan - Tim Relawan" />
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-6 rounded-3xl text-white shadow-xl space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-200">PROGRESS LAPANGAN</div>
                <div className="flex items-baseline gap-2"><span className="text-4xl font-black">15/19</span><span className="text-2xl font-bold text-purple-200">79%</span></div>
                <div className="w-full bg-purple-950/60 h-3 rounded-full overflow-hidden"><div className="bg-white h-full rounded-full" style={{ width: '79%' }}></div></div>
                <div className="text-xs text-purple-100 font-medium pt-1">Warga sudah didata • sentimen sudah dipetakan</div>
            </div>
            <div className="flex gap-3">
                <input type="text" placeholder="Cari nama, panggilan, blok..." className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-medium shadow-2xs" value={search} onChange={handleSearchChange} />
                <button type="button" className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs shadow-md">+ Baru</button>
            </div>
            <div className="space-y-3">
                {dataStats.voters && dataStats.voters.length > 0 ? (
                    dataStats.voters.map((v) => (
                        <div key={v.id} className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center gap-4 shadow-2xs">
                            <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs">{v.name.charAt(0)}</div>
                            <div className="flex-1"><div className="font-bold text-slate-900 text-sm">{v.name}</div><div className="text-xs text-slate-400">NIK: {v.nik || '-'}</div></div>
                            <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">Ungu</span>
                        </div>
                    ))
                ) : (
                    <div className="py-12 text-center text-xs text-slate-400 bg-white rounded-2xl border">Tidak ada data pemilih.</div>
                )}
            </div>
        </div>
    );
}