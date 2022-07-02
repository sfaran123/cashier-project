<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    public static function saveInstances($orderId, $items)
    {
        $insertData = [];

        foreach ($items as $item) {
            $item = collect($item);
            $data = [
                'item_id'    => $item->get('id'),
                'order_id'   => $orderId,
                'quantity'   => $item->get('amount'),
                'price'      => $item->get('customerPrice')
            ];

            $insertData[] = $data;
        }

        self::insert($insertData);
    }
}
