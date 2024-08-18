<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'privilege',
        'home_id'
    ];

    public function home()
    {
        return $this->belongsTo(Home::class);
    }
}