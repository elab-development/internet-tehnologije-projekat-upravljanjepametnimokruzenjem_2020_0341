<?php

namespace App\Http\Resources\Setting;

use App\Http\Resources\Room\RoomResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'setting';

    public function toArray($request)
    {
        return [
            'name' => $this->resource->name,
            'value' => $this->resource->value,
            'active' => $this->resource->professor,
            'room' => new RoomResource($this->resource->room)
        ];
    }
}
