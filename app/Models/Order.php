<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_name',
        'whatsapp',
        'address',
        'payment_method',
        'items',
        'total_price',
        'status',
    ];

    // Mengubah array items menjadi JSON secara otomatis saat disimpan/dibaca
    protected $casts = [
        'items' => 'array',
    ];
}
