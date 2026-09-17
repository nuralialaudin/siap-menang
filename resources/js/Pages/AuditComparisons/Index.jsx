import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';
import { showToast } from '@/Utils/toast';

export default function Index({ auth, audits, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isMatch, setIsMatch] = useState(filters.is_match || '');

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash && flash.message) {
            showToast('success', flash.message);
        }
    }, [flash]);

    const handleFilter = (newSearch, newMatch) => {
        router.get(
            route('audit-comparisons.index'),
            { 
                search: newSearch !== undefined ? newSearch : search, 
                is_match: newMatch !== undefined ? newMatch : isMatch 
            },
            { preserveState: true, replace: true }
        );
    };

    const handleReset = () => {
        setSearch('');
        setIsMatch('');
        router.get(route('audit-comparisons.index'));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Data Audit?',
            text: 'Catatan perbandingan audit ini akan dihapus permanen.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('audit-comparisons.destroy', id), {
                    onError: () => {
                        showToast('error', 'Gagal menghapus data audit.');
                    }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Audit & Perbandingan Sentimen</h2>}>
            <Head title="Audit Sentimen" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h3 className="text-lg font-medium text-gray-900">Riwayat Perbandingan Sentimen (Relawan vs Survey)</h3>
                        <Link href={route('audit-comparisons.create')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow transition">
                            + Tambah Audit Baru
                        </Link>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Cari Nama / NIK Pemilih</label>
                            <input 
                                type="text" 
                                placeholder="Ketik nama pemilih..." 
                                value={search}
                                onChange={e => {
                                    setSearch(e.target.value);
                                    handleFilter(e.target.value, isMatch);
                                }}
                                className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Filter Status</label>
                            <select 
                                value={isMatch}
                                onChange={e => {
                                    setIsMatch(e.target.value);
                                    handleFilter(search, e.target.value);
                                }}
                                className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Semua Status</option>
                                <option value="1">Match (Sesuai)</option>
                                <option value="0">Selisih (Tidak Sesuai)</option>
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

                    {/* Tabel Audit */}
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Pemilih</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Sentimen Relawan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Sentimen Survey</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status Match</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Auditor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Waktu Audit</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {audits.data && audits.data.length > 0 ? (
                                    audits.data.map((audit, index) => (
                                        <tr key={audit.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {(audits.current_page - 1) * audits.per_page + index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {audit.voter ? audit.voter.name : `ID: ${audit.voter_id}`}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-50 text-blue-700">
                                                    {audit.volunteer_sentiment}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                <span className="px-2 py-1 text-xs font-semibold rounded bg-purple-50 text-purple-700">
                                                    {audit.survey_sentiment}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {audit.is_match ? (
                                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Match</span>
                                                ) : (
                                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Selisih</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {audit.auditor ? audit.auditor.name : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                {audit.audited_at}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                                <Link href={route('audit-comparisons.edit', audit.id)} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded">
                                                    Edit
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(audit.id)}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500 py-8">
                                            Belum ada data audit perbandingan sentimen yang tercatat.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {audits.links && audits.links.length > 3 && (
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-gray-500">
                                Menampilkan {audits.from || 0} sampai {audits.to || 0} dari total {audits.total} data
                            </div>
                            <div className="flex space-x-1">
                                {audits.links.map((link, i) => (
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