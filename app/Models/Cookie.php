<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cookie extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image_url',
        'price_300ml',
        'price_800ml',
        'stock_300ml',
        'stock_800ml',
        'is_available',
        'badge',
        'data_name',
    ];
}
