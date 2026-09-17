<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditComparison extends Model
{
    protected $guarded = ['id'];

    // Nonaktifkan timestamp otomatis
    public $timestamps = false;

    // Relasi utama untuk auditor
    public function auditor()
    {
        return $this->belongsTo(User::class, 'audited_by');
    }

    // Alias jika controller sewaktu-waktu memanggil 'user'
    public function user()
    {
        return $this->belongsTo(User::class, 'audited_by');
    }

    // Relasi ke tabel voters
    public function voter()
    {
        return $this->belongsTo(Voter::class);
    }
}