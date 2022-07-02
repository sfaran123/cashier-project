<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class CentralInvoiceResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            //todo change to actual invoice number
            'number'        => $this->id,
            'date'          => Carbon::parse($this->date)->format('d/m/Y'),
            'client'        => new ClientResource($this->client),
            'sum' 	        => $this->sum,
            'documents'     => CentralInvoiceDocumentsResource::collection($this->documents)
        ];
    }
}
