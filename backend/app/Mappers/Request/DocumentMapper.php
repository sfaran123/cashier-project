<?php

namespace App\Mappers\Request;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DocumentMapper
{
	public static function map(Request $request)
	{
		return [
            'entity_id'		    => $request->input('entityId'),
            'entity_type'	    => $request->input('entityType'),
            'type'			    => Str::snake($request->input('documentType')),
            'reference_number'  => $request->input('referenceNumber'),
            'date'			    => $request->input('date'),
            'payment_sum'	    => $request->input('sumToPay'),
            'balance_due'	    => $request->input('sumToPay'),
            'with_vat'		    => boolval($request->input('withVat')),
            'comments'		    => $request->input('comments'),
            'discount_type'	    => $request->input('discountType'),
            'discount_sum'	    => $request->input('discountSum'),
			'items'			    => $request->input('items')
        ];
	}
}
