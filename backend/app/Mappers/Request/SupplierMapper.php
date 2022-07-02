<?php

namespace App\Mappers\Request;

use Illuminate\Http\Request;

class SupplierMapper
{
	public static function map(Request $request)
	{
        $contact = collect($request->input('contact'));
        $bank = collect($request->input('bank'));
        $payment = collect($request->input('payment'));

		return [
            'name'                  => $request->input('name'),
            'business_number'      	=> $request->input('businessNumber'),
            'phone'      	        => $request->input('phone'),
            'email'      	        => $request->input('email'),
            'address'               => $request->input('address'),
            'category'              => $request->input('category'),
            'payment_term'          => $payment->get('term'),
            'payment_method'        => $payment->get('method'),
            'bank_name'             => $bank->get('name'),
            'account_owner'         => $bank->get('accountOwner'),
            'bank_number'           => $bank->get('number'),
            'branch_number'         => $bank->get('branchNumber'),
            'account_number'        => $bank->get('accountNumber'),
            'contact_name'          => $contact->get('name'),
            'contact_phone'         => $contact->get('phone'),
            'contact_extra_phone'   => $contact->get('extraPhone'),
            'contact_email'         => $contact->get('email'),
            'contact_fax'           => $contact->get('fax'),
            'is_locked'             => boolval($request->input('isLocked')),
            'comments'              => $request->input('comments'),
            'discount'              => $request->input('discount')
		];
	}
}
