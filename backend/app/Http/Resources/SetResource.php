<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SetResource extends JsonResource
{
    public function toArray($request)
    {
        return [
			'id' 	        => $this->id,
			'name' 	        => $this->name,
            'code'          => $this->code,
            'categoryId'    => $this->category_id,
            'subCategoryId' => $this->sub_category_id,
            'price'         => $this->price,
            'groups'        => SetGroupResource::collection($this->setGroups)
		];
    }
}
