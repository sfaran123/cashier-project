<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StoreResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id'                         => $this->id,
            'storeName'                  => $this->store_name,
            'address'                    => $this->address,
            'businessId'                 => $this->business_id,
            'phone'                      => $this->phone,
            'businessType'               => $this->business_type,
        ];
    }
}
