<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ZoneController;
use App\Http\Controllers\VoterController;
use App\Http\Controllers\FieldReportController;
use App\Http\Controllers\AuditComparisonController;
use App\Http\Controllers\CampaignActivityController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    
    // Dashboard bisa diakses semua role yang login
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // 1. Khusus Admin: Manajemen Pengguna Sistem
    Route::middleware('role:admin')->group(function () {
        Route::resource('users', UserController::class);
    });


    // Rute Profil Bawaan
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    
    // 2. Modul Strategis (Hanya ADMIN & TIM UTAMA / TIM INTI)
    // Relawan dan Surveyor TIDAK BISA mengakses modul ini
    Route::middleware('role:admin,tim_utama')->group(function () {
        Route::resource('zones', ZoneController::class);
        Route::resource('audit-comparisons', AuditComparisonController::class);
    });

    // 3. Modul Operasional Lapangan (Bisa diakses SEMUA ROLE: Admin, Tim Utama, Relawan, Surveyor)
    Route::resource('voters', VoterController::class);
    Route::resource('field-reports', FieldReportController::class);
    Route::resource('campaign-activities', CampaignActivityController::class);

    // Profile bawaan Breeze
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';