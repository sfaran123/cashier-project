<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GroupItemsResource extends JsonResource
{
    public function toArray($request)
    {
        return [
			'id' 	    => $this->id,
			'code' 	    => $this->code,
            'name'      => $this->description,
            'price'     => $this->groupItem->price
		];
    }
}
