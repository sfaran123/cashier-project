<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    public static function createInstance($values, $password)
    {
        $user = new self();
        $user->fill($values);
        $user->password = Hash::make($password);
        $user->save();

        return $user->id;
    }
}
