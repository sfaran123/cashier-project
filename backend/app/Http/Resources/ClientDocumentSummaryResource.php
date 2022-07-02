<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientDocumentSummaryResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'number'        => $this->number,
            'firstName'     => $this->first_name,
            'lastName'      => $this->last_name,
            'IDNumber'      => $this->ID_number,
            'sum'           => $this->sum
        ];
    }
}
