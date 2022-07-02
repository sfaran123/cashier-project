<?php

namespace App\Mappers\DataTable;

class SuppliersMapper
{
    public static function map()
    {
        return [
            'name'              => 'name',
            'businessNumber'    => 'business_number',
            'address'           => 'address',
            'category'          => 'category',
            'contact'           => 'contact_name'
        ];
    }
}
