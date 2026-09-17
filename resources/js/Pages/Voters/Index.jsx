import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';
import { showToast } from '@/Utils/toast'; // Impor helper toast

export default function Index({ auth, voters, zones, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [zoneId, setZoneId] = useState(filters.zone_id || '');
    const [sentiment, setSentiment] = useState(filters.sentiment || '');

    const { flash } = usePage().props;

    // Tampilkan Toast otomatis jika ada flash message sukses
    useEffect(() => {
        if (flash && flash.message) {
            showToast('success', flash.message);
        }
    }, [flash]);

    const handleFilter = (newSearch, newZone, newSentiment) => {
        router.get(
            route('voters.index'),
            { 
                search: newSearch !== undefined ? newSearch : search, 
                zone_id: newZone !== undefined ? newZone : zoneId, 
                sentiment: newSentiment !== undefined ? newSentiment : sentiment 
            },
            { preserveState: true, replace: true }
        );
    };

    const handleReset = () => {
        setSearch('');
        setZoneId('');
        setSentiment('');
        router.get(route('voters.index'));
    };

    const handleDelete = (id, name) => {
        Swal.fire({
            title: 'Hapus Data Pemilih?',
            text: `Data pemilih "${name}" akan dihapus permanen.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('voters.destroy', id), {
                    onError: () => {
                        showToast('error', 'Gagal menghapus data.');
                    }
                });
            }
        });
    };

    const getSentimentBadge = (sent) => {
        switch (sent) {
            case 'HIJAU':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Hijau (Mendukung)</span>;
            case 'KUNING':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Kuning (Ragu-ragu)</span>;
            case 'MERAH':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Merah (Lawan)</span>;
            default:
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Abu-abu (Netral)</span>;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Manajemen Data Pemilih</h2>}>
            <Head title="Data Pemilih" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h3 className="text-lg font-medium text-gray-900">Daftar Seluruh Pemilih</h3>
                        <Link href={route('voters.create')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow transition">
                            + Tambah Pemilih Baru
                        </Link>
                    </div>

                    {/* Filter Section */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Cari Nama / NIK</label>
                            <input 
                                type="text" 
                                placeholder="Ketik nama atau NIK..." 
                                value={search}
                                onChange={e => {
                                    setSearch(e.target.value);
                                    handleFilter(e.target.value, zoneId, sentiment);
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
                                    handleFilter(search, e.target.value, sentiment);
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
                            <label className="block text-xs font-medium text-gray-600 mb-1">Filter Sentimen</label>
                            <select 
                                value={sentiment}
                                onChange={e => {
                                    setSentiment(e.target.value);
                                    handleFilter(search, zoneId, e.target.value);
                                }}
                                className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Semua Sentimen</option>
                                <option value="HIJAU">Hijau (Mendukung)</option>
                                <option value="KUNING">Kuning (Ragu-ragu)</option>
                                <option value="MERAH">Merah (Lawan)</option>
                                <option value="ABU-ABU">Abu-abu (Netral)</option>
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

                    {/* Table Section */}
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nama & NIK</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Zona / Dusun</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Kontak (HP)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Sentimen</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {voters.data && voters.data.length > 0 ? (
                                    voters.data.map((voter, index) => (
                                        <tr key={voter.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {(voters.current_page - 1) * voters.per_page + index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{voter.name}</div>
                                                <div className="text-xs text-gray-500">NIK: {voter.nik || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {voter.zone ? `${voter.zone.dusun_name} (${voter.zone.block_name})` : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {voter.phone || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {getSentimentBadge(voter.sentiment)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                                <Link href={route('voters.edit', voter.id)} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded">
                                                    Edit
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(voter.id, voter.name)}
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
                                            Tidak ada data pemilih yang ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {voters.links && voters.links.length > 3 && (
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-gray-500">
                                Menampilkan {voters.from || 0} sampai {voters.to || 0} dari total {voters.total} data
                            </div>
                            <div className="flex space-x-1">
                                {voters.links.map((link, i) => (
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