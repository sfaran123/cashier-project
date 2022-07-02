<?php

namespace App\Mappers\Request;

use Illuminate\Http\Request;

class StoreMapper
{
	public static function map(Request $request)
	{
		return [
			'store_name'				        => $request->input('storeName'),
			'address'				            => $request->input('address'),
			'business_id'			            => $request->input('businessId'),
            'phone'			                    => $request->input('phone'),
            'business_type'			            => $request->input('businessType'),
			'printed_phone_number'		        => $request->input('printingSetting')['phoneNumber'],
			'invoice_header_text'		        => $request->input('printingSetting')['invoiceHeaderText'],
			'invoice_footer_text'		        => $request->input('printingSetting')['invoiceFooterText'],
			'is_bon_printing_after_payment'		=> boolval($request->input('printingSetting')['isBonPrintingAfterPayment']),
			'ten_bis_user_name'			        => $request->input('tenBisForm')['userName'],
			'ten_bis_restaurant_code'			=> $request->input('tenBisForm')['restaurantCode'],
			'ten_bis_password'			        => $request->input('tenBisForm')['password'],
			'Value_card_store_id'			    => $request->input('valueCardForm')['storeId'],
			'Value_card_password'			    => $request->input('valueCardForm')['password']
        ];
	}
}
