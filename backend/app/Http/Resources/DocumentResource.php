<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'                => $this->id,
            'entityId'          => $this->entity->id,
            'documentType'      => $this->type,
            'referenceNumber'   => $this->reference_number,
            'date'              => $this->date,
            'withVat'           => $this->with_vat,
            'sum'               => $this->payment_sum,
            'comments'          => $this->comments,
            'discountType'      => $this->discount_type,
            'discountSum'       => $this->discount_sum,
            'items'             => DocumentItemResource::collection($this->documentItems)
        ];
    }
}
