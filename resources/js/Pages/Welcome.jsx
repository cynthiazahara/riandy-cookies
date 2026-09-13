import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import InfoSections from '@/Components/InfoSections';
import Footer from '@/Components/Footer';

const DEFAULT_COOKIES = [
    {
        id: 1,
        name: "Nastar Klasik",
        data_name: "nastar klasik nanas toples",
        description: "Nastar lembut dengan isian selai nanas homemade yang segar, manis, dan legit.",
        badge: "Best Seller",
        price_300: 35000,
        price_800: 90000,
        image_url: "/images/Nastar.jpg"
    },
    {
        id: 2,
        name: "Kastengel Keju",
        data_name: "kastengel keju gurih renyah",
        description: "Gurihnya keju pilihan melimpah yang dipanggang sempurna, sangat renyah di setiap gigitan.",
        badge: "Favorit",
        price_300: 35000,
        price_800: 95000,
        image_url: "/images/Kastengel.jpg"
    },
    {
        id: 3,
        name: "Nutella Cookies",
        data_name: "nutella cookies cokelat hazelnut",
        description: "Kombinasi cookies renyah dengan lelehan cokelat Nutella murni yang melimpah di atasnya.",
        badge: "Populer",
        price_300: 35000,
        price_800: 100000,
        image_url: "/images/Nutellacookies.jpg"
    },
    {
        id: 4,
        name: "Nutella Almond Cookies",
        data_name: "nutella almond cookies cokelat kacang",
        description: "Kue cokelat krispi berbalut renyahnya cincangan kacang dengan isian selai cokelat pekat di tengahnya.",
        badge: "Spesial",
        price_300: 35000,
        price_800: 100000,
        image_url: "/images/Nutellaalmondcookies.jpg"
    },
    {
        id: 5,
        name: "Putri Salju",
        data_name: "putri salju gula manis lembut",
        description: "Kue kacang lembut bertabur gula dingin yang manis, memberikan sensasi dingin meleleh di lidah.",
        badge: "Klasik",
        price_300: 35000,
        price_800: 85000,
        image_url: "/images/Putrisalju.jpg"
    },
    {
        id: 6,
        name: "Semprit Sagu Keju",
        data_name: "semprit sagu keju gurih renyah lumer",
        description: "Tekstur super renyah dan lumer di lidah dipadu dengan kombinasi parutan keju gurih berlimpah.",
        badge: "Lumer",
        price_300: 35000,
        price_800: 85000,
        image_url: "/images/Semprit.jpg"
    },
    {
        id: 7,
        name: "Cadbury Cookies",
        data_name: "cadbury cookies cokelat manis",
        description: "Kue kering cokelat lezat dengan potongan cokelat Cadbury asli yang lumer di mulut.",
        badge: "Favorit",
        price_300: 35000,
        price_800: 110000,
        image_url: "/images/Cadburycookies.jpeg"
    },
    {
        id: 8,
        name: "Coklat Mede",
        data_name: "coklat mede kacang crunchy",
        description: "Perpaduan cokelat pekat yang manis dengan gurihnya kacang mede utuh pilihan.",
        badge: "Crunchy",
        price_300: 35000,
        price_800: 90000,
        image_url: "/images/Coklatmede.jpeg"
    },
    {
        id: 9,
        name: "Almond Crispy",
        data_name: "almond crispy keju renyah",
        description: "Kue tipis super renyah dengan taburan kacang almond dan keju gurih berkualitas.",
        badge: "Crispy",
        price_300: 35000,
        price_800: 80000,
        image_url: "/images/Almondcrispy.jpg"
    },
    {
        id: 10,
        name: "Mede Crispi",
        data_name: "mede crispi kacang renyah",
        description: "Camilan mede krispi tipis dengan rasa manis gurih yang sangat pas di lidah.",
        badge: "Ringan",
        price_300: 35000,
        price_800: 110000,
        image_url: "/images/Medecrispi.jpg"
    },
    {
        id: 11,
        name: "Nastar Cokelat Stik",
        data_name: "nastar cokelat stik lumer",
        description: "Inovasi nastar berbentuk stik dengan isian cokelat melimpah yang manis dan lezat.",
        badge: "Varian Baru",
        price_300: 35000,
        price_800: 100000,
        image_url: "/images/Nastarcoklatstik.jpg"
    }
];

