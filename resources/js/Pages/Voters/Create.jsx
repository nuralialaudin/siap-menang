import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { showToast } from '@/Utils/toast';

export default function Create({ auth, zones }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        nik: '',
        phone: '',
        zone_id: '',
        sentiment: 'ABU-ABU',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('voters.store'), {
            onError: (errs) => {
                console.log("Gagal tambah pemilih:", errs);
                showToast('error', 'Gagal menyimpan data. Pastikan semua kolom bertanda * terisi dengan benar.');
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Tambah Data Pemilih Baru</h2>}>
            <Head title="Tambah Pemilih" />
            
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
                                placeholder="Masukkan nama lengkap pemilih..."
                                required 
                            />
                            {errors.name && <span className="text-red-600 text-sm mt-1">{errors.name}</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">NIK (Nomor Induk Kependudukan)</label>
                                <input 
                                    type="text" 
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                    value={data.nik} 
                                    onChange={e => setData('nik', e.target.value)} 
                                    placeholder="Opsional (16 digit)"
                                />
                                {errors.nik && <span className="text-red-600 text-sm mt-1">{errors.nik}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nomor Telepon / WhatsApp</label>
                                <input 
                                    type="text" 
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                    value={data.phone} 
                                    onChange={e => setData('phone', e.target.value)} 
                                    placeholder="Contoh: 081234567890"
                                />
                                {errors.phone && <span className="text-red-600 text-sm mt-1">{errors.phone}</span>}
                            </div>
                        </div>

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
                                    {zones.map((zone) => (
                                        <option key={zone.id} value={zone.id}>
                                            {zone.dusun_name} - {zone.block_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.zone_id && <span className="text-red-600 text-sm mt-1">{errors.zone_id}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sentimen Awal <span className="text-red-500">*</span></label>
                                <select 
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                    value={data.sentiment} 
                                    onChange={e => setData('sentiment', e.target.value)}
                                >
                                    <option value="ABU-ABU">ABU-ABU (Belum Menentukan)</option>
                                    <option value="HIJAU">HIJAU (Mendukung)</option>
                                    <option value="KUNING">KUNING (Ragu-ragu)</option>
                                    <option value="MERAH">MERAH (Pendukung Lawan)</option>
                                </select>
                                {errors.sentiment && <span className="text-red-600 text-sm mt-1">{errors.sentiment}</span>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-200">
                            <Link 
                                href={route('voters.index')} 
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Batal
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing} 
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Pemilih'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}