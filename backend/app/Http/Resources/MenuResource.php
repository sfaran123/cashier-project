<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource
{
    public function toArray($request)
    {
        return [
			'id' 	        => $this->id,
			'name' 	        => $this->name,
            'color'         => $this->color,
            'serialNumber'  => $this->serial_number
		];
    }
}
