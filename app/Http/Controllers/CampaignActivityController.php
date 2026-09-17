<?php

namespace App\Http\Controllers;

use App\Models\CampaignActivity;
use App\Models\Zone;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampaignActivityController extends Controller
{
    public function index()
    {
        // Mengambil data aktivitas beserta relasi zona dan user (pembuat)[cite: 1]
        $activities = CampaignActivity::with(['zone', 'user'])
                        ->orderBy('activity_date', 'desc')
                        ->paginate(10);

        return Inertia::render('CampaignActivities/Index', [
            'activities' => $activities
        ]);
    }

    public function create()
    {
        return Inertia::render('CampaignActivities/Create', [
            'zones' => Zone::select('id', 'dusun_name', 'block_name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'zone_id' => 'required|exists:zones,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'activity_date' => 'required|date',
            'status' => 'required|in:planned,on_going,completed', // Sesuai ENUM SQL[cite: 1]
        ]);

        // Otomatis assign ID user yang sedang login[cite: 1]
        $validated['user_id'] = $request->user()->id;

        CampaignActivity::create($validated);

        return redirect()->route('campaign-activities.index')
            ->with('message', 'Aktivitas kampanye berhasil dijadwalkan.');
    }

    public function edit(CampaignActivity $campaignActivity)
    {
        return Inertia::render('CampaignActivities/Edit', [
            'activity' => $campaignActivity,
            'zones' => Zone::select('id', 'dusun_name', 'block_name')->get()
        ]);
    }

    public function update(Request $request, CampaignActivity $campaignActivity)
    {
        $validated = $request->validate([
            'zone_id' => 'required|exists:zones,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'activity_date' => 'required|date',
            'status' => 'required|in:planned,on_going,completed',
        ]);

        $campaignActivity->update($validated);

        return redirect()->route('campaign-activities.index')
            ->with('message', 'Aktivitas kampanye berhasil diperbarui.');
    }

    public function destroy(CampaignActivity $campaignActivity)
    {
        $campaignActivity->delete();
        return redirect()->route('campaign-activities.index')
            ->with('message', 'Aktivitas kampanye berhasil dihapus.');
    }
}