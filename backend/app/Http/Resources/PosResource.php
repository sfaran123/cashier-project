<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PosResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id'                         => $this->id,
            'name'                       => $this->name,
            'internalNumber'             => $this->internal_number,
            'decimalCircle'              => $this->decimal_circle,
            'maxSaleAmount'              => $this->max_sale_amount,
            'limitSaleAmount'            => $this->limit_sale_amount,
        ];
    }
}
