<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IndexController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            $token = $user->createToken($user->username);

            return response([
                'token' 	=> $token->plainTextToken,
                'firstName'	=> $user->first_name,
                'lastName'	=> $user->last_name,
                'username'	=> $user->username
            ], 200);
        }

        return response(['message' => 'Unauthenticated'], 401);
    }
}
