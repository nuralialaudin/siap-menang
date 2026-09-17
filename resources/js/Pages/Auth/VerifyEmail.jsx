import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Email - Siap Menang" />

            {/* Header / Judul Card Modern */}
            <div className="mb-6 text-center space-y-1.5">
                <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 items-center justify-center text-white text-xl shadow-lg shadow-purple-500/25 mb-1">
                    ✉️
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Verifikasi Email Anda</h2>
                <p className="text-xs text-slate-500 font-medium">Langkah terakhir sebelum mengakses sistem</p>
            </div>

            <div className="mb-6 text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-4 rounded-2xl border border-slate-200/60">
                Terima kasih telah mendaftar! Sebelum mulai, mohon verifikasi alamat email Anda dengan mengeklik tautan yang baru saja kami kirimkan. Jika Anda tidak menerima email tersebut, dengan senang hati kami akan mengirimkannya kembali.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-2xl shadow-2xs">
                    Tautan verifikasi baru telah dikirimkan ke alamat email yang Anda berikan saat pendaftaran.
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div className="flex items-center justify-between pt-2">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-xs font-bold text-rose-600 hover:text-rose-800 transition focus:outline-none underline"
                    >
                        Keluar Sistem (Log Out)
                    </Link>

                    <PrimaryButton 
                        className="py-3 px-5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-purple-600/25 transition-all transform active:scale-[0.98]" 
                        disabled={processing}
                    >
                        {processing ? 'Mengirim...' : 'Kirim Ulang Email 🚀'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}