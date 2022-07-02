<?php

namespace App\Mappers\DataTable;

class MenuMapper
{
	public static function map()
	{
		return [
		    'id'                    => 'm.id',
			'name'				    => 'm.name',
			'serialNumber'	        => 'm.serial_number',
		];
	}
}
