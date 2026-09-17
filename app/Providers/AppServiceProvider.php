<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Voter;
use App\Models\FieldReport;
use App\Models\User;
use App\Observers\VoterObserver;
use App\Observers\FieldReportObserver;
use App\Observers\UserObserver;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Daftarkan semua observer
        Voter::observe(VoterObserver::class);
        FieldReport::observe(FieldReportObserver::class);
        User::observe(UserObserver::class);
    }
}