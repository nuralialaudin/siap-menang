import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk Sistem - Siap Menang" />

            {/* Header / Judul Card Modern */}
            <div className="mb-6 text-center space-y-1.5">
                <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 items-center justify-center text-white text-xl shadow-lg shadow-purple-500/25 mb-1">
                    👑
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Selamat Datang Kembali</h2>
                <p className="text-xs text-slate-500 font-medium">Masuk ke pusat kendali kampanye Pilkades Anda</p>
            </div>

            {status && (
                <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-2xl shadow-2xs">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                {/* Input Email */}
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1" />

                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            ✉️
                        </span>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-2xs"
                            autoComplete="username"
                            isFocused={true}
                            placeholder="nama@domain.com"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>

                    <InputError message={errors.email} className="mt-1.5 text-xs font-medium text-rose-600" />
                </div>

                {/* Input Password */}
                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi" className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1" />

                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            🔒
                        </span>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-2xs"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>

                    <InputError message={errors.password} className="mt-1.5 text-xs font-medium text-rose-600" />
                </div>

                {/* Remember Me & Lupa Password */}
                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer group">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded-md border-slate-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ms-2 text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition">
                            Ingat saya
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-xs font-bold text-purple-600 hover:text-purple-800 transition focus:outline-none focus:underline"
                        >
                            Lupa kata sandi?
                        </Link>
                    )}
                </div>

                {/* Tombol Login */}
                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full justify-center py-3 px-4 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-purple-600/25 transition-all transform active:scale-[0.98]" 
                        disabled={processing}
                    >
                        {processing ? 'Memproses...' : 'Masuk ke Sistem 🚀'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}