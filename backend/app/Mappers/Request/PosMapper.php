<?php

namespace App\Mappers\Request;

use Illuminate\Http\Request;

class PosMapper
{
	public static function map(Request $request)
	{
		return [
            'name'				        => $request->input('name'),
            'internal_number'			=> $request->input('internalNumber'),
            'decimal_circle'			=> $request->input('decimalCircle'),
            'max_sale_amount'	        => $request->input('maxSaleAmount'),
            'limit_sale_amount'		    => $request->input('limitSaleAmount')
        ];
	}
}
