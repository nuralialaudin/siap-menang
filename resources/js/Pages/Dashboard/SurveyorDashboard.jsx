import React from 'react';
import { Head, router } from '@inertiajs/react';

export default function SurveyorDashboard({ stats, filters }) {
    const dataStats = stats || { total_voters: 15, total_audited: 14, mismatch: 4, audits: [] };
    const search = filters?.search || '';
    const statusTab = filters?.status || 'semua';

    const handleFilter = (newSearch, newStatus) => {
        router.get(route('dashboard'), { search: newSearch, status: newStatus }, { preserveState: true, preserveScroll: true, replace: true });
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Head title="Audit Sentimen Lapangan - Tim Survei" />
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">🛡️ LAYER VERIFIKASI INDEPENDEN</div>
                    <h1 className="text-xl font-black text-slate-900">Audit Sentimen Lapangan</h1>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50/50 rounded-2xl border text-center"><div className="text-2xl font-black text-slate-900">{dataStats.total_voters}</div><div className="text-[10px] font-bold text-slate-400 uppercase">TOTAL</div></div>
                    <div className="p-4 bg-slate-50/50 rounded-2xl border text-center"><div className="text-2xl font-black text-slate-900">{dataStats.total_audited}</div><div className="text-[10px] font-bold text-slate-400 uppercase">AUDITED</div></div>
                    <div className="p-4 bg-rose-50/40 rounded-2xl border text-center"><div className="text-2xl font-black text-rose-600">{dataStats.mismatch}</div><div className="text-[10px] font-bold text-rose-400 uppercase">MISMATCH</div></div>
                </div>
                <div className="bg-slate-100 p-1.5 rounded-2xl grid grid-cols-3 gap-2 text-xs font-bold">
                    <button type="button" onClick={() => handleFilter(search, 'semua')} className={`py-2.5 rounded-xl transition ${statusTab === 'semua' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}>Semua</button>
                    <button type="button" onClick={() => handleFilter(search, 'belum')} className={`py-2.5 rounded-xl transition ${statusTab === 'belum' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}>Belum Diaudit</button>
                    <button type="button" onClick={() => handleFilter(search, 'sudah')} className={`py-2.5 rounded-xl transition ${statusTab === 'sudah' ? 'bg-slate-950 text-white shadow-md' : 'text-slate-500'}`}>Sudah Diaudit</button>
                </div>
                <div className="relative">
                    <input type="text" placeholder="Cari..." className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-medium shadow-2xs" value={search} onChange={(e) => handleFilter(e.target.value, statusTab)} />
                </div>
                <div className="space-y-3">
                    {dataStats.audits && dataStats.audits.length > 0 ? (
                        dataStats.audits.map((audit) => (
                            <div key={audit.id} className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3.5 shadow-2xs">
                                <div className="flex flex-col gap-1.5 pt-1"><span className="w-3.5 h-3.5 rounded-full bg-purple-600"></span><span className="w-3.5 h-3.5 rounded-full bg-amber-400"></span></div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2"><span className="font-bold text-slate-900 text-sm">{audit.voter?.name || 'Warga'}</span>{!audit.is_match && <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-extrabold rounded-md">MISMATCH</span>}</div>
                                    <div className="text-xs text-slate-400 mt-0.5">NIK: {audit.voter?.nik || '-'}</div>
                                    <p className="text-xs font-semibold text-slate-700 italic mt-2">"{audit.notes || 'Verifikasi independen lapangan'}"</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-12 text-center text-xs text-slate-400">Tidak ada data audit yang cocok.</div>
                    )}
                </div>
            </div>
        </div>
    );
}