<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\VoterSentimentLog;
use Inertia\Inertia;

class LogController extends Controller
{
    public function index()
    {
        $activityLogs = ActivityLog::with('user')->latest()->limit(50)->get();
        $sentimentLogs = VoterSentimentLog::with(['voter', 'user'])->latest()->limit(50)->get();

        return Inertia::render('Logs/Index', [
            'activityLogs' => $activityLogs,
            'sentimentLogs' => $sentimentLogs,
        ]);
    }
}