<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeesResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'cardNumber'    => $this->card_number,
            'name'          => $this->name,
            'phone'         => $this->phone,
            'isActive'      => $this->is_active
        ];
    }
}
