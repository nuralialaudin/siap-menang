import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';
import { showToast } from '@/Utils/toast';

export default function Index({ auth, users, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash && flash.message) {
            showToast('success', flash.message);
        }
        if (flash && flash.error) {
            showToast('error', flash.error);
        }
    }, [flash]);

    const handleFilter = (newSearch, newRole) => {
        router.get(
            route('users.index'),
            { 
                search: newSearch !== undefined ? newSearch : search, 
                role: newRole !== undefined ? newRole : role 
            },
            { preserveState: true, replace: true }
        );
    };

    const handleReset = () => {
        setSearch('');
        setRole('');
        router.get(route('users.index'));
    };

    const handleDelete = (id, name) => {
        Swal.fire({
            title: 'Hapus Pengguna?',
            text: `Akun "${name}" akan dihapus permanen dari sistem.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('users.destroy', id), {
                    onError: () => {
                        showToast('error', 'Gagal menghapus pengguna.');
                    }
                });
            }
        });
    };

    const getRoleBadge = (r) => {
        switch (r) {
            case 'admin':
                return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">Admin</span>;
            case 'tim_utama':
                return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Tim Utama</span>;
            case 'relawan':
                return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Relawan</span>;
            case 'surveyor':
                return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Surveyor</span>;
            default:
                return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{r}</span>;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Manajemen Pengguna Sistem</h2>}>
            <Head title="Manajemen User" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h3 className="text-lg font-medium text-gray-900">Daftar Akun Pengguna</h3>
                        <Link href={route('users.create')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow transition">
                            + Tambah Pengguna Baru
                        </Link>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Cari Nama / Email</label>
                            <input 
                                type="text" 
                                placeholder="Ketik nama atau email..." 
                                value={search}
                                onChange={e => {
                                    setSearch(e.target.value);
                                    handleFilter(e.target.value, role);
                                }}
                                className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Filter Role</label>
                            <select 
                                value={role}
                                onChange={e => {
                                    setRole(e.target.value);
                                    handleFilter(search, e.target.value);
                                }}
                                className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Semua Role</option>
                                <option value="admin">Admin</option>
                                <option value="tim_utama">Tim Utama</option>
                                <option value="relawan">Relawan</option>
                                <option value="surveyor">Surveyor</option>
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

                    {/* Tabel User */}
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nama & Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Role / Hak Akses</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Terdaftar</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.data && users.data.length > 0 ? (
                                    users.data.map((u, index) => (
                                        <tr key={u.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {(users.current_page - 1) * users.per_page + index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{u.name}</div>
                                                <div className="text-xs text-gray-500">{u.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {getRoleBadge(u.role)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                {u.created_at}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                                <Link href={route('users.edit', u.id)} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded">
                                                    Edit
                                                </Link>
                                                {u.id !== auth.user.id && (
                                                    <button 
                                                        onClick={() => handleDelete(u.id, u.name)}
                                                        className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded"
                                                    >
                                                        Hapus
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 py-8">
                                            Tidak ada data pengguna yang ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users.links && users.links.length > 3 && (
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-gray-500">
                                Menampilkan {users.from || 0} sampai {users.to || 0} dari total {users.total} data
                            </div>
                            <div className="flex space-x-1">
                                {users.links.map((link, i) => (
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