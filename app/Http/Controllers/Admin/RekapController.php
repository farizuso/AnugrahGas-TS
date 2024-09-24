<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Rekap;

class RekapController extends Controller
{
    public function index()
    {
        // Mendapatkan data Rekap dengan relasi produk
        $posts = Rekap::with('produk')->get();
        return Inertia::render('Admin/Rekap/Index', [
            'posts' => $posts
        ]);
    }

    public function store(Request $request)
    {
        // Validasi input
        $data = $request->validate([
            'nama_pelanggan' => 'required',
            'alamat' => 'required',
            'tgl_keluar' => 'required|date',
            'tgl_kembali' => 'required|date',
            'tgl_masuk_pabrik' => 'required|date',
            'keterangan' => 'required',
            'produk_id' => 'required|exists:produks,id' // Mengasumsikan produk_id mengacu ke tabel 'produks'
        ]);

        // Membuat Rekap baru
        Rekap::create($data);

        // Redirect dengan pesan sukses
        return redirect()->route('admin.rekap.index')->with('success', 'Data Rekap berhasil ditambahkan');
    }

    public function update(Request $request, Rekap $rekap)
    {
        // Validasi input
        $data = $request->validate([
            'nama_pelanggan' => 'required',
            'alamat' => 'required',
            'tgl_keluar' => 'required|date',
            'tgl_kembali' => 'required|date',
            'tgl_masuk_pabrik' => 'required|date',
            'keterangan' => 'required',
            'produk_id' => 'required|exists:produks,id' // Pastikan produk_id valid
        ]);

        // Update Rekap yang ada
        $rekap->update($data);

        // Redirect dengan pesan sukses
        return redirect()->route('admin.rekap.index')->with('success', 'Data Rekap berhasil diubah');
    }

    public function destroy(Rekap $rekap)
    {
        $rekap->delete();
        return redirect()->route('admin.rekap.index')->with('success', 'Data Rekap berhasil dihapus');
    }
}
