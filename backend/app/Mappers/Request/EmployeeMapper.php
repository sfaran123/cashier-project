<?php

namespace App\Mappers\Request;

use Illuminate\Http\Request;

class EmployeeMapper
{
	public static function map(Request $request)
	{
	    $bank = $request->input('bank');
	    $contact = $request->input('contact');

		return [
			'ID_number'				    => $request->input('IDNumber'),
			'name'			            => $request->input('name'),
            'phone'			            => $request->input('phone'),
            'extra_phone'			    => $request->input('extraPhone'),
            'address'			        => $request->input('address'),
            'card_number'			    => $request->input('cardNumber'),
            'external_id'			    => $request->input('externalId'),
            'gender'			        => $request->input('gender'),
            'birth_date'			    => $request->input('birthDate'),
            'work_start_date'		    => $request->input('workStartDate'),
			'is_cashier'			    => boolval($request->input('isCashier')),
			'is_courier'		        => boolval($request->input('isCourier')),
			'is_manager'		        => boolval($request->input('isManager')),
			'credit_allowed'		    => boolval($request->input('creditAllowed')),
			'discount_allowed'		    => boolval($request->input('discountAllowed')),
			'view_report_allowed'	    => boolval($request->input('viewReportAllowed')),
			'z_allowed'			        => boolval($request->input('ZAllowed')),
			'x_allowed'				    => boolval($request->input('XAllowed')),
			'refund_allowed'		    => boolval($request->input('refundAllowed')),
			'delete_sale_allowed'       => boolval($request->input('deleteSaleAllowed')),
			'change_item_price_allowed' => boolval($request->input('changeItemPriceAllowed')),
			'is_active'		            => boolval($request->input('isActive')),
			'calculation_by_shifts'	    => boolval($request->input('calculationByShifts')),
            'contact_name'              => $contact['name'],
			'contact_phone'		        => $contact['phone'],
			'contact_proximity'		    => $contact['proximity'],
            'bank_id'                   => $bank['name'],
            'bank_branch_id'            => $bank['branch'],
            'bank_account_number'       => $bank['accountNumber']
		];
	}
}
