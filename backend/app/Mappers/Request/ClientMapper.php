<?php

namespace App\Mappers\Request;

use Illuminate\Http\Request;

class ClientMapper
{
	public static function map(Request $request)
	{
		return [
			'ID_number'				    => $request->input('IDNumber'),
			'first_name'			    => $request->input('firstName'),
			'group_id'			        => $request->input('groupId'),
			'last_name'				    => $request->input('lastName'),
			'birth_date'			    => $request->input('birthDate'),
			'email'			            => $request->input('email'),
			'phone'			            => $request->input('phone'),
			'extra_phone'			    => $request->input('extraPhone'),
			'comment'			        => $request->input('comment'),
			'address'			        => $request->input('address'),
			'balance'		            => $request->input('balance'),
			'printer_type'		        => $request->input('printerType'),
			'tag_number'		        => $request->input('tagNumber'),
			'is_shipping_document'		=> boolval($request->input('isShippingDocument')),
			'is_parent'		            => boolval($request->input('isParent')),
			'has_obligo_renews'			=> boolval($request->input('hasObligoRenews')),
			'is_locked'				    => boolval($request->input('isLocked')),
			'is_blocked'				=> boolval($request->input('isBlocked')),
			'is_elat_resident'      	=> boolval($request->input('isElatResident')),
			'obligo'				    => $request->input('obligo'),
			'terms_of_payment'		    => $request->input('termsOfPayment'),
			'discount_percentage'		=> $request->input('discountPercentage'),
			'number'		            => $request->input('number'),
			'parent_id'		            => $request->input('parentId'),
            'custom_price_allowed'      => $request->input('customPriceAllowed'),
		];
	}
}
