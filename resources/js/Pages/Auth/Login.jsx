import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="bg-stone-100 min-h-screen flex items-center justify-center p-4 font-sans">
            <Head title="Login Admin - Riandy Cookies" />

            <div className="bg-white p-8 rounded-3xl border border-amber-100 shadow-md w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-stone-900">Login Admin</h1>
                    <p className="text-xs text-stone-500 mt-1">Masuk untuk mengelola stok kue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full p-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-600"
                            placeholder="admin@riandycookies.com"
                            required
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs mt-1 block font-semibold">{errors.email}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full p-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-600"
                            placeholder="••••••••"
                            required
                        />
                        {errors.password && (
                            <span className="text-red-500 text-xs mt-1 block font-semibold">{errors.password}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-xl text-sm transition shadow-sm mt-2 cursor-pointer"
                    >
                        {processing ? 'Memproses...' : 'Masuk ke Panel Admin'}
                    </button>
                </form>
            </div>
        </div>
    );
}
