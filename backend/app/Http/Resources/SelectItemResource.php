<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SelectItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
			'id' 	    => $this->id,
			'name' 	    => $this->name,
            'barcode'   => $this->code,
            'price'     => $this->cusotmer_price
		];
    }
}
