<?php

namespace App\Mappers\DataTable;

class EmployeesMapper
{
    public static function map()
    {
        return [
            'id'            => 'id',
            'name'          => 'name',
            'phone'         => 'phone',
            'magneticCard'  => 'card_number',
            'isActive'      => 'is_active'
        ];
    }
}
