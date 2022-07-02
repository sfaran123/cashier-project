<?php

namespace App\Mappers\Request;

use Illuminate\Http\Request;

class CategoryMapper
{
	public static function map(Request $request)
	{
		return [
			'name'	    => $request->input('name'),
			'number'    => $request->input('number'),
		];
	}
}
