<?php

namespace App\Mappers\Request;

use Illuminate\Http\Request;

class UserMapper
{
	public static function map(Request $request)
	{
		return [
			'first_name'	    => $request->input('firstName'),
			'last_name'	        => $request->input('lastName'),
            'phone'		        => $request->input('phone'),
            'email'		        => $request->input('email'),
            'username'		    => $request->input('username'),
//            'permissions_id'    => $request->input('permissionId')
		];
	}
}


