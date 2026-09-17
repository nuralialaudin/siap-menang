import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth, zones }) {
    const { data, setData, post, processing, errors } = useForm({
        zone_id: '',
        title: '',
        description: '',
        activity_date: '',
        status: 'planned',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('campaign-activities.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Tambah Aktivitas Kampanye</h2>}>
            <Head title="Tambah Aktivitas" />
            
            <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Judul Kegiatan <span className="text-red-500">*</span></label>
                            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={data.title} onChange={e => setData('title', e.target.value)} required />
                            {errors.title && <span className="text-red-600 text-sm mt-1">{errors.title}</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Zona Lokasi <span className="text-red-500">*</span></label>
                                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={data.zone_id} onChange={e => setData('zone_id', e.target.value)} required>
                                    <option value="">-- Pilih Zona --</option>
                                    {zones.map(zone => (
                                        <option key={zone.id} value={zone.id}>
                                            {zone.dusun_name} - {zone.block_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.zone_id && <span className="text-red-600 text-sm mt-1">{errors.zone_id}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tanggal Pelaksanaan <span className="text-red-500">*</span></label>
                                <input type="date" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={data.activity_date} onChange={e => setData('activity_date', e.target.value)} required />
                                {errors.activity_date && <span className="text-red-600 text-sm mt-1">{errors.activity_date}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status <span className="text-red-500">*</span></label>
                            <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={data.status} onChange={e => setData('status', e.target.value)} required>
                                <option value="planned">Direncanakan (Planned)</option>
                                <option value="on_going">Sedang Berjalan (On Going)</option>
                                <option value="completed">Selesai (Completed)</option>
                            </select>
                            {errors.status && <span className="text-red-600 text-sm mt-1">{errors.status}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Deskripsi / Detail Kegiatan</label>
                            <textarea rows="4" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={data.description} onChange={e => setData('description', e.target.value)}></textarea>
                            {errors.description && <span className="text-red-600 text-sm mt-1">{errors.description}</span>}
                        </div>

                        <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-200">
                            <Link href={route('campaign-activities.index')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Batal</Link>
                            <button type="submit" disabled={processing} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                                {processing ? 'Menyimpan...' : 'Simpan Aktivitas'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}