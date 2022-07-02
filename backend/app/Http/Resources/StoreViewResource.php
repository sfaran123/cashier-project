<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StoreViewResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'storeCode'                            => $this->id,
            'storeName'                     => $this->store_name,
            'address'                       => $this->address,
            'businessId' 	                => $this->business_id,
            'phone'                         => $this->phone,
            'businessType'                  => $this->business_type,
            'printingSetting'               => collect([

                'phoneNumber'               => $this->printed_phone_number,
                'invoiceHeaderText'         => $this->invoice_header_text,
                'invoiceFooterText'         => $this->invoice_footer_text,
                'isBonPrintingAfterPayment' => $this->is_bon_printing_after_payment,
            ]),
            'tenBisForm'                    => collect([
                 'userName'         => $this->ten_bis_user_name,
                 'restaurantCode'   => $this->ten_bis_restaurant_code,
                 'password'         => $this->ten_bis_password
            ]),
            'valueCardForm'                  => collect([
                 'storeId'     =>  $this->Value_card_store_id,
                 'password'    => $this->Value_card_password
            ])
        ];
    }
}
