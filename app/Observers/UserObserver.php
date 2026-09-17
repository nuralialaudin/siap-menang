<?php

namespace App\Observers;

use App\Models\User;
use App\Models\ActivityLog;

class UserObserver
{
    public function updated(User $user): void
    {
        ActivityLog::create([
            'user_id' => auth()->id() ?? 1,
            'action' => 'UPDATE_USER',
            'details' => "Profil/Role pengguna {$user->name} diperbarui",
            'ip_address' => request()->ip(),
        ]);
    }
}