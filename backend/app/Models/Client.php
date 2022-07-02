<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

class Client extends BaseModel
{
    public function entity()
    {
        return $this->belongsTo(Entity::class);
    }

    public static function saveInstance($fields)
    {
        $model = new self;
        $model->fill($fields);
        DB::transaction(function () use ($fields, $model) {
            $model->entity_id = Entity::saveInstance('client');
            $model->save();
        });
    }

}
