<?php

namespace App\Mappers\Model;

use Illuminate\Support\Collection;

class MenuElementMapper
{
	public static function map(Collection $model)
	{
		return [
			'name'		    => $model->get('name'),
			'serial_number' => $model->get('serialNumber'),
			'color'	        => $model->get('color'),
			'item_id'	    => $model->get('type') === 'item' ? $model->get('id') : null,
			'type'	        => $model->get('type'),
			'parent_id'	    => $model->get('parentId')
		];
	}
}
