<?php

namespace App\Mappers\DataTable;

class ItemMapper
{
    public static function map()
    {
        return [
            'code'              => 'i.code',
            'description'       => 'i.description',
            'category'          => 'c.name',
            'subCategory'       => 'sc.name',
            'costPrice'         => 'i.cost_price',
            'customerPrice'		=> 'i.customer_price',
            'unitsInStock'      => 'in.units_in_stock'
        ];
    }
}
