import React from 'react';

export default function InfoSections() {
    return (
        <>
            {/* CARA ORDER SECTION */}
            <section id="cara-order" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Langkah Pemesanan */}
                    <div className="bg-white/80 backdrop-blur-xs p-8 rounded-3xl border border-amber-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <i className="fa-solid fa-list-check text-amber-700 text-2xl"></i>
                                <h3 className="text-xl font-bold text-stone-900">Langkah Pemesanan Online</h3>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="w-7 h-7 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                                    <div>
                                        <h4 className="font-bold text-stone-900 text-sm">Pilih Varian & Ukuran Toples</h4>
                                        <p className="text-xs text-stone-700 font-medium">Pilih kue favorit Anda serta ukuran Jar (300 ml / 800 ml) di katalog.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-7 h-7 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                                    <div>
                                        <h4 className="font-bold text-stone-900 text-sm">Masukkan ke Keranjang</h4>
                                        <p className="text-xs text-stone-700 font-medium">Klik tombol pemesanan untuk memasukkan kue ke keranjang belanja.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-7 h-7 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                                    <div>
                                        <h4 className="font-bold text-stone-900 text-sm">Isi Alamat & Metode Bayar</h4>
                                        <p className="text-xs text-stone-700 font-medium">Buka ikon keranjang di atas, lengkapi alamat dan pilih opsi pembayaran.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-7 h-7 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</span>
                                    <div>
                                        <h4 className="font-bold text-stone-900 text-sm">Konfirmasi WhatsApp</h4>
                                        <p className="text-xs text-stone-700 font-medium">Admin akan mengonfirmasi rincian pesanan Anda dan siap diproses dipanggang segar.</p>
                                        <p className="text-[11px] text-amber-800 italic mt-1 bg-amber-50 p-1.5 rounded-md border border-amber-200/60 inline-block">
                                            *Sistem akan otomatis mengarahkan Anda ke WhatsApp Admin setelah checkout.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Tombol Call to Action (CTA) */}
                        <div className="mt-8 pt-4 border-t border-amber-100 text-center">
                            <a
                                href="#katalog"
                                className="inline-flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2.5 px-6 rounded-2xl w-full text-xs transition shadow-sm"
                            >
                                <i className="fa-solid fa-cookie-bite"></i> Lihat Katalog & Mulai Belanja
                            </a>
                        </div>
                    </div>

                    {/* Metode Pembayaran & Info Pengiriman */}
                    <div className="flex flex-col justify-between">
                        <div className="bg-white/80 backdrop-blur-xs p-8 rounded-3xl border border-amber-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="fa-solid fa-wallet text-amber-700 text-2xl"></i>
                                <h3 className="text-xl font-bold text-stone-900">Metode Pembayaran Praktis</h3>
                            </div>
                            <p className="text-xs text-stone-700 font-medium mb-6">Kami mendukung berbagai metode pembayaran yang mudah dan fleksibel:</p>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3.5 bg-amber-50/50 rounded-2xl border border-amber-100/60">
                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-building-columns text-amber-700"></i>
                                        <span className="font-bold text-xs text-stone-800">Transfer Bank</span>
                                    </div>
                                    <span className="text-[11px] font-semibold text-amber-900 bg-amber-200/60 px-2.5 py-1 rounded-full">BCA / Mandiri / BRI / BNI</span>
                                </div>

                                <div className="flex items-center justify-between p-3.5 bg-amber-50/50 rounded-2xl border border-amber-100/60">
                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-mobile-screen text-amber-700"></i>
                                        <span className="font-bold text-xs text-stone-800">E-Wallet</span>
                                    </div>
                                    <span className="text-[11px] font-semibold text-amber-900 bg-amber-200/60 px-2.5 py-1 rounded-full">GoPay / OVO / Dana / ShopeePay</span>
                                </div>

                                <div className="flex items-center justify-between p-3.5 bg-amber-50/50 rounded-2xl border border-amber-100/60">
                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-qrcode text-amber-700"></i>
                                        <span className="font-bold text-xs text-stone-800">Scan QRIS</span>
                                    </div>
                                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">Semua Pembayaran QR</span>
                                </div>

                                <div className="flex items-center justify-between p-3.5 bg-amber-50/50 rounded-2xl border border-amber-100/60">
                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-hand-holding-dollar text-amber-700"></i>
                                        <span className="font-bold text-xs text-stone-800">Cash on Delivery</span>
                                    </div>
                                    <span className="text-[11px] font-semibold text-amber-900 bg-amber-200/60 px-2.5 py-1 rounded-full">COD Area Jakarta</span>
                                </div>
                            </div>
                        </div>

                        {/* Kotak Informasi Pengiriman & Pemesanan */}
                        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-stone-700 flex items-start gap-3 shadow-xs">
                            <i className="fa-solid fa-truck-fast text-amber-700 text-lg mt-0.5"></i>
                            <div>
                                <p className="font-bold text-stone-900 mb-0.5">Informasi Pengiriman & Pemesanan:</p>
                                <p>• Pengiriman area Jabodetabek disarankan menggunakan Instant / Same Day (Gojek / Grab).</p>
                                <p>• Untuk pengiriman antar kota menggunakan ekspedisi kereta (KIB / Kalog) dengan ekstra aman.</p>
                                <p>• Pemesanan berlaku sistem Pre-Order (PO) 30 hari untuk menjaga kualitas kue dan menghindari pemesanan mendadak.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TENTANG KAMI SECTION */}
            <section id="tentang" className="py-16 bg-gradient-to-b from-amber-50/60 to-amber-100/40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-5 flex justify-center">
                            <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center p-2 bg-white/50 backdrop-blur-xs border border-amber-100">
                                <img
                                    src="/images/riandycookies.jpg"
                                    alt="Riandy Cookies"
                                    className="w-full h-full object-contain rounded-2xl"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="hidden flex-col items-center text-amber-800 p-6 text-center">
                                    <i className="fa-solid fa-cookie-bite text-6xl mb-3 text-amber-700"></i>
                                    <span className="text-sm font-bold">Homemade With Love</span>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-7 text-left">
                            <span className="text-amber-700 font-bold text-xs uppercase tracking-widest">KISAH KAMI</span>
                            <h2 className="text-3xl font-bold text-stone-900 mt-1 mb-2">Tentang Riandy Cookies</h2>
                            <div className="h-1 w-16 bg-amber-600 mb-6 rounded-full"></div>

                            <p className="text-stone-700 text-sm md:text-base leading-relaxed mb-6">
                                Riandy Cookies berawal dari kecintaan keluarga pada seni memanggang kue tradisional. Kami percaya bahwa kelezatan sejati berasal dari resep asli pilihan tanpa pengawet buatan dan dibuat dengan ketelitian penuh cinta.
                            </p>

                            <div className="grid grid-cols-3 gap-3 pt-2">
                                <div className="p-3 bg-white/80 rounded-2xl border border-amber-100 text-center shadow-xs">
                                    <i className="fa-solid fa-cookie text-amber-700 text-lg mb-1 block"></i>
                                    <span className="text-[11px] font-bold text-stone-800 block">Resep Asli</span>
                                </div>
                                <div className="p-3 bg-white/80 rounded-2xl border border-amber-100 text-center shadow-xs">
                                    <i className="fa-solid fa-shield-heart text-amber-700 text-lg mb-1 block"></i>
                                    <span className="text-[11px] font-bold text-stone-800 block">Tanpa Pengawet</span>
                                </div>
                                <div className="p-3 bg-white/80 rounded-2xl border border-amber-100 text-center shadow-xs">
                                    <i className="fa-solid fa-fire text-amber-700 text-lg mb-1 block"></i>
                                    <span className="text-[11px] font-bold text-stone-800 block">Freshly Baked</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* KONTAK SECTION */}
            <section id="kontak" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">Pemesanan & Kontak Direct</h2>
                <div className="h-1 w-16 bg-amber-600 mx-auto mb-4 rounded-full"></div>
                <p className="text-xs md:text-sm text-stone-700 mb-8 font-medium">Tertarik mencoba kelezatan kue buatan kami? Hubungi kami langsung via WhatsApp</p>

                <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-amber-100 shadow-md">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-inner">
                        <i className="fa-brands fa-whatsapp"></i>
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mb-1">Order Langsung Via WhatsApp</h3>
                    <p className="text-xs text-stone-500 mb-6">Klik tombol di bawah ini untuk terhubung langsung dengan admin kami</p>
                    <a
                        href="https://wa.me/6282111526747?text=Halo%20Riandy%20Cookies,%20saya%20ingin%20memesan%20kue"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-2xl w-full text-sm transition shadow-md"
                    >
                        <i className="fa-brands fa-whatsapp text-lg"></i> Hubungi Admin WA
                    </a>

                    <div className="mt-8 pt-6 border-t border-amber-100 text-left space-y-2 text-xs text-stone-600">
                        <p className="flex items-center gap-2">
                            <i className="fa-solid fa-location-dot text-amber-700"></i> <strong>Lokasi:</strong> Jakarta, Indonesia
                        </p>
                        <p className="flex items-center gap-2">
                            <i className="fa-solid fa-clock text-amber-700"></i> <strong>Jam Operasional:</strong> 10.00 – 16.00 WIB
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
