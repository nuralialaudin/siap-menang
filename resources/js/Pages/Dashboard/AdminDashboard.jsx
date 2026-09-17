import React from 'react';
import { Head } from '@inertiajs/react';

export default function AdminDashboard({ stats }) {
    // Data Sentimen untuk Donut Chart SVG (Total 15: Ungu 7, Merah 3, Kuning 3, Abu 2)
    // Keliling lingkaran r=40 adalah sekitar 251.2
    const total = 15;
    const sentimenData = [
        { label: 'Ungu', count: 7, color: '#9333ea', offset: 0 },
        { label: 'Merah', count: 3, color: '#dc2626', offset: -(7/15) * 251.2 },
        { label: 'Kuning', count: 3, color: '#facc15', offset: -((7+3)/15) * 251.2 },
        { label: 'Abu-abu', count: 2, color: '#94a3b8', offset: -((7+3+3)/15) * 251.2 },
    ];

    return (
        <div className="space-y-6">
            <Head title="Pusat Kendali Kampanye - Calon Kades" />

            {/* Header & Quick Stats Pills */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">CALON KADES</div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Pusat Kendali Kampanye</h1>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-2xs transition hover:border-slate-300 hover:bg-slate-50 cursor-pointer">
                        🔥 19 Warga aktif
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-2xs transition hover:border-slate-300 hover:bg-slate-50 cursor-pointer">
                        📋 15 Disurvei
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-2xs transition hover:border-slate-300 hover:bg-slate-50 cursor-pointer">
                        ✅ 14 Diaudit
                    </span>
                </div>
            </div>

            {/* Grid Bagian Atas: Komposisi Sentimen & Skor Akurasi */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Komposisi Sentimen (Modern Donut Chart SVG) */}
                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs transition hover:shadow-md hover:border-slate-300 flex flex-col justify-between">
                    <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Komposisi Sentimen</div>
                        <div className="text-2xl font-black text-slate-900 mt-1">15</div>
                        <div className="text-xs text-slate-500">total warga terpetakan</div>

                        {/* Donut Chart SVG Interaktif */}
                        <div className="flex justify-center my-4 relative group">
                            <div className="w-40 h-40 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="14" />
                                    {sentimenData.map((item, idx) => {
                                        const dashArray = `${(item.count / total) * 251.2} 251.2`;
                                        // Hitung kumulatif offset manual untuk SVG dasharray
                                        let cumulativeCount = 0;
                                        for(let i=0; i<idx; i++) cumulativeCount += sentimenData[i].count;
                                        const dashOffset = -((cumulativeCount / total) * 251.2);

                                        return (
                                            <circle 
                                                key={idx}
                                                cx="50" 
                                                cy="50" 
                                                r="40" 
                                                fill="transparent" 
                                                stroke={item.color} 
                                                strokeWidth="14" 
                                                strokeDasharray={dashArray}
                                                strokeDashoffset={dashOffset}
                                                className="transition-all duration-500 hover:stroke-[16] cursor-pointer"
                                            />
                                        );
                                    })}
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Dominan</span>
                                    <span className="text-purple-700 font-black text-sm">Ungu (47%)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-600">
                        <div className="flex items-center gap-2 transition hover:text-slate-900"><span className="w-3 h-3 rounded-full bg-purple-600 shadow-xs"></span> Ungu: 7</div>
                        <div className="flex items-center gap-2 transition hover:text-slate-900"><span className="w-3 h-3 rounded-full bg-red-600 shadow-xs"></span> Merah: 3</div>
                        <div className="flex items-center gap-2 transition hover:text-slate-900"><span className="w-3 h-3 rounded-full bg-amber-400 shadow-xs"></span> Kuning: 3</div>
                        <div className="flex items-center gap-2 transition hover:text-slate-900"><span className="w-3 h-3 rounded-full bg-slate-400 shadow-xs"></span> Abu-abu: 2</div>
                    </div>
                </div>

                {/* Skor Akurasi Lapangan & Modern Bar Chart */}
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs transition hover:shadow-md hover:border-slate-300 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Skor Akurasi Lapangan</div>
                                <div className="flex items-baseline gap-3 mt-1">
                                    <span className="text-4xl font-black text-slate-900">71%</span>
                                    <span className="text-sm font-semibold text-slate-500">Relawan vs Survei</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-lg transition hover:bg-purple-200 cursor-pointer">10 Match</span>
                                <span className="px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-lg transition hover:bg-rose-200 cursor-pointer">4 Mismatch</span>
                            </div>
                        </div>

                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden my-6 shadow-inner">
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full rounded-full transition-all duration-700" style={{ width: '71%' }}></div>
                        </div>

                        {/* Grafik Batang Modern dengan Gradien & Efek Interaktif */}
                        <div className="grid grid-cols-4 gap-4 items-end h-36 pt-4 border-t border-slate-100 text-center relative px-2">
                            {/* Garis Grid Latar Belakang */}
                            <div className="absolute inset-x-0 top-6 border-b border-dashed border-slate-200/60"></div>
                            <div className="absolute inset-x-0 top-16 border-b border-dashed border-slate-200/60"></div>

                            {/* Batang 1: Ungu */}
                            <div className="flex flex-col items-center gap-2 z-10 group cursor-pointer">
                                <span className="text-[11px] font-bold text-purple-700 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-1">7 warga</span>
                                <div className="w-full max-w-[56px] bg-gradient-to-t from-purple-700 to-purple-500 rounded-t-xl h-28 shadow-md transition-all duration-300 group-hover:from-purple-800 group-hover:to-purple-600 group-hover:scale-y-105 origin-bottom"></div>
                                <span className="text-xs font-bold text-slate-700 group-hover:text-purple-700 transition">Ungu</span>
                            </div>

                            {/* Batang 2: Merah */}
                            <div className="flex flex-col items-center gap-2 z-10 group cursor-pointer">
                                <span className="text-[11px] font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-1">3 warga</span>
                                <div className="w-full max-w-[56px] bg-gradient-to-t from-red-600 to-red-400 rounded-t-xl h-12 shadow-md transition-all duration-300 group-hover:from-red-700 group-hover:to-red-500 group-hover:scale-y-105 origin-bottom"></div>
                                <span className="text-xs font-bold text-slate-700 group-hover:text-red-700 transition">Merah</span>
                            </div>

                            {/* Batang 3: Kuning */}
                            <div className="flex flex-col items-center gap-2 z-10 group cursor-pointer">
                                <span className="text-[11px] font-bold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-1">3 warga</span>
                                <div className="w-full max-w-[56px] bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-xl h-12 shadow-md transition-all duration-300 group-hover:from-amber-600 group-hover:to-amber-400 group-hover:scale-y-105 origin-bottom"></div>
                                <span className="text-xs font-bold text-slate-700 group-hover:text-amber-600 transition">Kuning</span>
                            </div>

                            {/* Batang 4: Abu-abu */}
                            <div className="flex flex-col items-center gap-2 z-10 group cursor-pointer">
                                <span className="text-[11px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-1">2 warga</span>
                                <div className="w-full max-w-[56px] bg-gradient-to-t from-slate-500 to-slate-300 rounded-t-xl h-8 shadow-md transition-all duration-300 group-hover:from-slate-600 group-hover:to-slate-400 group-hover:scale-y-105 origin-bottom"></div>
                                <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition">Abu-abu</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Bagian Bawah: Micro-Targeting & Suara Lapangan */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Micro-Targeting per Blok */}
                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs transition hover:shadow-md hover:border-slate-300">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <span>🎯</span> Micro-Targeting per Blok <span className="text-slate-400 font-normal text-xs">— prioritas kampanye berikutnya</span>
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100 text-sm">
                            <thead>
                                <tr className="text-left text-xs font-bold text-slate-400 uppercase">
                                    <th className="py-3">BLOK</th>
                                    <th className="py-3">DUSUN</th>
                                    <th className="py-3 text-center">🟣</th>
                                    <th className="py-3 text-center">🔴</th>
                                    <th className="py-3 text-center">🟡</th>
                                    <th className="py-3 text-center">⚪</th>
                                    <th className="py-3 text-right">PRIORITAS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium text-slate-700 text-xs">
                                <tr className="transition hover:bg-slate-50">
                                    <td className="py-3.5 font-bold text-slate-900">Blok Sawah</td>
                                    <td className="py-3.5 text-slate-500">Cikondang</td>
                                    <td className="py-3.5 text-center font-bold text-purple-700">4</td>
                                    <td className="py-3.5 text-center text-slate-400">0</td>
                                    <td className="py-3.5 text-center font-bold text-amber-600">2</td>
                                    <td className="py-3.5 text-center text-slate-400">0</td>
                                    <td className="py-3.5 text-right"><span className="px-2.5 py-1 bg-amber-100 text-amber-800 font-extrabold rounded text-[10px] transition hover:bg-amber-200 shadow-2xs">TINGGI</span></td>
                                </tr>
                                <tr className="transition hover:bg-slate-50">
                                    <td className="py-3.5 font-bold text-slate-900">Blok Kebon</td>
                                    <td className="py-3.5 text-slate-500">Babakan</td>
                                    <td className="py-3.5 text-center text-slate-400">0</td>
                                    <td className="py-3.5 text-center font-bold text-red-600">2</td>
                                    <td className="py-3.5 text-center text-slate-400">0</td>
                                    <td className="py-3.5 text-center font-bold text-slate-600">2</td>
                                    <td className="py-3.5 text-right"><span className="px-2.5 py-1 bg-amber-100 text-amber-800 font-extrabold rounded text-[10px] transition hover:bg-amber-200 shadow-2xs">TINGGI</span></td>
                                </tr>
                                <tr className="transition hover:bg-slate-50">
                                    <td className="py-3.5 font-bold text-slate-900">Blok Sekolah</td>
                                    <td className="py-3.5 text-slate-500">Sukamaju</td>
                                    <td className="py-3.5 text-center font-bold text-purple-700">3</td>
                                    <td className="py-3.5 text-center font-bold text-red-600">1</td>
                                    <td className="py-3.5 text-center font-bold text-amber-600">1</td>
                                    <td className="py-3.5 text-center text-slate-400">0</td>
                                    <td className="py-3.5 text-right"><span className="px-2.5 py-1 bg-blue-100 text-blue-800 font-extrabold rounded text-[10px] transition hover:bg-blue-200 shadow-2xs">SEDANG</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Suara Lapangan Terbaru */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs transition hover:shadow-md hover:border-slate-300">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <span>💬</span> Suara Lapangan Terbaru
                        </h3>
                    </div>

                    <div className="space-y-3">
                        <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 transition hover:bg-slate-100/90 hover:border-slate-200 cursor-pointer">
                            <div className="flex justify-between items-center mb-1">
                                <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">Ungu</span>
                                <span className="text-[11px] text-slate-400">Blok Sawah</span>
                            </div>
                            <p className="text-xs font-semibold text-slate-800 italic">"Pendatang baru, sangat mendukung visi pertanian"</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">— Hendra</span>
                        </div>

                        <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 transition hover:bg-slate-100/90 hover:border-slate-200 cursor-pointer">
                            <div className="flex justify-between items-center mb-1">
                                <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">Ungu</span>
                                <span className="text-[11px] text-slate-400">Blok Sawah</span>
                            </div>
                            <p className="text-xs font-semibold text-slate-800 italic">"Tetangga dekat, sering ngobrol di warung"</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">— Asep</span>
                        </div>

                        <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 transition hover:bg-slate-100/90 hover:border-slate-200 cursor-pointer">
                            <div className="flex justify-between items-center mb-1">
                                <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">Ungu</span>
                                <span className="text-[11px] text-slate-400">Blok Sekolah</span>
                            </div>
                            <p className="text-xs font-semibold text-slate-800 italic">"Awalnya bilang dukung, tapi suami arah lain"</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">— Bu Imah</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}