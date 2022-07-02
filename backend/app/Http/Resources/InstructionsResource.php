<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InstructionsResource extends JsonResource
{
    public function toArray($request)
    {
        return [
			'id' 	    => $this->id,
			'name' 	    => $this->name,
            'color'      => $this->color,
            'isDefault' => $this->is_default
		];
    }
}
