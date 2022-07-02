<?php

namespace App\Mappers\DataTable;

class SetsMapper
{
    public static function map()
    {
        return [
            'name'          => 's.name',
            'code'          => 's.code',
            'price'         => 's.price',
            'category'      => 'c.name',
            'subCategory'   => 'sc.name'
        ];
    }
}
