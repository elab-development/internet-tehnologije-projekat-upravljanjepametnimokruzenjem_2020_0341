<?php

namespace App\Http\Resources\Resident;

use App\Http\Resources\Home\HomeResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ResidentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'resident';

    public function toArray($request)
    {
        return [
            'name' => $this->resource->name,
            'privilege' => $this->resource->privilege,
            'home' => new HomeResource($this->resource->home)
        ];
    }
}