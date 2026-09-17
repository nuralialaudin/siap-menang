<?php

namespace App\Http\Controllers;

use App\Models\Voter;
use App\Models\Zone;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoterController extends Controller
{
    public function index(Request $request)
    {
        $query = Voter::with('zone');

        // Pencarian berdasarkan Nama atau NIK
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('nik', 'like', "%{$search}%");
            });
        }

        // Filter berdasarkan Zona / Dusun
        if ($request->filled('zone_id')) {
            $query->where('zone_id', $request->zone_id);
        }

        // Filter berdasarkan Sentimen
        if ($request->filled('sentiment')) {
            $query->where('sentiment', $request->sentiment);
        }

        $voters = $query->latest()->paginate(10)->withQueryString();
        $zones = Zone::all();

        return Inertia::render('Voters/Index', [
            'voters' => $voters,
            'zones' => $zones,
            'filters' => $request->only(['search', 'zone_id', 'sentiment'])
        ]);
    }

    public function create()
    {
        $zones = Zone::all();
        return Inertia::render('Voters/Create', ['zones' => $zones]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nik' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:20',
            'zone_id' => 'required|exists:zones,id',
            'sentiment' => 'required|in:MERAH,KUNING,HIJAU,ABU-ABU',
        ]);

        Voter::create($validated);

        return redirect()->route('voters.index')
            ->with('message', 'Data pemilih berhasil ditambahkan.');
    }

    public function edit(Voter $voter)
    {
        $zones = Zone::all();
        return Inertia::render('Voters/Edit', [
            'voter' => $voter,
            'zones' => $zones
        ]);
    }

    public function update(Request $request, Voter $voter)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nik' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:20',
            'zone_id' => 'required|exists:zones,id',
            'sentiment' => 'required|in:MERAH,KUNING,HIJAU,ABU-ABU',
        ]);

        $voter->update($validated);

        return redirect()->route('voters.index')
            ->with('message', 'Data pemilih berhasil diperbarui.');
    }

    public function destroy(Voter $voter)
    {
        $voter->delete();

        return redirect()->route('voters.index')
            ->with('message', 'Data pemilih berhasil dihapus.');
    }
}