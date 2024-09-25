<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProdukSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define a base name for the products
        $baseNames = [
            "botol miras",
            "botol arak",
            "botol soda",
            "botol air",
            "botol jus",
            "botol teh",
            "botol kopi",
            "botol anggur",
            "botol whisky",
            "botol vodka",
        ];

        // Generate 50 product entries
        for ($i = 1; $i <= 50; $i++) {
            $produk = [
                'id' => $i,
                'no_botol' => str_pad($i, 3, '0', STR_PAD_LEFT), // Pads the number with leading zeros
                'nama_produk' => $baseNames[array_rand($baseNames)], // Randomly selects a product name
                'harga' => rand(10000, 50000), // Generates a random price between 10,000 and 50,000
                'stok' => rand(1, 100) // Generates a random stock value between 1 and 100
            ];

            \App\Models\Produk::create($produk);
        }
    }
}
