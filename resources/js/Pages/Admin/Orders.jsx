import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';

export default function AdminOrders({ orders = [], stats = {} }) {
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    // Update Status Pesanan (Pending, Lunas, Dikirim, Selesai, Batal)
    const handleUpdateStatus = (orderId, newStatus) => {
        router.post(`/admin/orders/${orderId}/status`, { status: newStatus }, {
            preserveScroll: true,
            onSuccess: () => showToast(`Status pesanan berhasil diperbarui menjadi ${newStatus}!`)
        });
    };

    // Filter Pesanan
    const filteredOrders = (orders || []).filter(order => {
        const matchesSearch = (order.customer_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (order.order_number || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'ALL' || order.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="bg-stone-100 min-h-screen p-6 font-sans relative">
            <Head title="Admin - Pendapatan & Pesanan" />

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
                        <h1 className="text-2xl font-bold text-stone-900">Rekap Pendapatan & Pesanan</h1>
                        <p className="text-xs text-stone-500">Pantau omzet masuk dan kelola status pengiriman pesanan pelanggan</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <a href="/admin/cookies" className="bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-1.5">
                            <i className="fa-solid fa-boxes-stacked"></i> Kelola Stok
                        </a>
                        <a href="/" target="_blank" rel="noreferrer" className="bg-amber-700 hover:bg-amber-800 text-white text-xs px-4 py-2.5 rounded-xl font-bold shadow-sm transition">
                            Lihat Web <i className="fa-solid fa-arrow-up-right-from-square ml-1"></i>
                        </a>
                    </div>
                </div>

                {/* RINGKASAN STATISTIK PENDAPATAN */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Pendapatan Hari Ini</span>
                        <span className="text-xl font-bold text-emerald-600">
                            Rp {(stats.today_revenue || 0).toLocaleString()}
                        </span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Total Omzet Bulan Ini</span>
                        <span className="text-xl font-bold text-emerald-700">
                            Rp {(stats.monthly_revenue || 0).toLocaleString()}
                        </span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Total Pesanan</span>
                        <span className="text-xl font-bold text-stone-800">{(orders || []).length} Transaksi</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Perlu Diproses</span>
                        <span className="text-xl font-bold text-amber-600">
                            {(orders || []).filter(o => o.status === 'Pending' || o.status === 'Lunas').length} Pesanan
                        </span>
                    </div>
                </div>

                {/* SEARCH & FILTER BAR */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Cari nama pemesan / ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-xs border border-stone-300 rounded-xl focus:outline-amber-600 bg-stone-50"
                        />
                        <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-stone-400 text-xs"></i>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                        <span className="text-xs font-bold text-stone-500 whitespace-nowrap">Status:</span>
                        {['ALL', 'Pending', 'Lunas', 'Dikirim', 'Selesai', 'Batal'].map(st => (
                            <button
                                key={st}
                                onClick={() => setSelectedStatus(st)}
                                className={`text-xs px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition cursor-pointer ${
                                    selectedStatus === st ? 'bg-amber-700 text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                }`}
                            >
                                {st}
                            </button>
                        ))}
                    </div>
                </div>

                {/* TABEL PESANAN */}
                <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden flex flex-col">
                    <div className="max-h-[calc(100vh-320px)] overflow-y-auto">
                        <table className="w-full text-left text-sm text-stone-700 border-collapse">
                            <thead className="sticky top-0 bg-amber-100/90 backdrop-blur-md uppercase text-xs font-bold text-stone-800 border-b border-stone-200 z-10">
                                <tr>
                                    <th className="p-4">ID / Tanggal</th>
                                    <th className="p-4">Pelanggan</th>
                                    <th className="p-4 text-right">Total Bayar</th>
                                    <th className="p-4 text-center">Status</th>
                                    <th className="p-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-stone-400 text-xs">
                                            Belum ada pesanan yang dicatat.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-amber-50/30 transition">
                                            <td className="p-4">
                                                <div className="font-bold text-stone-900">#{order.order_number}</div>
                                                <div className="text-[11px] text-stone-400">{order.created_at_formatted}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-bold text-stone-800">{order.customer_name}</div>
                                                <div className="text-xs text-stone-500">{order.customer_phone}</div>
                                            </td>
                                            <td className="p-4 text-right font-bold text-emerald-700">
                                                Rp {order.total_price?.toLocaleString()}
                                            </td>
                                            <td className="p-4 text-center">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                                    className={`text-xs font-bold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                                                        order.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                                                        order.status === 'Lunas' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                                        order.status === 'Dikirim' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                                                        order.status === 'Pending' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-red-100 text-red-800 border-red-200'
                                                    }`}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Lunas">Lunas</option>
                                                    <option value="Dikirim">Dikirim</option>
                                                    <option value="Selesai">Selesai</option>
                                                    <option value="Batal">Batal</option>
                                                </select>
                                            </td>
                                            <td className="p-4 text-center">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 text-xs px-3 py-1.5 rounded-xl font-bold transition cursor-pointer"
                                                >
                                                    Detail Rincian
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* MODAL DETAIL PESANAN */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-xl border border-stone-200">
                        <div className="flex justify-between items-center mb-4 border-b pb-3">
                            <div>
                                <h3 className="text-base font-bold text-stone-900">Detail Pesanan #{selectedOrder.order_number}</h3>
                                <p className="text-xs text-stone-500">{selectedOrder.created_at_formatted}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="text-stone-400 hover:text-stone-600">
                                <i className="fa-solid fa-xmark text-lg"></i>
                            </button>
                        </div>

                        <div className="space-y-4 text-xs">
                            <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
                                <p className="font-bold text-stone-800">Info Pemesan:</p>
                                <p className="text-stone-600 mt-0.5">Nama: {selectedOrder.customer_name}</p>
                                <p className="text-stone-600">WhatsApp: {selectedOrder.customer_phone}</p>
                                <p className="text-stone-600">Alamat: {selectedOrder.address || '-'}</p>
                            </div>

                            <div>
                                <p className="font-bold text-stone-800 mb-2">Item Kue Dipesan:</p>
                                <div className="divide-y border rounded-2xl p-3 bg-white">
                                    {(selectedOrder.items || []).map((item, idx) => (
                                        <div key={idx} className="py-1.5 flex justify-between items-center">
                                            <span>{item.cookie_name || item.name} ({item.size}) x {item.quantity}</span>
                                            <span className="font-bold">Rp {item.price?.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center font-bold text-sm border-t pt-3 text-stone-900">
                                <span>Total Pembayaran:</span>
                                <span className="text-emerald-700">Rp {selectedOrder.total_price?.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
