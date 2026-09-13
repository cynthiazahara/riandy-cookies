<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class OrderController extends Controller
{
    // 1. Digunakan oleh Admin untuk melihat rekap pesanan & omzet
    public function index()
    {
        $orders = Order::with('items')->latest()->get()->map(function ($order) {
            return [
                'id' => $order->id,
                'order_number' => $order->order_number ?? ('ORD-' . $order->id),
                'customer_name' => $order->customer_name,
                'customer_phone' => $order->whatsapp ?? $order->customer_phone,
                'address' => $order->address,
                'total_price' => $order->total_price,
                'status' => ucfirst($order->status),
                'created_at_formatted' => $order->created_at ? $order->created_at->format('d M Y H:i') : '-',
                'items' => $order->items
            ];
        });

        // Hitung Ringkasan Pendapatan
        $todayRevenue = Order::whereDate('created_at', Carbon::today())
            ->whereIn('status', ['Lunas', 'Dikirim', 'Selesai', 'lunas', 'dikirim', 'selesai'])
            ->sum('total_price');

        $monthlyRevenue = Order::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->whereIn('status', ['Lunas', 'Dikirim', 'Selesai', 'lunas', 'dikirim', 'selesai'])
            ->sum('total_price');

        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
            'stats' => [
                'today_revenue' => $todayRevenue,
                'monthly_revenue' => $monthlyRevenue,
            ]
        ]);
    }

    // 2. Digunakan oleh Pelanggan saat checkout pesanan baru dari halaman depan
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name'  => 'required|string|max:255',
            'whatsapp'       => 'required|string|max:20',
            'address'        => 'required|string',
            'payment_method' => 'required|string',
            'items'          => 'required|array|min:1',
            'total_price'    => 'required|integer|min:1',
        ]);

        $order = Order::create([
            'customer_name'  => $validated['customer_name'],
            'whatsapp'       => $validated['whatsapp'],
            'address'        => $validated['address'],
            'payment_method' => $validated['payment_method'],
            'items'          => $validated['items'],
            'total_price'    => $validated['total_price'],
            'status'         => 'Pending',
        ]);

        return redirect()->back()->with('success', 'Pesanan Anda berhasil dibuat!');
    }

    // 3. Digunakan oleh Admin untuk mengubah status pesanan (Pending -> Lunas -> Selesai)
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Pending,Lunas,Dikirim,Selesai,Batal,pending,lunas,dikirim,selesai,batal',
        ]);

        $order = Order::findOrFail($id);
        $order->update(['status' => $request->status]);

        return back();
    }
}
