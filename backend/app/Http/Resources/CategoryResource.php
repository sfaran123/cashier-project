<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' 	        => $this->id,
            'name' 	        => $this->name,
            'number'        => $this->number,
            'subCategories' => SubCategoryResource::collection($this->subCategories)
        ];
    }
}
