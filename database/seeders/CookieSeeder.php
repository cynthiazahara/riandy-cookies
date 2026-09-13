<?php

namespace Database\Seeders;

use App\Models\Cookie;
use Illuminate\Database\Seeder;

class CookieSeeder extends Seeder
{
    public function run(): void
    {
        $cookies = [
            [
                'name' => 'Nastar Klasik',
                'description' => 'Nastar lembut dengan isian selai nanas homemade yang segar, manis, dan legit.',
                'image_url' => '/images/Nastar.jpg',
                'price_300ml' => 35000,
                'price_800ml' => 90000,
                'stock_300ml' => 20,
                'stock_800ml' => 15,
                'is_available' => true,
                'badge' => 'Best Seller',
                'data_name' => 'nastar klasik nanas toples'
            ],
            [
                'name' => 'Kastengel Keju',
                'description' => 'Gurihnya keju pilihan melimpah yang dipanggang sempurna, sangat renyah di setiap gigitan.',
                'image_url' => '/images/Kastengel.jpg',
                'price_300ml' => 35000,
                'price_800ml' => 95000,
                'stock_300ml' => 18,
                'stock_800ml' => 12,
                'is_available' => true,
                'badge' => 'Favorit',
                'data_name' => 'kastengel keju gurih renyah'
            ],
            [
                'name' => 'Nutella Cookies',
                'description' => 'Kombinasi cookies renyah dengan lelehan cokelat Nutella murni yang melimpah di atasnya.',
                'image_url' => '/images/Nutellacookies.jpg',
                'price_300ml' => 35000,
                'price_800ml' => 100000,
                'stock_300ml' => 25,
                'stock_800ml' => 10,
                'is_available' => true,
                'badge' => 'Populer',
                'data_name' => 'nutella cookies cokelat hazelnut'
            ],
            [
                'name' => 'Nutella Almond Cookies',
                'description' => 'Kue cokelat krispi berbalut renyahnya cincangan kacang dengan isian selai cokelat pekat di tengahnya.',
                'image_url' => '/images/Nutellaalmondcookies.jpg',
                'price_300ml' => 35000,
                'price_800ml' => 100000,
                'stock_300ml' => 15,
                'stock_800ml' => 8,
                'is_available' => true,
                'badge' => 'Spesial',
                'data_name' => 'nutella almond cookies cokelat kacang'
            ],
            [
                'name' => 'Putri Salju',
                'description' => 'Kue kacang lembut bertabur gula dingin yang manis, memberikan sensasi dingin meleleh di lidah.',
                'image_url' => '/images/Putrisalju.jpg',
                'price_300ml' => 35000,
                'price_800ml' => 85000,
                'stock_300ml' => 22,
                'stock_800ml' => 14,
                'is_available' => true,
                'badge' => 'Klasik',
                'data_name' => 'putri salju gula manis lembut'
            ],
            [
                'name' => 'Semprit Sagu Keju',
                'description' => 'Tekstur super renyah dan lumer di lidah dipadu dengan kombinasi parutan keju gurih berlimpah.',
                'image_url' => '/images/Semprit.jpg',
                'price_300ml' => 35000,
                'price_800ml' => 85000,
                'stock_300ml' => 30,
                'stock_800ml' => 20,
                'is_available' => true,
                'badge' => 'Lumer',
                'data_name' => 'semprit sagu keju gurih renyah lumer'
            ],
            [
                'name' => 'Cadbury Cookies',
                'description' => 'Kue kering cokelat lezat dengan potongan cokelat Cadbury asli yang lumer di mulut.',
                'image_url' => '/images/Cadburycookies.jpeg',
                'price_300ml' => 35000,
                'price_800ml' => 110000,
                'stock_300ml' => 12,
                'stock_800ml' => 7,
                'is_available' => true,
                'badge' => 'Favorit',
                'data_name' => 'cadbury cookies cokelat manis'
            ],
            [
                'name' => 'Coklat Mede',
                'description' => 'Perpaduan cokelat pekat yang manis dengan gurihnya kacang mede utuh pilihan.',
                'image_url' => '/images/Coklatmede.jpeg',
                'price_300ml' => 35000,
                'price_800ml' => 90000,
                'stock_300ml' => 16,
                'stock_800ml' => 9,
                'is_available' => true,
                'badge' => 'Crunchy',
                'data_name' => 'coklat mede kacang crunchy'
            ],
            [
                'name' => 'Almond Crispy',
                'description' => 'Kue tipis super renyah dengan taburan kacang almond dan keju gurih berkualitas.',
                'image_url' => '/images/Almondcrispy.jpg',
                'price_300ml' => 35000,
                'price_800ml' => 80000,
                'stock_300ml' => 14,
                'stock_800ml' => 11,
                'is_available' => true,
                'badge' => 'Crispy',
                'data_name' => 'almond crispy keju renyah'
            ],
            [
                'name' => 'Mede Crispi',
                'description' => 'Camilan mede krispi tipis dengan rasa manis gurih yang sangat pas di lidah.',
                'image_url' => '/images/Medecrispi.jpg',
                'price_300ml' => 35000,
                'price_800ml' => 110000,
                'stock_300ml' => 10,
                'stock_800ml' => 6,
                'is_available' => true,
                'badge' => 'Ringan',
                'data_name' => 'mede crispi kacang renyah'
            ],
            [
                'name' => 'Nastar Cokelat Stik',
                'description' => 'Inovasi nastar berbentuk stik dengan isian cokelat melimpah yang manis dan lezat.',
                'image_url' => '/images/Nastarcoklatstik.jpg',
                'price_300ml' => 35000,
                'price_800ml' => 100000,
                'stock_300ml' => 19,
                'stock_800ml' => 13,
                'is_available' => true,
                'badge' => 'Varian Baru',
                'data_name' => 'nastar cokelat stik lumer'
            ],
        ];

        foreach ($cookies as $cookie) {
            Cookie::create($cookie);
        }
    }
}
