import React from 'react';
import { Head } from '@inertiajs/react';

export default function TimUtamaDashboard({ stats }) {
    const dataStats = stats || { dpt_master_count: 18, antrian_dpt_count: 1 };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <Head title="Data Manager & Verifikasi DPT - Tim Utama" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">TIM UTAMA</div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Data Manager & Verifikasi DPT</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200/80 flex items-center gap-3 shadow-2xs"><span>🗂️</span><div><div className="text-base font-black text-slate-900">{dataStats.dpt_master_count}</div><div className="text-[10px] text-slate-400 uppercase font-bold">MASTER DPT</div></div></div>
                    <div className="bg-amber-50/80 px-4 py-2.5 rounded-2xl border border-amber-200/80 flex items-center gap-3 shadow-2xs"><span>📥</span><div><div className="text-base font-black text-amber-700">{dataStats.antrian_dpt_count}</div><div className="text-[10px] text-amber-600 uppercase font-bold">ANTRIAN VALIDASI</div></div></div>
                </div>
            </div>
            <div className="flex gap-2 border-b border-slate-200 pb-3">
                <button type="button" className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-xs">Antrian Non-DPT ({dataStats.antrian_dpt_count})</button>
                <button type="button" className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-200">Database Master</button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
                <table className="min-w-full divide-y divide-slate-100 text-sm">
                    <thead className="bg-slate-50 text-left text-xs font-bold text-slate-400 uppercase">
                        <tr><th className="p-4">Nama</th><th className="p-4">NIK / KK</th><th className="p-4">Alamat</th><th className="p-4">Sumber</th><th className="p-4">Sentimen</th><th className="p-4 text-right">Aksi</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        <tr className="hover:bg-slate-50/50 transition">
                            <td className="p-4"><div className="font-bold text-slate-900">Hendra Gunawan</div><div className="text-xs text-slate-400">Hendra • Hendra bin Karta</div></td>
                            <td className="p-4 font-mono text-xs text-slate-500">••••••••••••0099</td>
                            <td className="p-4 text-xs text-slate-600">Cikondang • Blok Sawah<br/>RT 003/RW 002</td>
                            <td className="p-4"><span className="px-2 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">NON-DPT</span><div className="text-[10px] text-slate-400 mt-1">oleh Relawan Demo</div></td>
                            <td className="p-4"><span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-600"></span> Ungu</span></td>
                            <td className="p-4 text-right space-x-2">
                                <button type="button" className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs">✓ Approve</button>
                                <button type="button" className="px-3.5 py-2 bg-white hover:bg-rose-50 border border-slate-200 text-rose-600 text-xs font-bold rounded-xl">✕ Reject</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}