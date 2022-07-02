<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemCustomerPrice extends Model
{
    public static function saveInstances($customerPrices, $itemId)
    {
        $prices = [];
        foreach ($customerPrices as $customerPrice) {
            $cp = collect($customerPrice);

            if ($cp->get('customerId')) {
                $prices[] = [
                    'customer_id' => $cp->get('customerId'),
                    'item_id' => $itemId,
                    'price' => $cp->get('price'),
                ];
            }
        }

        self::insert($prices);
    }
}
