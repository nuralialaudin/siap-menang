import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { showToast } from '@/Utils/toast';

export default function Create({ auth, voters }) {
    const { data, setData, post, processing, errors } = useForm({
        voter_id: '',
        volunteer_sentiment: 'ABU-ABU',
        survey_sentiment: 'ABU-ABU',
        is_match: 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('audit-comparisons.store'), {
            onError: () => {
                showToast('error', 'Gagal menyimpan data audit. Periksa kembali form input Anda.');
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Tambah Audit Perbandingan Baru</h2>}>
            <Head title="Tambah Audit" />
            
            <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Pilih Pemilih <span className="text-red-500">*</span></label>
                            <select 
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                value={data.voter_id} 
                                onChange={e => setData('voter_id', e.target.value)} 
                                required
                            >
                                <option value="">-- Pilih Target Pemilih --</option>
                                {voters.map(voter => (
                                    <option key={voter.id} value={voter.id}>{voter.name} (NIK: {voter.nik || '-'})</option>
                                ))}
                            </select>
                            {errors.voter_id && <span className="text-red-600 text-sm mt-1">{errors.voter_id}</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sentimen Relawan <span className="text-red-500">*</span></label>
                                <select 
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                    value={data.volunteer_sentiment} 
                                    onChange={e => setData('volunteer_sentiment', e.target.value)}
                                >
                                    <option value="ABU-ABU">ABU-ABU</option>
                                    <option value="HIJAU">HIJAU</option>
                                    <option value="KUNING">KUNING</option>
                                    <option value="MERAH">MERAH</option>
                                </select>
                                {errors.volunteer_sentiment && <span className="text-red-600 text-sm mt-1">{errors.volunteer_sentiment}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sentimen Survey <span className="text-red-500">*</span></label>
                                <select 
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                    value={data.survey_sentiment} 
                                    onChange={e => setData('survey_sentiment', e.target.value)}
                                >
                                    <option value="ABU-ABU">ABU-ABU</option>
                                    <option value="HIJAU">HIJAU</option>
                                    <option value="KUNING">KUNING</option>
                                    <option value="MERAH">MERAH</option>
                                </select>
                                {errors.survey_sentiment && <span className="text-red-600 text-sm mt-1">{errors.survey_sentiment}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status Kecocokan (Match) <span className="text-red-500">*</span></label>
                            <select 
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                value={data.is_match} 
                                onChange={e => setData('is_match', e.target.value)}
                            >
                                <option value="1">Match (Sentimen Sesuai)</option>
                                <option value="0">Selisih (Sentimen Berbeda)</option>
                            </select>
                            {errors.is_match && <span className="text-red-600 text-sm mt-1">{errors.is_match}</span>}
                        </div>

                        <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-200">
                            <Link href={route('audit-comparisons.index')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Batal
                            </Link>
                            <button type="submit" disabled={processing} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
                                {processing ? 'Menyimpan...' : 'Simpan Audit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}