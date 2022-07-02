<?php

namespace App\Mappers\DataTable;

class DocumentsMapper
{
    public static function map()
    {
        return [
//            'store'                     => 'store',
//            'name'                  => 'name',
            'date'		            => 'date',
            'sum'                   => 'payment_sum',
            'reference'             => 'reference_number',
            'status'                => 'status',
            'type'                  => 'type',
            'paymentStatus'         => 'payment_status',
            'paymentDate'           => 'payment_date',
            'paymentType'           => 'payment_type',
//            'centralInvoiceNumber'  => 'central_invoice_number',
        ];
    }
}
