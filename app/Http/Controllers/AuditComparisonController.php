<?php

namespace App\Http\Controllers;

use App\Models\AuditComparison;
use App\Models\Voter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuditComparisonController extends Controller
{
    public function index(Request $request)
    {
        $query = AuditComparison::with(['voter', 'auditor']);

        // Pencarian berdasarkan nama pemilih yang diaudit
        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('voter', function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('nik', 'like', "%{$search}%");
            });
        }

        // Filter berdasarkan status kecocokan (match / selisih)
        if ($request->filled('is_match')) {
            $query->where('is_match', $request->is_match);
        }

        $audits = $query->latest('audited_at')->paginate(10)->withQueryString();

        return Inertia::render('AuditComparisons/Index', [
            'audits' => $audits,
            'filters' => $request->only(['search', 'is_match'])
        ]);
    }

    public function create()
    {
        // Ambil data pemilih yang belum diaudit atau seluruh pemilih untuk pilihan audit baru
        $voters = Voter::all();

        return Inertia::render('AuditComparisons/Create', [
            'voters' => $voters
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'voter_id' => 'required|exists:voters,id',
            'volunteer_sentiment' => 'required|string',
            'survey_sentiment' => 'required|string',
            'is_match' => 'required|boolean',
        ]);

        // Otomatis catat ID user yang sedang login sebagai auditor dan waktu audit saat ini
        $validated['audited_by'] = auth()->id();
        $validated['audited_at'] = now();

        AuditComparison::create($validated);

        return redirect()->route('audit-comparisons.index')
            ->with('message', 'Data audit perbandingan berhasil ditambahkan.');
    }

    public function edit(AuditComparison $auditComparison)
    {
        $voters = Voter::all();

        return Inertia::render('AuditComparisons/Edit', [
            'audit' => $auditComparison,
            'voters' => $voters
        ]);
    }

    public function update(Request $request, AuditComparison $auditComparison)
    {
        $validated = $request->validate([
            'voter_id' => 'required|exists:voters,id',
            'volunteer_sentiment' => 'required|string',
            'survey_sentiment' => 'required|string',
            'is_match' => 'required|boolean',
        ]);

        $auditComparison->update($validated);

        return redirect()->route('audit-comparisons.index')
            ->with('message', 'Data audit perbandingan berhasil diperbarui.');
    }

    public function destroy(AuditComparison $auditComparison)
    {
        $auditComparison->delete();

        return redirect()->route('audit-comparisons.index')
            ->with('message', 'Data audit berhasil dihapus.');
    }
}