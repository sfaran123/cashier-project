<?php

namespace App\Http\Controllers;

use App\Mappers\Request\UserMapper;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $values = UserMapper::map($request);
        User::createInstance($values, $request->get('password'));

        return response(['message' => 'User created.'], 201);
    }

}
