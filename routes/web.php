<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

// Landing Page & Order
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

// Route Autentikasi Admin & Pelanggan
Route::get('/login', [AdminAuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AdminAuthController::class, 'login']);
Route::post('/register', [AdminAuthController::class, 'register'])->name('register');
Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

// Proteksi Halaman Admin
Route::middleware(['auth'])->group(function () {
    // Kelola Stok
    Route::get('/admin/cookies', [AdminController::class, 'index'])->name('admin.cookies.index');
    Route::post('/admin/cookies', [AdminController::class, 'store'])->name('admin.cookies.store');
    Route::put('/admin/cookies/{id}', [AdminController::class, 'update'])->name('admin.cookies.update');
    Route::post('/admin/cookies/{id}/stock', [AdminController::class, 'updateStock'])->name('admin.cookies.updateStock');

    // Bulk Update Stok (Set Semua Stok Sekaligus)
    Route::post('/admin/cookies/bulk-stock', [AdminController::class, 'bulkUpdateStock'])->name('admin.cookies.bulkStock');

    Route::delete('/admin/cookies/{id}', [AdminController::class, 'destroy'])->name('admin.cookies.destroy');

    // Rekap Pendapatan & Pesanan
    Route::get('/admin/orders', [OrderController::class, 'index'])->name('admin.orders.index');
    Route::post('/admin/orders/{id}/status', [OrderController::class, 'updateStatus'])->name('admin.orders.updateStatus');
});
