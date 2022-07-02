<?php

namespace App\Mappers\Request;

use Illuminate\Http\Request;

class MenuMapper
{
	public static function map(Request $request)
	{

		return [
			'name'				    => $request->input('name'),
			'serial_number'	        => $request->input('serialNumber'),
			'color'	                => $request->input('color'),
			'has_parent'	        => 1,
		];
	}
}
