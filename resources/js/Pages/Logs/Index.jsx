import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, activityLogs, sentimentLogs }) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Sistem Log & Riwayat</h2>}>
            <Head title="Sistem Logs" />
            
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                
                {/* Tabel Riwayat Sentimen Pemilih */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Riwayat Perubahan Sentimen Pemilih</h3>
                    <div className="overflow-x-auto h-64">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead className="sticky top-0 bg-gray-100">
                                <tr>
                                    <th className="p-3 border-b">Waktu</th>
                                    <th className="p-3 border-b">Pemilih</th>
                                    <th className="p-3 border-b">Dilakukan Oleh</th>
                                    <th className="p-3 border-b">Sumber</th>
                                    <th className="p-3 border-b text-center">Sentimen Baru</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sentimentLogs.map(log => (
                                    <tr key={log.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 text-gray-600">{new Date(log.created_at).toLocaleString('id-ID')}</td>
                                        <td className="p-3 font-medium">{log.voter?.name || 'Data Dihapus'}</td>
                                        <td className="p-3">{log.user?.name || 'Sistem'}</td>
                                        <td className="p-3 uppercase text-xs font-bold text-gray-500">{log.source}</td>
                                        <td className="p-3 text-center">
                                            <span className={`px-2 py-1 rounded text-white text-xs font-bold ${
                                                log.sentiment_color === 'ungu' ? 'bg-purple-600' :
                                                log.sentiment_color === 'merah' ? 'bg-red-600' :
                                                log.sentiment_color === 'kuning' ? 'bg-yellow-500' : 'bg-gray-500'
                                            }`}>
                                                {log.sentiment_color.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tabel Riwayat Aktivitas Umum */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Log Aktivitas Sistem</h3>
                    <div className="overflow-x-auto h-64">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead className="sticky top-0 bg-gray-100">
                                <tr>
                                    <th className="p-3 border-b">Waktu</th>
                                    <th className="p-3 border-b">Pengguna</th>
                                    <th className="p-3 border-b">Aksi</th>
                                    <th className="p-3 border-b">Detail</th>
                                    <th className="p-3 border-b">IP Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activityLogs.map(log => (
                                    <tr key={log.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 text-gray-600">{new Date(log.created_at).toLocaleString('id-ID')}</td>
                                        <td className="p-3 font-medium">{log.user?.name || 'Sistem'}</td>
                                        <td className="p-3 font-mono text-xs text-blue-600">{log.action}</td>
                                        <td className="p-3 text-gray-700">{log.details}</td>
                                        <td className="p-3 text-xs text-gray-500">{log.ip_address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}