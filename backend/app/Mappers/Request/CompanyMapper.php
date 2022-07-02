<?php

namespace App\Mappers\Request;

use Illuminate\Http\Request;

class CompanyMapper
{
	public static function map(Request $request)
	{
		return [
			'name'	=> $request->input('name')
		];
	}
}
