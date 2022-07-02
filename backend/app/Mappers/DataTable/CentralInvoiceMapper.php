<?php

namespace App\Mappers\DataTable;

class CentralInvoiceMapper
{
	public static function map()
	{
		return [
            'number'    => 'id',
            'date'	    => 'date',
            'sum'       => 'sum'
		];
	}
}
