<?php

namespace App\Observers;

use App\Models\FieldReport;
use App\Models\ActivityLog;

class FieldReportObserver
{
    public function created(FieldReport $fieldReport): void
    {
        ActivityLog::create([
            'user_id' => auth()->id() ?? 1,
            'action' => 'CREATE_FIELD_REPORT',
            'details' => "Membuat laporan lapangan di zona ID: {$fieldReport->zone_id}",
            'ip_address' => request()->ip(),
        ]);
    }
}