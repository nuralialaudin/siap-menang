import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, activities }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus jadwal aktivitas ini?')) {
            router.delete(route('campaign-activities.destroy', id));
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'planned': return 'bg-gray-500';
            case 'on_going': return 'bg-blue-600';
            case 'completed': return 'bg-green-600';
            default: return 'bg-gray-500';
        }
    };

    const getStatusText = (status) => {
        switch(status) {
            case 'planned': return 'Direncanakan';
            case 'on_going': return 'Sedang Berjalan';
            case 'completed': return 'Selesai';
            default: return status;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Aktivitas Kampanye</h2>}>
            <Head title="Aktivitas Kampanye" />
            
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                {flash?.message && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                        {flash.message}
                    </div>
                )}

                <div className="flex justify-end mb-4">
                    <Link href={route('campaign-activities.create')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow">
                        + Buat Aktivitas Baru
                    </Link>
                </div>

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b-2 border-gray-200">
                                    <th className="p-4 text-gray-700 font-semibold">Tanggal</th>
                                    <th className="p-4 text-gray-700 font-semibold">Judul Kegiatan</th>
                                    <th className="p-4 text-gray-700 font-semibold">Zona Lokasi</th>
                                    <th className="p-4 text-gray-700 font-semibold text-center">Status</th>
                                    <th className="p-4 text-gray-700 font-semibold text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities.data.map(activity => (
                                    <tr key={activity.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 text-gray-900 font-medium">{activity.activity_date}</td>
                                        <td className="p-4">
                                            <div className="font-bold text-gray-900">{activity.title}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">{activity.description || '-'}</div>
                                        </td>
                                        <td className="p-4 text-gray-700">
                                            {activity.zone ? `${activity.zone.dusun_name} - ${activity.zone.block_name}` : '-'}
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full text-white ${getStatusColor(activity.status)}`}>
                                                {getStatusText(activity.status)}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center space-x-3">
                                            <Link href={route('campaign-activities.edit', activity.id)} className="text-indigo-600 hover:text-indigo-900 font-medium">Edit</Link>
                                            <button onClick={() => handleDelete(activity.id)} className="text-red-600 hover:text-red-900 font-medium">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                                {activities.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="p-6 text-center text-gray-500">
                                            Belum ada aktivitas kampanye yang dijadwalkan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}