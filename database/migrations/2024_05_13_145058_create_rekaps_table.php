<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rekaps', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pelanggan');
            $table->string('alamat');
            $table->date('tgl_keluar');    
            $table->date('tgl_kembali');
            $table->date('tgl_masuk_pabrik');
            $table->string('keterangan');
            $table->foreignId('produk_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekaps');
    }
};
