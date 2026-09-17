<?php

namespace App\Http\Controllers;

use App\Models\FieldReport;
use App\Models\Zone;
use App\Models\Voter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FieldReportController extends Controller
{
    public function index(Request $request)
    {
        $query = FieldReport::with(['user', 'zone', 'voter']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('notes', 'like', "%{$search}%")
                  ->orWhere('quote', 'like', "%{$search}%");
            });
        }

        if ($request->filled('zone_id')) {
            $query->where('zone_id', $request->zone_id);
        }

        $reports = $query->latest()->paginate(10)->withQueryString();
        $zones = Zone::all();

        return Inertia::render('FieldReports/Index', [
            'reports' => $reports,
            'zones' => $zones,
            'filters' => $request->only(['search', 'zone_id'])
        ]);
    }

    public function create()
    {
        $zones = Zone::all();
        $voters = Voter::all();

        return Inertia::render('FieldReports/Create', [
            'zones' => $zones,
            'voters' => $voters
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'zone_id' => 'required|exists:zones,id',
            'voter_id' => 'nullable|exists:voters,id',
            'quote' => 'required|string|max:255', // Ditambahkan agar sesuai database
            'notes' => 'required|string',
        ]);

        $validated['user_id'] = auth()->id();

        FieldReport::create($validated);

        return redirect()->route('field-reports.index')
            ->with('message', 'Laporan lapangan berhasil dikirim.');
    }

    public function edit(FieldReport $fieldReport)
    {
        $zones = Zone::all();
        $voters = Voter::all();

        return Inertia::render('FieldReports/Edit', [
            'report' => $fieldReport,
            'zones' => $zones,
            'voters' => $voters
        ]);
    }

    public function update(Request $request, FieldReport $fieldReport)
    {
        $validated = $request->validate([
            'zone_id' => 'required|exists:zones,id',
            'voter_id' => 'nullable|exists:voters,id',
            'quote' => 'required|string|max:255', // Ditambahkan agar sesuai database
            'notes' => 'required|string',
        ]);

        $fieldReport->update($validated);

        return redirect()->route('field-reports.index')
            ->with('message', 'Laporan lapangan berhasil diperbarui.');
    }

    public function destroy(FieldReport $fieldReport)
    {
        $fieldReport->delete();

        return redirect()->route('field-reports.index')
            ->with('message', 'Laporan lapangan berhasil dihapus.');
    }
}