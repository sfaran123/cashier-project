<?php

namespace App\Mappers\DataTable;

class MenuElementMapper
{
	public static function map()
	{
		return [
		    'id'            => 'id',
			'name'		    => 'name',
			'type'		    => 'type',
			'serialNumber'  => 'serial_number'
		];
	}
}
