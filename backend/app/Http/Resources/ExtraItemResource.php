<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExtraItemResource extends JsonResource
{
    public function toArray($request)
    {
        $item = $this->item;
        return [
			'id'        => $item->id,
			'name'      => $item->description,
			'code'      => $item->code,
            'price'     => $this->price
		];
    }
}
