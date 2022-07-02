<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SupplierViewResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'                => $this->id,
            'name' 	            => $this->name,
            'businessNumber'    => $this->business_number,
            'phone'             => $this->phone,
            'email'             => $this->email,
            'address'           => $this->address,
            'category'          => $this->category,
            'payment'   => [
                'term'      => $this->payment_term,
                'method'    => $this->payment_method
            ],
            'bank'  => [
                'name'          => $this->bank_name,
                'accountOwner'  => $this->account_owner,
                'number'        => $this->bank_number,
                'branchNumber'  => $this->branch_number,
                'accountNumber' => $this->account_number
            ],
            'contact'  => [
                'name'          => $this->contact_name,
                'phone'         => $this->contact_phone,
                'extraPhone'    => $this->contact_extra_phone,
                'email'         => $this->contact_email,
                'fax'           => $this->contact_fax
            ],
            'discount'          => $this->discount,
            'comments'          => $this->comments,
            'isLocked'          => $this->is_locked
        ];
    }
}
