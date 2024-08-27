<?php

namespace App\Exports;

use App\Models\Setting;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SettingsExport implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return collect(Setting::getAllSettings());
    }

    public function headings(): array
    {
        return ['id', 'room_id', 'name', 'value', 'created_at', 'updated_at'];
    }
}
