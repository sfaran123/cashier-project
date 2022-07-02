<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class CentralInvoiceDocumentsResource extends JsonResource
{

    public function toArray($request)
    {
        $document = $this->document;
        $client = $this->client;

        return [
            'id'            => $this->id,
            'number'        => $document->id,
            'date'          => Carbon::parse($document->date)->format('d/m/Y'),
//            'clientName'    => $client->first_name . ' ' . $client->last_name,
            'sum' 	        => $this->sum_paid
        ];
    }
}
