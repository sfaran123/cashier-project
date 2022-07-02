<?php

namespace App\Mappers\Request;

use Carbon\Carbon;
use Illuminate\Http\Request;

class CentralInvoiceMapper
{
	public static function map(Request $request)
	{
		return [
            'client_id'			=> $request->input('clientId'),
            'date'				=> Carbon::now(),
            'documents'         => $request->get('documents'),
            'sum'               => $request->get('sum')
		];
	}
}
