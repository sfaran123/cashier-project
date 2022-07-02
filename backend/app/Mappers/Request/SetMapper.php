<?php

namespace App\Mappers\Request;

use Illuminate\Http\Request;

class SetMapper
{
	public static function map(Request $request)
	{
		return [
			'name'			    => $request->input('name'),
			'code'	            => $request->input('code'),
			'price'	            => $request->input('price'),
            'category_id'       => $request->input('categoryId'),
            'sub_category_id'	=> $request->input('subCategoryId'),
		];
	}
}
