<?php

namespace App\Mappers\DataTable;

class ClientsMapper
{
    public static function map()
    {
        return [
            'idNumber'          => 'i.id',
            'number'            => 'i.number',
            'firstName'         => 'i.first_name',
            'birthDate'		    => 'i.birth_date',
            'phone'             => 'i.phone',
            'balance'           => 'i.balance',
            'obligo'            => 'i.obligo',
            'isParent'          => 'i.is_parent'
        ];
    }
}
