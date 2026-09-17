import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';
import { showToast } from '@/Utils/toast';

export default function Index({ auth, zones, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [priority, setPriority] = useState(filters.priority || '');

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash && flash.message) {
            showToast('success', flash.message);
        }
    }, [flash]);

    const handleFilter = (newSearch, newPriority) => {
        router.get(
            route('zones.index'),
            { 
                search: newSearch !== undefined ? newSearch : search, 
                priority: newPriority !== undefined ? newPriority : priority 
            },
            { preserveState: true, replace: true }
        );
    };

    const handleReset = () => {
        setSearch('');
        setPriority('');
        router.get(route('zones.index'));
    };

    const handleDelete = (id, name) => {
        Swal.fire({
            title: 'Hapus Data Zona?',
            text: `Zona "${name}" akan dihapus permanen dari sistem.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('zones.destroy', id), {
                    onError: () => {
                        showToast('error', 'Gagal menghapus data zona.');
                    }
                });
            }
        });
    };

    const getPriorityBadge = (pri) => {
        switch (pri) {
            case 'TINGGI':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Tinggi</span>;
            case 'SEDANG':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Sedang</span>;
            case 'RENDAH':
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Rendah</span>;
            default:
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">-</span>;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Master Data Zona</h2>}>
            <Head title="Master Zona" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h3 className="text-lg font-medium text-gray-900">Daftar Wilayah / Zona & Target Suara</h3>
                        <Link href={route('zones.create')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow transition">
                            + Tambah Zona Baru
                        </Link>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Cari Dusun / Blok</label>
                            <input 
                                type="text" 
                                placeholder="Ketik nama dusun atau blok..." 
                                value={search}
                                onChange={e => {
                                    setSearch(e.target.value);
                                    handleFilter(e.target.value, priority);
                                }}
                                className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Filter Prioritas</label>
                            <select 
                                value={priority}
                                onChange={e => {
                                    setPriority(e.target.value);
                                    handleFilter(search, e.target.value);
                                }}
                                className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Semua Prioritas</option>
                                <option value="TINGGI">Tinggi</option>
                                <option value="SEDANG">Sedang</option>
                                <option value="RENDAH">Rendah</option>
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

                    {/* Tabel Data Zona */}
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Dusun & Blok</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">RT / RW</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">No. TPS</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Prioritas</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Target Suara</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {zones.data && zones.data.length > 0 ? (
                                    zones.data.map((zone, index) => (
                                        <tr key={zone.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {(zones.current_page - 1) * zones.per_page + index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{zone.dusun_name}</div>
                                                <div className="text-xs text-gray-500">Blok: {zone.block_name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{zone.rt_rw || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">TPS {zone.tps_number || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{getPriorityBadge(zone.priority)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{zone.target_votes} Suara</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                                <Link href={route('zones.edit', zone.id)} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded">
                                                    Edit
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(zone.id, zone.dusun_name)}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500 py-8">
                                            Tidak ada data zona yang ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {zones.links && zones.links.length > 3 && (
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-gray-500">
                                Menampilkan {zones.from || 0} sampai {zones.to || 0} dari total {zones.total} data
                            </div>
                            <div className="flex space-x-1">
                                {zones.links.map((link, i) => (
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