<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Home extends Model
{
    use HasFactory;

    protected $fillable = [
        'address',
        'size',
    ];

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }

    public function residents()
    {
        return $this->hasMany(Resident::class);
    }
}