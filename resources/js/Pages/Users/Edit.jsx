import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { showToast } from '@/Utils/toast';

export default function Edit({ auth, userItem }) {
    const { data, setData, put, processing, errors } = useForm({
        name: userItem.name || '',
        email: userItem.email || '',
        password: '',
        role: userItem.role || 'relawan',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', userItem.id), {
            onError: () => {
                showToast('error', 'Gagal memperbarui pengguna.');
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Edit Akun Pengguna</h2>}>
            <Head title={`Edit User - ${userItem.name}`} />
            
            <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama Lengkap <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                value={data.name} 
                                onChange={e => setData('name', e.target.value)} 
                                required 
                            />
                            {errors.name && <span className="text-red-600 text-sm mt-1">{errors.name}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Alamat Email <span className="text-red-500">*</span></label>
                            <input 
                                type="email" 
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                value={data.email} 
                                onChange={e => setData('email', e.target.value)} 
                                required 
                            />
                            {errors.email && <span className="text-red-600 text-sm mt-1">{errors.email}</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password Baru (Opsional)</label>
                                <input 
                                    type="password" 
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                    value={data.password} 
                                    onChange={e => setData('password', e.target.value)} 
                                    placeholder="Kosongkan jika tidak diubah"
                                />
                                {errors.password && <span className="text-red-600 text-sm mt-1">{errors.password}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Role / Hak Akses <span className="text-red-500">*</span></label>
                                <select 
    className="mt-1 block w-full border-slate-300 rounded-xl shadow-xs focus:ring-blue-500 focus:border-blue-500 text-sm" 
    value={data.role} 
    onChange={e => setData('role', e.target.value)}
>
    <option value="admin">Admin</option>
    <option value="tim_utama">Tim Utama</option>
    <option value="relawan">Relawan</option>
    <option value="surveyor">Surveyor</option>
</select>
                                {errors.role && <span className="text-red-600 text-sm mt-1">{errors.role}</span>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-200">
                            <Link href={route('users.index')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Batal
                            </Link>
                            <button type="submit" disabled={processing} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
                                {processing ? 'Memperbarui...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}