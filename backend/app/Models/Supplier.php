<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;


class Supplier extends BaseModel
{
    public static function saveInstance($fields)
	{
		$model = new self;
		$model->fill($fields);
		return DB::transaction(function() use ($model, $fields) {
            $model->entity_id = Entity::saveInstance('supplier');
            $model->save();
		});
	}
}
