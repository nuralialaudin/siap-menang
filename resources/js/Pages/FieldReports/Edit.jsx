import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { showToast } from '@/Utils/toast';

export default function Edit({ auth, report, zones, voters }) {
    const { data, setData, put, processing, errors } = useForm({
        zone_id: report.zone_id || '',
        voter_id: report.voter_id || '',
        quote: report.quote || '',
        notes: report.notes || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('field-reports.update', report.id), {
            onError: () => {
                showToast('error', 'Gagal memperbarui laporan.');
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Edit Laporan Lapangan</h2>}>
            <Head title="Edit Laporan" />
            
            <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Zona / Dusun <span className="text-red-500">*</span></label>
                                <select 
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                    value={data.zone_id} 
                                    onChange={e => setData('zone_id', e.target.value)} 
                                    required
                                >
                                    <option value="">-- Pilih Zona / Dusun --</option>
                                    {zones.map(zone => (
                                        <option key={zone.id} value={zone.id}>{zone.dusun_name} - {zone.block_name}</option>
                                    ))}
                                </select>
                                {errors.zone_id && <span className="text-red-600 text-sm mt-1">{errors.zone_id}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Target Pemilih (Opsional)</label>
                                <select 
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                    value={data.voter_id} 
                                    onChange={e => setData('voter_id', e.target.value)}
                                >
                                    <option value="">-- Umum / Tanpa Target Pemilih Khusus --</option>
                                    {voters.map(voter => (
                                        <option key={voter.id} value={voter.id}>{voter.name} (NIK: {voter.nik || '-'})</option>
                                    ))}
                                </select>
                                {errors.voter_id && <span className="text-red-600 text-sm mt-1">{errors.voter_id}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Kutipan / Pernyataan Warga (Quote) <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                value={data.quote} 
                                onChange={e => setData('quote', e.target.value)} 
                                required 
                            />
                            {errors.quote && <span className="text-red-600 text-sm mt-1">{errors.quote}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Catatan & Aktivitas Lapangan <span className="text-red-500">*</span></label>
                            <textarea 
                                rows="4" 
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                value={data.notes} 
                                onChange={e => setData('notes', e.target.value)} 
                                required
                            ></textarea>
                            {errors.notes && <span className="text-red-600 text-sm mt-1">{errors.notes}</span>}
                        </div>

                        <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-200">
                            <Link href={route('field-reports.index')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
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