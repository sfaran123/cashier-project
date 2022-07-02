<?php

namespace App\Mappers\Model;

use Carbon\Carbon;

class ClientInvoiceMapper
{
    // model is document
	public static function map($sum, $paymentType, $items, $orderId)
	{
		return [
            'order_id'	        => $orderId,
            'entity_type'	    => 'client',
            'type'			    => 'invoice',
            'status'			=> 'locked',
            'date'			    => Carbon::now(),
            'payment_sum'	    => $sum,
            'with_vat'		    => 1,
            'payment_type'      => $paymentType,
            'payment_status'    => 'completed',
            'items'			    => $items,
//            'discount_type'	    => $request->input('discountType'),
//            'discount_sum'	    => $request->input('discountSum')
        ];
	}
}
