<?php

namespace App\Http\Resources\Resident;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ResidentCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'residents';

    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
