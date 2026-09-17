<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voter extends Model
{
    protected $guarded = ['id'];

    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }
}