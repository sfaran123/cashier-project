<?php

namespace App\Mappers\Request;

use Illuminate\Http\Request;

class MenuElementMapper
{
	public static function map(Request $request)
	{
        // todo use resource
		return [
			'name'				    => $request->input('name'),
			'serial_number'	        => $request->input('serialNumber'),
			'color'	                => $request->input('color'),
		];
	}
}
