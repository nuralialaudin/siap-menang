<?php

namespace App\Http\Controllers;

use App\Models\Zone;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ZoneController extends Controller
{
    public function index(Request $request)
    {
        $query = Zone::query();

        // Pencarian berdasarkan Nama Dusun atau Blok
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('dusun_name', 'like', "%{$search}%")
                  ->orWhere('block_name', 'like', "%{$search}%");
            });
        }

        // Filter berdasarkan Prioritas
        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        $zones = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Zones/Index', [
            'zones' => $zones,
            'filters' => $request->only(['search', 'priority'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Zones/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'dusun_name' => 'required|string|max:255',
            'block_name' => 'required|string|max:255',
            'rt_rw' => 'nullable|string|max:50',
            'tps_number' => 'nullable|integer',
            'priority' => 'required|in:TINGGI,SEDANG,RENDAH',
            'target_votes' => 'required|integer|min:0',
        ]);

        Zone::create($validated);

        return redirect()->route('zones.index')
            ->with('message', 'Data zona baru berhasil ditambahkan.');
    }

    public function edit(Zone $zone)
    {
        return Inertia::render('Zones/Edit', [
            'zone' => $zone
        ]);
    }

    public function update(Request $request, Zone $zone)
    {
        $validated = $request->validate([
            'dusun_name' => 'required|string|max:255',
            'block_name' => 'required|string|max:255',
            'rt_rw' => 'nullable|string|max:50',
            'tps_number' => 'nullable|integer',
            'priority' => 'required|in:TINGGI,SEDANG,RENDAH',
            'target_votes' => 'required|integer|min:0',
        ]);

        $zone->update($validated);

        return redirect()->route('zones.index')
            ->with('message', 'Data zona berhasil diperbarui.');
    }

    public function destroy(Zone $zone)
    {
        $zone->delete();

        return redirect()->route('zones.index')
            ->with('message', 'Data zona berhasil dihapus.');
    }
}