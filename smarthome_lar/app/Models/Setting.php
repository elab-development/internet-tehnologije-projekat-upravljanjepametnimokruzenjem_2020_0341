<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'value',
        'active',
        'room_id'
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public static function getAllSettings()
    {
        $result = DB::table('settings')
            ->select('id', 'room_id', 'name', 'value', 'created_at', 'updated_at')
            ->get()->toArray();
        return $result;
    }
}
