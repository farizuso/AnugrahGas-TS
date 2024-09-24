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
        $produks = [
            [
                'id' => 1,
                'no_botol' => '001',
                'nama_produk' => "botol miras",
                'harga' => '10000',
                'stok' => '10'
            ],
            [
                'id' => 2,
                'no_botol' => '002',
                'nama_produk' => "botol arak",
                'harga' => '20000',
                'stok' => '20'
            ]
            ];

            foreach ($produks as $produk){
                \App\Models\Produk::create($produk);
            }
    }
}
