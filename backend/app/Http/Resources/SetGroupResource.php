<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SetGroupResource extends JsonResource
{
    public function toArray($request)
    {
        $items = $this->group->items;

        return [
			'id' 	            => $this->group_id,
			'name' 	            => $this->group->name,
			'maxItems' 	        => $this->max_items,
			'minItems' 	        => $this->min_items,
			'freeItemsAllowed'  => $this->free_items_allowed,
            'itemsCount'        => count($items),
            'items'             => GroupItemsResource::collection($items)
		];
    }
}
