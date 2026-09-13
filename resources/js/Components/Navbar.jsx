import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';

export default function Navbar({ cartCount, onOpenLogin, onOpenCart }) {
    // Mengambil data user yang sedang login dari Inertia shared props
    const { auth } = usePage().props;
    const user = auth?.user;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-amber-100 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* LOGO */}
                    <a href="#home" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                            <i className="fa-solid fa-cookie-bite"></i>
                        </div>
                        <div>
                            <span className="text-xl font-bold text-stone-900 block leading-none">Riandy Cookies</span>
                            <span className="text-[10px] text-amber-700 font-semibold tracking-wider uppercase">Homemade With Love</span>
                        </div>
                    </a>

                    {/* MENU NAVIGASI */}
                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-700">
                        <a href="#home" className="hover:text-amber-800 transition">Beranda</a>
                        <a href="#katalog" className="hover:text-amber-800 transition">Katalog Kue</a>
                        <a href="#cara-order" className="hover:text-amber-800 transition">Cara Pesan</a>
                        <a href="#tentang" className="hover:text-amber-800 transition">Tentang Kami</a>
                        <a href="#kontak" className="hover:text-amber-800 transition">Kontak</a>
                    </div>

                    {/* AKSI (LOGIN / PROFIL & KERANJANG) */}
                    <div className="flex items-center space-x-3">

                        {/* JIKA SUDAH LOGIN */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-2 bg-amber-100/70 hover:bg-amber-200/70 text-amber-900 px-3.5 py-2 rounded-full transition text-xs font-bold shadow-xs cursor-pointer"
                                >
                                    <div className="w-6 h-6 bg-amber-700 text-white rounded-full flex items-center justify-center text-xs">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                    <span>{user.name}</span>
                                    <i className="fa-solid fa-chevron-down text-[10px] ml-1"></i>
                                </button>

                                {/* DROPDOWN PROFIL */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 z-50">
                                        <div className="px-4 py-2 border-b border-stone-100">
                                            <p className="text-xs font-bold text-stone-900 truncate">{user.name}</p>
                                            <p className="text-[10px] text-stone-500 truncate">{user.email}</p>
                                        </div>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full text-left px-4 py-2 text-xs text-red-600 font-bold hover:bg-red-50 transition flex items-center gap-2 cursor-pointer"
                                        >
                                            <i className="fa-solid fa-right-from-bracket"></i> Keluar
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* JIKA BELUM LOGIN */
                            <button
                                onClick={onOpenLogin}
                                className="bg-amber-100/80 hover:bg-amber-200 text-amber-900 px-4 py-2 rounded-full transition text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                            >
                                <i className="fa-solid fa-user"></i> Masuk
                            </button>
                        )}

                        {/* TOMBOL KERANJANG */}
                        <button
                            onClick={onOpenCart}
                            className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-full transition text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
                        >
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span>Keranjang</span>
                            <span className="bg-white text-amber-800 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">
                                {cartCount}
                            </span>
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
}
