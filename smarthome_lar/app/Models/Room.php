<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'size',
        'home_id'
    ];

    public function home()
    {
        return $this->belongsTo(Home::class);
    }

    public function settings()
    {
        return $this->hasMany(Setting::class);
    }
}
