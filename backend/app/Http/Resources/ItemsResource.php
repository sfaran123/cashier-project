<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ItemsResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id'                => $this->id,
            'code'              => $this->code,
            'description'       => $this->description,
            'supplier'          => $this->supplier,
            'customerPrice'     => $this->customer_price,
            'includesVat'       => $this->includes_vat,
            'costPrice'         => $this->cost_price,
            'requiresManager'   => $this->requires_manager,
            'category'          => $this->category,
            'subCategory'       => $this->subCategory,
            'unitsInStock'      => $this->units_in_stock
        ];
    }
}
