<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class VoterSentimentLog extends Model
{
    protected $guarded = ['id'];

    public function voter()
    {
        return $this->belongsTo(Voter::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}