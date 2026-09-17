<?php

namespace App\Http\Controllers;

use App\Models\Voter;
use App\Models\FieldReport;
use App\Models\AuditComparison;
use App\Models\Zone;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $userRole = $user->role ?? 'admin';

        $search = $request->input('search');
        $filterStatus = $request->input('status', 'semua');

        // 1. Query untuk Tim Survei (Audit Sentimen Lapangan) dengan pencarian & filter
        $auditsQuery = AuditComparison::with(['voter', 'user']);
        
        if ($search) {
            $auditsQuery->whereHas('voter', function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('nik', 'like', "%{$search}%");
            });
        }

        if ($filterStatus === 'sudah') {
            $auditsQuery->where('is_match', true);
        } elseif ($filterStatus === 'belum') {
            $auditsQuery->where('is_match', false);
        }

        $audits = $auditsQuery->orderBy('id', 'desc')->get();

        // 2. Query untuk Tim Relawan (Data Pemilih / Warga) dengan pencarian
        $votersQuery = Voter::query();
        if ($search) {
            $votersQuery->where('name', 'like', "%{$search}%")
                        ->orWhere('nik', 'like', "%{$search}%");
        }
        
        // Menampilkan seluruh data pemilih (atau batasan tertentu jika diperlukan)
        $voters = $votersQuery->orderBy('id', 'desc')->get();

        // 3. Statistik umum untuk Command Center (Admin) & modul lainnya
        $totalVoters = Voter::count();
        $totalAudited = AuditComparison::count();
        $mismatchAudits = AuditComparison::where('is_match', false)->count();

        return Inertia::render('Dashboard', [
            'role' => $userRole,
            'filters' => [
                'search' => $search,
                'status' => $filterStatus,
            ],
            'stats' => [
                'total_voters' => $totalVoters,
                'total_audited' => $totalAudited,
                'mismatch' => $mismatchAudits,
                'dpt_master_count' => $totalVoters,
                'antrian_dpt_count' => 1,
                'audits' => $audits,
                'voters' => $voters,
                'recent_reports' => FieldReport::with(['voter', 'zone', 'user'])->orderBy('id', 'desc')->take(5)->get(),
                'zones' => Zone::all(),
            ]
        ]);
    }
}