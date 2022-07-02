<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SetsResource extends JsonResource
{
    public function toArray($request)
    {
        return [
			'id' 	        => $this->id,
			'name' 	        => $this->name,
            'code'          => $this->code,
            'category'      => $this->category,
            'subCategory'   => $this->subCategory,
            'price'         => $this->price,
            'groupsCount'   => $this->setGroups
		];
    }
}
