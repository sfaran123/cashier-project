<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ItemsSelectResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id'                => $this->id,
            'code'              => $this->code,
            'name'              => $this->description,
            'price'             => $this->cost_price,
            'inventories'       => InventoryResource::collection($this->allInventories)
        ];
    }
}
