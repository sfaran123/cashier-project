<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MenuItemsResource extends JsonResource
{

    public function toArray($request)
    {
        $item = $this->item;

        return [
            'id'            => $item->id,
            'code'          => $item->code,
            'price'         => $item->customer_price,
            'name'          => $item->description,
            'color'         => $this->color,
            'serialNumber'  => $this->serial_number,
            'barcode'       => $item->mainItemInventory
        ];
    }
}
