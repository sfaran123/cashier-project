<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MenuElementResource extends JsonResource
{

    public function toArray($request)
    {
        $item = $this->type === 'item' ? $this->item : null;

        return [
            'id'            => $item ? $item->id : $this->id,
            'parentId'      => $this->parent_id,
            'name'          => $item ? $item->description : $this->name,
            'serialNumber'  => $this->serial_number,
            'color'         => $this->color,
            'type'          => $this->type,
            'item'          => new ItemResource($item),
            'price'         => $item ? $item->customer_price : null,
            'subMenus'      => MenuElementResource::collection($this->subMenus),
            'menuItems'     => MenuElementResource::collection($this->items)
        ];
    }
}
