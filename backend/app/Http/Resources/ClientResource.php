<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id'                    => $this->id,
            'groupId'               => $this->group_id,
            'IDNumber' 	            => $this->ID_number,
            'number' 	            => $this->number,
            'firstName'             => $this->first_name,
            'lastName'              => $this->last_name,
            'birthDate'             => $this->birth_date,
            'email'                 => $this->email,
            'phone'                 => $this->phone,
            'extraPhone'            => $this->extra_phone,
            'comment'               => $this->comment,
            'address'               => $this->address,
            'balance'               => $this->balance,
            'printerType'           => $this->printer_type,
            'tagNumber'             => $this->tag_number,
            'isShippingDocument'    => $this->is_shipping_document,
            'hasObligoRenews'       => $this->has_obligo_renews,
            'isLocked'              => $this->is_locked,
            'isBlocked'             => $this->is_blocked,
            'isElatResident'        => $this->is_elat_resident,
            'obligo'                => $this->obligo,
            'termsOfPayment'        => $this->terms_of_payment,
            'discountPercentage'    => $this->discount_percentage,
            'parentId'              => $this->parent_id,
            'isParent'              => $this->is_parent,
            'customPriceAllowed'    => $this->custom_price_allowed,
            'documents'             => DocumentsResource::collection($this->entity->shippingCertificates)
        ];
    }
}
