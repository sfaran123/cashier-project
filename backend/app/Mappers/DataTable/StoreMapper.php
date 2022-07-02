<?php

namespace App\Mappers\DataTable;

class StoreMapper
{
    public static function map()
    {
        return [
            'id'                         => 's.id',
            'storeName'                  => 's.store_name',
            'address'                    => 's.address',
            'businessId'                 => 's.business_id',
            'phone'                      => 's.phone',
            'businessType'               => 's.business_type',
        ];
    }
}
