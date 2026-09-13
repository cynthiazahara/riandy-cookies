import React from 'react';

export default function CookieCard({ cookie, onAddToCart }) {
    return (
        <div className="cookie-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-amber-100/80 flex flex-col">
            <div className="relative h-72 overflow-hidden bg-amber-50">
                <img src={cookie.image_url} alt={cookie.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                {cookie.badge && (
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
                        <div className="bg-white p-2 rounded-lg border border-amber-100">
                            <span className="block text-[10px] font-bold text-amber-700 uppercase">Toples 300 ml</span>
                            <span className="text-sm font-bold text-stone-900">Rp {cookie.price_300ml.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-amber-100">
                            <span className="block text-[10px] font-bold text-amber-700 uppercase">Toples 800 ml</span>
                            <span className="text-sm font-bold text-stone-900">Rp {cookie.price_800ml.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => onAddToCart(`${cookie.name} (300 ml)`, cookie.price_300ml)} className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold py-2 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1">
                            <i className="fa-solid fa-cart-plus"></i> 300 ml
                        </button>
                        <button onClick={() => onAddToCart(`${cookie.name} (800 ml)`, cookie.price_800ml)} className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1 shadow-sm">
                            <i className="fa-solid fa-cart-plus"></i> 800 ml
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
