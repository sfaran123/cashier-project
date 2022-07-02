<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MenuChildrenResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'name'          => $this->name,
            'serialNumber'  => $this->serial_number,
            'color'         => $this->color,
            'parentId'      => $this->parent_id
        ];
    }
}
