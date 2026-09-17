import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth.user;

    // Form untuk Update Profil (Nama & Email)
    const profileForm = useForm({
        name: user.name || '',
        email: user.email || '',
    });

    // Form untuk Update Password
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Pengaturan Profil & Keamanan" />

            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Pengaturan Profil & Keamanan</h1>
                    <p className="text-xs text-slate-500 mt-1">Kelola informasi akun Anda dan perbarui kata sandi secara berkala.</p>
                </div>

                {/* Bagian 1: Update Informasi Profil */}
                <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs">
                    <h2 className="text-base font-bold text-slate-900 mb-1">Informasi Profil</h2>
                    <p className="text-xs text-slate-500 mb-6">Perbarui nama dan alamat email akun Anda.</p>

                    <form onSubmit={submitProfile} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Nama Lengkap</label>
                            <input
                                type="text"
                                className="w-full border-slate-300 rounded-xl text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={profileForm.data.name}
                                onChange={(e) => profileForm.setData('name', e.target.value)}
                                required
                            />
                            {profileForm.errors.name && <div className="text-rose-600 text-xs mt-1">{profileForm.errors.name}</div>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Alamat Email</label>
                            <input
                                type="email"
                                className="w-full border-slate-300 rounded-xl text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={profileForm.data.email}
                                onChange={(e) => profileForm.setData('email', e.target.value)}
                                required
                            />
                            {profileForm.errors.email && <div className="text-rose-600 text-xs mt-1">{profileForm.errors.email}</div>}
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={profileForm.processing}
                                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
                            >
                                Simpan Profil
                            </button>

                            {profileForm.recentlySuccessful && (
                                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                                    ✓ Profil berhasil diperbarui!
                                </span>
                            )}
                        </div>
                    </form>
                </div>

                {/* Bagian 2: Update / Ubah Password */}
                <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs">
                    <h2 className="text-base font-bold text-slate-900 mb-1">Perbarui Kata Sandi</h2>
                    <p className="text-xs text-slate-500 mb-6">Pastikan akun Anda menggunakan kata sandi yang panjang dan acak agar tetap aman.</p>

                    <form onSubmit={submitPassword} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Kata Sandi Saat Ini</label>
                            <input
                                type="password"
                                className="w-full border-slate-300 rounded-xl text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={passwordForm.data.current_password}
                                onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                required
                            />
                            {passwordForm.errors.current_password && <div className="text-rose-600 text-xs mt-1">{passwordForm.errors.current_password}</div>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Kata Sandi Baru</label>
                            <input
                                type="password"
                                className="w-full border-slate-300 rounded-xl text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={passwordForm.data.password}
                                onChange={(e) => passwordForm.setData('password', e.target.value)}
                                required
                            />
                            {passwordForm.errors.password && <div className="text-rose-600 text-xs mt-1">{passwordForm.errors.password}</div>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Konfirmasi Kata Sandi Baru</label>
                            <input
                                type="password"
                                className="w-full border-slate-300 rounded-xl text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                required
                            />
                            {passwordForm.errors.password_confirmation && <div className="text-rose-600 text-xs mt-1">{passwordForm.errors.password_confirmation}</div>}
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={passwordForm.processing}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                            >
                                Perbarui Kata Sandi
                            </button>

                            {passwordForm.recentlySuccessful && (
                                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                                    ✓ Kata sandi berhasil diubah!
                                </span>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}