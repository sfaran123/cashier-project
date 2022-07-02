<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'                        => $this->id,
            'IDNumber'                  => $this->ID_number,
            'name'                      => $this->name,
            'cardNumber'                => $this->card_number,
            'externalId'                => $this->external_id,
            'gender'                    => $this->gender,
            'phone'                     => $this->phone,
            'address'                   => $this->address,
            'birthDate'                 => $this->birth_date,
            'workStartDate'             => $this->work_start_date,
            'isCashier'                 => $this->is_cashier,
            'isCourier'                 => $this->is_courier,
            'isManager'                 => $this->is_manager,
            'creditAllowed'             => $this->credit_allowed,
            'isDiscountApprove'         => $this->is_discount_approve,
            'discountAllowed'           => $this->discount_allowed,
            'ZAllowed'                  => $this->z_allowed,
            'XAllowed'                  => $this->x_allowed,
            'refundAllowed'             => $this->refund_allowed,
            'deleteSaleAllowed'         => $this->delete_sale_allowed,
            'changeItemPriceAllowed'    => $this->change_item_price_allowed,
            'isActive'                  => $this->is_active,
            'calculationByShifts'       => $this->calculation_by_shifts,
            'contact'   => [
                'name'      => $this->contact_name,
                'phone'     => $this->contact_phone,
                'proximity' => $this->contact_proximity
            ],
            'bank'  => [
                'name'          => $this->bank_id,
                'branch'        => $this->bank_branch_id,
                'accountNumber' => $this->bank_account_number
            ]
        ];
    }
}
