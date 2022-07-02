<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MenuElementsTreeResource extends JsonResource
{
    // todo refactor - not efficient
    public function toArray($request)
    {
        $item = $this->type === 'item' ? $this->item : null;

        return [
            'id'            => $this->id,
            'parentId'      => $this->parent_id,
            'name'          => $item ? $item->description : $this->name,
            'serialNumber'  => $this->serial_number,
            'color'         => $this->color,
            'type'          => $this->type,
            'item'          => new ItemResource($item),
            'price'         => $item ? $item->customer_price : null,
            'inventoryId'  => $item ? $item->inventoryId : null,
            'menuElements'  => MenuElementsTreeResource::collection($this->menuElements)
        ];
    }
}
