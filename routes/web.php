<?php


use App\Http\Controllers\Admin\PelangganController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\BackupController;
use App\Http\Controllers\Admin\TodoController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\RekapController;
// use App\Http\Controllers\Admin\ProductCategoryController;
// use App\Http\Controllers\Admin\DashboardAdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('/todos', TodoController::class)->names('admin.todo');
    Route::resource('/admin/produk', ProductController::class)->names('admin.produk');
    // Route::resource('admin/dashboard', DashboardController::class)->names('admin.dashboard');
    Route::resource('/admin/dashboard', DashboardController::class)->names('admin.dashboard');
    Route::resource('/admin/rekap', RekapController::class)->names('admin.rekap');
    Route::resource('/admin/Pelanggan', PelangganController::class)->names('admin.pelanggan');
});

require __DIR__.'/auth.php';
