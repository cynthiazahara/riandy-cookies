<?php

namespace App\Http\Controllers;

use App\Models\Cookie;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $cookies = Cookie::all();
        return Inertia::render('Admin/Cookies', [
            'cookies' => $cookies
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price_300ml' => 'required|numeric',
            'price_800ml' => 'required|numeric',
            'badge' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $imagePath = 'images/placeholder.jpg';

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $fileName);
            $imagePath = 'images/' . $fileName;
        } elseif (!empty($request->image_url)) {
            $imagePath = $request->image_url;
        }

        Cookie::create([
            'name' => $validated['name'],
            'price_300ml' => $validated['price_300ml'],
            'price_800ml' => $validated['price_800ml'],
            'stock_300ml' => $request->stock_300ml ?? 10,
            'stock_800ml' => $request->stock_800ml ?? 10,
            'badge' => $validated['badge'],
            'image_url' => $imagePath,
            'data_name' => Str::slug($validated['name'], '_'),
            'is_available' => true,
        ]);

        return back();
    }

    public function update(Request $request, $id)
    {
        $cookie = Cookie::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price_300ml' => 'required|numeric',
            'price_800ml' => 'required|numeric',
            'badge' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $imagePath = $cookie->image_url;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $fileName);
            $imagePath = 'images/' . $fileName;
        } elseif ($request->filled('image_url')) {
            $imagePath = $request->image_url;
        }

        $cookie->update([
            'name' => $validated['name'],
            'price_300ml' => $validated['price_300ml'],
            'price_800ml' => $validated['price_800ml'],
            'badge' => $validated['badge'],
            'image_url' => $imagePath,
            'data_name' => Str::slug($validated['name'], '_'),
        ]);

        return back();
    }

    public function updateStock(Request $request, $id)
    {
        $cookie = Cookie::findOrFail($id);

        $cookie->update([
            'stock_300ml' => $request->stock_300ml,
            'stock_800ml' => $request->stock_800ml,
            'is_available' => $request->has('is_available') ? $request->is_available : $cookie->is_available,
        ]);

        return back();
    }

    // Method baru untuk mengubah stok semua produk secara sekaligus
    public function bulkUpdateStock(Request $request)
    {
        $validated = $request->validate([
            'stock_300ml' => 'required|integer',
            'stock_800ml' => 'required|integer',
            'is_available' => 'required|boolean',
        ]);

        Cookie::query()->update([
            'stock_300ml' => $validated['stock_300ml'],
            'stock_800ml' => $validated['stock_800ml'],
            'is_available' => $validated['is_available'],
        ]);

        return back();
    }

    public function destroy($id)
    {
        $cookie = Cookie::findOrFail($id);
        $cookie->delete();

        return back();
    }
}
