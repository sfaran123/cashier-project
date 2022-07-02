<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id'                => $this->id,
            'name'              => $this->name,
            'businessNumber'    => $this->business_number,
            'address'           => $this->address,
            'category'          => $this->category,
            'contact'           => $this->contact_name

        ];
    }
}
