<?php

namespace App\Observers;

use App\Models\Voter;
use App\Models\VoterSentimentLog;
use App\Models\ActivityLog;

class VoterObserver
{
    public function updated(Voter $voter): void
    {
        // 1. Cek apakah sentimen berubah
        if ($voter->isDirty('current_sentiment')) {
            VoterSentimentLog::create([
                'voter_id' => $voter->id,
                'user_id' => auth()->id() ?? 1,
                // Deteksi otomatis sumber perubahan (dari laporan relawan atau ubah manual/survei)[cite: 1]
                'source' => request()->routeIs('field-reports.*') ? 'relawan' : 'survei', 
                'sentiment_color' => $voter->current_sentiment,
            ]);
        }

        // 2. Catat aktivitas pembaruan data umum[cite: 1]
        ActivityLog::create([
            'user_id' => auth()->id() ?? 1,
            'action' => 'UPDATE_VOTER',
            'details' => "Memperbarui data pemilih: {$voter->name}",
            'ip_address' => request()->ip(),
        ]);
    }

    public function created(Voter $voter): void
    {
        ActivityLog::create([
            'user_id' => auth()->id() ?? 1,
            'action' => 'CREATE_VOTER',
            'details' => "Menambahkan pemilih baru: {$voter->name}",
            'ip_address' => request()->ip(),
        ]);
    }
}