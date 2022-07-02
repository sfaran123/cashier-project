<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Pos extends BaseModel
{

    use HasFactory;

    public static function saveInstance($fields) {
        $model = new self;
        $model->fill($fields);
        return DB::transaction(function () use ($model) {
        return $model->save();
        });
    }
}
