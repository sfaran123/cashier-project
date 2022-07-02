<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class CentralInvoicesResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'number'        => $this->id,
            'date'          => Carbon::parse($this->date)->format('d/m/Y'),
            'clientName'    => $this->client->first_name . ' ' . $this->client->last_name,
            'sum' 	        => $this->sum
        ];
    }
}
