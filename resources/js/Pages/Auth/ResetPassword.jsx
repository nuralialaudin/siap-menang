import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Kata Sandi - Siap Menang" />

            {/* Header / Judul Card Modern */}
            <div className="mb-6 text-center space-y-1.5">
                <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 items-center justify-center text-white text-xl shadow-lg shadow-purple-500/25 mb-1">
                    🔑
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Atur Kata Sandi Baru</h2>
                <p className="text-xs text-slate-500 font-medium">Silakan masukkan kata sandi baru akun Anda</p>
            </div>

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
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>

                    <InputError message={errors.email} className="mt-1.5 text-xs font-medium text-rose-600" />
                </div>

                {/* Input Password Baru */}
                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi Baru" className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1" />

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
                            autoComplete="new-password"
                            isFocused={true}
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>

                    <InputError message={errors.password} className="mt-1.5 text-xs font-medium text-rose-600" />
                </div>

                {/* Input Konfirmasi Password Baru */}
                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi Baru"
                        className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
                    />

                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            🔐
                        </span>
                        <TextInput
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-2xs"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />
                    </div>

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1.5 text-xs font-medium text-rose-600"
                    />
                </div>

                {/* Tombol Aksi */}
                <div className="pt-3 flex items-center justify-end">
                    <PrimaryButton 
                        className="w-full justify-center py-3 px-4 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-purple-600/25 transition-all transform active:scale-[0.98]" 
                        disabled={processing}
                    >
                        {processing ? 'Memproses...' : 'Reset Kata Sandi 🚀'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}