<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DocumentItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'            => $this->item_id,
            'code'          => $this->item->code,
            'name'          => $this->item->description,
            'amount'        => $this->amount,
            'price'         => $this->price,
            'sum'           => $this->sum,
            'inventoryId'   => $this->inventory_id,
            'discount'      => $this->discount,
            'inventories'   => InventoryResource::collection($this->item->allInventories),
            'inventory'     => new InventoryResource($this->inventory)
        ];
    }
}
