<?php

namespace App\Mappers\DataTable;

class PosMapper
{
    public static function map()
    {
        return [
            'id'                         => 'p.id',
            'name'                       => 'p.name',
            'internalNumber'             => 'p.internal_number',
            'decimalCircle'              => 'p.decimal_circle',
            'maxSaleAmount'              => 'p.max_sale_amount',
            'limitSaleAmount'            => 'p.limit_sale_amount',
            'documentType'               => 'p.document_type',
            'language'                   => 'p.language',
        ];
    }
}
