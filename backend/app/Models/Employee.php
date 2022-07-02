<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;

class Employee extends BaseModel
{
    use HasFactory;

    public static function saveInstance($fields)
    {
        $model = new self;
        $model->fill($fields);
        return DB::transaction(function () use ($fields, $model) {
            $model->save();
            //todo save related
            return true;
        });
    }

}
