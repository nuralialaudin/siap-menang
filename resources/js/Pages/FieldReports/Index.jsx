import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';
import { showToast } from '@/Utils/toast';

export default function Index({ auth, reports, zones, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [zoneId, setZoneId] = useState(filters.zone_id || '');

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash && flash.message) {
            showToast('success', flash.message);
        }
    }, [flash]);

    const handleFilter = (newSearch, newZone) => {
        router.get(
            route('field-reports.index'),
            { 
                search: newSearch !== undefined ? newSearch : search, 
                zone_id: newZone !== undefined ? newZone : zoneId 
            },
            { preserveState: true, replace: true }
        );
    };

    const handleReset = () => {
        setSearch('');
        setZoneId('');
        router.get(route('field-reports.index'));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Laporan?',
            text: 'Data laporan lapangan ini akan dihapus permanen.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('field-reports.destroy', id), {
                    onError: () => {
                        showToast('error', 'Gagal menghapus laporan.');
                    }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Laporan Lapangan</h2>}>
            <Head title="Laporan Lapangan" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h3 className="text-lg font-medium text-gray-900">Daftar Aktivitas & Catatan Lapangan</h3>
                        <Link href={route('field-reports.create')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow transition">
                            + Buat Laporan Baru
                        </Link>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Cari Kata Kunci / Quote</label>
                            <input 
                                type="text" 
                                placeholder="Ketik kata kunci..." 
                                value={search}
                                onChange={e => {
                                    setSearch(e.target.value);
                                    handleFilter(e.target.value, zoneId);
                                }}
                                className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Filter Zona / Dusun</label>
                            <select 
                                value={zoneId}
                                onChange={e => {
                                    setZoneId(e.target.value);
                                    handleFilter(search, e.target.value);
                                }}
                                className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Semua Zona</option>
                                {zones.map(zone => (
                                    <option key={zone.id} value={zone.id}>{zone.dusun_name} - {zone.block_name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <button 
                                onClick={handleReset}
                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition"
                            >
                                Reset Filter
                            </button>
                        </div>
                    </div>

                    {/* Tabel Laporan */}
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Pelapor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Zona / Dusun</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quote / Catatan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Waktu</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reports.data && reports.data.length > 0 ? (
                                    reports.data.map((report, index) => (
                                        <tr key={report.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {(reports.current_page - 1) * reports.per_page + index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {report.user ? report.user.name : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {report.zone ? `${report.zone.dusun_name} (${report.zone.block_name})` : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700 max-w-sm">
                                                <div className="font-semibold text-gray-900 italic">"{report.quote}"</div>
                                                <div className="text-xs text-gray-500 mt-1 truncate">{report.notes}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                {report.created_at}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                                <Link href={route('field-reports.edit', report.id)} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded">
                                                    Edit
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(report.id)}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500 py-8">
                                            Belum ada laporan lapangan yang tercatat.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {reports.links && reports.links.length > 3 && (
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-gray-500">
                                Menampilkan {reports.from || 0} sampai {reports.to || 0} dari total {reports.total} data
                            </div>
                            <div className="flex space-x-1">
                                {reports.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3 py-1 text-sm border rounded ${
                                            link.active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:bg-gray-50'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}