import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';

export default function AdminCookies({ cookies = [], auth = {} }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('ALL');
    const [toastMessage, setToastMessage] = useState('');
    const [loadingId, setLoadingId] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // State Modal Tambah Produk
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCookie, setNewCookie] = useState({
        name: '',
        badge: '',
        price_300ml: 35000,
        price_800ml: 90000,
        stock_300ml: 10,
        stock_800ml: 10,
        image_url: 'images/placeholder.jpg',
        image: null
    });

    // State Modal Edit Produk
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCookie, setEditingCookie] = useState(null);

    // State Modal Konfirmasi Hapus Custom
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });

    // Show Toast Notification
    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    // Reset ke Halaman 1 Otomatis Saat Filter / Search Berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedTag]);

    // Logout Handler
    const handleLogout = () => {
        router.post('/logout');
    };

    // Handler Submit Tambah Produk Baru
    const handleAddProductSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', newCookie.name);
        formData.append('price_300ml', newCookie.price_300ml);
        formData.append('price_800ml', newCookie.price_800ml);
        formData.append('stock_300ml', newCookie.stock_300ml);
        formData.append('stock_800ml', newCookie.stock_800ml);
        formData.append('badge', newCookie.badge || '');
        formData.append('image_url', newCookie.image_url || '');
        if (newCookie.image) {
            formData.append('image', newCookie.image);
        }

        router.post('/admin/cookies', formData, {
            preserveScroll: true,
            onSuccess: () => {
                setIsAddModalOpen(false);
                setNewCookie({
                    name: '', badge: '', price_300ml: 35000, price_800ml: 90000,
                    stock_300ml: 10, stock_800ml: 10, image_url: 'images/placeholder.jpg', image: null
                });
                showToast('Produk kue baru berhasil ditambahkan!');
            }
        });
    };

    // Handler Submit Edit Produk
    const handleEditProductSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', editingCookie.name);
        formData.append('price_300ml', editingCookie.price_300ml);
        formData.append('price_800ml', editingCookie.price_800ml);
        formData.append('badge', editingCookie.badge || '');
        if (editingCookie.image_url) formData.append('image_url', editingCookie.image_url);
        if (editingCookie.image) formData.append('image', editingCookie.image);

        router.post(`/admin/cookies/${editingCookie.id}`, formData, {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditModalOpen(false);
                setEditingCookie(null);
                showToast('Data produk berhasil diperbarui!');
            }
        });
    };

    // Buka Modal Edit
    const openEditModal = (cookie) => {
        setEditingCookie({ ...cookie, image: null });
        setIsEditModalOpen(true);
    };

    // Update Data Stok Per Item
    const updateCookieData = (id, data) => {
        setLoadingId(id);
        router.post(`/admin/cookies/${id}/stock`, data, {
            preserveScroll: true,
            onSuccess: () => {
                setLoadingId(null);
                showToast('Stok berhasil diperbarui otomatis!');
            },
            onError: () => setLoadingId(null)
        });
    };

    // Global Toggle: Set Semua Stok Ke 0 (Toko Libur) - 1 Request Batch
    const handleGlobalPause = () => {
        if (confirm('Apakah Anda yakin ingin men-set semua stok kue menjadi 0 (Toko Libur)?')) {
            router.post('/admin/cookies/bulk-stock', {
                stock_300ml: 0,
                stock_800ml: 0,
                is_available: false
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    showToast('Toko diset Libur. Semua stok menjadi 0.');
                }
            });
        }
    };

    // Global Toggle: Buka Toko (Isi Stok Standar 10 Toples) - 1 Request Batch
    const handleGlobalResume = () => {
        if (confirm('Apakah Anda yakin ingin mengembalikan stok standar (10 toples) untuk semua kue?')) {
            router.post('/admin/cookies/bulk-stock', {
                stock_300ml: 10,
                stock_800ml: 10,
                is_available: true
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    showToast('Toko Kembali Buka! Stok diisi standar.');
                }
            });
        }
    };

    // Buka Modal Konfirmasi Hapus
    const confirmDelete = (id, name) => {
        setDeleteModal({ isOpen: true, id, name });
    };

    // Eksekusi Hapus Produk
    const executeDelete = () => {
        if (!deleteModal.id) return;
        router.delete(`/admin/cookies/${deleteModal.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteModal({ isOpen: false, id: null, name: '' });
                showToast(`Kue "${deleteModal.name}" berhasil dihapus.`);
            }
        });
    };

    // Filter Cookies
    const filteredCookies = (cookies || []).filter(cookie => {
        const matchesSearch = (cookie.name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = selectedTag === 'ALL' || cookie.badge === selectedTag;
        return matchesSearch && matchesTag;
    });

    // Pagination Logic
    const totalItems = filteredCookies.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCookies = filteredCookies.slice(startIndex, startIndex + itemsPerPage);

    // Ambil daftar unique badges untuk filter
    const uniqueBadges = ['ALL', ...new Set((cookies || []).map(c => c.badge).filter(b => b && b.trim() !== ''))];

    // Mengambil Nama Admin Aktif
    const adminName = auth?.user?.name || 'Admin';

    return (
        <div className="bg-stone-100 min-h-screen p-6 font-sans relative">
            <Head title="Admin - Kelola Stok Riandy Cookies" />

            {/* TOAST NOTIFICATION */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 bg-stone-900 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 z-50 animate-bounce border border-stone-700">
                    <i className="fa-solid fa-circle-check text-emerald-400 text-base"></i>
                    <span className="font-medium">{toastMessage}</span>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                {/* HEADER NAV */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-stone-900">Panel Stok Admin</h1>
                        <p className="text-xs text-stone-500">Atur jumlah stok, saklar ON/OFF ketersediaan, serta kelola produk</p>
                    </div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <a
                            href="/admin/orders"
                            className="bg-indigo-700 hover:bg-indigo-800 text-white text-xs px-3.5 py-2.5 rounded-xl font-bold shadow-sm transition flex items-center gap-1.5"
                        >
                            <i className="fa-solid fa-receipt"></i> Rekap Pendapatan
                        </a>

                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-3.5 py-2.5 rounded-xl font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                        >
                            <i className="fa-solid fa-plus"></i> Tambah Produk
                        </button>

                        <button
                            onClick={handleGlobalPause}
                            className="bg-stone-800 hover:bg-stone-900 text-amber-400 text-xs px-3 py-2.5 rounded-xl font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                            title="Set Semua Stok ke 0"
                        >
                            <i className="fa-solid fa-store-slash"></i> Toko Libur
                        </button>

                        <button
                            onClick={handleGlobalResume}
                            className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300 text-xs px-3 py-2.5 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer"
                            title="Kembalikan Stok Standar (10 Toples)"
                        >
                            <i className="fa-solid fa-store"></i> Buka Toko
                        </button>

                        <a href="/" target="_blank" rel="noreferrer" className="bg-amber-700 hover:bg-amber-800 text-white text-xs px-3.5 py-2.5 rounded-xl font-bold shadow-sm transition">
                            Lihat Web <i className="fa-solid fa-arrow-up-right-from-square ml-1"></i>
                        </a>

                        {/* FITUR PROFILE & LOGOUT */}
                        <div className="flex items-center gap-2 border-l border-stone-300 pl-2 ml-1">
                            <div className="text-right hidden sm:block">
                                <span className="block text-xs font-bold text-stone-800">{adminName}</span>
                                <span className="block text-[10px] text-stone-400 font-semibold uppercase">Administrator</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs px-3 py-2.5 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer"
                                title="Keluar dari Admin"
                            >
                                <i className="fa-solid fa-right-from-bracket"></i> Keluar
                            </button>
                        </div>
                    </div>
                </div>

                {/* CARD STATISTIK RINGKAS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Total Varian</span>
                        <span className="text-xl font-bold text-stone-800">{cookies.length} Jenis</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Total Stok 300ml</span>
                        <span className="text-xl font-bold text-emerald-600">
                            {cookies.reduce((acc, c) => acc + (parseInt(c.stock_300ml) || 0), 0)} Toples
                        </span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Total Stok 800ml</span>
                        <span className="text-xl font-bold text-emerald-600">
                            {cookies.reduce((acc, c) => acc + (parseInt(c.stock_800ml) || 0), 0)} Toples
                        </span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Stok Habis</span>
                        <span className="text-xl font-bold text-red-500">
                            {cookies.filter(c => c.stock_300ml === 0 && c.stock_800ml === 0).length} Varian
                        </span>
                    </div>
                </div>

                {/* SEARCH & FILTER BAR */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Cari nama kue..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-xs border border-stone-300 rounded-xl focus:outline-amber-600 bg-stone-50"
                        />
                        <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-stone-400 text-xs"></i>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                        <span className="text-xs font-bold text-stone-500 whitespace-nowrap">Badge:</span>
                        {uniqueBadges.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`text-xs px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition cursor-pointer ${
                                    selectedTag === tag ? 'bg-amber-700 text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* TABEL PRODUK */}
                <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden flex flex-col">
                    <div className="max-h-[calc(100vh-320px)] overflow-y-auto">
                        <table className="w-full text-left text-sm text-stone-700 border-collapse">
                            <thead className="sticky top-0 bg-amber-100/90 backdrop-blur-md uppercase text-xs font-bold text-stone-800 border-b border-stone-200 z-10">
                                <tr>
                                    <th className="p-4 text-center w-16">Gambar</th>
                                    <th className="p-4">Produk</th>
                                    <th className="p-4">Badge</th>
                                    <th className="p-4 text-center">Stok 300 ML</th>
                                    <th className="p-4 text-center">Stok 800 ML</th>
                                    <th className="p-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {paginatedCookies.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-stone-400 text-xs">
                                            Tidak ada kue yang ditemukan.
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedCookies.map((cookie) => {
                                        const is300On = (cookie.stock_300ml > 0) && (cookie.is_available ?? true);
                                        const is800On = (cookie.stock_800ml > 0) && (cookie.is_available ?? true);

                                        return (
                                            <tr key={cookie.id} className="hover:bg-amber-50/30 transition">
                                                <td className="p-4 text-center">
                                                    <img
                                                        src={cookie.image_url ? (cookie.image_url.startsWith('http') ? cookie.image_url : `/${cookie.image_url}`) : '/images/placeholder.jpg'}
                                                        alt={cookie.name}
                                                        className="w-12 h-12 object-cover rounded-xl border border-stone-200 shadow-sm mx-auto"
                                                        onError={(e) => { e.target.src = 'https://placehold.co/100?text=No+Img'; }}
                                                    />
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-bold text-stone-900 text-base">{cookie.name}</div>
                                                    <div className="text-xs font-semibold text-stone-600 mt-0.5">
                                                        Rp {cookie.price_300ml?.toLocaleString()} <span className="text-stone-400">/</span> Rp {cookie.price_800ml?.toLocaleString()}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    {cookie.badge ? (
                                                        <span className="px-2.5 py-1 text-xs font-semibold text-amber-900 bg-amber-100 rounded-full border border-amber-200 inline-block whitespace-nowrap">
                                                            {cookie.badge}
                                                        </span>
                                                    ) : <span className="text-stone-400 text-xs">-</span>}
                                                </td>

                                                {/* STOK 300 ML */}
                                                <td className="p-4 text-center">
                                                    <div className="inline-flex flex-col items-center gap-1.5">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            defaultValue={cookie.stock_300ml}
                                                            onBlur={(e) => {
                                                                const val = Math.max(0, parseInt(e.target.value) || 0);
                                                                e.target.value = val;
                                                                updateCookieData(cookie.id, { stock_300ml: val, stock_800ml: cookie.stock_800ml, is_available: true });
                                                            }}
                                                            className={`w-20 p-1.5 border rounded-xl text-center font-bold text-sm focus:outline-amber-600 ${
                                                                cookie.stock_300ml === 0
                                                                    ? 'bg-red-100 border-red-300 text-red-600 font-extrabold'
                                                                    : cookie.stock_300ml < 5
                                                                    ? 'bg-amber-100 border-amber-300 text-amber-800 font-bold'
                                                                    : 'bg-stone-50 border-stone-300 text-stone-800'
                                                            }`}
                                                        />
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => updateCookieData(cookie.id, { stock_300ml: is300On ? 0 : 10, stock_800ml: cookie.stock_800ml, is_available: true })}
                                                                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${is300On ? 'bg-emerald-500' : 'bg-stone-300'}`}
                                                            >
                                                                <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition duration-200 ${is300On ? 'translate-x-4' : 'translate-x-0'}`} />
                                                            </button>
                                                            <span className={`text-[11px] font-bold ${is300On ? 'text-emerald-700' : 'text-red-500'}`}>
                                                                {is300On ? 'Tersedia' : 'Stok Habis'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* STOK 800 ML */}
                                                <td className="p-4 text-center">
                                                    <div className="inline-flex flex-col items-center gap-1.5">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            defaultValue={cookie.stock_800ml}
                                                            onBlur={(e) => {
                                                                const val = Math.max(0, parseInt(e.target.value) || 0);
                                                                e.target.value = val;
                                                                updateCookieData(cookie.id, { stock_300ml: cookie.stock_300ml, stock_800ml: val, is_available: true });
                                                            }}
                                                            className={`w-20 p-1.5 border rounded-xl text-center font-bold text-sm focus:outline-amber-600 ${
                                                                cookie.stock_800ml === 0
                                                                    ? 'bg-red-100 border-red-300 text-red-600 font-extrabold'
                                                                    : cookie.stock_800ml < 5
                                                                    ? 'bg-amber-100 border-amber-300 text-amber-800 font-bold'
                                                                    : 'bg-stone-50 border-stone-300 text-stone-800'
                                                            }`}
                                                        />
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => updateCookieData(cookie.id, { stock_300ml: cookie.stock_300ml, stock_800ml: is800On ? 0 : 10, is_available: true })}
                                                                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${is800On ? 'bg-emerald-500' : 'bg-stone-300'}`}
                                                            >
                                                                <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition duration-200 ${is800On ? 'translate-x-4' : 'translate-x-0'}`} />
                                                            </button>
                                                            <span className={`text-[11px] font-bold ${is800On ? 'text-emerald-700' : 'text-red-500'}`}>
                                                                {is800On ? 'Tersedia' : 'Stok Habis'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* TOMBOL AKSI */}
                                                <td className="p-4 text-center">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <button
                                                            type="button"
                                                            onClick={() => openEditModal(cookie)}
                                                            className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 text-xs px-2.5 py-1.5 rounded-xl font-bold transition inline-flex items-center gap-1 cursor-pointer"
                                                            title="Edit Produk"
                                                        >
                                                            <i className="fa-solid fa-pen-to-square"></i> Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => confirmDelete(cookie.id, cookie.name)}
                                                            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs px-2.5 py-1.5 rounded-xl font-bold transition inline-flex items-center gap-1 cursor-pointer"
                                                            title="Hapus Produk"
                                                        >
                                                            <i className="fa-solid fa-trash-can"></i> Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINASI FOOTER */}
                    {totalItems > 0 && (
                        <div className="p-4 border-t border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
                            <div>
                                Menampilkan <span className="font-bold text-stone-800">{startIndex + 1}</span> - <span className="font-bold text-stone-800">{Math.min(startIndex + itemsPerPage, totalItems)}</span> dari <span className="font-bold text-stone-800">{totalItems}</span> produk
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1.5 border border-stone-300 rounded-xl hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed font-semibold bg-white shadow-sm"
                                >
                                    <i className="fa-solid fa-chevron-left mr-1"></i> Sebelumnya
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-1.5 rounded-xl font-bold transition shadow-sm ${
                                            currentPage === page ? 'bg-amber-700 text-white' : 'border border-stone-300 text-stone-700 hover:bg-stone-100 bg-white'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1.5 border border-stone-300 rounded-xl hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed font-semibold bg-white shadow-sm"
                                >
                                    Selanjutnya <i className="fa-solid fa-chevron-right ml-1"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL TAMBAH PRODUK */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl border border-stone-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-stone-900">Tambah Produk Kue Baru</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-stone-400 hover:text-stone-600 cursor-pointer">
                                <i className="fa-solid fa-xmark text-lg"></i>
                            </button>
                        </div>

                        <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-bold text-stone-700 mb-1">Nama Kue</label>
                                <input
                                    type="text"
                                    required
                                    value={newCookie.name}
                                    onChange={(e) => setNewCookie({...newCookie, name: e.target.value})}
                                    className="w-full p-2.5 border rounded-xl focus:outline-amber-600 bg-stone-50"
                                    placeholder="Contoh: Nastar Keju Special"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-stone-700 mb-1">Harga 300 ML</label>
                                    <input
                                        type="number"
                                        required
                                        value={newCookie.price_300ml}
                                        onChange={(e) => setNewCookie({...newCookie, price_300ml: parseInt(e.target.value) || 0})}
                                        className="w-full p-2.5 border rounded-xl focus:outline-amber-600 bg-stone-50"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-stone-700 mb-1">Harga 800 ML</label>
                                    <input
                                        type="number"
                                        required
                                        value={newCookie.price_800ml}
                                        onChange={(e) => setNewCookie({...newCookie, price_800ml: parseInt(e.target.value) || 0})}
                                        className="w-full p-2.5 border rounded-xl focus:outline-amber-600 bg-stone-50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold text-stone-700 mb-1">Badge / Tag</label>
                                <input
                                    type="text"
                                    value={newCookie.badge}
                                    onChange={(e) => setNewCookie({...newCookie, badge: e.target.value})}
                                    className="w-full p-2.5 border rounded-xl focus:outline-amber-600 bg-stone-50"
                                    placeholder="Contoh: Best Seller / Favorit"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-stone-700 mb-1">Path Gambar / Upload File</label>
                                <input
                                    type="text"
                                    value={newCookie.image_url}
                                    onChange={(e) => setNewCookie({...newCookie, image_url: e.target.value})}
                                    className="w-full p-2.5 border rounded-xl focus:outline-amber-600 bg-stone-50 mb-2"
                                    placeholder="images/Nastar.jpg"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setNewCookie({...newCookie, image: e.target.files[0]})}
                                    className="w-full text-stone-500 text-xs"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 border rounded-xl text-stone-600 hover:bg-stone-100 font-bold cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold cursor-pointer"
                                >
                                    Simpan Produk
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL EDIT PRODUK */}
            {isEditModalOpen && editingCookie && (
                <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl border border-stone-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-stone-900">Ubah Data Produk Kue</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-stone-400 hover:text-stone-600 cursor-pointer">
                                <i className="fa-solid fa-xmark text-lg"></i>
                            </button>
                        </div>

                        <form onSubmit={handleEditProductSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-bold text-stone-700 mb-1">Nama Kue</label>
                                <input
                                    type="text"
                                    required
                                    value={editingCookie.name}
                                    onChange={(e) => setEditingCookie({...editingCookie, name: e.target.value})}
                                    className="w-full p-2.5 border rounded-xl focus:outline-amber-600 bg-stone-50"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-stone-700 mb-1">Harga 300 ML</label>
                                    <input
                                        type="number"
                                        required
                                        value={editingCookie.price_300ml}
                                        onChange={(e) => setEditingCookie({...editingCookie, price_300ml: parseInt(e.target.value) || 0})}
                                        className="w-full p-2.5 border rounded-xl focus:outline-amber-600 bg-stone-50"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-stone-700 mb-1">Harga 800 ML</label>
                                    <input
                                        type="number"
                                        required
                                        value={editingCookie.price_800ml}
                                        onChange={(e) => setEditingCookie({...editingCookie, price_800ml: parseInt(e.target.value) || 0})}
                                        className="w-full p-2.5 border rounded-xl focus:outline-amber-600 bg-stone-50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold text-stone-700 mb-1">Badge / Tag</label>
                                <input
                                    type="text"
                                    value={editingCookie.badge || ''}
                                    onChange={(e) => setEditingCookie({...editingCookie, badge: e.target.value})}
                                    className="w-full p-2.5 border rounded-xl focus:outline-amber-600 bg-stone-50"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-stone-700 mb-1">Ganti Gambar (Upload File)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setEditingCookie({...editingCookie, image: e.target.files[0]})}
                                    className="w-full text-stone-500 text-xs p-1 border rounded-xl bg-stone-50"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 border rounded-xl text-stone-600 hover:bg-stone-100 font-bold cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold cursor-pointer"
                                >
                                    Perbarui Produk
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL KONFIRMASI HAPUS CUSTOM */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl border border-stone-200 text-center">
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                            <i className="fa-solid fa-triangle-exclamation"></i>
                        </div>
                        <h3 className="text-base font-bold text-stone-900 mb-1">Hapus Produk Ini?</h3>
                        <p className="text-xs text-stone-500 mb-6">
                            Apakah Anda yakin ingin menghapus <span className="font-bold text-stone-800">"{deleteModal.name}"</span>? Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => setDeleteModal({ isOpen: false, id: null, name: '' })}
                                className="w-full py-2.5 border rounded-xl text-xs text-stone-600 hover:bg-stone-100 font-bold transition cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={executeDelete}
                                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
