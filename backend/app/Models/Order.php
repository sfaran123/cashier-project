<?php

namespace App\Models;

use App\Mappers\Model\ClientInvoiceMapper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Order extends Model
{
    public static function saveInstance($items, $sum, $paymentType)
    {
        $order = new self;
        $order->employee_id = 1;

        DB::transaction(function () use ($items, $order, $sum, $paymentType) {
            $order->save();
            OrderItem::saveInstances($order->id, $items);

            $fields = ClientInvoiceMapper::map($sum, $paymentType, $items, $order->id);
            Document::saveInstance($fields, false);
        });
    }
}
