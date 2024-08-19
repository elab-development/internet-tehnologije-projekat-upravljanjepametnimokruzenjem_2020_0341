<?php

namespace App\Http\Resources\Room;

use App\Http\Resources\Home\HomeResource;
use App\Http\Resources\Setting\SettingCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'room';

    public function toArray($request)
    {
        return [
            'name' => $this->resource->name,
            'size' => $this->resource->size,
            'home' => new HomeResource($this->resource->home)
        ];
    }
}
