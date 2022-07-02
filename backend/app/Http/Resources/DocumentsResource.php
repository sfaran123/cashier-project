<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentsResource extends JsonResource
{
    public function toArray($request)
    {
        $entity = $this->entity->details;

        return [
            'id'                    => $this->id,
            'name'                  => $entity->name ?: $entity->first_name . ' ' . $entity->last_name,
            'entityId'              => $entity->id,
            'date'                  => Carbon::parse($this->date)->format('d/m/Y'),
            'sum'                   => $this->payment_sum,
            'reference'             => $this->reference_number,
            'status'                => $this->status,
            'type'                  => $this->type,
            'paymentStatus'         => $this->payment_status,
            'paymentDate'           => $this->paymnet_date,
            'paymentType'           => $this->payment_type,
            'balanceDue'            => $this->balance_due,
            'centralInvoiceNumber'  => $this->centralInvoice
        ];
    }
}
