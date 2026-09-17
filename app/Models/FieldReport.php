<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FieldReport extends Model
{
    // Mengizinkan mass assignment untuk seluruh kolom tabel field_reports[cite: 1]
    protected $guarded = ['id'];

    // Relasi ke tabel zones[cite: 1]
    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }

    // Relasi ke tabel voters (bersifat opsional/nullable)[cite: 1]
    public function voter()
    {
        return $this->belongsTo(Voter::class);
    }

    // Relasi ke tabel users (pencatat laporan)[cite: 1]
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}