export default function Welcome({ cookies = [] }) {
    const cookieList = cookies.length > 0 ? cookies : DEFAULT_COOKIES;

    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [authTab, setAuthTab] = useState('login');
    const [checkoutView, setCheckoutView] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

    const loginForm = useForm({ email: '', password: '' });
    const registerForm = useForm({ name: '', email: '', password: '' });

    // State internal untuk menangani input checkout
    const [customerName, setCustomerName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('transfer');

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        loginForm.post(route('login'), {
            onSuccess: () => {
                setIsLoginModalOpen(false);
                loginForm.reset();
            },
        });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        registerForm.post(route('register'), {
            onSuccess: () => {
                setIsLoginModalOpen(false);
                registerForm.reset();
                setToastMessage('Akun Anda berhasil terdaftar!');
                setTimeout(() => setToastMessage(null), 3000);
            },
        });
    };

    const heroProducts = cookieList.slice(0, 3);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
        }, 4000);
        return () => clearInterval(slideInterval);
    }, [heroProducts.length]);

    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroProducts.length - 1 : prev - 1));
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroProducts.length);

    const filteredCookies = cookieList.filter(cookie =>
        cookie.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cookie.data_name && cookie.data_name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const addToCart = (name, price) => {
        setCart(prev => {
            const existing = prev.find(item => item.name === name);
            if (existing) {
                return prev.map(item => item.name === name ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { name, price, quantity: 1 }];
        });
        setToastMessage(`${name} telah ditambahkan ke keranjang!`);
        setTimeout(() => setToastMessage(null), 2500);
    };

    const changeQuantity = (name, amount) => {
        setCart(prev => prev.map(item => {
            if (item.name === name) {
                const newQty = item.quantity + amount;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
        }).filter(Boolean));
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Kirim langsung ke WhatsApp tanpa terkendala pendaftaran backend
    const handleProcessPayment = (e) => {
        e.preventDefault();

        if (!customerName || !whatsapp || !address) {
            alert('Mohon isi semua data pengiriman terlebih dahulu.');
            return;
        }

        const itemDetails = cart.map(item => `• ${item.name} (${item.quantity}x) = Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`).join('\n');

        const message = `Halo Admin Riandy Cookies, saya ingin mengonfirmasi pesanan saya:\n\n` +
            `*Nama:* ${customerName}\n` +
            `*No. WA:* ${whatsapp}\n` +
            `*Alamat:* ${address}\n` +
            `*Metode Pembayaran:* ${paymentMethod.toUpperCase()}\n\n` +
            `*Rincian Pesanan:*\n${itemDetails}\n\n` +
            `*Total Tagihan:* Rp ${cartTotal.toLocaleString('id-ID')}\n\n` +
            `Mohon instruksi pembayaran selanjutnya. Terima kasih!`;

        const waUrl = `https://wa.me/6282111526747?text=${encodeURIComponent(message)}`;

        window.open(waUrl, '_blank');

        setCart([]);
        setIsCartModalOpen(false);
        setCheckoutView(false);
        setCustomerName('');
        setWhatsapp('');
        setAddress('');
    };

    const currentHero = heroProducts[currentSlide];
    const isHero300Available = (currentHero?.is_available ?? true) && (currentHero?.stock_300ml ?? currentHero?.stock_300 ?? 0) > 0;
    const isHero800Available = (currentHero?.is_available ?? true) && (currentHero?.stock_800ml ?? currentHero?.stock_800 ?? 0) > 0;
    const isHeroAnyAvailable = isHero300Available || isHero800Available;

    return (
        <div className="bg-amber-50/60 text-stone-800 font-sans min-h-screen">
            <Head title="Riandy Cookies - Kelezatan Kue Kering Rumahan" />

            <Navbar
                cartCount={cartCount}
                onOpenLogin={() => setIsLoginModalOpen(true)}
                onOpenCart={() => { setIsCartModalOpen(true); setCheckoutView(false); }}
            />

            <section id="home" className="relative bg-gradient-to-b from-amber-100/80 via-amber-50 to-amber-50/60 py-16 md:py-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6 text-center lg:text-left space-y-5">
                        <div className="flex justify-center lg:justify-start">
                            <span className="inline-flex items-center bg-amber-200/80 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xs border border-amber-300/50">
                                <i className="fa-solid fa-heart text-amber-600 mr-1.5"></i> Authentic Homemade Taste
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                            Kelezatan Kue Kering Asli Rumahan untuk Momen Spesial
                        </h1>
                        <p className="text-base text-stone-700 leading-relaxed pt-1">
                            Kue kering lezat dipanggang dengan penuh kehangatan dan cinta menggunakan bahan-bahan segar berkualitas pilihan. Tersedia dalam ukuran toples 300 ml dan 800 ml untuk momen istimewa Anda.
                        </p>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 pt-2">
                            <span className="bg-white/90 border border-amber-200 text-stone-700 text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs">
                                <i className="fa-solid fa-certificate text-emerald-600 mr-1"></i> 100% Halal
                            </span>
                            <span className="bg-white/90 border border-amber-200 text-stone-700 text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs">
                                <i className="fa-solid fa-leaf text-amber-600 mr-1"></i> Tanpa Pengawet
                            </span>
                            <span className="bg-white/90 border border-amber-200 text-stone-700 text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs">
                                <i className="fa-solid fa-fire-flame-curved text-amber-600 mr-1"></i> Fresh from the Oven
                            </span>
                        </div>

                        <div className="flex justify-center lg:justify-start gap-4 pt-4 flex-wrap">
                            <a href="#katalog" className="bg-amber-700 hover:bg-amber-800 text-white font-medium px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2">
                                <i className="fa-solid fa-cookie"></i> Lihat Katalog Kue
                            </a>
                            <a href="#cara-order" className="bg-white hover:bg-amber-100/50 text-amber-900 border border-amber-300 font-medium px-8 py-3.5 rounded-full shadow-sm transition flex items-center gap-2">
                                <i className="fa-solid fa-circle-info"></i> Panduan Pemesanan
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-6 flex justify-center">
                        <div className="relative w-full max-w-md bg-white rounded-3xl p-4 shadow-xl border border-amber-200/80 overflow-hidden">
                            <div className="relative h-80 rounded-2xl overflow-hidden bg-amber-50">
                                <img
                                    src={currentHero?.image_url || currentHero?.image}
                                    alt={currentHero?.name}
                                    className={`w-full h-full object-cover transition duration-500 ease-in-out ${!isHeroAnyAvailable ? 'opacity-40 grayscale' : ''}`}
                                />
                                {currentHero?.badge && isHeroAnyAvailable && (
                                    <span className="absolute top-3 right-3 bg-amber-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                        {currentHero?.badge}
                                    </span>
                                )}
                                {!isHeroAnyAvailable && (
                                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                        Stok Habis
                                    </span>
                                )}
                            </div>

                            <div className="pt-4 px-2 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg text-stone-900">{currentHero?.name}</h3>
                                    <p className="text-xs text-amber-700 font-semibold mt-0.5">
                                        {isHeroAnyAvailable
                                            ? `Mulai Rp ${(currentHero?.price_300ml || currentHero?.price_300 || 35000).toLocaleString('id-ID')}`
                                            : 'Stok Tidak Tersedia'}
                                    </p>
                                </div>

                                <button
                                    disabled={!isHero300Available}
                                    onClick={() => isHero300Available && addToCart(`${currentHero?.name} (300 ml)`, currentHero?.price_300ml || currentHero?.price_300 || 35000)}
                                    className={`text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5 ${
                                        isHero300Available
                                            ? 'bg-amber-700 hover:bg-amber-800 text-white cursor-pointer'
                                            : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                                    }`}
                                >
                                    <i className="fa-solid fa-cart-plus"></i> {isHero300Available ? 'Pesan Sekarang' : 'Habis'}
                                </button>
                            </div>

                            <button
                                onClick={prevSlide}
                                className="absolute left-6 top-1/2 -translate-y-12 bg-white/80 hover:bg-white text-stone-800 w-9 h-9 rounded-full shadow-md flex items-center justify-center transition"
                            >
                                <i className="fa-solid fa-chevron-left text-sm"></i>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-6 top-1/2 -translate-y-12 bg-white/80 hover:bg-white text-stone-800 w-9 h-9 rounded-full shadow-md flex items-center justify-center transition"
                            >
                                <i className="fa-solid fa-chevron-right text-sm"></i>
                            </button>

                            <div className="flex justify-center gap-2 mt-3">
                                {heroProducts.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            currentSlide === index ? 'w-6 bg-amber-700' : 'w-2 bg-amber-200'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="katalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-8">
                    <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest">Pilihan Spesial Bagi Anda</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-1">Katalog Kue Terbaik Kami</h2>
                    <div className="h-1 w-20 bg-amber-600 mx-auto mt-3 rounded-full"></div>
                    <p className="text-stone-600 mt-3 text-sm md:text-base">Silakan pilih varian favorit Anda lengkap dengan pilihan ukuran toples (300 ml & 800 ml)</p>
                </div>

                <div className="max-w-xl mx-auto mb-12">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari kue di Riandy Cookies (misal: Nastar, Nutella Almond, Putri Salju...)"
                            className="w-full py-3.5 pl-12 pr-10 bg-white border border-amber-200 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm"
                        />
                        <i className="fa-solid fa-magnifying-glass absolute left-4 text-amber-600 text-base"></i>
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-4 text-stone-400 hover:text-stone-600">
                                <i className="fa-solid fa-circle-xmark"></i>
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCookies.map((cookie) => {
                        const is300Available = (cookie.is_available ?? true) && (cookie.stock_300ml ?? cookie.stock_300 ?? 0) > 0;
                        const is800Available = (cookie.is_available ?? true) && (cookie.stock_800ml ?? cookie.stock_800 ?? 0) > 0;
                        const isAnyAvailable = is300Available || is800Available;

                        return (
                            <div key={cookie.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-amber-100/80 flex flex-col relative">
                                {!isAnyAvailable && (
                                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                                        Stok Habis
                                    </div>
                                )}

                                <div className="relative h-72 overflow-hidden bg-amber-50">
                                    <img
                                        src={cookie.image_url || cookie.image}
                                        alt={cookie.name}
                                        className={`w-full h-full object-cover transition duration-500 ${!isAnyAvailable ? 'opacity-40 grayscale' : 'hover:scale-105'}`}
                                    />
                                    {cookie.badge && isAnyAvailable && (
                                        <span className="absolute top-3 right-3 bg-amber-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                            {cookie.badge}
                                        </span>
                                    )}
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-xl text-stone-900 mb-2">{cookie.name}</h3>
                                        <p className="text-stone-500 text-sm mb-4 leading-relaxed">{cookie.description}</p>
                                    </div>

                                    <div>
                                        <div className="bg-amber-50/70 rounded-xl p-3 mb-4 border border-amber-200/60 grid grid-cols-2 gap-2 text-center">
                                            <div className={`p-2 rounded-lg border ${is300Available ? 'bg-white border-amber-100' : 'bg-stone-100 border-stone-200 text-stone-400'}`}>
                                                <span className="block text-[10px] font-bold text-amber-700 uppercase">Toples 300 ml</span>
                                                <span className="text-sm font-bold">
                                                    {is300Available
                                                        ? `Rp ${(cookie.price_300ml || cookie.price_300 || 35000).toLocaleString('id-ID')}`
                                                        : 'Habis'}
                                                </span>
                                            </div>

                                            <div className={`p-2 rounded-lg border ${is800Available ? 'bg-white border-amber-100' : 'bg-stone-100 border-stone-200 text-stone-400'}`}>
                                                <span className="block text-[10px] font-bold text-amber-700 uppercase">Toples 800 ml</span>
                                                <span className="text-sm font-bold">
                                                    {is800Available
                                                        ? `Rp ${(cookie.price_800ml || cookie.price_800 || 90000).toLocaleString('id-ID')}`
                                                        : 'Habis'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                disabled={!is300Available}
                                                onClick={() => addToCart(`${cookie.name} (300 ml)`, cookie.price_300ml || cookie.price_300 || 35000)}
                                                className={`font-semibold py-2 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1 ${
                                                    is300Available
                                                        ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 cursor-pointer'
                                                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                                                }`}
                                            >
                                                <i className="fa-solid fa-cart-plus"></i> {is300Available ? '+ 300 ml' : 'Habis'}
                                            </button>

                                            <button
                                                disabled={!is800Available}
                                                onClick={() => addToCart(`${cookie.name} (800 ml)`, cookie.price_800ml || cookie.price_800 || 90000)}
                                                className={`font-semibold py-2 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1 shadow-sm ${
                                                    is800Available
                                                        ? 'bg-amber-700 hover:bg-amber-800 text-white cursor-pointer'
                                                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                                                }`}
                                            >
                                                <i className="fa-solid fa-cart-plus"></i> {is800Available ? '+ 800 ml' : 'Habis'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <InfoSections />
            <Footer />

            {/* MODAL LOGIN */}
            {isLoginModalOpen && (
                <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 relative">
                        <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
                            <i className="fa-solid fa-xmark text-xl"></i>
                        </button>

                        {authTab === 'login' ? (
                            <div>
                                <h3 className="text-xl font-bold text-stone-900 mb-1">Masuk Akun Member</h3>
                                <p className="text-xs text-stone-500 mb-5">Silakan masuk untuk kemudahan pemesanan kue</p>
                                <form onSubmit={handleLoginSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={loginForm.data.email}
                                            onChange={(e) => loginForm.setData('email', e.target.value)}
                                            className="w-full p-2.5 border border-amber-200 rounded-xl text-sm focus:outline-amber-600"
                                            placeholder="admin@riandycookies.com"
                                        />
                                        {loginForm.errors.email && (
                                            <span className="text-red-500 text-xs mt-1 block font-semibold">{loginForm.errors.email}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">Password</label>
                                        <input
                                            type="password"
                                            required
                                            value={loginForm.data.password}
                                            onChange={(e) => loginForm.setData('password', e.target.value)}
                                            className="w-full p-2.5 border border-amber-200 rounded-xl text-sm focus:outline-amber-600"
                                            placeholder="••••••••"
                                        />
                                        {loginForm.errors.password && (
                                            <span className="text-red-500 text-xs mt-1 block font-semibold">{loginForm.errors.password}</span>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loginForm.processing}
                                        className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2.5 rounded-xl transition font-semibold text-sm shadow-sm cursor-pointer"
                                    >
                                        {loginForm.processing ? 'Memproses...' : 'Masuk'}
                                    </button>
                                </form>
                                <p className="text-xs text-center text-stone-600 mt-4">Belum punya akun? <button onClick={() => setAuthTab('register')} className="text-amber-700 font-bold underline">Daftar di sini</button></p>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-bold text-stone-900 mb-1">Daftar Akun Baru</h3>
                                <p className="text-xs text-stone-500 mb-5">Lengkapi data untuk membuat akun baru</p>
                                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            required
                                            value={registerForm.data.name}
                                            onChange={(e) => registerForm.setData('name', e.target.value)}
                                            className="w-full p-2.5 border border-amber-200 rounded-xl text-sm focus:outline-amber-600"
                                            placeholder="Nama Lengkap Anda"
                                        />
                                        {registerForm.errors.name && (
                                            <span className="text-red-500 text-xs mt-1 block font-semibold">{registerForm.errors.name}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                            title="Masukkan format email yang benar, contoh: nama@email.com"
                                            value={registerForm.data.email}
                                            onChange={(e) => registerForm.setData('email', e.target.value)}
                                            className="w-full p-2.5 border border-amber-200 rounded-xl text-sm focus:outline-amber-600"
                                            placeholder="nama@email.com"
                                        />
                                        {registerForm.errors.email && (
                                            <span className="text-red-500 text-xs mt-1 block font-semibold">{registerForm.errors.email}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">Password</label>
                                        <input
                                            type="password"
                                            required
                                            value={registerForm.data.password}
                                            onChange={(e) => registerForm.setData('password', e.target.value)}
                                            className="w-full p-2.5 border border-amber-200 rounded-xl text-sm focus:outline-amber-600"
                                            placeholder="••••••••"
                                        />
                                        {registerForm.errors.password && (
                                            <span className="text-red-500 text-xs mt-1 block font-semibold">{registerForm.errors.password}</span>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={registerForm.processing}
                                        className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2.5 rounded-xl transition font-semibold text-sm shadow-sm cursor-pointer"
                                    >
                                        {registerForm.processing ? 'Memproses...' : 'Daftar'}
                                    </button>
                                </form>
                                <p className="text-xs text-center text-stone-600 mt-4">Sudah punya akun? <button onClick={() => setAuthTab('login')} className="text-amber-700 font-bold underline">Masuk di sini</button></p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* MODAL KERANJANG & CHECKOUT */}
            {isCartModalOpen && (
                <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setIsCartModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
                            <i className="fa-solid fa-xmark text-xl"></i>
                        </button>

                        {!checkoutView ? (
                            <div>
                                <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                                    <i className="fa-solid fa-cart-shopping text-amber-700"></i> Keranjang Belanja
                                </h3>
                                {cart.length === 0 ? (
                                    <p className="text-stone-500 text-sm text-center py-6">Keranjang Anda masih kosong.</p>
                                ) : (
                                    <div className="space-y-3 mb-6 divide-y divide-amber-100">
                                        {cart.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center py-3">
                                                <div>
                                                    <h4 className="font-bold text-xs md:text-sm text-stone-900">{item.name}</h4>
                                                    <p className="text-xs text-amber-700 font-medium">Rp {item.price.toLocaleString('id-ID')} x {item.quantity}</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button onClick={() => changeQuantity(item.name, -1)} className="bg-amber-100 text-amber-900 w-6 h-6 rounded-lg text-xs font-bold hover:bg-amber-200 flex items-center justify-center">-</button>
                                                    <span className="text-xs font-semibold px-1">{item.quantity}</span>
                                                    <button onClick={() => changeQuantity(item.name, 1)} className="bg-amber-100 text-amber-900 w-6 h-6 rounded-lg text-xs font-bold hover:bg-amber-200 flex items-center justify-center">+</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="flex justify-between items-center font-bold text-stone-900 border-t border-amber-200 pt-4 mb-6">
                                    <span>Total Pembayaran:</span>
                                    <span className="text-lg text-amber-800">Rp {cartTotal.toLocaleString('id-ID')}</span>
                                </div>
                                <button
                                    disabled={cart.length === 0}
                                    onClick={() => setCheckoutView(true)}
                                    className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-2xl transition font-semibold text-sm disabled:opacity-50 shadow-md cursor-pointer"
                                >
                                    Lanjut ke Pembayaran
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">
                                    <i className="fa-solid fa-file-invoice text-amber-700"></i> Detail Pemesanan
                                </h3>

                                {/* RINGKASAN TAGIHAN */}
                                <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 mb-4 text-xs space-y-1">
                                    <div className="flex justify-between text-stone-600">
                                        <span>Jumlah Item:</span>
                                        <span className="font-semibold text-stone-800">{cartCount} Kue</span>
                                    </div>
                                    <div className="flex justify-between text-stone-900 font-bold pt-1 border-t border-amber-200/80 text-sm">
                                        <span>Total Tagihan:</span>
                                        <span className="text-amber-800">Rp {cartTotal.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>

                                <form onSubmit={handleProcessPayment} className="space-y-3.5">
                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            required
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            className="w-full p-2.5 border border-amber-200 rounded-xl text-sm focus:outline-amber-600"
                                            placeholder="Nama Lengkap Anda"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">Nomor WhatsApp Aktif</label>
                                        <input
                                            type="tel"
                                            required
                                            value={whatsapp}
                                            onChange={(e) => setWhatsapp(e.target.value)}
                                            className="w-full p-2.5 border border-amber-200 rounded-xl text-sm focus:outline-amber-600"
                                            placeholder="08XXXXXXXXXX"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">Alamat Pengiriman Lengkap</label>
                                        <textarea
                                            required
                                            rows="2"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="w-full p-2.5 border border-amber-200 rounded-xl text-sm focus:outline-amber-600"
                                            placeholder="Alamat jalan, nomor rumah, kec/kel..."
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">Metode Pembayaran</label>
                                        <select
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-full p-2.5 border border-amber-200 rounded-xl text-sm bg-white focus:outline-amber-600"
                                        >
                                            <option value="transfer">Bank Transfer (BCA/Mandiri/BRI/BNI)</option>
                                            <option value="e-wallet">E-Wallet (GoPay / OVO / Dana / ShopeePay)</option>
                                            <option value="qris">Scan QRIS</option>
                                            <option value="cod">Cash on Delivery (COD Jakarta)</option>
                                        </select>
                                    </div>

                                    {/* INFO KEAMANAN */}
                                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900">
                                        <p className="font-bold flex items-center gap-1">
                                            <i className="fa-solid fa-shield-halved text-emerald-600"></i> Informasi Keamanan:
                                        </p>
                                        <p className="mt-0.5 text-[11px] text-stone-600">
                                            Nomor rekening dan instruksi pembayaran akan diberikan langsung oleh Admin via WhatsApp untuk mencegah penyalahgunaan data.
                                        </p>
                                    </div>

                                    <div className="flex space-x-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setCheckoutView(false)}
                                            className="w-1/3 border border-amber-700 text-amber-800 py-2.5 rounded-xl text-xs font-semibold hover:bg-amber-50 cursor-pointer"
                                        >
                                            Kembali
                                        </button>
                                        <button
                                            type="submit"
                                            className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                                        >
                                            <i className="fa-brands fa-whatsapp text-sm"></i> Konfirmasi & Bayar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {toastMessage && (
                <div className="fixed bottom-5 right-5 bg-amber-800 text-white text-xs px-4 py-3 rounded-2xl shadow-xl z-50 flex items-center gap-2">
                    <i className="fa-solid fa-circle-check text-emerald-400 text-sm"></i> {toastMessage}
                </div>
            )}
        </div>
    );
}
