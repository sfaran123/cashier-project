<?php


namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;

class ItemCustomerPriceResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'customerId' => $this->customer_id,
            'price'      => $this->price
        ];
    }
}
