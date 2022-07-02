<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MenuViewResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' 	        => $this->id,
            'name' 	        => $this->name,
            'serialNumber'  => $this->serial_number,
            'parentId'      => $this->parent_id,
            'color'         => $this->color,
            'subMenus'      => MenuChildrenResource::collection($this->childMenus),
            'menuItems'     => MenuItemsResource::collection($this->childItems)

        ];
    }
}
