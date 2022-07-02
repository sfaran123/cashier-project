<?php


namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;

class InventoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'barcode'       => $this->barcode,
            'color'         => $this->color,
            'size'          => $this->size,
            'unitsInStock'  => $this->units_in_stock
        ];
    }
}
