<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemExtraItem extends Model
{
    public function item()
    {
        return $this->belongsTo(Item::class, 'extra_item_id');
    }

    public static function saveInstances($items, $itemId)
    {
        $extraItems = [];
        foreach ($items as $item) {

            $extraItems[] = [
                'item_id'           => $itemId,
                'extra_item_id'     => $item['id'],
                'price'             => $item['price'],
            ];
        }

        self::insert($extraItems);
    }
}
