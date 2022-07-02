<?php

namespace App\Mappers\Request;

use Illuminate\Http\Request;

class GroupMapper
{
	public static function map(Request $request)
	{
		return [
			'name'				=> $request->input('name'),
			'type'				=> $request->input('type'),
		];
	}
}
