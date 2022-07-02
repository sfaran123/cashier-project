<?php

namespace App\Mappers\Request;

use Illuminate\Http\Request;

class InstructionMapper
{
	public static function map(Request $request)
	{
		return [
			'name'				    => $request->input('name'),
			'color'	                => $request->input('color'),
			'is_default'	        => boolval($request->input('isDefault')),
		];
	}
}
