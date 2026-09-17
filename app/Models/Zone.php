<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Zone extends Model
{
    protected $guarded = ['id'];

    public function voters()
    {
        return $this->hasMany(Voter::class);
    }

    public function fieldReports()
    {
        return $this->hasMany(FieldReport::class);
    }

    public function campaignActivities()
    {
        return $this->hasMany(CampaignActivity::class);
    }
}