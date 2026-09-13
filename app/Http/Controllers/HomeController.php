<?php

namespace App\Http\Controllers;

use App\Models\Cookie;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $cookies = Cookie::all();

        return Inertia::render('Welcome', [
            'cookies' => $cookies
        ]);
    }
}
