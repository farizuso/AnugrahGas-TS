<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    use HasFactory;

    protected $fillable = [
        'no_botol',
        'nama_produk',
        'stok',
        'harga',
    ];

    public function rekaps()
    {
        return $this->hasMany(Rekap::class);
    }
}
