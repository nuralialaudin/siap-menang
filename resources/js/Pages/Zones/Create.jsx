import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { showToast } from '@/Utils/toast';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        dusun_name: '',
        block_name: '',
        rt_rw: '',
        tps_number: '',
        priority: 'SEDANG',
        target_votes: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('zones.store'), {
            onError: () => {
                showToast('error', 'Gagal menyimpan zona. Periksa kembali form input Anda.');
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Tambah Zona Baru</h2>}>
            <Head title="Tambah Zona" />
            
            <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Dusun <span className="text-red-500">*</span></label>
                                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={data.dusun_name} onChange={e => setData('dusun_name', e.target.value)} required />
                                {errors.dusun_name && <span className="text-red-600 text-sm mt-1">{errors.dusun_name}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Blok <span className="text-red-500">*</span></label>
                                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={data.block_name} onChange={e => setData('block_name', e.target.value)} required />
                                {errors.block_name && <span className="text-red-600 text-sm mt-1">{errors.block_name}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">RT / RW</label>
                                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={data.rt_rw} onChange={e => setData('rt_rw', e.target.value)} placeholder="Contoh: 001/005" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nomor TPS</label>
                                <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={data.tps_number} onChange={e => setData('tps_number', e.target.value)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Prioritas <span className="text-red-500">*</span></label>
                                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={data.priority} onChange={e => setData('priority', e.target.value)}>
                                    <option value="TINGGI">TINGGI</option>
                                    <option value="SEDANG">SEDANG</option>
                                    <option value="RENDAH">RENDAH</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Target Suara <span className="text-red-500">*</span></label>
                                <input type="number" min="0" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={data.target_votes} onChange={e => setData('target_votes', e.target.value)} required />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-200">
                            <Link href={route('zones.index')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Batal</Link>
                            <button type="submit" disabled={processing} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">Simpan Zona</button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}